import { Injectable } from "@nestjs/common";
import type {
  ConsultationRequestQueryDto,
  CreateConsultationRequestDto,
} from "@workspace/contracts/consultation";
import { PrismaService } from "@/modules/prisma/prisma.service";
import { NotificationService } from "@/modules/notification/notification.service";
import { resolveEmailTemplate } from "@workspace/templates";
import type { ConsultationRequest } from "@workspace/db/browser";

@Injectable()
export class ConsultationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationService,
  ) {}

  async createRequest(dto: CreateConsultationRequestDto) {
    const request = await this.prisma.consultationRequest.create({
      data: { ...dto },
    });

    await this.notifyUser(request);

    return { message: "Consultation request created.", data: request };
  }

  async getRequest(id: string) {
    const request = await this.prisma.consultationRequest.findUniqueOrThrow({
      where: { id },
    });

    return { message: "Request fetched successfully.", data: request };
  }

  async queryRequests(query: ConsultationRequestQueryDto) {
    const { page, limit, status, search, searchBy, sortBy, sortOrder } = query;

    const where: any = {};
    if (status) where.status = status;

    if (search && searchBy) {
      const searchMap: Record<string, any> = {
        email: { email: { contains: search, mode: "insensitive" } },
        phone: { phone: { contains: search, mode: "insensitive" } },
        name: { fullName: { contains: search, mode: "insensitive" } },
        practiceName: {
          practiceName: { contains: search, mode: "insensitive" },
        },
        practiceType: { practiceType: { equals: search } },
      };
      Object.assign(where, searchMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [requests, total] = await Promise.all([
      this.prisma.consultationRequest.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.consultationRequest.count({ where }),
    ]);

    return {
      message: "Requests fetched successfully.",
      data: {
        requests,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private async notifyUser(request: ConsultationRequest) {
    const { subject, html } = await resolveEmailTemplate({
      purpose: "consultationRequest",
      consultationRequest: request,
    });

    await this.notify.sendEmail(request.email, subject, html);
  }
}
