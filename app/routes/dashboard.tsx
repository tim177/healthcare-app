import { AppLayout } from "~/components/layout/app-layout";
import { SectionCards } from "~/components/shared/section-cards";
import { ChartAreaInteractive } from "~/components/shared/chart-area-interactive";
import { NotificationSetup } from "~/features/notifications/notification-setup";
import { useAuth } from "~/hooks/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <AppLayout>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6">
        <NotificationSetup />
      </div>
    </AppLayout>
  );
}
