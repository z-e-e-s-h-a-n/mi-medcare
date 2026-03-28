import { Global, Module } from "@nestjs/common";

import { PushService } from "./push.service";
import { EmailService } from "./email.service";
import { NotificationService } from "./notification.service";
import { NotificationController } from "./notification.controller";

@Global()
@Module({
  controllers: [NotificationController],
  providers: [EmailService, PushService, NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
