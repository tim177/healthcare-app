// public/sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
);

console.log("[SW] Firebase service worker loaded"); 

// SW can't access import.meta.env — so hardcode config here
// This file is public anyway so it's safe
firebase.initializeApp({
  apiKey: "AIzaSyDfkmPlxFLtHg0xeHN6sKWjo2dI-JAnhxU",
  authDomain: "healthcare-auth-acf3c.firebaseapp.com",
  projectId: "healthcare-auth-acf3c",
  storageBucket: "healthcare-auth-acf3c.firebasestorage.app",
  messagingSenderId: "523447977501",
  appId: "1:523447977501:web:fa4db8c1626da6246da8f4",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received:", payload);

  const { title, body } = payload.notification ?? {};

  self.registration.showNotification(title ?? "HealthCare Alert", {
    body: body ?? "A patient needs attention.",
    icon: "/favicon.ico",
    tag: "critical-patient",
    requireInteraction: true,
  });
});

self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked");
  event.notification.close();
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        const existing = clients.find((c) => c.url.includes("/patients"));
        if (existing) return existing.focus();
        return self.clients.openWindow("/patients");
      }),
  );
});
