"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import DashboardChart from "@/components/layout/DashboardChart";
import ContentOverview from "@/components/layout/ContentOverview";
import DashboardStats from "@/components/layout/DashboardStats";
import { useDashboard } from "@/hooks/dashboard";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";

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

const leadTabConfig = [
  {
    value: "contactMessage",
    label: "Contact",
  },
  {
    value: "consultationRequest",
    label: "Consultation",
  },
  {
    value: "newsletterSubscriber",
    label: "Newsletter",
  },
] as const;

const DashboardPage = () => {
  const { data, isLoading, fetchError } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (fetchError || !data) {
    return (
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard unavailable</CardTitle>
            <CardDescription>
              {fetchError?.message ?? "Failed to load dashboard overview."}
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    );
  }

  const recentLeadsByType = {
    contactMessage: data.recentLeads.filter(
      (lead) => lead.type === "contactMessage",
    ),
    consultationRequest: data.recentLeads.filter(
      (lead) => lead.type === "consultationRequest",
    ),
    newsletterSubscriber: data.recentLeads.filter(
      (lead) => lead.type === "newsletterSubscriber",
    ),
  } as const;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 ">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track posts, leads, users, and audit activity from one operational
            overview.
          </p>
        </div>
      </div>

      <DashboardStats stats={data.stats} charts={data.charts} />

      <div>
        <DashboardChart charts={data.charts} />
      </div>

      <div className="grid gap-6 ">
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
          <CardContent>
            <Tabs defaultValue="contactMessage" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                {leadTabConfig.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {leadTabConfig.map((tab) => {
                const leads = recentLeadsByType[tab.value];

                return (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="space-y-3"
                  >
                    {leads.length ? (
                      leads.map((lead) => {
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
                                    <Badge variant="outline">
                                      {leadLabelMap[lead.type]}
                                    </Badge>
                                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                                      {lead.status}
                                    </span>
                                  </div>
                                  <p className="mt-2 font-medium">
                                    {lead.title}
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(lead.createdAt)}
                              </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed px-3 py-2 text-sm">
                              <span className="text-muted-foreground">
                                {lead.subtitle}
                              </span>
                              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <div className="rounded-2xl border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
                        No recent {tab.label.toLowerCase()} leads yet.
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div>
        <ContentOverview data={data.contentOverview} />
      </div>
    </section>
  );
};

export default DashboardPage;
