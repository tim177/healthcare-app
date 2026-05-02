"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useIsMobile } from "~/hooks/use-mobile";

const chartData = [
  { date: "2024-04-01", admissions: 18, discharges: 14 },
  { date: "2024-04-05", admissions: 22, discharges: 17 },
  { date: "2024-04-10", admissions: 31, discharges: 24 },
  { date: "2024-04-15", admissions: 27, discharges: 22 },
  { date: "2024-04-20", admissions: 35, discharges: 29 },
  { date: "2024-04-25", admissions: 28, discharges: 25 },
  { date: "2024-04-30", admissions: 40, discharges: 33 },
  { date: "2024-05-05", admissions: 33, discharges: 28 },
  { date: "2024-05-10", admissions: 29, discharges: 24 },
  { date: "2024-05-15", admissions: 38, discharges: 31 },
  { date: "2024-05-20", admissions: 42, discharges: 36 },
  { date: "2024-05-25", admissions: 36, discharges: 30 },
  { date: "2024-05-31", admissions: 45, discharges: 38 },
  { date: "2024-06-05", admissions: 39, discharges: 33 },
  { date: "2024-06-10", admissions: 34, discharges: 28 },
  { date: "2024-06-15", admissions: 48, discharges: 41 },
  { date: "2024-06-20", admissions: 52, discharges: 44 },
  { date: "2024-06-25", admissions: 44, discharges: 39 },
  { date: "2024-06-30", admissions: 50, discharges: 43 },
];

const chartConfig = {
  admissions: {
    label: "Admissions",
    color: "var(--primary)",
  },
  discharges: {
    label: "Discharges",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d");
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    const daysToSubtract =
      timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Patient Admissions vs Discharges</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Tracking patient flow over the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
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
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillAdmissions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-admissions)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-admissions)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDischarges" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-discharges)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-discharges)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="discharges"
              type="natural"
              fill="url(#fillDischarges)"
              stroke="var(--color-discharges)"
              stackId="a"
            />
            <Area
              dataKey="admissions"
              type="natural"
              fill="url(#fillAdmissions)"
              stroke="var(--color-admissions)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
