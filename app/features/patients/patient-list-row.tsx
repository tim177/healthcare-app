import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { PatientStatusBadge } from "./patient-status-badge";
import type { Patient } from "~/lib/patients-data";

export function PatientListRow({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted/50 transition-colors">
      <Avatar className="size-9 shrink-0">
        <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-xs">
          {patient.avatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-4 lg:grid-cols-6 items-center min-w-0">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-medium text-sm truncate">{patient.name}</p>
          <p className="text-xs text-muted-foreground">
            {patient.age}y · {patient.gender}
          </p>
        </div>
        <p className="text-sm text-muted-foreground truncate hidden sm:block">
          {patient.diagnosis}
        </p>
        <p className="text-sm text-muted-foreground hidden lg:block">
          {patient.department}
        </p>
        <p className="text-sm text-muted-foreground truncate hidden lg:block">
          {patient.doctor}
        </p>
        <div className="flex justify-end sm:justify-start">
          <PatientStatusBadge status={patient.status} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground shrink-0 hidden md:block">
        {new Date(patient.admittedOn).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
}
