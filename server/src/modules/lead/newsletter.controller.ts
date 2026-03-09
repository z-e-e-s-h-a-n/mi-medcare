import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { NewsletterService } from "./newsletter.service";
import {
  NewsletterSubscriberDto,
  NewsletterUnSubscriberDto,
  NewsletterSubscriberQueryDto,
} from "@workspace/contracts/newsletter";

@Controller("newsletter")
export class NewsletterController {
  constructor(private readonly service: NewsletterService) {}

  @Post("subscribe")
  async subscribe(@Body() dto: NewsletterSubscriberDto) {
    return this.service.subscribe(dto);
  }

  @Post("unsubscribe")
  async unsubscribe(@Body() dto: NewsletterUnSubscriberDto) {
    return this.service.unsubscribe(dto);
  }

  @Get()
  async list(@Query() query: NewsletterSubscriberQueryDto) {
    return this.service.list(query);
  }
}
