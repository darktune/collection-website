"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  Scissors,
  Sparkles,
  Truck,
  ShieldCheck,
  MessageSquare,
  Phone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, IrukereIcon } from "@/components/icons/BespokeIcons";
import { AtelierDatabase } from "@/lib/services/database";
import { CommissionRecord, CommissionStatus } from "@/types/database.types";

const STAGES: {
  key: CommissionStatus;
  title: string;
  yorubaSubtitle: string;
  description: string;
}[] = [
  {
    key: "Inscription",
    title: "1. Inscription Recorded",
    yorubaSubtitle: "Àkọsílẹ̀ Àkọ́kọ́",
    description: "Commission details, event destination, and silhouette requirements confirmed in the master studio ledger.",
  },
  {
    key: "Consultation",
    title: "2. Cloth Allocated & Inspected",
    yorubaSubtitle: "Ìyàsọ́tọ̀ Aṣọ",
    description: "Authentic hand-loomed Aso Oke or worsted wool inspected, measured, and locked in the atelier vault.",
  },
  {
    key: "Drafting",
    title: "3. Pattern Drafting",
    yorubaSubtitle: "Àpẹẹrẹ Gbígbẹ́",
    description: "Master Cutter translates 24-point anatomical measurements into bespoke paper patterns with architectural drape.",
  },
  {
    key: "Basting",
    title: "4. Basting & Structural Assembly",
    yorubaSubtitle: "Àsopọ̀ Àkọ́kọ́",
    description: "Garment hand-basted with contrast cotton thread for initial silhouette, posture, and chest drape examination.",
  },
  {
    key: "Embroidery",
    title: "5. Hand Embroidery & Detailing",
    yorubaSubtitle: "Iṣẹ́ Abẹ́rẹ́ Àti Ọ̀ṣọ́",
    description: "Intricate neckline bib embroidery, traditional chain stitch, and hand-finished buttonhole construction.",
  },
  {
    key: "Dispatched",
    title: "6. Final Press & White-Glove Dispatch",
    yorubaSubtitle: "Ìtújáde Ọba",
    description: "Double steam-pressed, custom wooden garment hanger fitted, and dispatched via DHL Express or Lagos studio fitting.",
  },
];

function getStageIndex(status: CommissionStatus): number {
  switch (status) {
    case "Inscription":
      return 0;
    case "Consultation":
      return 1;
    case "Drafting":
      return 2;
    case "Basting":
      return 3;
    case "Embroidery":
      return 4;
    case "Completed":
    case "Dispatched":
      return 5;
    default:
      return 0;
  }
}

