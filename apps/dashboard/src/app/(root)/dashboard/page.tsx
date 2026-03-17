"use client";

import Link from "next/link";
import { ArrowRight, Clock3, FileText, History } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Skeleton } from "@workspace/ui/components/skeleton";
import DashboardChart from "@/components/layout/DashboardChart";
import DashboardStats from "@/components/layout/DashboardStats";
import { useDashboard } from "@/hooks/dashboard";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const leadHrefMap = {
  contactMessage: "/admin/leads/messages",
  consultationRequest: "/admin/leads/requests",
  newsletterSubscriber: "/admin/leads/subscribers",
} as const;

const leadLabelMap = {
  contactMessage: "Contact",
  consultationRequest: "Consultation",
  newsletterSubscriber: "Newsletter",
} as const;

const DashboardPage = () => {
  const { data, isLoading, fetchError } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-104 rounded-2xl" />
        <div className="grid gap-6 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-96 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  if (fetchError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard unavailable</CardTitle>
          <CardDescription>
            {fetchError?.message ?? "Failed to load dashboard overview."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track posts, leads, users, and audit activity from one operational
            overview.
          </p>
        </div>
      </div>

      <DashboardStats stats={data.stats} charts={data.charts} />

      <div className="px-4 lg:px-6">
        <DashboardChart charts={data.charts} />
      </div>

      <div className="grid gap-6 px-4 lg:px-6 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="size-5" />
              Recent Audit Logs
            </CardTitle>
            <CardDescription>
              Latest tracked admin and content activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentAuditLogs.map((log) => (
              <Link
                key={log.id}
                href={`/admin/audit-logs/${log.id}`}
                className="block rounded-xl border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline" className="capitalize">
                    {log.action}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(log.createdAt)}
                  </span>
                </div>
                <p className="mt-2 font-medium">{log.entityType}</p>
                <p className="text-sm text-muted-foreground">
                  {log.user?.displayName ?? "System"} • {log.entityId}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock3 className="size-5" />
              Recent Leads
            </CardTitle>
            <CardDescription>
              Latest inbound contact, consultation, and newsletter activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.recentLeads.map((lead) => (
              <Link
                key={`${lead.type}-${lead.id}`}
                href={`${leadHrefMap[lead.type]}/${lead.id}`}
                className="block rounded-xl border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline">{leadLabelMap[lead.type]}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </span>
                </div>
                <p className="mt-2 font-medium">{lead.title}</p>
                <p className="text-sm text-muted-foreground">{lead.subtitle}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                  {lead.status}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              Top Performing Posts
            </CardTitle>
            <CardDescription>
              Posts with the strongest view performance right now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.topPerformingPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/admin/content/posts/${post.id}`}
                className="block rounded-xl border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">#{index + 1}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.viewsCount.toLocaleString()} views
                  </span>
                </div>
                <p className="mt-2 font-medium">{post.title}</p>
                <p className="text-sm text-muted-foreground">
                  {post.categoryName} • {post.authorName}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {post.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {post.publishedAt
                      ? formatDate(post.publishedAt)
                      : "Unpublished"}
                  </span>
                </div>
              </Link>
            ))}

            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <Link href="/admin/content/posts">
                View all posts
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
