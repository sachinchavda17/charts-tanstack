import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { data } from "@/data";

import { useCallback } from "react";
import { format } from "date-fns";

export default function LineChartCompo() {
  const formatTimestamp = useCallback(
    (timestamp) => format(new Date(timestamp * 1000), "HH:mm:ss"),
    []
  );
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            // syncId="anyId"
          >
            <Line
              dataKey="bandwidth"
              type="monotone"
              name="Bandwidth"
              dot={false}
              stroke="#1447e6"
            />
            {/* <Brush /> */}

            <Line
              dataKey="transmit"
              type="monotone"
              name="Transmit"
              dot={false}
              stroke="#fb2c36"
            />
            <Line
              dataKey="transmit"
              type="receive"
              name="Receive"
              dot={false}
              stroke="#00a63e"
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} />
            <YAxis />
            <Tooltip labelFormatter={formatTimestamp} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
