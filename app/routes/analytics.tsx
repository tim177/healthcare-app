import { useAuth } from "~/hooks/useAuth";
import { AppLayout } from "~/components/layout/app-layout";
import { AnalyticsStats } from "~/features/analytics/analytics-stats";
import { PatientTrendsChart } from "~/features/analytics/patient-trends-chart";
import { DiagnosisChart } from "~/features/analytics/diagnosis-chart";
import { DepartmentTable } from "~/features/analytics/department-table";

export default function Analytics() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <AppLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Platform health metrics and patient insights
        </p>
      </div>
      <AnalyticsStats />
      <PatientTrendsChart />
      <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
        <DiagnosisChart />
        <DepartmentTable />
      </div>
    </AppLayout>
  );
}
