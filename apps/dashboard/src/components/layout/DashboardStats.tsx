import { Eye, FileText, Inbox, Users } from "lucide-react";

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
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
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
              Team
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            Registered dashboard users
          </div>
          <div className="text-muted-foreground">
            Includes admins, editors, and authors
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
              Live
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            Posts currently published
          </div>
          <div className="text-muted-foreground">
            Main live content across the website
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
              Tracked
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            Combined post view activity
          </div>
          <div className="text-muted-foreground">
            Useful for spotting top-performing posts
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
              Pipeline
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            {stats.leads.contactMessages} contact,{" "}
            {stats.leads.consultationRequests} consultations,{" "}
            {stats.leads.newsletterSubscribers} newsletter
          </div>
          <div className="text-muted-foreground">
            Combined lead intake across all public forms
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DashboardStats;
