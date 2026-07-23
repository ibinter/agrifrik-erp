"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          console.log("[AGRIFRIK SW] Registered", reg.scope);
        })
        .catch((err) => {
          console.warn("[AGRIFRIK SW] Registration failed", err);
        });
    }
  }, []);

  return null;
}
