import { dashboardService } from "@lib/dashboard/dashboard.service";
import { withApiHandler } from "@lib/http/api-handler";

export const GET = withApiHandler(async () => {
  return await dashboardService.getDashboardData();
});
