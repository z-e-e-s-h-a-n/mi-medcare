import { Controller, Get } from "@nestjs/common";

import { DashboardService } from "./dashboard.service";
import { Roles } from "@/decorators/roles.decorator";

@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles("admin", "author", "editor")
  @Get()
  async getOverview() {
    return this.dashboardService.getOverview();
  }
}
