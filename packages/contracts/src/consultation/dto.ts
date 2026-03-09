import { createZodDto } from "nestjs-zod";
import {
  createConsultationRequestSchema,
  updateConsultationRequestSchema,
  consultationRequestQuerySchema,
} from "./schema";

export class CreateConsultationRequestDto extends createZodDto(
  createConsultationRequestSchema,
) {}

export class UpdateConsultationRequestDto extends createZodDto(
  updateConsultationRequestSchema,
) {}

export class ConsultationRequestQueryDto extends createZodDto(
  consultationRequestQuerySchema,
) {}
