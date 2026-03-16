import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import argon2 from "argon2";
import type { Request, Response } from "express";
import type { UserStatus } from "@workspace/db/client";
import type { UserRole } from "@workspace/contracts";
import type {
  RequestOtpDto,
  ResetPasswordDto,
  SignInDto,
  SignUpDto,
  UpdateEmailDto,
  UpdateMfaDto,
  ValidateOtpDto,
} from "@workspace/contracts/auth";
import type { SafeUser } from "@workspace/contracts/user";

import { OtpService } from "./otp.service";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { TokenService } from "@/modules/token/token.service";
import { NotificationService } from "@/modules/notification/notification.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly otpService: OtpService,
    private readonly notifyService: NotificationService,
  ) {}

  async signUp(dto: SignUpDto) {
    if (!dto.password) {
      throw new BadRequestException("Password should not be empty.");
    }

    await this.createUser(dto, "customer");

    return {
      message: "User created successfully. Please verify your email.",
    };
  }

  async signIn(dto: SignInDto, req: Request, res: Response) {
    const { user, email, meta } = await this.findUserFail404(dto.email);

    if (!meta.password) {
      await this.otpService.sendOtp({
        user,
        identifier: email,
        type: "secureToken",
        purpose: "setPassword",
      });

      throw new UnauthorizedException(
        "Password not set. Please set your password to continue.",
      );
    }

    if (!dto.password) {
      throw new BadRequestException("Password should not be empty.");
    }

    const isPasswordValid = await this.verifyPassword(
      dto.password,
      meta.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    this.checkUserStatus(user.status);
    await this.checkVerificationStatus(user, email, "unverified");

    if (user.preferredMfa) {
      this.assertSupportedMfa(user.preferredMfa);
      await this.otpService.sendOtp({
        user,
        identifier: email,
        purpose: "verifyMfa",
      });
      return {
        message: "MFA code sent. Please verify to complete login.",
        action: "verifyMfa",
      };
    }

    await this.tokenService.createAuthSession(req, res, {
      id: user.id,
      role: user.role,
      status: user.status,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    if (user.loginAlerts) {
      await this.notifyService.sendNotification({
        purpose: "signIn",
        identifier: email,
        user,
      });
    }

    return {
      message: "Signed in successfully",
    };
  }

  async signOut(sessionId: string, res: Response) {
    await this.tokenService.revokeSession(sessionId, res);
    return { message: "Signed out successfully" };
  }

  async requestOtp(dto: RequestOtpDto) {
    const { user, email, meta } = await this.findUserFail404(dto.email);

    console.log("request received", dto.purpose);

    switch (dto.purpose) {
      case "verifyIdentifier": {
        await this.checkVerificationStatus(user, email, "verified");

        await this.otpService.sendOtp({
          user,
          identifier: email,
          purpose: dto.purpose,
        });

        return { message: "Verification OTP sent." };
      }

      case "setPassword":
      case "resetPassword":
      case "updatePassword": {
        if (dto.purpose === "setPassword" && meta.password) {
          throw new BadRequestException(
            "Password already set. Use resetPassword.",
          );
        }

        await this.otpService.sendOtp({
          user,
          identifier: email,
          purpose: dto.purpose,
        });

        return { message: `${dto.purpose} OTP sent.` };
      }

      case "updateIdentifier": {
        await this.otpService.sendOtp({
          user,
          identifier: email,
          purpose: dto.purpose,
        });

        return { message: "Update email OTP sent." };
      }

      case "updateMfa": {
        this.assertSupportedMfa(user.preferredMfa);
        await this.otpService.sendOtp({
          user,
          identifier: email,
          purpose: dto.purpose,
        });

        return {
          message: `Mfa ${user.preferredMfa ? "Change" : "Enable"} OTP sent.`,
        };
      }

      case "disableMfa": {
        if (!user.preferredMfa) {
          throw new BadRequestException("MFA is already disabled.");
        }

        await this.otpService.sendOtp({
          user,
          identifier: email,
          purpose: dto.purpose,
        });

        return { message: "disableMfa OTP sent." };
      }

      case "verifyMfa": {
        await this.otpService.sendOtp({
          user,
          identifier: email,
          purpose: dto.purpose,
        });

        return { message: "verifyMfa OTP sent." };
      }

      default:
        throw new BadRequestException(`Invalid purpose: ${dto.purpose}`);
    }
  }

  async validateOtp(dto: ValidateOtpDto, req: Request, res: Response) {
    const { email, user } = await this.findUserFail404(dto.email);

    await this.otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: dto.type,
    });

    switch (dto.purpose) {
      case "verifyIdentifier": {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { isEmailVerified: true },
        });

        return { message: "Email verified successfully." };
      }

      case "setPassword":
      case "resetPassword":
      case "updatePassword": {
        const otp = await this.otpService.sendOtp({
          user,
          identifier: email,
          type: "secureToken",
          purpose: dto.purpose,
          notify: false,
        });

        return {
          message: "OTP validated successfully.",
          meta: { secret: otp.secret },
        };
      }

      case "updateIdentifier": {
        const otp = await this.otpService.sendOtp({
          user,
          identifier: email,
          type: "secureToken",
          purpose: dto.purpose,
          notify: false,
        });

        return {
          message: "OTP validated successfully.",
          meta: { secret: otp.secret },
        };
      }

      case "updateMfa": {
        this.assertSupportedMfa(user.preferredMfa);
        const otp = await this.otpService.sendOtp({
          user,
          identifier: email,
          type: "secureToken",
          purpose: dto.purpose,
          notify: false,
        });

        return {
          message: "OTP verified. Setup MFA details.",
          meta: { secret: otp.secret },
        };
      }

      case "disableMfa": {
        await this.prisma.user.update({
          where: { id: user.id },
          data: { preferredMfa: null },
        });

        await this.notifyService.sendNotification({
          identifier: dto.email,
          purpose: "updateMfa",
          user,
          action: "update",
        });

        return { message: "disableMfa successfully." };
      }

      case "verifyMfa": {
        this.checkUserStatus(user.status);

        await this.tokenService.createAuthSession(req, res, {
          id: user.id,
          role: user.role,
          status: user.status,
        });

        await this.prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          message: "MFA verified. Signed in successfully.",
        };
      }

      default:
        throw new BadRequestException(`Invalid purpose: ${dto.purpose}`);
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { user } = await this.findUserFail404(dto.email);

    await this.otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    const hashedPassword = await this.hashPassword(dto.newPassword);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await this.notifyService.sendNotification({
      identifier: dto.email,
      purpose: "updatePassword",
      user,
      action:
        dto.purpose === "setPassword"
          ? "set"
          : dto.purpose === "updatePassword"
            ? "update"
            : "reset",
    });

    return {
      message: `Password ${dto.purpose.split("Password")[0]} successfully`,
    };
  }

  async updateMfa(dto: UpdateMfaDto) {
    const { user } = await this.findUserFail404(dto.email);
    this.assertSupportedMfa(dto.preferredMfa);

    await this.otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { preferredMfa: dto.preferredMfa },
    });

    await this.notifyService.sendNotification({
      identifier: dto.email,
      purpose: "updateMfa",
      user,
      action: user.preferredMfa ? "update" : "enable",
    });

    return {
      message: `Mfa ${user.preferredMfa ? "Updated" : "Enabled"} successfully.`,
    };
  }

  async requestUpdateEmail(dto: UpdateEmailDto) {
    const { user, email } = await this.findUserFail404(dto.email);
    const { email: newEmail } = await this.findUserFail200(dto.newEmail);

    await this.otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    await this.otpService.sendOtp({
      user,
      identifier: newEmail,
      type: "secureToken",
      purpose: "updateIdentifier",
      meta: {
        oldIdentifier: email,
        newIdentifier: newEmail,
      },
    });

    return {
      message: "Link sent to your new email. Please verify to complete the change.",
    };
  }

  async verifyUpdateEmail(dto: UpdateEmailDto) {
    const { user } = await this.findUserFail404(dto.email);

    const otp = await this.otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    const newIdentifier = otp.meta?.newIdentifier;

    if (!newIdentifier || newIdentifier !== dto.newEmail) {
      throw new BadRequestException("Invalid email update token.");
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: newIdentifier,
        isEmailVerified: true,
      },
    });

    await this.tokenService.revokeAllSessions(user);
    await this.notifyService.sendNotification({
      user,
      identifier: dto.email,
      purpose: "updateIdentifier",
      meta: {
        newIdentifier: dto.newEmail,
        oldIdentifier: dto.email,
      },
    });

    await this.notifyService.sendNotification({
      user,
      identifier: dto.newEmail,
      purpose: "updateIdentifier",
      meta: {
        newIdentifier: dto.newEmail,
        oldIdentifier: dto.email,
      },
    });

    return { message: "Email changed successfully." };
  }

  async createUser(dto: SignUpDto, role: UserRole) {
    const { email } = await this.findUserFail200(dto.email);

    const hashedPassword = dto.password
      ? await this.hashPassword(dto.password)
      : undefined;

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName: dto.firstName,
        lastName: dto.lastName,
        displayName: `${dto.firstName} ${dto.lastName}`.trim(),
        role,
      },
      ...this.userView,
    });

    await this.notifyService.sendNotification({
      purpose: "signUp",
      identifier: email,
      user,
    });

    await this.otpService.sendOtp({
      user,
      identifier: email,
      purpose: "verifyIdentifier",
    });

    return { user };
  }

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  async findUserFail404(email: string) {
    const value = this.normalizeEmail(email);

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: value },
    });

    if (!user) {
      throw new BadRequestException("User Not Found");
    }

    const { password, ...reset } = user;
    return {
      email: value,
      user: reset,
      meta: { password },
    };
  }

  private findUserFail200 = async (email: string) => {
    const value = this.normalizeEmail(email);
    const user = await this.prisma.user.findUnique({
      where: { email: value },
    });

    if (user) {
      throw new BadRequestException("Email already in use.");
    }

    return { email: value };
  };

  checkUserStatus(status: UserStatus) {
    if (status === "pending") {
      throw new ForbiddenException(
        "Your account is pending approval. Please contact support.",
      );
    } else if (status === "suspended") {
      throw new ForbiddenException(
        "Your account has been suspended. Contact support for assistance.",
      );
    }
  }

  private async checkVerificationStatus(
    user: SafeUser,
    email: string,
    check: "verified" | "unverified",
  ) {
    const isVerified = user.isEmailVerified;

    if (check === "verified" && isVerified) {
      throw new BadRequestException("Email is already verified.");
    }

    if (check === "unverified" && !isVerified) {
      await this.otpService.sendOtp({
        user,
        identifier: email,
        purpose: "verifyIdentifier",
      });

      throw new UnauthorizedException({
        message: "Email not verified",
        action: "verifyIdentifier",
      });
    }
  }

  normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private assertSupportedMfa(preferredMfa: string | null | undefined) {
    if (preferredMfa && !["email", "authApp"].includes(preferredMfa)) {
      throw new BadRequestException(
        "Only email or authenticator app MFA is supported.",
      );
    }
  }

  userView = {
    omit: { password: true },
    include: {
      image: { include: { uploadedBy: { omit: { password: true } } } },
    },
  };
}

