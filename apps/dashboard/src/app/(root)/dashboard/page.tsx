"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  FileText,
  History,
  LogIn,
  LogOut,
  Mail,
  MessageSquareMore,
  Newspaper,
  PencilLine,
  Plus,
  RefreshCcw,
  Trash2,
} from "lucide-react";

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

const leadIconMap = {
  contactMessage: Mail,
  consultationRequest: MessageSquareMore,
  newsletterSubscriber: Newspaper,
} as const;

const auditActionIconMap = {
  create: Plus,
  update: PencilLine,
  delete: Trash2,
  login: LogIn,
  logout: LogOut,
  statusChange: RefreshCcw,
} as const;

const getAuditSummary = (meta: unknown) => {
  if (!meta || typeof meta !== "object" || !("summary" in meta)) {
    return "Tracked dashboard activity";
  }

  return typeof meta.summary === "string"
    ? meta.summary
    : "Tracked dashboard activity";
};

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

      <div className="grid gap-6 px-4 lg:px-6 xl:grid-cols-2">
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
            {data.recentAuditLogs.map((log) => {
              const ActionIcon = auditActionIconMap[log.action];

              return (
                <Link
                  key={log.id}
                  href={`/admin/audit-logs/${log.id}`}
                  className="group block rounded-2xl border bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <ActionIcon className="size-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {log.action}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {log.entityType}
                          </span>
                        </div>
                        <p className="mt-2 font-medium">
                          {log.user?.displayName ?? "System"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(log.createdAt)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed px-3 py-2 text-sm">
                    <span className="text-muted-foreground">
                      {getAuditSummary(log.meta)}
                    </span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
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
            {data.recentLeads.map((lead) => {
              const LeadIcon = leadIconMap[lead.type];

              return (
                <Link
                  key={`${lead.type}-${lead.id}`}
                  href={`${leadHrefMap[lead.type]}/${lead.id}`}
                  className="group block rounded-2xl border bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-secondary/70 text-foreground">
                        <LeadIcon className="size-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{leadLabelMap[lead.type]}</Badge>
                          <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            {lead.status}
                          </span>
                        </div>
                        <p className="mt-2 font-medium">{lead.title}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(lead.createdAt)}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed px-3 py-2 text-sm">
                    <span className="text-muted-foreground">{lead.subtitle}</span>
                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="px-4 lg:px-6">
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
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-4">
              {data.topPerformingPosts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/admin/content/posts/${post.id}`}
                  className="group block rounded-2xl border bg-card/70 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
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
            </div>

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
