import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";
import type { NewsletterSubscriberWhereInput } from "prisma/generated/models";
import { resolveEmailTemplate } from "@workspace/templates";
import { NotificationService } from "@/modules/notification/notification.service";
import type { NewsletterSubscriber } from "@generated/prisma";

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notify: NotificationService,
  ) {}

  async subscribe(dto: NewsletterSubscriberDto) {
    const user = await this.prisma.newsletterSubscriber.upsert({
      where: { email: dto.email },
      create: dto,
      update: dto,
    });

    await this.notifyUser(user);

    return { message: "Subscribed successfully.", data: user };
  }

  async unsubscribe({ email }: NewsletterUnSubscriberDto) {
    const user = await this.prisma.newsletterSubscriber.update({
      where: { email },
      data: { isActive: false, unsubscribedAt: new Date() },
    });

    await this.notifyUser(user);

    return { message: "Unsubscribed successfully.", data: user };
  }

  async list(query: NewsletterSubscriberQueryDto) {
    const { page, limit, searchBy, search, sortBy, sortOrder } = query;

    const where: NewsletterSubscriberWhereInput = {};
    if (query.isActive) where.isActive = query.isActive;

    if (search && searchBy) {
      const searchWhereMap: Record<
        typeof searchBy,
        NewsletterSubscriberWhereInput
      > = {
        email: {
          email: { contains: search, mode: "insensitive" },
        },
        name: {
          name: { contains: search, mode: "insensitive" },
        },
      };
      Object.assign(where, searchWhereMap[searchBy]);
    }

    const skip = (page - 1) * limit;
    const orderBy = { [sortBy]: sortOrder };

    const [users, total] = await Promise.all([
      this.prisma.newsletterSubscriber.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.newsletterSubscriber.count({ where }),
    ]);

    return {
      message: "Subscribers fetched successfully.",
      data: {
        users,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  private async notifyUser(newsletterSubscriber: NewsletterSubscriber) {
    const { subject, html } = await resolveEmailTemplate({
      purpose: "newsletter",
      newsletterSubscriber,
    });

    await this.notify.sendEmail(newsletterSubscriber.email, subject, html);
  }
}
