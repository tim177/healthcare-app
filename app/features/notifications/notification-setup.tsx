// app/components/notifications/notification-setup.tsx
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { useAuth } from "~/hooks/useAuth";
import {
  registerServiceWorker,
  enableNotifications,
  listenForMessages,
} from "~/lib/notifications";
import { IconBell, IconBellOff, IconCheck } from "@tabler/icons-react";
import { toast } from "sonner";

export function NotificationSetup() {
  const { user } = useAuth();
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isEnabling, setIsEnabling] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-initialize on mount
  useEffect(() => {
    if (!("Notification" in window)) return;

    const currentPermission = Notification.permission;
    setPermission(currentPermission);
    console.log("[NotificationSetup] Permission on mount:", currentPermission);

    // If already granted, auto-register SW and get token silently
    // This handles page refresh — token is re-fetched every session
    if (currentPermission === "granted" && user?.uid) {
      console.log(
        "[NotificationSetup] Already granted — auto-fetching token...",
      );
      initNotifications(user.uid);
    }

    // Listen for foreground messages
    listenForMessages((patientName) => {
      console.log("[NotificationSetup] 🔴 Critical alert for:", patientName);
      toast.error(`🔴 Critical Alert`, {
        description: `${patientName}'s status changed to Critical.`,
        duration: 8000,
        action: {
          label: "View Patients",
          onClick: () => (window.location.href = "/patients"),
        },
      });
    });
  }, [user?.uid]); // re-run if user changes

  const initNotifications = async (uid: string) => {
    await registerServiceWorker();
    const token = await enableNotifications(uid);
    if (token) {
      setFcmToken(token);
      setPermission("granted");
      console.log("[NotificationSetup] Token ready ✓");
    }
  };

  // Called when user manually clicks Enable
  const handleEnable = async () => {
    if (!user?.uid) return;
    setIsEnabling(true);
    await initNotifications(user.uid);
    setPermission(Notification.permission);
    setIsEnabling(false);
  };

  const handleCopy = () => {
    if (!fcmToken) return;
    navigator.clipboard.writeText(fcmToken);
    setCopied(true);
    console.log("[NotificationSetup] FCM token copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconBell className="size-4" />
              Critical Patient Alerts
            </CardTitle>
            <CardDescription className="mt-1 text-sm">
              Get notified when a patient's status changes to Critical — even
              when this tab is closed.
            </CardDescription>
          </div>

          {permission === "granted" && (
            <Badge
              className="bg-green-100 text-green-700 border-green-200 shrink-0"
              variant="outline"
            >
              Active
            </Badge>
          )}
          {permission === "denied" && (
            <Badge
              className="bg-red-100 text-red-700 border-red-200 shrink-0"
              variant="outline"
            >
              Blocked
            </Badge>
          )}
          {permission === "default" && (
            <Badge
              className="bg-yellow-100 text-yellow-700 border-yellow-200 shrink-0"
              variant="outline"
            >
              Not enabled
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Status dots */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${fcmToken ? "bg-green-500" : "bg-yellow-400"}`}
            />
            {fcmToken ? "Device registered" : "Registering device..."}
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${permission === "granted" ? "bg-green-500" : "bg-gray-300"}`}
            />
            Notifications {permission}
          </span>
        </div>

        {/* Enable button — only shown when not yet granted */}
        {permission !== "granted" && (
          <Button
            size="sm"
            className="w-fit"
            disabled={isEnabling || permission === "denied"}
            onClick={handleEnable}
          >
            {permission === "denied" ? (
              <>
                <IconBellOff className="size-4 mr-2" />
                Blocked — enable in browser settings
              </>
            ) : (
              <>
                <IconBell className="size-4 mr-2" />
                {isEnabling ? "Enabling..." : "Enable Alerts"}
              </>
            )}
          </Button>
        )}

        {/* Token + test instructions — shown once token is ready */}
        {fcmToken && import.meta.env.DEV && (
          <div className="flex flex-col gap-3 rounded-lg bg-muted p-3 text-xs">
            <div>
              <p className="font-medium mb-2">
                Your FCM Token (click to copy):
              </p>
              <div
                onClick={handleCopy}
                className="break-all bg-background rounded p-2 cursor-pointer hover:bg-muted-foreground/10 transition-colors border text-muted-foreground"
              >
                {fcmToken}
              </div>
              {copied && (
                <p className="text-green-600 mt-1 flex items-center gap-1">
                  <IconCheck className="size-3" /> Copied!
                </p>
              )}
            </div>

            <div>
              <p className="font-medium mb-1.5">How to test right now:</p>
              <ol className="list-decimal list-inside flex flex-col gap-1 text-muted-foreground">
                <li>Copy the token above</li>
                <li>
                  Go to <strong>Firebase Console → Engage → Messaging</strong>
                </li>
                <li>
                  Click{" "}
                  <strong>
                    "New campaign" → "Firebase Notification messages"
                  </strong>
                </li>
                <li>
                  Title: <code>🔴 Critical Alert</code>
                </li>
                <li>
                  Body: <code>Robert Kim's status changed to Critical</code>
                </li>
                <li>
                  Click <strong>"Send test message"</strong> (top right)
                </li>
                <li>
                  Paste your token → press Enter → click <strong>Test</strong>
                </li>
                <li>✅ Notification appears on your screen</li>
              </ol>
            </div>

            <div className="border-t pt-2 text-muted-foreground">
              <p className="font-medium text-foreground mb-1">
                Test both scenarios:
              </p>
              <p>
                📌 <strong>Tab open</strong> → notification appears via
                foreground handler
              </p>
              <p>
                📌 <strong>Tab closed</strong> → SW wakes up, OS notification
                appears, click opens /patients
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
