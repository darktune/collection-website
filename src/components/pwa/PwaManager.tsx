"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Wifi, WifiOff, AlertTriangle, CheckCircle2, MessageSquare, ArrowRight, X } from "lucide-react";
import { getInterruptedOrder, generateOutageRecoveryLink, PaymentOrder } from "@/lib/payments";

export function PwaManager() {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatusToast, setShowStatusToast] = useState(false);
  const [interruptedOrder, setInterruptedOrder] = useState<PaymentOrder | null>(null);

  useEffect(() => {
    // 1. Register Service Worker for offline asset caching
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Abraham Collection Service Worker registered successfully."))
        .catch((err) => console.warn("SW registration error:", err));
    }

    // 2. Connectivity Listeners
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowStatusToast(true);
      setTimeout(() => setShowStatusToast(false), 4000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowStatusToast(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. Scan for interrupted orders (Tenacity Outage Protocol)
    const pending = getInterruptedOrder();
    if (pending) {
      setInterruptedOrder(pending);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* Asynchronous Gateway Script Injection for Instant 0ms Load Times */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      <Script src="https://checkout.flutterwave.com/v3.js" strategy="lazyOnload" />

      {/* Interrupted Order / Power Outage Recovery Banner */}
      {interruptedOrder && (
        <div className="fixed top-20 inset-x-4 md:inset-x-auto md:right-8 z-50 max-w-md bg-brand-onyx border border-brand-gold/60 text-brand-white p-4 rounded-xl shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="p-2 rounded-full bg-brand-gold/20 text-brand-gold flex-shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div className="flex-1 text-xs space-y-1">
              <div className="font-display font-medium text-sm text-brand-gold">
                Tailoring Order Recovered
              </div>
              <p className="opacity-80 leading-relaxed text-[11px]">
                Your checkout for <strong>{interruptedOrder.items[0]?.name}</strong> ({interruptedOrder.reference}) was preserved during a network or power disruption. No double-charge occurred.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={generateOutageRecoveryLink(interruptedOrder)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold text-brand-onyx font-medium rounded-sm text-[10px] uppercase tracking-wider hover:bg-brand-cream transition-colors"
                >
                  <MessageSquare size={13} />
                  <span>Verify with Bolaji Abraham</span>
                </a>
                <button
                  onClick={() => setInterruptedOrder(null)}
                  className="px-2.5 py-1.5 text-white/60 hover:text-white text-[10px] uppercase tracking-wider"
                >
                  Dismiss
                </button>
              </div>
            </div>
            <button
              onClick={() => setInterruptedOrder(null)}
              className="text-white/40 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Online / Offline Connectivity Status - Architectural Luxury Accent (No green, no pill) */}
      {showStatusToast && (
        <aside
          aria-label="Network Status Indicator"
          className="fixed bottom-20 left-4 md:left-8 z-50 flex items-center gap-2 px-3.5 py-2 text-xs font-mono shadow-2xl backdrop-blur-xl border border-brand-gold/40 border-l-2 border-l-brand-gold bg-[#151210]/95 text-brand-gold transition-all duration-300 animate-in fade-in"
        >
          {isOnline ? (
            <>
              <Wifi size={14} className="text-brand-gold" />
              <span className="text-[10.5px] uppercase tracking-wider text-brand-silk">Connected &bull; 0ms Atelier Cache</span>
            </>
          ) : (
            <>
              <WifiOff size={14} className="text-brand-crimson" />
              <span className="text-[10.5px] uppercase tracking-wider text-brand-crimson">Offline Mode &bull; Cached Locally</span>
            </>
          )}
        </aside>
      )}
    </>
  );
}
