import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

const data = [
  { diagnosis: "Hypertension", count: 1840 },
  { diagnosis: "Diabetes", count: 1520 },
  { diagnosis: "Cardiac", count: 980 },
  { diagnosis: "Respiratory", count: 860 },
  { diagnosis: "Ortho", count: 740 },
  { diagnosis: "Neurological", count: 620 },
];

export function DiagnosisChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Diagnoses</CardTitle>
        <CardDescription>Most common conditions this year</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" className="text-xs" />
            <YAxis dataKey="diagnosis" type="category" className="text-xs" width={90} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} name="Patients" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}