import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

const departments = [
  { name: "Cardiology", patients: 2140, satisfaction: 94, status: "Optimal" },
  { name: "Neurology", patients: 1830, satisfaction: 91, status: "Optimal" },
  { name: "Orthopedics", patients: 1560, satisfaction: 88, status: "Good" },
  { name: "Pediatrics", patients: 1420, satisfaction: 96, status: "Optimal" },
  { name: "Oncology", patients: 980, satisfaction: 89, status: "Good" },
  { name: "Emergency", patients: 3200, satisfaction: 82, status: "Review" },
];

const statusColor: Record<string, "default" | "secondary" | "destructive"> = {
  Optimal: "default",
  Good: "secondary",
  Review: "destructive",
};

export function DepartmentTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>Patient load and satisfaction scores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="pb-3 text-left font-medium">Department</th>
                <th className="pb-3 text-right font-medium">Patients</th>
                <th className="pb-3 text-right font-medium">Satisfaction</th>
                <th className="pb-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.name} className="border-b last:border-0">
                  <td className="py-3 font-medium">{dept.name}</td>
                  <td className="py-3 text-right text-muted-foreground">{dept.patients.toLocaleString()}</td>
                  <td className="py-3 text-right text-muted-foreground">{dept.satisfaction}%</td>
                  <td className="py-3 text-right">
                    <Badge variant={statusColor[dept.status]}>{dept.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}