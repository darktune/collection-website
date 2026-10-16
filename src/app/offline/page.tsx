"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { WifiOff, Phone, RotateCw, CheckCircle2, ShieldCheck } from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      window.location.href = "/";
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white flex items-center justify-center p-6 transition-colors duration-500">
      <div className="max-w-md w-full text-center space-y-6 p-8 border border-brand-gold/30 rounded-2xl bg-brand-card/40 backdrop-blur-xl shadow-2xl">
        
        <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center mx-auto text-brand-gold">
          <WifiOff size={28} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium">
          <AdinkraheneIcon size={12} />
          <span>Offline Continuity Protocol</span>
        </div>

        <h1 className="font-display text-3xl">Offline Resilience Active.</h1>

        <p className="font-light text-xs opacity-80 leading-relaxed">
          Your internet connection or power appears disrupted. Do not worry—your saved silhouettes, bespoke measurements, and cart selections are securely preserved in your local device cache.
        </p>

        {/* Direct Telecom Line (Works during data outage) */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-left text-xs">
          <div className="flex items-center gap-2 text-brand-gold font-medium">
            <Phone size={14} />
            <span>Emergency Telecom Line (Eranibaniso)</span>
          </div>
          <p className="opacity-70 text-[11px]">Direct mobile phone network call to Bolaji Abraham:</p>
          <a
            href="tel:08122640820"
            className="block text-base font-mono font-bold text-white hover:text-brand-gold transition-colors"
          >
            0812 264 0820
          </a>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-luxury font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RotateCw size={14} />
            <span>Check Connectivity &amp; Reload</span>
          </button>

          <Link
            href="/"
            className="text-xs uppercase tracking-wider text-brand-gold hover:underline"
          >
            &larr; View Cached Home Wardrobe
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/50 pt-2">
          <ShieldCheck size={13} className="text-brand-gold" />
          <span>Zero Data Loss Guaranteed</span>
        </div>

      </div>
    </main>
  );
}
