// app/lib/notifications.ts
import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { messagingPromise, db } from "~/firebase";

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

console.log("[Notifications] Module loaded");

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) {
    console.warn("[Notifications] SW not supported");
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    console.log("[Notifications] SW registered:", reg.scope);
    return reg;
  } catch (err) {
    console.error("[Notifications] SW registration failed:", err);
    return null;
  }
}

export async function enableNotifications(
  userId: string,
): Promise<string | null> {
  console.log("[Notifications] Requesting permission...");
  const permission = await Notification.requestPermission();
  console.log("[Notifications] Permission:", permission);

  if (permission !== "granted") {
    console.warn("[Notifications] Permission denied");
    return null;
  }

  const messaging = await messagingPromise;
  if (!messaging) return null;

  try {
    const registration = await navigator.serviceWorker.ready;
    console.log("[Notifications] Getting FCM token...");

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!token) {
      console.warn("[Notifications] No token returned");
      return null;
    }

    console.log("[Notifications] Token obtained:", token);

    await setDoc(
      doc(db, "fcm_tokens", `${userId}_${token.slice(-10)}`),
      {
        userId,
        token,
        createdAt: serverTimestamp(),
        userAgent: navigator.userAgent,
      },
      { merge: true },
    );

    console.log("[Notifications] Token saved to Firestore ✓");
    return token;
  } catch (err) {
    console.error("[Notifications] Failed:", err);
    return null;
  }
}

export async function listenForMessages(
  onCriticalAlert: (patientName: string) => void,
): Promise<void> {
  const messaging = await messagingPromise;
  if (!messaging) return;

  console.log("[Notifications] Listening for foreground messages...");

  onMessage(messaging, (payload) => {
    console.log("[Notifications] Foreground message:", payload);

    // Only handle critical_patient type
    // Tab open  → toast shown by the component via onCriticalAlert callback
    // Tab closed → sw.js onBackgroundMessage handles it as OS notification
    if (payload.data?.type === "critical_patient") {
      const patientName = payload.data?.patientName ?? "Unknown";
      console.log(
        "[Notifications] Triggering critical alert for:",
        patientName,
      );
      onCriticalAlert(patientName);
    } else {
      // Fallback for messages sent without custom data (like from Firebase Console test)
      const patientName = payload.data?.patientName ?? "Unknown Patient";
      console.log("[Notifications] Generic message — triggering alert");
      onCriticalAlert(patientName);
    }
  });
}
