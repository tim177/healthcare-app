import { useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { AppLayout } from "~/components/layout/app-layout";
import { patients } from "~/lib/patients-data";
import { PatientGridCard } from "~/features/patients/patient-grid-card";
import { PatientListRow } from "~/features/patients/patient-list-row";
import { PatientStatusBadge } from "~/features/patients/patient-status-badge";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Card, CardContent } from "~/components/ui/card";
import { IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import type { Patient } from "~/lib/patients-data";

type View = "grid" | "list";
type StatusFilter = "All" | Patient["status"];

export default function Patients() {
  const { user } = useAuth();
  const [view, setView] = useState<View>("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  if (!user) return null;

  const filtered = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      p.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      {/* Header */}
      <div className="px-4 lg:px-6 flex flex-col gap-1">
        <h1 className="text-xl font-semibold">Patients</h1>
        <p className="text-sm text-muted-foreground">
          {patients.length} total patients across all departments
        </p>
      </div>

      {/* Toolbar */}
      <div className="px-4 lg:px-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as StatusFilter)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Stable">Stable</SelectItem>
              <SelectItem value="Recovering">Recovering</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="Discharged">Discharged</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 border rounded-lg p-1 self-start sm:self-auto">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setView("grid")}
          >
            <IconLayoutGrid className="size-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => setView("list")}
          >
            <IconList className="size-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-sm">No patients found.</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((patient) => (
              <PatientGridCard key={patient.id} patient={patient} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-2">
              {/* List header */}
              <div className="hidden sm:grid grid-cols-4 lg:grid-cols-6 gap-4 px-4 py-2 text-xs font-medium text-muted-foreground border-b mb-1">
                <span className="col-span-1">Patient</span>
                <span>Diagnosis</span>
                <span className="hidden lg:block">Department</span>
                <span className="hidden lg:block">Doctor</span>
                <span>Status</span>
              </div>
              <div className="flex flex-col">
                {filtered.map((patient) => (
                  <PatientListRow key={patient.id} patient={patient} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
