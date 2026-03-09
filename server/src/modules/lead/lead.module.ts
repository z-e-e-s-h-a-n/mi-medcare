import { Module } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactController } from "./contact.controller";
import { NewsletterService } from "./newsletter.service";
import { NewsletterController } from "./newsletter.controller";
import { ConsultationService } from "./consultation.service";
import { ConsultationController } from "./consultation.controller";

@Module({
  providers: [ContactService, NewsletterService, ConsultationService],
  controllers: [
    ContactController,
    NewsletterController,
    ConsultationController,
  ],
})
export class LeadModule {}