function TrackerContent() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get("ref") || "";

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [commission, setCommission] = useState<CommissionRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const performSearch = async (refCode: string) => {
    if (!refCode.trim()) return;
    setLoading(true);
    setHasSearched(true);
    const result = await AtelierDatabase.getCommissionByReference(refCode.trim());
    setCommission(result);
    setLoading(false);
  };

  useEffect(() => {
    if (initialRef) {
      performSearch(initialRef);
    }
  }, [initialRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const currentStageIndex = commission ? getStageIndex(commission.status) : 0;

  return (
    <main className="min-h-screen pt-28 pb-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-mono font-medium mb-4">
          <AdinkraheneIcon size={12} />
          <span>Real-Time Sartorial Ledger &bull; Est. 2002</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-black dark:text-brand-white mb-3">
          Track a Bespoke Commission
        </h1>
        <p className="text-xs sm:text-sm font-light text-brand-black/70 dark:text-brand-silk/75 max-w-xl mx-auto leading-relaxed">
          Enter your unique Archival Reference Code to inspect the active tailoring milestone, cutting table updates, and estimated dispatch.
        </p>
      </div>

      {/* Reference Lookup Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. AB-2026-8941"
            className="w-full bg-[#FCFAF7] dark:bg-[#12100E] border-2 border-brand-black/20 dark:border-white/20 focus:border-brand-gold py-4 pl-5 pr-36 text-sm uppercase tracking-wider font-mono outline-none shadow-sm transition-colors text-brand-black dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 px-6 py-2.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-1.5 shadow"
          >
            {loading ? (
              <span>Searching...</span>
            ) : (
              <>
                <Search size={14} />
                <span>Track</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Sample Ref Pills */}
        <div className="flex items-center justify-center gap-2 mt-3 text-[10.5px] font-mono text-brand-black/60 dark:text-white/60">
          <span>Sample records:</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("AB-2026-8941");
              performSearch("AB-2026-8941");
            }}
            className="underline hover:text-brand-gold text-brand-crimson dark:text-brand-gold"
          >
            AB-2026-8941 (Chieftaincy Agbada)
          </button>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("AB-2026-7230");
              performSearch("AB-2026-7230");
            }}
            className="underline hover:text-brand-gold text-brand-crimson dark:text-brand-gold"
          >
            AB-2026-7230 (Diaspora Suite)
          </button>
        </div>
      </div>

      {/* Results Stage */}
      {hasSearched && !loading && (
        <>
          {commission ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Patron & Garment Overview Card */}
              <div className="p-6 sm:p-8 bg-[#FAF7F2] dark:bg-[#0F0D0B] border border-brand-gold/30 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-black/10 dark:border-white/10 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-semibold tracking-wider uppercase">
                        {commission.reference_code}
                      </span>
                      {commission.is_diaspora && (
                        <span className="px-2 py-0.5 bg-brand-crimson/15 text-brand-crimson dark:text-brand-gold border border-brand-crimson/20 text-[9px] font-mono uppercase">
                          Diaspora Express
                        </span>
                      )}
                    </div>
                    <h2 className="font-name text-2xl sm:text-3xl text-brand-black dark:text-brand-white">
                      {commission.client_name}
                    </h2>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-black/60 dark:text-white/60 block">
                      Lead Master Tailor
                    </span>
                    <span className="font-name text-base text-brand-crimson dark:text-brand-gold font-medium">
                      {commission.assigned_tailor || "Bolaji Abayomi Abraham"}
                    </span>
                  </div>
                </div>

                {/* Garment Parameters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs font-light">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-black/50 dark:text-white/50 block">
                      Silhouette
                    </span>
                    <span className="font-medium text-brand-black dark:text-white mt-0.5 block">
                      {commission.silhouette}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-black/50 dark:text-white/50 block">
                      Occasion Family
                    </span>
                    <span className="font-medium text-brand-black dark:text-white mt-0.5 block capitalize">
                      {commission.occasion.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-black/50 dark:text-white/50 block">
                      Destination
                    </span>
                    <span className="font-medium text-brand-black dark:text-white mt-0.5 block">
                      {commission.location}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brand-black/50 dark:text-white/50 block">
                      Target Event Date
                    </span>
                    <span className="font-mono text-brand-crimson dark:text-brand-gold font-semibold mt-0.5 block">
                      {commission.date_needed || "Pending Scheduling"}
                    </span>
                  </div>
                </div>

                {commission.notes && (
                  <div className="mt-4 pt-4 border-t border-brand-black/5 dark:border-white/5 text-xs text-brand-black/70 dark:text-white/70">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-gold mr-2 font-medium">
                      Atelier Directives:
                    </span>
                    <span>{commission.notes}</span>
                  </div>
                )}
              </div>

              {/* 6-Stage Visual Milestone Progress Bar */}
              <div className="p-6 sm:p-8 bg-[#FCFAF7] dark:bg-[#12100E] border border-brand-black/10 dark:border-white/10 shadow-lg">
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-brand-black/10 dark:border-white/10">
                  <h3 className="font-display text-lg text-brand-black dark:text-white">
                    Tailoring Milestones
                  </h3>
                  <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider">
                    Stage {currentStageIndex + 1} of 6: {commission.status.toUpperCase()}
                  </span>
                </div>

                {/* Stepper Timeline */}
                <div className="space-y-6">
                  {STAGES.map((stage, idx) => {
                    const isCompleted = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    const isPending = idx > currentStageIndex;

                    return (
                      <div
                        key={stage.key}
                        className={`flex items-start gap-4 p-4 border transition-all duration-300 ${
                          isCurrent
                            ? "border-brand-gold bg-brand-gold/10 shadow-sm"
                            : isCompleted
                            ? "border-brand-black/10 dark:border-white/10 bg-brand-black/[0.02] dark:bg-white/[0.02]"
                            : "border-dashed border-brand-black/10 dark:border-white/10 opacity-60"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2 size={20} className="text-brand-gold" />
                          ) : isCurrent ? (
                            <div className="w-5 h-5 rounded-full border-2 border-brand-gold flex items-center justify-center animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-brand-gold" />
                            </div>
                          ) : (
                            <Clock size={20} className="text-brand-black/30 dark:text-white/30" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`text-sm font-medium ${
                                  isCurrent
                                    ? "text-brand-black dark:text-white font-semibold"
                                    : isCompleted
                                    ? "text-brand-black/90 dark:text-white/90"
                                    : "text-brand-black/60 dark:text-white/60"
                                }`}
                              >
                                {stage.title}
                              </h4>
                              <span className="text-[10px] font-mono italic text-brand-crimson dark:text-brand-gold">
                                {stage.yorubaSubtitle}
                              </span>
                            </div>

                            {isCurrent && (
                              <span className="text-[9px] font-mono uppercase px-2 py-0.5 bg-brand-crimson text-white dark:bg-brand-gold dark:text-brand-onyx font-bold self-start sm:self-auto">
                                Active In Atelier
                              </span>
                            )}
                            {isCompleted && (
                              <span className="text-[9px] font-mono text-brand-gold uppercase tracking-wider">
                                Completed
                              </span>
                            )}
                          </div>

                          <p className="text-xs font-light text-brand-black/70 dark:text-white/70 leading-relaxed">
                            {stage.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Timeline Logs if available */}
                {commission.timeline_logs && commission.timeline_logs.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-brand-black/10 dark:border-white/10">
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-brand-black/60 dark:text-white/60 mb-3">
                      Master Cutter Workshop Log
                    </h4>
                    <div className="space-y-2 text-xs font-mono">
                      {commission.timeline_logs.map((log, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex items-start gap-3 p-2.5 bg-brand-black/5 dark:bg-white/5 border border-brand-black/5 dark:border-white/5"
                        >
                          <span className="text-brand-gold font-semibold text-[10px] flex-shrink-0">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </span>
                          <span className="text-brand-black/60 dark:text-white/60 uppercase text-[10px] flex-shrink-0">
                            [{log.status}]
                          </span>
                          <span className="text-brand-black/80 dark:text-white/80 font-sans text-xs">
                            {log.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Priority Concierge Inquiries */}
              <div className="p-6 bg-brand-crimson/5 dark:bg-brand-gold/5 border border-brand-crimson/20 dark:border-brand-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <IrukereIcon size={24} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
                  <div>
                    <h4 className="font-display text-base text-brand-black dark:text-white">
                      Need schedule alteration or expedited fitting?
                    </h4>
                    <p className="text-xs font-light text-brand-black/70 dark:text-white/70">
                      Reach Bolaji Abraham directly via the private WhatsApp Concierge desk.
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/2348034432759?text=${encodeURIComponent(
                    `Hello Bolaji Abraham (Abraham Collection),\n\nI am tracking my commission ref: ${commission.reference_code} for ${commission.client_name}.\n\nCurrent Status: ${commission.status}\nLocation: ${commission.location}\n\nI would like an update on fitting availability.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase text-xs tracking-luxury font-semibold transition-colors flex items-center gap-2 flex-shrink-0 shadow"
                >
                  <MessageSquare size={14} className="text-brand-gold" />
                  <span>WhatsApp Inscription Desk</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-[#FCFAF7] dark:bg-[#12100E] border border-brand-black/10 dark:border-white/10 max-w-lg mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-black/5 dark:bg-white/5 flex items-center justify-center mx-auto text-brand-black/40 dark:text-white/40">
                <Search size={20} />
              </div>
              <h3 className="font-display text-xl text-brand-black dark:text-white">
                Archival Record Not Found
              </h3>
              <p className="text-xs font-light text-brand-black/70 dark:text-white/70 leading-relaxed">
                No commission matching <strong className="font-mono text-brand-crimson dark:text-brand-gold">{searchQuery}</strong> was found in the master ledger. Please confirm your reference code or contact our concierge.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/bespoke/commission"
                  className="px-5 py-2.5 bg-brand-crimson text-white uppercase text-xs tracking-wider font-medium hover:bg-brand-burgundy-light transition-colors"
                >
                  Begin a Commission
                </Link>
                <a
                  href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20need%20help%20locating%20my%20commission%20reference%20code."
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 border border-brand-black/20 dark:border-white/20 uppercase text-xs tracking-wider text-brand-black dark:text-white hover:border-brand-gold hover:text-brand-gold transition-colors"
                >
                  WhatsApp Assistance
                </a>
              </div>
            </div>
          )}
        </>
      )}

      {/* Assurance Ribbon */}
      <div className="mt-16 pt-8 border-t border-brand-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-black/50 dark:text-white/50 gap-4">
        <span className="flex items-center gap-1.5 text-brand-gold font-medium">
          <ShieldCheck size={14} />
          <span>Strict Client Privacy &bull; Inscription Ledger Secured</span>
        </span>
        <span className="font-mono text-[11px]">
          Lagos Atelier &bull; London &bull; Houston &bull; Est. 2002
        </span>
      </div>
    </main>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-36 text-center font-display text-2xl">Accessing Sartorial Ledger...</div>}>
      <TrackerContent />
    </Suspense>
  );
}
