"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@components/ui/toggle-group";

interface VisitorsChartProps {
  data: DashboardData["visitors"];
}

const chartConfig = {
  views: {
    label: "Post Views",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const ChartAreaInteractive = ({ data }: VisitorsChartProps) => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const filteredData = React.useMemo(() => {
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;

    return data.slice(-days);
  }, [data, timeRange]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Post Views</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Views across published posts
          </span>
          <span className="@[540px]/card:hidden">Post views</span>
        </CardDescription>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(v: string) =>
                    new Date(v).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />

            <Area
              dataKey="views"
              type="natural"
              fill="url(#fillViews)"
              stroke="var(--color-views)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartAreaInteractive;
