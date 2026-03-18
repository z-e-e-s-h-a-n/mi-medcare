"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardResponse } from "@workspace/contracts/dashboard";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group";

const postViewsChartConfig = {
  value: {
    label: "Post Views",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const leadsChartConfig = {
  contactMessages: {
    label: "Contact",
    color: "var(--chart-1)",
  },
  consultationRequests: {
    label: "Consultations",
    color: "var(--chart-2)",
  },
  newsletterSubscribers: {
    label: "Newsletter",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const statusColors = ["var(--chart-1)", "var(--chart-2)"];
const postStatusChartConfig = {
  Published: {
    label: "Published",
    color: "var(--chart-1)",
  },
  Draft: {
    label: "Draft",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface DashboardChartProps {
  charts: DashboardResponse["charts"];
}

const DashboardChart = ({ charts }: DashboardChartProps) => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d");
    }
  }, [isMobile]);

  const filteredPostViews = charts.postViews.slice(
    timeRange === "7d" ? -7 : timeRange === "30d" ? -30 : -90,
  );

  return (
    <div className="space-y-6">
      <Card className="@container/card xl:row-span-2">
        <CardHeader>
          <CardTitle>Post Views Trend</CardTitle>
          <CardDescription>
            Daily post-view activity tracked from the backend.
          </CardDescription>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={(value) => value && setTimeRange(value)}
              variant="outline"
              className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
            >
              <ToggleGroupItem value="90d">Last 90 days</ToggleGroupItem>
              <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
              <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="flex w-40 @[767px]/card:hidden"
                size="sm"
                aria-label="Select a time range"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  Last 90 days
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  Last 30 days
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  Last 7 days
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={postViewsChartConfig}
            className="aspect-auto h-80 w-full"
          >
            <AreaChart accessibilityLayer data={filteredPostViews}>
              <defs>
                <linearGradient id="fillPostViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-value)"
                    stopOpacity={0.12}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="min-w-40"
                    nameKey="value"
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="value"
                type="monotone"
                fill="url(#fillPostViews)"
                stroke="var(--color-value)"
                strokeWidth={2}
                activeDot={{ r: 4 }}
              />
              <ChartLegend
                content={<ChartLegendContent />}
                verticalAlign="top"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Intake</CardTitle>
            <CardDescription>
              Contact, consultation, and newsletter lead flow over the last six
              months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={leadsChartConfig}
              className="aspect-auto h-72 w-full"
            >
              <BarChart accessibilityLayer data={charts.leads}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      className="min-w-44"
                      indicator="dashed"
                      labelFormatter={(value) => `Month: ${value}`}
                    />
                  }
                />
                <Bar
                  dataKey="contactMessages"
                  stackId="leads"
                  fill="var(--color-contactMessages)"
                  radius={[0, 0, 6, 6]}
                />
                <Bar
                  dataKey="consultationRequests"
                  stackId="leads"
                  fill="var(--color-consultationRequests)"
                />
                <Bar
                  dataKey="newsletterSubscribers"
                  stackId="leads"
                  fill="var(--color-newsletterSubscribers)"
                  radius={[6, 6, 0, 0]}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post Status Mix</CardTitle>
            <CardDescription>
              Snapshot of draft and published posts.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ChartContainer
              config={postStatusChartConfig}
              className="aspect-auto h-56 w-full"
            >
              <PieChart accessibilityLayer>
                <ChartTooltip
                  content={<ChartTooltipContent hideLabel nameKey="label" />}
                />
                <Pie
                  data={charts.postStatuses}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={55}
                  outerRadius={86}
                  paddingAngle={4}
                >
                  {charts.postStatuses.map((entry) => (
                    <Cell
                      key={entry.label}
                      fill={`var(--color-${entry.label})`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="grid gap-3">
              {charts.postStatuses.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          statusColors[index % statusColors.length],
                      }}
                    />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardChart;
