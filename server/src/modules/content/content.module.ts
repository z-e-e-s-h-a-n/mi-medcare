import { Module } from "@nestjs/common";

import { AuditModule } from "@/modules/audit/audit.module";

import { ContentAdminController } from "./content.admin.controller";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";

@Module({
  imports: [AuditModule],
  controllers: [ContentController, ContentAdminController],
  providers: [ContentService],
})
export class ContentModule {}
