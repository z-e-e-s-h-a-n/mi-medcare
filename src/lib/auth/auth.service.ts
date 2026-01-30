import argon2 from "argon2";
import { Prisma, UserStatus } from "@generated/prisma";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "@lib/http/http-exception";
import prisma from "@lib/core/prisma";
import { otpService } from "./otp.service";
import { tokenService } from "./token.service";
import { sendMail } from "@lib/core/mailer";
import { NextRequest } from "next/server";

class AuthService {
  async signUp(dto: SignUpDto) {
    await this.createUser(dto, "author");

    return {
      message: `User created successfully. Please verify your Email.`,
    };
  }

  async signIn(dto: SignInDto, req: NextRequest) {
    const { user, meta } = await this.findUserFail404(dto.email);

    if (!meta.password) {
      await otpService.sendOtp({
        userId: user.id,
        purpose: "setPassword",
        email: dto.email,
        type: "secureToken",
        metadata: { user },
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

    await this.checkVerificationStatus(user, dto.email, "unverified");
    this.checkUserStatus(user.status);

    await tokenService.createAuthSession(req, {
      id: user.id,
      role: user.role,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await sendMail(dto.email, "signin", { user });

    return {
      message: "Signed in successfully",
      data: { id: user.id, role: user.role },
    };
  }

  async signOut() {
    await tokenService.clearAuthCookies();
    return { message: "Signed out successfully" };
  }

  async requestOtp(dto: RequestOtpDto) {
    const { user, meta } = await this.findUserFail404(dto.email);

    switch (dto.purpose) {
      case "verifyEmail": {
        await this.checkVerificationStatus(user, dto.email, "verified");

        await otpService.sendOtp({
          userId: user.id,
          email: dto.email,
          purpose: dto.purpose,
          metadata: { user },
        });

        return { message: "Verification OTP sent." };
      }

      case "setPassword":
      case "resetPassword": {
        if (dto.purpose === "setPassword" && meta.password) {
          throw new BadRequestException(
            "Password already set. Use resetPassword.",
          );
        }

        await otpService.sendOtp({
          userId: user.id,
          email: dto.email,
          purpose: dto.purpose,
          metadata: { user },
        });

        return { message: `${dto.purpose} OTP sent.` };
      }

      case "changeEmail": {
        await otpService.sendOtp({
          userId: user.id,
          email: dto.email,
          purpose: dto.purpose,
          metadata: { user, newEmail: dto.newEmail },
        });

        return { message: `Change Email OTP sent.` };
      }

      default:
        throw new BadRequestException(`Invalid purpose: ${dto.purpose}`);
    }
  }

  async validateOtp(dto: ValidateOtpDto) {
    const { user } = await this.findUserFail404(dto.email);

    await otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: dto.type,
    });

    switch (dto.purpose) {
      case "verifyEmail": {
        await prisma.user.update({
          where: { id: user.id },
          data: { isEmailVerified: true },
        });

        return { message: `Email verified successfully.` };
      }

      case "setPassword":
      case "resetPassword": {
        const otp = await otpService.sendOtp({
          userId: user.id,
          email: dto.email,
          purpose: dto.purpose,
          type: "secureToken",
          notify: false,
          metadata: { user },
        });

        return {
          message: "OTP validated successfully.",
          data: { secret: otp.secret },
        };
      }

      case "changeEmail": {
        const otp = await otpService.sendOtp({
          userId: user.id,
          email: dto.email,
          purpose: dto.purpose,
          type: "secureToken",
          notify: false,
          metadata: { user },
        });

        return {
          message: "OTP validated successfully.",
          data: { secret: otp.secret },
        };
      }

      default:
        throw new BadRequestException(`Invalid purpose: ${dto.purpose}`);
    }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { user } = await this.findUserFail404(dto.email);

    const isTokenValid = await otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    if (!isTokenValid) {
      throw new BadRequestException("Invalid Token");
    }

    const hashedPassword = await this.hashPassword(dto.newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await sendMail(dto.email, dto.purpose, { user });

    return {
      message: `Password ${dto.purpose.split("Password")} successfully`,
    };
  }

  async changeEmailReq(dto: ChangeEmailDto) {
    const { user } = await this.findUserFail404(dto.email);

    const isTokenValid = await otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    if (!isTokenValid) {
      throw new BadRequestException("Invalid Token");
    }

    await otpService.sendOtp({
      userId: user.id,
      email: dto.newEmail,
      purpose: dto.purpose,
      type: "secureToken",
      metadata: { user, email: dto.email, newEmail: dto.newEmail },
    });

    return {
      message: `Link sent to new Email. Please verify to complete the change.`,
    };
  }

  async changeEmail(dto: ChangeEmailDto) {
    const { user } = await this.findUserFail404(dto.email);

    await otpService.verifyOtp({
      userId: user.id,
      purpose: dto.purpose,
      secret: dto.secret,
      type: "secureToken",
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { email: dto.newEmail },
    });

    await prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { blacklisted: true },
    });

    await sendMail(dto.newEmail, dto.purpose, {
      user,
      email: dto.email,
      newEmail: dto.newEmail,
    });

    return { message: `Email changed successfully.` };
  }

  async createUser(dto: Optional<SignUpDto, "password">, role: UserRole) {
    await this.findUserFail200(dto.email);

    let hashedPassword = null;

    if (dto.password) {
      hashedPassword = await this.hashPassword(dto.password);
    }

    const user = await prisma.user.create({
      data: {
        displayName: `${dto.firstName} ${dto.lastName}`.trim(),
        ...dto,
        role,
        password: hashedPassword,
      },
      ...this.userView,
    });

    await sendMail(dto.email, "signup", { user });
    if (!dto.password) {
      await otpService.sendOtp({
        userId: user.id,
        purpose: "setPassword",
        email: dto.email,
        type: "secureToken",
        metadata: { user },
      });
    }

    await otpService.sendOtp({
      userId: user.id,
      email: dto.email,
      purpose: "verifyEmail",
      metadata: { user },
    });

    return { user };
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  async findUserFail404(email: string, q?: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({
      where: q ?? { email },
      include: authService.userView.include,
    });

    if (!user) throw new NotFoundException("User not found");

    const { password, ...data } = user;

    return {
      user: data,
      meta: { password },
    };
  }

  private findUserFail200 = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
      ...this.userView,
    });

    if (user) {
      throw new BadRequestException(`Email already in use.`);
    }
  };

  private async checkVerificationStatus(
    user: UserResponse,
    email: string,
    check: "verified" | "unverified",
  ) {
    const isVerified = user.isEmailVerified;
    if (check === "verified" && isVerified) {
      throw new BadRequestException(`Email is already verified.`);
    }

    if (check === "unverified" && !isVerified) {
      await otpService.sendOtp({
        userId: user.id,
        email,
        purpose: "verifyEmail",
        metadata: { user },
      });

      throw new UnauthorizedException(`Email not verified`, "verifyEmail");
    }
  }

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

  userView = {
    omit: { password: true },
    include: {
      image: { include: { uploadedBy: { omit: { password: true } } } },
    },
  };
}

export const authService = new AuthService();
