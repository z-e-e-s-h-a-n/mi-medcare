"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BellRing,
  FileText,
  MessageSquareMore,
  Route,
  Send,
  Users,
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
import { cn } from "@workspace/ui/lib/utils";
import { useAdminUsers } from "@/hooks/admin";
import { usePosts } from "@/hooks/content";
import {
  useContactMessages,
  useConsultationRequests,
  useNewsletterSubscribers,
} from "@/hooks/lead";
import { useNotifications, getUnreadNotificationsCount } from "@/hooks/notification";
import { useTrafficSources } from "@/hooks/traffic";

type ActivityEntry = {
  label: string;
  total: number;
};

const formatMonthKey = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    year: "2-digit",
  });

const buildMonthlyActivity = (dates: string[]) => {
  const monthKeys = Array.from({ length: 6 }).map((_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    return date.toLocaleDateString(undefined, {
      month: "short",
      year: "2-digit",
    });
  });

  const bucket = new Map(monthKeys.map((key) => [key, 0]));

  dates.forEach((value) => {
    const key = formatMonthKey(value);
    if (bucket.has(key)) {
      bucket.set(key, (bucket.get(key) ?? 0) + 1);
    }
  });

  return Array.from(bucket.entries()).map(([label, total]) => ({ label, total }));
};

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const StatCard = ({
  title,
  value,
  description,
  href,
  icon: Icon,
  tone = "default",
}: {
  title: string;
  value: number;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "default" | "warning";
}) => (
  <Card
    className={cn(
      "border-border/60 bg-linear-to-br from-card to-card shadow-xs",
      tone === "warning" && "border-amber-200 from-amber-50/70",
    )}
  >
    <CardHeader className="flex flex-row items-start justify-between space-y-0">
      <div className="space-y-1">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </div>
      <div className="rounded-xl border bg-background p-2">
        <Icon className="size-5" />
      </div>
    </CardHeader>
    <CardContent className="flex items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">{description}</p>
      <Button variant="ghost" size="sm" asChild>
        <Link href={href}>
          View
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const ActivityChart = ({ data }: { data: ActivityEntry[] }) => {
  const max = Math.max(...data.map((item) => item.total), 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-3">
        {data.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-3">
            <div className="flex h-44 w-full items-end rounded-xl bg-muted/30 p-2">
              <div
                className="w-full rounded-lg bg-linear-to-t from-primary to-primary/50 transition-all"
                style={{
                  height: `${Math.max((item.total / max) * 100, item.total ? 14 : 0)}%`,
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const users = useAdminUsers({ page: 1, limit: 5, sortBy: "createdAt" });
  const posts = usePosts({ page: 1, limit: 5, sortBy: "createdAt" });
  const contactMessages = useContactMessages({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
  });
  const consultationRequests = useConsultationRequests({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
  });
  const newsletterSubscribers = useNewsletterSubscribers({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
  });
  const trafficSources = useTrafficSources({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
  });
  const notifications = useNotifications();

  const isLoading =
    users.isLoading ||
    posts.isLoading ||
    contactMessages.isLoading ||
    consultationRequests.isLoading ||
    newsletterSubscribers.isLoading ||
    trafficSources.isLoading ||
    notifications.isLoading;

  const monthlyActivity = buildMonthlyActivity([
    ...(contactMessages.data?.messages ?? []).map((item) => item.createdAt),
    ...(consultationRequests.data?.requests ?? []).map((item) => item.createdAt),
    ...(newsletterSubscribers.data?.subscribers ?? []).map(
      (item) => item.createdAt,
    ),
  ]);

  const recentLeadItems = [
    ...(contactMessages.data?.messages ?? []).map((item) => ({
      id: item.id,
      title: item.fullName,
      subtitle: item.email,
      status: item.status,
      createdAt: item.createdAt,
      href: `/admin/leads/messages/${item.id}`,
      type: "Contact",
    })),
    ...(consultationRequests.data?.requests ?? []).map((item) => ({
      id: item.id,
      title: item.fullName,
      subtitle: item.practiceName,
      status: item.status,
      createdAt: item.createdAt,
      href: `/admin/leads/requests/${item.id}`,
      type: "Consultation",
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Operations Overview</h1>
          <p className="text-muted-foreground">
            Monitor leads, content, traffic, users, and system activity from one
            place.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/leads/requests">Review Leads</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/content/posts/new">Create Post</Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Users"
            value={users.data?.total ?? 0}
            description="Total managed users in the system."
            href="/admin/users"
            icon={Users}
          />
          <StatCard
            title="Published Content"
            value={posts.data?.total ?? 0}
            description="Posts currently available across the CMS."
            href="/admin/content/posts"
            icon={FileText}
          />
          <StatCard
            title="Contact Messages"
            value={contactMessages.data?.total ?? 0}
            description="Inbound contact inquiries waiting for review."
            href="/admin/leads/messages"
            icon={MessageSquareMore}
          />
          <StatCard
            title="Consultation Requests"
            value={consultationRequests.data?.total ?? 0}
            description="Practices requesting billing support."
            href="/admin/leads/requests"
            icon={Send}
          />
          <StatCard
            title="Newsletter Subscribers"
            value={newsletterSubscribers.data?.total ?? 0}
            description="Current newsletter audience captured from the site."
            href="/admin/leads/subscribers"
            icon={BellRing}
          />
          <StatCard
            title="Traffic Sources"
            value={trafficSources.data?.total ?? 0}
            description="Tracked referral and campaign sources."
            href="/admin/traffic-sources"
            icon={Route}
          />
          <StatCard
            title="Notifications"
            value={notifications.data?.length ?? 0}
            description="System-generated account and security notifications."
            href="/notifications"
            icon={BellRing}
          />
          <StatCard
            title="Unread Alerts"
            value={getUnreadNotificationsCount(notifications.data)}
            description="Notifications that still need admin attention."
            href="/notifications"
            icon={Activity}
            tone="warning"
          />
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Lead Activity</CardTitle>
            <CardDescription>
              New contact, consultation, and newsletter activity over the last
              six months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityChart data={monthlyActivity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump into the highest-traffic admin workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {[
              { href: "/admin/leads/messages", label: "Review Contact Messages" },
              { href: "/admin/leads/requests", label: "Review Consultations" },
              { href: "/admin/users/new", label: "Create Admin User" },
              { href: "/settings", label: "Update Business Profile" },
              { href: "/media", label: "Manage Media Library" },
            ].map((item) => (
              <Button
                key={item.href}
                variant="outline"
                className="justify-between"
                asChild
              >
                <Link href={item.href}>
                  {item.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent Lead Activity</CardTitle>
            <CardDescription>
              The latest inbound leads across contact and consultation forms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentLeadItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No lead activity yet.
              </p>
            ) : (
              recentLeadItems.map((item) => (
                <Link
                  key={`${item.type}-${item.id}`}
                  href={item.href}
                  className="flex flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-medium">{item.title}</p>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <Badge variant="secondary" className="capitalize">
                      {item.status}
                    </Badge>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Unread notifications are highlighted for quick follow-up.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {(notifications.data ?? []).slice(0, 5).map((item) => (
              <Link
                key={item.id}
                href="/notifications"
                className={cn(
                  "block rounded-xl border p-4 transition-colors hover:bg-muted/40",
                  !item.viewedAt && "border-primary/30 bg-primary/5",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="line-clamp-1 font-medium">{item.subject}</p>
                  {!item.viewedAt && <Badge>New</Badge>}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {item.message}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDate(item.createdAt)}
                </p>
              </Link>
            ))}
            {!notifications.data?.length && (
              <p className="text-sm text-muted-foreground">
                No notifications available.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
