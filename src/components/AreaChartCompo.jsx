import {
  Area,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { data } from "@/data";
import { formatTimestamp } from "@/utils/helper";

export default function AreaChartCompo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            accessibilityLayer
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            syncId="area0"
          >
            {/* ✅ Corrected the 'Receive' Area Data Key */}
            <Area
              dataKey="bandwidth"
              type="monotone"
              name="Bandwidth"
              dot={false}
              stroke="#1447e6"
              fill="#155dfc"
            />
            <Area
              dataKey="transmit"
              name="Transmit"
              type="monotone"
              dot={false}
              stroke="#fb2c36"
              fill="#ff6467"
            />
            <Area
              dataKey="receive" // ✅ Fixed 'Receive' data key
              type="monotone"
              name="Receive"
              dot={false}
              stroke="#00a63e"
              fill="#00c950"
            />

            <XAxis
              dataKey="timestamp"
              tickFormatter={(value) => formatTimestamp(value, "time")}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip labelFormatter={(value) => formatTimestamp(value, "both")} /> 
            <Legend />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
