import D3Compo from "@/components/D3Compo";
import ForceGraph from "@/components/ForceGraph";
import ForceGraph3DComponent from "@/components/ForceGraph3DComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Graph() {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Force Graph</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <D3Compo/> */}
          {/* <ForceGraph3DComponent/> */}
          <ForceGraph />
        </CardContent>
      </Card>
    </div>
  );
}
