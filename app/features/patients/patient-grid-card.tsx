import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { PatientStatusBadge } from "./patient-status-badge";
import type { Patient } from "~/lib/patients-data";
import { IconStethoscope, IconBuilding } from "@tabler/icons-react";

export function PatientGridCard({ patient }: { patient: Patient }) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-indigo-100 text-indigo-700 font-semibold text-sm">
                {patient.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm leading-tight">
                {patient.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {patient.age}y · {patient.gender}
              </p>
            </div>
          </div>
          <PatientStatusBadge status={patient.status} />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconStethoscope className="size-3.5 shrink-0" />
            <span className="truncate">{patient.diagnosis}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconBuilding className="size-3.5 shrink-0" />
            <span>{patient.department}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{patient.doctor}</span>
          <span>
            {new Date(patient.admittedOn).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
