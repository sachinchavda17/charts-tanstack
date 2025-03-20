"use client";

import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { data } from "@/data";
import { useCallback, useState } from "react";
import { format } from "date-fns";

const chartConfig = {
  transmit: {
    label: "Transmit",
    color: "oklch(0.488 0.243 264.376)",
  },
  bandwidth: {
    label: "Bandwidth",
    color: "oklch(0.527 0.154 150.069)",
  },
  receive: {
    label: "Receive",
    color: "oklch(0.446 0.043 257.281)",
  },
};

export default function Component() {
  const formatTimestamp = useCallback(
    (timestamp) => format(new Date(timestamp * 1000), "HH:mm"),
    []
  );
  const [activeKeys, setActiveKeys] = useState([
    "bandwidth",
    "transmit",
    "receive",
  ]);

  const handleLegendClick = (key) => {
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

  return (
    <Card className={"w-2/3"}>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatTimestamp}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Area
              dataKey="bandwidth"
              type="natural"
              fill="var(--color-bandwidth)"
              fillOpacity={activeKeys.includes("bandwidth") ? 0.4 : 0}
              stroke={
                activeKeys.includes("bandwidth") ? "var(--color-bandwidth)" : ""
              }
              className="z-10"
            />

            <Area
              dataKey="transmit"
              type="natural"
              fill="var(--color-transmit)"
              fillOpacity={activeKeys.includes("transmit") ? 0.4 : 0}
              stroke={
                activeKeys.includes("transmit") ? "var(--color-transmit)" : ""
              }
              className="z-20"
            />
            <Area
              dataKey="receive"
              type="natural"
              fill="var(--color-receive)"
              fillOpacity={activeKeys.includes("receive") ? 0.4 : 0}
              stroke={
                activeKeys.includes("receive") ? "var(--color-receive)" : ""
              }
              className="z-30"
            />
            <YAxis />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="square"
              iconSize={12}
              wrapperStyle={{
                fontSize: "14px",
                marginLeft: "60px",
                padding: "15px",
              }}
              onClick={(e) => handleLegendClick(e.dataKey)}
            />
            <Brush
              dataKey="timestamp"
              height={40}
              stroke="#8884d8"
              fill="rgba(136, 132, 216, 0.2)"
              tickFormatter={(value) => format(new Date(value * 1000), "HH:mm")}
            >
              <LineChart data={data}>
                <Line
                  dataKey="bandwidth"
                  type="monotone"
                  fill="var(--color-bandwidth)"
                  stroke="var(--color-bandwidth)"
                  dot={false}
                  yAxis={false}
                />
              </LineChart>
            </Brush>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
