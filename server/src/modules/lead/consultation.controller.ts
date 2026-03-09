import { Controller, Post, Body, Get, Param, Query } from "@nestjs/common";
import { ConsultationService } from "./consultation.service";
import { Public } from "@/decorators/public.decorator";
import { Roles } from "@/decorators/roles.decorator";
import {
  CreateConsultationRequestDto,
  ConsultationRequestQueryDto,
} from "@workspace/contracts/consultation";

@Controller("consultation")
export class ConsultationController {
  constructor(private readonly service: ConsultationService) {}

  @Public()
  @Post()
  async createRequest(@Body() dto: CreateConsultationRequestDto) {
    return this.service.createRequest(dto);
  }

  @Roles("admin")
  @Get()
  async queryRequests(@Query() query: ConsultationRequestQueryDto) {
    return this.service.queryRequests(query);
  }

  @Roles("admin")
  @Get(":id")
  async getRequest(@Param("id") id: string) {
    return this.service.getRequest(id);
  }
}
