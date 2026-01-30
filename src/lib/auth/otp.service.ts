import crypto from "crypto";
import prisma from "@lib/core/prisma";
import { serverEnv } from "@lib/core/server-env";
import { expiryDate } from "@lib/utils/general";
import { sendMail, TemplateProps } from "@lib/core/mailer";
import { UnauthorizedException } from "@lib/http/http-exception";

interface SendOtpPayload {
  userId: string;
  email: string;
  purpose: OtpPurpose;
  type?: OtpType;
  notify?: boolean;
  metadata: TemplateProps;
}

interface verifyOtpPayload {
  userId: string;
  secret: string;
  purpose: OtpPurpose;
  type?: OtpType;
}

class OtpService {
  async sendOtp({
    userId,
    email,
    purpose,
    type = "numericCode",
    notify = false,
    metadata,
  }: SendOtpPayload) {
    let otp = await prisma.otp.findFirst({
      where: {
        userId,
        purpose,
        type,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!otp) {
      otp = await prisma.otp.create({
        data: {
          userId,
          purpose,
          type,
          secret: this.generateSecret(type),
          expiresAt: expiryDate(serverEnv.OTP_EXP, true),
        },
      });
      notify = true;
    }

    if (!notify) return otp;
    await sendMail(email, purpose, { otp, email, ...metadata });
    return otp;
  }

  async verifyOtp({
    userId,
    secret,
    purpose,
    type = "numericCode",
  }: verifyOtpPayload) {
    const otp = await prisma.otp.findFirst({
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
      throw new UnauthorizedException("Invalid OTP");
    }

    await prisma.otp.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    return otp;
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
}

export const otpService = new OtpService();
