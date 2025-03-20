"use client";

import LineChartCompo from "@/components/LineChartCompo";
import AreaChartCompo from "@/components/AreaChartCompo";
import AreaCompo from "@/components/AreaCompo";
import { AreaChartIntractive } from "@/components/AreaChartIntractive";
import { AreaChartNew } from "@/components/AreaChartNew";

export default function Home() {
  return (
    <div className="flex items-center justify-center mt-5 flex-col gap-10">
      <LineChartCompo />
      <AreaChartCompo />
      <AreaCompo />
      <AreaChartIntractive/>
      <AreaChartNew/>
    </div>
  );
}
