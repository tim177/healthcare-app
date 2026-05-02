import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";

const data = [
  { month: "Jan", admitted: 320, discharged: 280, outpatient: 540 },
  { month: "Feb", admitted: 380, discharged: 350, outpatient: 620 },
  { month: "Mar", admitted: 410, discharged: 390, outpatient: 580 },
  { month: "Apr", admitted: 360, discharged: 340, outpatient: 700 },
  { month: "May", admitted: 450, discharged: 420, outpatient: 750 },
  { month: "Jun", admitted: 490, discharged: 460, outpatient: 810 },
  { month: "Jul", admitted: 520, discharged: 500, outpatient: 870 },
];

export function PatientTrendsChart() {
  return (
    <Card className="px-4 lg:px-6 mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Patient Trends</CardTitle>
        <CardDescription>Admitted vs discharged vs outpatient — last 7 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="admitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="discharged" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outpatient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip />
            <Area type="monotone" dataKey="admitted" stroke="#6366f1" fill="url(#admitted)" name="Admitted" />
            <Area type="monotone" dataKey="discharged" stroke="#22c55e" fill="url(#discharged)" name="Discharged" />
            <Area type="monotone" dataKey="outpatient" stroke="#f59e0b" fill="url(#outpatient)" name="Outpatient" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}