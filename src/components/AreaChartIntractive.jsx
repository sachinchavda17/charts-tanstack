import * as React from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
import { bandwidth } from "@/bandwidth";
import moment from "moment";

const chartConfig = {
  bandwidth: {
    label: "Bandwidth",
    color: "oklch(0.546 0.245 262.881)",
  },
  transmit: {
    label: "Transmit",
    color: "oklch(0.577 0.245 27.325)",
  },
  receive: {
    label: "Receive",
    color: "oklch(0.648 0.2 131.684)",
  },
};

export function AreaChartIntractive() {
  const [timeRange, setTimeRange] = React.useState("1h");
  const [activeKeys, setActiveKeys] = React.useState([
    "bandwidth",
    "transmit",
    "receive",
  ]);
  const handleLegendClick = (key) => {
    console.log("clicked");
    setActiveKeys((prev) => {
      if (prev.includes(key)) {
        const updateKeys = prev.filter((item) => item !== key);
        return updateKeys.length === 0
          ? ["bandwidth", "transmit", "receive"]
          : updateKeys;
      }
      return [...prev, key];
    });
  };

  const filteredData = () => {
    const lastTimestamp = bandwidth[bandwidth.length - 1].timestamp;
    let timeLimit;
    if (timeRange === "6h") {
      timeLimit = lastTimestamp - 6 * 60 * 60; // 6 hours ago
    } else if (timeRange === "3h") {
      timeLimit = lastTimestamp - 3 * 60 * 60; // 3 hours ago
    } else if (timeRange === "1h") {
      timeLimit = lastTimestamp - 1 * 60 * 60; // 1 hour ago
    }
    return bandwidth.filter((item) => item.timestamp >= timeLimit);
  };

  const data = filteredData();
  const timeRangeLabel = {
    "6h": "the last 6 hours",
    "3h": "the last 3 hours",
    "1h": "the last hour",
  }[timeRange];

  if (data.length === 0) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        No data available for selected range.
      </p>
    );
  }

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
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillBandwidth" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-bandwidth)"
                    stopOpacity={activeKeys.includes("bandwidth") ? 0.8 : 0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-bandwidth)"
                    stopOpacity={activeKeys.includes("bandwidth") ? 0.1 : 0}
                  />
                </linearGradient>
                <linearGradient id="fillTransmit" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-transmit)"
                    stopOpacity={activeKeys.includes("transmit") ? 0.8 : 0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-transmit)"
                    stopOpacity={activeKeys.includes("transmit") ? 0.1 : 0}
                  />
                </linearGradient>
                <linearGradient id="fillReceive" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-receive)"
                    stopOpacity={activeKeys.includes("receive") ? 0.8 : 0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-receive)"
                    stopOpacity={activeKeys.includes("receive") ? 0.1 : 0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  if (timeRange === "1h")
                    return moment.unix(value).format("HH:mm:ss");
                  return moment.unix(value).format("HH:mm");
                }}
              />
              <YAxis
                orientation="left"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="bandwidth"
                type="natural"
                fill="url(#fillBandwidth)"
                fillOpacity={activeKeys.includes("bandwidth") ? 0.4 : 0}
                stroke={
                  activeKeys.includes("bandwidth")
                    ? "var(--color-bandwidth)"
                    : ""
                }
                stackId="a"
                hide={!activeKeys.includes("bandwidth")}
              />
              <Area
                dataKey="transmit"
                type="natural"
                fill="url(#fillTransmit)"
                fillOpacity={activeKeys.includes("transmit") ? 0.4 : 0}
                stroke={
                  activeKeys.includes("transmit") ? "var(--color-transmit)" : ""
                }
                stackId="a"
                hide={!activeKeys.includes("transmit")}
              />
              <Area
                dataKey="receive"
                type="natural"
                fill="url(#fillReceive)"
                fillOpacity={activeKeys.includes("receive") ? 0.4 : 0}
                stroke={
                  activeKeys.includes("receive") ? "var(--color-receive)" : ""
                }
                stackId="a"
                hide={!activeKeys.includes("receive")}
              />
              <ChartLegend
                content={
                  <ChartLegendContent
                    onClick={(e) => handleLegendClick(e.dataKey)}
                  />
                }
              />
              <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                xAxisId="1"
                tick={{ dy: 10, fill: "#aaa" }}
                tickFormatter={(value) => moment.unix(value).format("HH:mm")}
                height={30}
                padding={{ left: 10, right: 10 }}
                interval="preserveStartEnd"
              />
              <Brush
                dataKey="timestamp"
                height={40}
                stroke="#8884d8"
                fill="rgba(136, 132, 216, 0.2)"
                tickFormatter={(value) => {
                  if (timeRange === "1h")
                    return moment.unix(value).format("HH:mm:ss");
                  return moment.unix(value).format("HH:mm");
                }}
              >
                <LineChart data={data}>
                  <Line
                    dataKey="bandwidth"
                    type="monotone"
                    fill="var(--color-bandwidth)"
                    fillOpacity={activeKeys.includes("bandwidth") ? 0.4 : 0}
                    stroke={
                      activeKeys.includes("bandwidth")
                        ? "var(--color-bandwidth)"
                        : ""
                    }
                    dot={false}
                    yAxis={false}
                  />
                  <Line
                    dataKey="transmit"
                    type="monotone"
                    fill="var(--color-transmit)"
                    fillOpacity={activeKeys.includes("transmit") ? 0.4 : 0}
                    stroke={
                      activeKeys.includes("transmit")
                        ? "var(--color-transmit)"
                        : ""
                    }
                    dot={false}
                    yAxis={false}
                  />
                  <Line
                    dataKey="receive"
                    type="monotone"
                    fill="var(--color-receive)"
                    fillOpacity={activeKeys.includes("receive") ? 0.4 : 0}
                    stroke={
                      activeKeys.includes("receive")
                        ? "var(--color-receive)"
                        : ""
                    }
                    dot={false}
                    yAxis={false}
                  />
                </LineChart>
              </Brush>
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
