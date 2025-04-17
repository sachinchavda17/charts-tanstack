"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { data } from "@/data";
import { format } from "date-fns";

const chartConfig = {
  bandwidth: {
    label: "Bandwidth",
    color: "oklch(0.546 0.245 262.881)",
  },
};

export function AreaChartNew() {
  const [timeRange, setTimeRange] = React.useState("1h");

  const filteredData = React.useMemo(() => {
    const lastTimestamp = data[data.length - 1].timestamp;
    let timeLimit;
    if (timeRange === "6h") {
      timeLimit = lastTimestamp - 6 * 60 * 60; // 6 hours ago
    } else if (timeRange === "3h") {
      timeLimit = lastTimestamp - 3 * 60 * 60; // 3 hours ago
    } else if (timeRange === "1h") {
      timeLimit = lastTimestamp - 1 * 60 * 60; // 1 hour ago
    }
    return data.filter((item) => item.timestamp >= timeLimit);
  }, [timeRange]);

  const timeRangeLabel = {
    "6h": "the last 6 hours",
    "3h": "the last 3 hours",
    "1h": "the last hour",
  }[timeRange];

  return (
    <Card className={"w-full"}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
              Showing total visitors for {timeRangeLabel}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 6 hours" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="6h" className="rounded-lg">
              Last 6 hours
            </SelectItem>
            <SelectItem value="3h" className="rounded-lg">
              Last 3 hours
            </SelectItem>
            <SelectItem value="1h" className="rounded-lg">
              Last 1 hour
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillBandwidth" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#1447e6" stopOpacity={0.05} />
                  <stop offset="30%" stopColor="#1447e6" stopOpacity={0.9} />
                  <stop offset="70%" stopColor="#1447e6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1447e6" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) =>
                  new Date(value * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />

              <Area
                dataKey="bandwidth"
                type="monotone"
                fill="url(#fillBandwidth)"
                stroke="#1447e6"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
