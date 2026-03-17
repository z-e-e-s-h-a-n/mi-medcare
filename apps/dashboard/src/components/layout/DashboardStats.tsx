import { Eye, FileText, Inbox, TrendingDown, TrendingUp, Users } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import type { DashboardResponse } from "@workspace/contracts/dashboard";

interface DashboardStatsProps {
  stats: DashboardResponse["stats"];
  charts: DashboardResponse["charts"];
}

const formatTrend = (value: number) => `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

const DashboardStats = ({ stats, charts }: DashboardStatsProps) => {
  const recentPostViews = charts.postViews.slice(-30);
  const previousPostViews = charts.postViews.slice(-60, -30);
  const recentLeads = charts.leads.slice(-3);
  const previousLeads = charts.leads.slice(-6, -3);

  const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
  const percentChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const publishedStatuses = charts.postStatuses.find((item) => item.label === "Published")?.value ?? 0;
  const reviewStatuses = charts.postStatuses.find((item) => item.label === "Review")?.value ?? 0;

  const postViewTrend = percentChange(
    sum(recentPostViews.map((item) => item.value)),
    sum(previousPostViews.map((item) => item.value)),
  );
  const leadTrend = percentChange(
    sum(recentLeads.map((item) => item.total)),
    sum(previousLeads.map((item) => item.total)),
  );
  const postTrend = percentChange(publishedStatuses, reviewStatuses || 1);

  const trendMeta = [
    {
      value: 0,
      label: "Team",
      helper: "Core admin and author accounts",
    },
    {
      value: postTrend,
      label: "Publishing",
      helper: `${reviewStatuses} posts currently in review`,
    },
    {
      value: postViewTrend,
      label: "Traffic",
      helper: "Compared with the previous 30 days",
    },
    {
      value: leadTrend,
      label: "Pipeline",
      helper: "Compared with the previous 3 months",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.users.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Users className="size-4" />
              {trendMeta[0].label}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            Registered dashboard users
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="size-4" />
            {trendMeta[0].helper}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Published Posts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.publishedPosts.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <FileText className="size-4" />
              {formatTrend(postTrend)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium">
            {postTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            Published versus in-review pipeline
          </div>
          <div className="text-muted-foreground">
            {trendMeta[1].helper}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Post Views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.postViews.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Eye className="size-4" />
              {formatTrend(postViewTrend)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium">
            {postViewTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            Combined post view activity
          </div>
          <div className="text-muted-foreground">
            {trendMeta[2].helper}
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Leads</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.leads.total.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Inbox className="size-4" />
              {formatTrend(leadTrend)}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium">
            {leadTrend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
            {stats.leads.contactMessages} contact,{" "}
            {stats.leads.consultationRequests} consultations,{" "}
            {stats.leads.newsletterSubscribers} newsletter
          </div>
          <div className="text-muted-foreground">
            {trendMeta[3].helper}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardStats;
