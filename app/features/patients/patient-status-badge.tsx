import { Badge } from "~/components/ui/badge";
import type { Patient } from "~/lib/patients-data";

const statusStyles: Record<Patient["status"], string> = {
  Stable: "bg-green-100 text-green-700 border-green-200",
  Recovering: "bg-blue-100 text-blue-700 border-blue-200",
  Critical: "bg-red-100 text-red-700 border-red-200",
  Discharged: "bg-gray-100 text-gray-600 border-gray-200",
};

export function PatientStatusBadge({ status }: { status: Patient["status"] }) {
  return (
    <Badge
      className={`border text-xs font-medium ${statusStyles[status]}`}
      variant="outline"
    >
      {status}
    </Badge>
  );
}
