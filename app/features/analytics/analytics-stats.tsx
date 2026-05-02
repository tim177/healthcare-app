import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  IconUsers,
  IconHeartbeat,
  IconCalendar,
  IconReportMedical,
} from "@tabler/icons-react";

const stats = [
  {
    title: "Total Patients",
    value: "12,486",
    change: "+8.2% this month",
    icon: IconUsers,
  },
  {
    title: "Avg. Recovery Rate",
    value: "91.4%",
    change: "+2.1% this month",
    icon: IconHeartbeat,
  },
  {
    title: "Appointments",
    value: "3,842",
    change: "+5.7% this month",
    icon: IconCalendar,
  },
  {
    title: "Diagnoses Filed",
    value: "6,210",
    change: "+3.4% this month",
    icon: IconReportMedical,
  },
];

export function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}