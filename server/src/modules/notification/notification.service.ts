import { Injectable } from "@nestjs/common";
import type {
  NotificationChannel as DbNotificationChannel,
  Otp,
} from "@workspace/db/client";
import type {
  NotificationPurpose,
  NotificationStatus,
} from "@workspace/contracts";
import type { SafeUser } from "@workspace/contracts/user";
import {
  resolveEmailTemplate,
  type EmailTemplateMap,
} from "@workspace/templates";
import { appName } from "@workspace/shared/constants";

import { PushService } from "./push.service";
import { EmailService } from "./email.service";

import { NOTIFICATION_POLICY_MAP } from "@/constants/index";
import { InjectLogger } from "@/decorators/logger.decorator";
import { EnvService } from "@/modules/env/env.service";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { LoggerService } from "@/modules/logger/logger.service";

type EmailTemplatePurpose = keyof EmailTemplateMap;

export type SendNotificationProps = {
  [K in EmailTemplatePurpose]: { purpose: K } & EmailTemplateMap[K] & {
      email: string;
      user: SafeUser;
      otp?: Otp;
    };
}[EmailTemplatePurpose];

@Injectable()
export class NotificationService {
  @InjectLogger()
  private readonly logger!: LoggerService;

  constructor(
    private readonly prisma: PrismaService,
    private readonly env: EnvService,
    private readonly emailService: EmailService,
    private readonly pushService: PushService,
  ) {}

  async sendNotification(props: SendNotificationProps) {
    const { html, subject, message } = await resolveEmailTemplate(props);

    const { priority, push } = NOTIFICATION_POLICY_MAP[props.purpose];
    const channels = this.determineChannels(
      props.user,
      push,
      !!props.otp,
    );

    try {
      const notification = await this.prisma.notification.create({
        data: {
          userId: props.user.id,
          recipient: props.email,
          purpose: props.purpose,
          channels,
          priority,
          subject,
          message,
          meta: props as any,
        },
      });

      let allSuccess = true;
      let anySuccess = false;

      for (const channel of channels) {
        try {
          switch (channel) {
            case "email":
              await this.sendEmail(props.email, subject, html);
              break;
            case "push":
              await this.sendPush(props.user, subject, message);
              break;
          }
          anySuccess = true;
        } catch (error) {
          allSuccess = false;
          this.logger.error("Notification send Failed", {
            email: props.email,
            channel,
            error,
          });
        }
      }

      const status: NotificationStatus = allSuccess
        ? "sent"
        : anySuccess
          ? "partial"
          : "failed";

      await this.prisma.notification.update({
        where: { id: notification.id },
        data: { status },
      });
    } catch (error) {
      this.logger.error(`❌ Notification send Failed`, {
        email: props.email,
        channels,
        error,
      });
      throw error;
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    const from = `${appName.default} <${this.env.get("SMTP_USER")}>`;
    await this.emailService.sendMail({ from, to, subject, html });
  }

  async sendPush(user: SafeUser, subject: string, message: string) {
    await this.pushService.sendPush(user, subject, message);
  }

  private determineChannels(
    user: SafeUser,
    allowPush: boolean,
    isOtp: boolean,
  ): DbNotificationChannel[] {
    if (isOtp) {
      return ["email"];
    }

    const channels: DbNotificationChannel[] = [];

    if (allowPush && user.pushNotifications) {
      channels.push("push");
    }

    if (user.email && user.isEmailVerified) {
      channels.push("email");
    }

    return channels;
  }
}

