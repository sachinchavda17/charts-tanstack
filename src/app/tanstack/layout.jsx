import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TanStackLayout({children}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tan Stack</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
