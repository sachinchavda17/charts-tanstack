import TopologyCompo from "@/components/TopologyCompo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Topology() {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Topology</CardTitle>
        </CardHeader>
        <CardContent>
            <TopologyCompo/>
        </CardContent>
      </Card>
    </div>
  );
}
