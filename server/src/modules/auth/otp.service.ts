import crypto from "crypto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Otp } from "@workspace/db/client";
import type {
  OtpPurpose,
  OtpType,
} from "@workspace/contracts";
import type { SafeUser } from "@workspace/contracts/user";
import { futureDate } from "@workspace/shared/utils";

import { InjectLogger } from "@/decorators/logger.decorator";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { EnvService } from "@/modules/env/env.service";
import { LoggerService } from "@/modules/logger/logger.service";
import { CacheService } from "@/modules/cache/cache.service";
import {
  NotificationService,
  type SendNotificationProps,
} from "@/modules/notification/notification.service";

type OtpMetaMap = {
  verifyMfa: undefined;

  enableMfa: undefined;
  disableMfa: undefined;
  updateMfa: undefined;

  resetPassword: undefined;
  setPassword: undefined;
  updatePassword: undefined;

  verifyEmail: undefined;

  updateEmail: {
    oldEmail: string;
    newEmail: string;
  };
};

type OtpMeta<P extends OtpPurpose> = OtpMetaMap[P];

interface SendOtpPayload<P extends OtpPurpose> {
  email: string;
  purpose: P;
  type?: OtpType;
  notify?: boolean;
  user: SafeUser;
  meta?: OtpMeta<P>;
}

interface verifyOtpPayload {
  userId: string;
  secret: string;
  purpose: OtpPurpose;
  type?: OtpType;
}

type VerifiedOtp<P extends OtpPurpose> = Omit<Otp, "meta"> & {
  meta: OtpMeta<P>;
};

@Injectable()
export class OtpService {
  @InjectLogger()
  private readonly logger!: LoggerService;

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifyService: NotificationService,
    private readonly env: EnvService,
    private readonly cache: CacheService,
  ) {}

  async sendOtp<P extends OtpPurpose>({
    user,
    email,
    purpose,
    type = "numericCode",
    notify = true,
    meta,
  }: SendOtpPayload<P>) {
    let otp = await this.prisma.otp.findFirst({
      where: {
        userId: user.id,
        purpose,
        type,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) {
      otp = await this.prisma.otp.create({
        data: {
          userId: user.id,
          purpose,
          type,
          secret: this.generateSecret(type),
          expiresAt: futureDate(this.env.get("OTP_EXP")),
          meta,
        },
      });
    }

    if (!notify) return otp;

    const clientUrl = (await this.cache.get("clientUrl")) as string;

    const notifyMeta = this.buildOtpNotification(purpose, {
      user,
      otp,
      email,
      clientUrl,
      meta,
    });

    await this.notifyService.sendNotification(notifyMeta);

    return otp;
  }

  async verifyOtp<P extends OtpPurpose>({
    userId,
    secret,
    purpose,
    type = "numericCode",
  }: verifyOtpPayload & { purpose: P }): Promise<VerifiedOtp<P>> {
    const otp = await this.prisma.otp.findFirst({
      where: {
        userId,
        secret,
        purpose,
        type,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) {
      this.logger.warn(`Invalid OTP`, {
        userId,
        purpose,
        context: OtpService.name,
      });
      throw new UnauthorizedException("Invalid OTP");
    }

    await this.prisma.otp.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    const meta = otp.meta as OtpMeta<P>;

    return {
      ...otp,
      meta,
    };
  }

  private generateSecret(type: OtpType, prefix = "") {
    switch (type) {
      case "secureToken":
        return `${prefix}${crypto.randomBytes(32).toString("hex")}`;
      case "numericCode":
        return crypto.randomInt(100000, 999999).toString();
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  private buildOtpNotification<P extends OtpPurpose>(
    purpose: P,
    payload: {
      user: SafeUser;
      otp?: Otp;
      email: string;
      clientUrl?: string;
      meta?: OtpMeta<P>;
    },
  ): SendNotificationProps {
    const basePayload = {
      user: payload.user,
      otp: payload.otp,
      clientUrl: payload.clientUrl,
      email: payload.email,
    };

    switch (purpose) {
      case "verifyMfa":
        return {
          ...basePayload,
          purpose: "verifyMfa",
        };

      case "enableMfa":
        return {
          ...basePayload,
          action: "enable",
          purpose: "updateMfa",
        };

      case "disableMfa":
        return {
          ...basePayload,
          action: "disable",
          purpose: "updateMfa",
        };

      case "updateMfa":
        return {
          ...basePayload,
          action: "update",
          purpose: "updateMfa",
        };

      case "resetPassword":
        return {
          ...basePayload,
          action: "reset",
          purpose: "updatePassword",
        };

      case "setPassword":
        return {
          ...basePayload,
          action: "set",
          purpose: "updatePassword",
        };

      case "updatePassword":
        return {
          ...basePayload,
          action: "update",
          purpose: "updatePassword",
        };

      case "verifyEmail":
        return {
          ...basePayload,
          purpose: "verifyEmail",
        };

      case "updateEmail":
        return {
          ...basePayload,
          purpose: "updateEmail",
          meta: payload.meta!,
        };

      default: {
        const _exhaustive: never = purpose;
        throw new Error(`Unhandled purpose: ${_exhaustive}`);
      }
    }
  }
}

