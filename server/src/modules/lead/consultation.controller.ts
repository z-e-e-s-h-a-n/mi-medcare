import type { Request } from "express";
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Put,
  Req,
} from "@nestjs/common";
import { ConsultationService } from "./consultation.service";
import { Public } from "@/decorators/public.decorator";
import { Roles } from "@/decorators/roles.decorator";
import {
  CreateConsultationRequestDto,
  ConsultationRequestQueryDto,
  UpdateConsultationRequestDto,
} from "@workspace/contracts/consultation";

@Controller("consultation")
export class ConsultationController {
  constructor(private readonly service: ConsultationService) {}

  @Public()
  @Post()
  async createRequest(
    @Body() dto: CreateConsultationRequestDto,
    @Req() req: Request,
  ) {
    return this.service.createRequest(dto, req);
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

  @Roles("admin")
  @Put(":id")
  async updateRequest(
    @Param("id") id: string,
    @Body() dto: UpdateConsultationRequestDto,
  ) {
    return this.service.updateRequest(id, dto);
  }
}
