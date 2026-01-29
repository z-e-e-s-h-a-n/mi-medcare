import prisma from "@lib/core/prisma";
import { sendMail } from "@lib/core/mailer";
import { otpService } from "@lib/auth/otp.service";
import { slugify } from "@utils/general";
import { BadRequestException } from "@lib/http/http-exception";

interface OAuthProfile {
  provider: "google" | "facebook";
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  imageUrl?: string;
}

class OAuthService {
  async validateOAuthLogin(profile: OAuthProfile) {
    if (!profile.email) {
      throw new BadRequestException("No email found from OAuth provider");
    }

    let user = await prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName: profile.firstName,
          lastName: profile.lastName || null,
          displayName: profile.displayName,
          email: profile.email,
          isEmailVerified: true,
          password: null,
          role: "author",
        },
      });

      if (profile.imageUrl) {
        await prisma.media.create({
          data: {
            url: profile.imageUrl,
            filename: `${slugify(profile.displayName)}-avatar`,
            mimeType: "image/jpeg",
            size: 0,
            hash: crypto.randomUUID(),
            uploadedById: user.id,
          },
        });
      }

      await sendMail(profile.email, "signup", { user });
    }

    const { password, ...rest } = user;

    if (!password) {
      await otpService.sendOtp({
        userId: user.id,
        purpose: "setPassword",
        email: profile.email,
        type: "secureToken",
        metadata: { user: rest },
      });
    }

    return {
      id: user.id,
      role: user.role,
      status: user.status,
    };
  }
}

export const oauthService = new OAuthService();
