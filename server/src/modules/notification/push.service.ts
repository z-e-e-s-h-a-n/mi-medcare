import * as admin from "firebase-admin";
import { Injectable } from "@nestjs/common";
import type { SafeUser } from "@workspace/contracts/user";

import { InjectLogger } from "@/decorators/logger.decorator";
import { EnvService } from "@/modules/env/env.service";
import { LoggerService } from "@/modules/logger/logger.service";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Injectable()
export class PushService {
  @InjectLogger()
  private readonly logger!: LoggerService;

  constructor(
    private readonly env: EnvService,
    private readonly prisma: PrismaService,
  ) {}

  async sendPush(user: SafeUser, title: string, body: string) {
    if (!this.hasFirebaseConfig()) {
      this.logger.warn("Push notifications are disabled because Firebase env values are missing.");
      return;
    }

    const sessions = await this.prisma.session.findMany({
      where: { userId: user.id, status: "active", pushToken: { not: null } },
      select: { pushToken: true, pushProvider: true },
    });

    for (const s of sessions) {
      if (!s.pushToken || !s.pushProvider) continue;

      switch (s.pushProvider) {
        case "fcm":
          await this.sendWithFCM(s.pushToken, title, body, user.id);
          break;

        case "expo":
          await this.sendWithExpo(s.pushToken, title, body);
          break;

        default:
          this.logger.warn("Unknown push provider", {
            provider: s.pushProvider,
          });
      }
    }
  }

  private async sendWithFCM(
    token: string,
    title: string,
    body: string,
    userId: string,
  ) {
    try {
      this.ensureFirebase();
      const message: admin.messaging.Message = {
        token,
        notification: { title, body },
      };

      await admin.messaging().send(message);
    } catch (err: any) {
      this.logger.error("FCM push failed", { token, error: err.message });
      if (
        err.code === "messaging/registration-token-not-registered" ||
        err.code === "messaging/invalid-registration-token"
      ) {
        await this.prisma.session.updateMany({
          where: { userId, pushToken: token },
          data: { pushToken: null },
        });
        this.logger.warn("Removed invalid FCM token", { token });
      }
    }
  }

  private async sendWithExpo(token: string, title: string, body: string) {
    this.logger.warn("Expo push is not configured for this deployment", {
      token,
      title,
      body,
    });
  }

  private ensureFirebase() {
    if (!this.hasFirebaseConfig()) {
      return false;
    }

    if (admin.apps.length) return true;

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.env.get("FIREBASE_PROJECT_ID"),
        clientEmail: this.env.get("FIREBASE_CLIENT_EMAIL"),
        privateKey: this.env.get("FIREBASE_PRIVATE_KEY"),
      }),
    });

    this.logger.log("✅ Firebase Admin initialized");
    return true;
  }

  private hasFirebaseConfig() {
    return (
      !!this.env.get("FIREBASE_PROJECT_ID") &&
      !!this.env.get("FIREBASE_CLIENT_EMAIL") &&
      !!this.env.get("FIREBASE_PRIVATE_KEY")
    );
  }
}
