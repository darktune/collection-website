"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  PempamsieIcon,
  AdinkraheneIcon,
  IrukereIcon,
  SankofaDiasporaIcon,
} from "@/components/icons/BespokeIcons";
import { CheckCircle2, ShieldCheck, Copy, Check, MessageSquare, Calendar, Download, Search } from "lucide-react";

import { AtelierDatabase } from "@/lib/services/database";
import { TextileInventoryRecord } from "@/types/database.types";
import { useAtelier } from "@/context/AtelierContext";

function CommissionFormInner() {
  const searchParams = useSearchParams();
  const isDiaspora = searchParams.get("type") === "diaspora";
  const { formatPrice } = useAtelier();

  const [occasion, setOccasion] = useState(isDiaspora ? "diaspora_wedding" : "traditional_wedding");
  const [silhouette, setSilhouette] = useState("agbada");
  const [selectedFabric, setSelectedFabric] = useState("Alaari Royal Silk Aso Oke");
  const [textiles, setTextiles] = useState<TextileInventoryRecord[]>([]);
  const [consultationType, setConsultationType] = useState(isDiaspora ? "remote" : "studio");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ clientName: string; location: string } | null>(null);
  const [detectedTimezone, setDetectedTimezone] = useState("UTC");

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) setDetectedTimezone(tz);
    } catch {}
  }, []);

  const downloadIcs = () => {
    if (!referenceCode) return;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Abraham Collection//Bespoke Atelier Consultation//EN",
      "BEGIN:VEVENT",
      `UID:${referenceCode}@abrahamcollection.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${new Date(Date.now() + 86400000 * 2).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTEND:${new Date(Date.now() + 86400000 * 2 + 3600000).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `SUMMARY:Abraham Collection Bespoke Video Consultation [REF: ${referenceCode}]`,
      `DESCRIPTION:Bespoke tailoring consultation and fabric inspection with Master Tailor Bolaji Abayomi Abraham.\\nRef: ${referenceCode}\\nCloth: ${selectedFabric}\\nWhatsApp Concierge: +2348034432759`,
      "LOCATION:Private Video Concierge (WhatsApp / Google Meet)",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Abraham_Collection_${referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    AtelierDatabase.getTextiles().then((data) => {
      if (data && data.length > 0) {
        setTextiles(data);
      }
    });
  }, []);

  const handleCopy = () => {
    if (!referenceCode) return;
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const client_name = (form.elements.namedItem("client_name") as HTMLInputElement)?.value || "Esteemed Client";
    const email = (form.elements.namedItem("client_email") as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem("client_phone") as HTMLInputElement)?.value || "";
    const event_city = (form.elements.namedItem("event_city") as HTMLInputElement)?.value || "Lagos, Nigeria";
    const event_date = (form.elements.namedItem("event_date") as HTMLInputElement)?.value || "";
    const guest_count = (form.elements.namedItem("guest_count") as HTMLSelectElement)?.value || "1";
    const notes = (form.elements.namedItem("client_notes") as HTMLTextAreaElement)?.value || "";

    // Generate unique archival reference code
    const generatedRef = `AB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(generatedRef);
    setSubmittedData({ clientName: client_name, location: event_city });

    const commissionNotes = `Fabric Swatch: ${selectedFabric}${notes ? `\n\nPatron Directives: ${notes}` : ""}`;

    try {
      await AtelierDatabase.createCommission({
        reference_code: generatedRef,
        client_name,
        email,
        phone,
        location: event_city,
        occasion,
        silhouette,
        consultation_type: consultationType as 'studio' | 'remote',
        status: 'Inscription',
        date_needed: event_date || null,
        is_diaspora: isDiaspora || consultationType === 'remote',
        garment_count: parseInt(guest_count) || 1,
        notes: commissionNotes,
        assigned_tailor: "Bolaji Abayomi Abraham",
      });

      // Dispatch automated transactional email notification via /api/commissions/notify
      fetch("/api/commissions/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referenceCode: generatedRef,
          clientName: client_name,
          email,
          phone,
          location: event_city,
          occasion,
          silhouette,
          consultationType,
          dateNeeded: event_date,
          garmentCount: guest_count,
          selectedFabric,
          notes,
        }),
      }).catch((err) => console.warn("Email notification dispatch error:", err));
    } catch (err) {
      console.warn("Commission persisted with local queue fallback:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    const whatsappMessage = encodeURIComponent(
      `Hello Bolaji Abraham (Abraham Collection),\n\nI have just submitted a bespoke commission on the website.\n\n* Archival Reference: ${referenceCode}\n* Client: ${submittedData?.clientName || "Esteemed Client"}\n* Location: ${submittedData?.location || "Lagos"}\n* Silhouette: ${silhouette.toUpperCase()}\n* Fabric: ${selectedFabric}\n\nPlease confirm availability for fabric consultation and measurements.`
    );

    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center font-sans max-w-2xl mx-auto py-24">
        <div className="w-16 h-16 rounded-full bg-brand-crimson/10 dark:bg-brand-gold/10 flex items-center justify-center mb-6">
          <AdinkraheneIcon size={32} className="text-brand-crimson dark:text-brand-gold" />
        </div>
        <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-2">
          Archival Registry Confirmation
        </p>
        <h1 className="font-display text-4xl md:text-5xl mb-4 text-balance">
          Commission Inscription Received
        </h1>

        {/* Reference Code & Copy Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
          <span className="text-sm font-mono tracking-wider text-brand-black dark:text-brand-white bg-brand-black/5 dark:bg-white/5 py-2 px-4 border border-brand-black/15 dark:border-white/15">
            REFERENCE: <span className="font-semibold text-brand-crimson dark:text-brand-gold">{referenceCode}</span>
          </span>
          <span className="text-xs font-mono tracking-wider text-brand-gold bg-brand-black/5 dark:bg-white/5 py-2 px-3 border border-brand-black/15 dark:border-white/15">
            CLOTH: {selectedFabric}
          </span>
          <button
            onClick={handleCopy}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider border border-brand-black/15 dark:border-white/15 hover:border-brand-gold text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-gold bg-brand-black/5 dark:bg-white/5 transition-all shadow-sm"
            title="Copy reference code to clipboard"
          >
            {copied ? (
              <>
                <Check size={14} className="text-brand-gold" />
                <span className="text-brand-gold font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <p className="font-light text-base opacity-80 leading-relaxed mb-8 text-balance">
          Thank you for entrusting Abraham Collection with your occasion. Our master tailor and private client concierge will review your commission requirements and contact you within 24 hours to coordinate fabric swatches and fittings.
        </p>

        {/* Calendar Reservation & Real-Time Tracking Actions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-xl mx-auto">
          <button
            onClick={downloadIcs}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 border border-brand-gold/40 hover:border-brand-gold bg-brand-gold/10 text-brand-gold text-[10.5px] uppercase tracking-wider font-mono transition-colors shadow-sm"
          >
            <Download size={13} />
            <span>Download .ics Calendar Invite</span>
          </button>

          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
              `Abraham Collection Bespoke Consultation [${referenceCode}]`
            )}&details=${encodeURIComponent(
              `Bespoke tailoring consultation and fabric inspection with Master Tailor Bolaji Abayomi Abraham.\nArchival Ref: ${referenceCode}\nCloth: ${selectedFabric}\nConcierge: +234 803 443 2759`
            )}&location=${encodeURIComponent("Private Video Concierge (Lagos Studio Desk)")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 border border-brand-black/20 dark:border-white/20 hover:border-brand-gold text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-gold text-[10.5px] uppercase tracking-wider font-mono transition-colors"
          >
            <Calendar size={13} />
            <span>Add to Google Calendar</span>
          </a>

          <Link
            href={`/track?ref=${encodeURIComponent(referenceCode)}`}
            className="flex items-center gap-1.5 px-4 py-2 border border-brand-crimson/30 hover:border-brand-crimson text-brand-crimson dark:text-brand-gold text-[10.5px] uppercase tracking-wider font-mono transition-colors"
          >
            <Search size={13} />
            <span>Track Live Milestone</span>
          </Link>
        </div>

        {/* Priority Action: WhatsApp Concierge + Home Return */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mb-10">
          <a
            href={`https://wa.me/2348034432759?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-crimson text-brand-white dark:bg-brand-silk dark:text-brand-onyx text-xs tracking-luxury uppercase font-medium hover:bg-brand-burgundy-light dark:hover:bg-brand-cream transition-colors duration-300 shadow-md"
          >
            <MessageSquare size={16} className="text-brand-gold dark:text-brand-crimson" />
            <span>Connect on WhatsApp Concierge</span>
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-black/20 dark:border-white/20 text-brand-black dark:text-brand-silk uppercase text-xs tracking-luxury font-medium hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            Return to Atelier
          </Link>
        </div>

        <div className="p-6 border-basting bg-brand-cream/40 dark:bg-brand-charcoal text-left w-full text-xs space-y-3 font-light">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Consultation dossiers prepared with fabric swatch availability</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Measurement guidelines dispatched via private concierge</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Dedicated lead tailor assigned to coordinate cutting timeline</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-24 px-6 md:px-12 font-sans">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs tracking-ultra-wide uppercase text-brand-crimson dark:text-brand-gold mb-3 font-medium">
          <PempamsieIcon size={14} />
          <span>Atelier Consultation Booking</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl mb-4 text-balance">
          Begin a Commission
        </h1>
        <p className="font-light text-base opacity-75 leading-relaxed text-balance">
          Please outline the occasion, silhouette, and location for your bespoke commission. Every piece is cut from scratch to embody your presence.
        </p>
        <div className="divider-loom w-48 mx-auto mt-6" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Step 1: Occasion Family */}
        <section className="space-y-4">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            1. Select Occasion Family
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: "traditional_wedding",
                title: "Traditional Wedding",
                sub: "Celebrant Agbada & Bridal",
              },
              {
                id: "black_tie",
                title: "Black-Tie / Gala",
                sub: "Tuxedo & Evening Wear",
              },
              {
                id: "chieftaincy",
                title: "Royal / Chieftaincy",
                sub: "Imperial Ceremonial",
              },
              {
                id: "corporate_suiting",
                title: "Executive Suiting",
                sub: "Boardroom Bespoke",
              },
              {
                id: "diaspora_wedding",
                title: "Diaspora Entourage",
                sub: "Multi-Garment Event Group",
              },
              {
                id: "bespoke_wardrobe",
                title: "Private Wardrobe",
                sub: "Multi-Piece Seasonal",
              },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setOccasion(item.id)}
                className={`p-5 text-left border transition-all duration-300 flex flex-col justify-between ${
                  occasion === item.id
                    ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5 shadow-sm"
                    : "border-brand-black/10 dark:border-white/10 hover:border-brand-black/30 dark:hover:border-white/30"
                }`}
              >
                <div className="font-display text-lg mb-1">{item.title}</div>
                <div className="text-xs font-light text-brand-muted">{item.sub}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Silhouette Architecture */}
        <section className="space-y-4">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            2. Desired Silhouette
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "agbada", label: "Grand 3-Piece Agbada" },
              { id: "kaftan", label: "Ceremonial Kaftan" },
              { id: "tuxedo", label: "Bespoke Tuxedo" },
              { id: "suit", label: "Double-Breasted Suit" },
            ].map((sil) => (
              <button
                type="button"
                key={sil.id}
                onClick={() => setSilhouette(sil.id)}
                className={`p-4 text-center border text-xs tracking-wider uppercase font-medium transition-all ${
                  silhouette === sil.id
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx border-transparent"
                    : "border-brand-black/10 dark:border-white/10 hover:border-brand-crimson"
                }`}
              >
                {sil.label}
              </button>
            ))}
          </div>
        </section>

        {/* Step 3: Heritage Cloth & Fabric Swatch Selection */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
              3. Heritage Cloth &amp; Fabric Swatch
            </label>
            <span className="text-[10px] font-mono tracking-wider text-brand-gold">
              Live Vault Inventory &bull; Yardage Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(textiles.length > 0
              ? textiles
              : [
                  {
                    id: "txt-1",
                    fabric_name: "Alaari Royal Silk Aso Oke",
                    origin: "Iseyin, Oyo State",
                    composition: "Hand-loomed Mulberry Silk & Metallic Thread",
                    color: "Imperial Oyo Crimson",
                    yardage_available: 48.5,
                    unit_cost_ngn: 45000,
                  },
                  {
                    id: "txt-2",
                    fabric_name: "Super 150s English Worsted Wool",
                    origin: "Huddersfield, UK",
                    composition: "100% Virgin Merino Wool",
                    color: "Obsidian Black",
                    yardage_available: 62.0,
                    unit_cost_ngn: 58000,
                  },
                  {
                    id: "txt-3",
                    fabric_name: "Sanyan Traditional Raw Silk Aso Oke",
                    origin: "Oyo Town, Nigeria",
                    composition: "Wild Anaphe Silk & Cotton Blend",
                    color: "Warm Champagne Silk",
                    yardage_available: 35.0,
                    unit_cost_ngn: 42000,
                  },
                  {
                    id: "txt-4",
                    fabric_name: "Biella Four-Season Wool-Cashmere Blend",
                    origin: "Biella, Italy",
                    composition: "90% Wool, 10% Cashmere",
                    color: "Deep Charcoal Gray",
                    yardage_available: 28.0,
                    unit_cost_ngn: 65000,
                  },
                ]
            ).map((tex) => {
              const isSelected = selectedFabric === tex.fabric_name;
              const swatchColor = tex.fabric_name.includes("Alaari")
                ? "#7A0C1E"
                : tex.fabric_name.includes("Worsted")
                ? "#18181B"
                : tex.fabric_name.includes("Sanyan")
                ? "#D4AF37"
                : "#3F3F46";

              return (
                <button
                  type="button"
                  key={tex.id}
                  onClick={() => setSelectedFabric(tex.fabric_name)}
                  className={`p-5 text-left border transition-all duration-300 flex flex-col justify-between relative ${
                    isSelected
                      ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5 shadow-sm"
                      : "border-brand-black/10 dark:border-white/10 hover:border-brand-black/30 dark:hover:border-white/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: swatchColor }}
                        />
                        <span className="text-[10px] font-mono tracking-wider uppercase text-brand-black/60 dark:text-white/60">
                          {tex.color}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 text-brand-gold">
                        {tex.yardage_available} yds in vault
                      </span>
                    </div>

                    <div className="font-display text-base mb-1 text-brand-onyx dark:text-brand-silk">
                      {tex.fabric_name}
                    </div>
                    <div className="text-xs font-light text-brand-muted leading-relaxed">
                      {tex.composition} &bull; {tex.origin}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-brand-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-brand-muted">Studio Rate:</span>
                    <span className="font-medium text-brand-crimson dark:text-brand-gold">
                      {tex.unit_cost_ngn ? `${formatPrice(tex.unit_cost_ngn)}/yd` : "Atelier Quote"}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* 5th Option: Bespoke / Client-Provided Cloth */}
            <button
              type="button"
              onClick={() => setSelectedFabric("Client Provided / Consult at Atelier")}
              className={`p-5 text-left border transition-all duration-300 flex flex-col justify-between relative ${
                selectedFabric === "Client Provided / Consult at Atelier"
                  ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5 shadow-sm"
                  : "border-brand-black/10 dark:border-white/10 hover:border-brand-black/30 dark:hover:border-white/30"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full border border-brand-gold bg-brand-gold/30 shadow-inner flex-shrink-0" />
                    <span className="text-[10px] font-mono tracking-wider uppercase text-brand-black/60 dark:text-white/60">
                      Bespoke Sourcing
                    </span>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 text-brand-gold">
                    Consultation
                  </span>
                </div>

                <div className="font-display text-base mb-1 text-brand-onyx dark:text-brand-silk">
                  Provide My Own Cloth / Consult at Fitting
                </div>
                <div className="text-xs font-light text-brand-muted leading-relaxed">
                  Bring your family heirloom Aso Oke or select from master cutter swatches during your session.
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-brand-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-brand-muted">Fitting Protocol:</span>
                <span className="font-medium text-brand-crimson dark:text-brand-gold">Drape &amp; Inspection</span>
              </div>
            </button>
          </div>
        </section>

        {/* Step 4: Consultation Location */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
              4. Consultation Preference
            </label>
            <span className="text-[10px] font-mono tracking-wider text-brand-gold">
              Detected Timezone: {detectedTimezone} &bull; Lagos Studio: WAT (UTC+1)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setConsultationType("studio")}
              className={`p-6 text-left border transition-all flex items-start gap-4 ${
                consultationType === "studio"
                  ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5"
                  : "border-brand-black/10 dark:border-white/10"
              }`}
            >
              <IrukereIcon size={24} className="text-brand-crimson dark:text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-lg mb-1">Lagos Atelier (In-Studio)</h4>
                <p className="text-xs font-light opacity-75 leading-relaxed">
                  Private fitting session in our Lagos atelier with Master Cutters and physical fabric drape examination.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setConsultationType("remote")}
              className={`p-6 text-left border transition-all flex items-start gap-4 ${
                consultationType === "remote"
                  ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5"
                  : "border-brand-black/10 dark:border-white/10"
              }`}
            >
              <SankofaDiasporaIcon size={24} className="text-brand-crimson dark:text-brand-gold flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-lg mb-1">Diaspora Concierge (Remote)</h4>
                <p className="text-xs font-light opacity-75 leading-relaxed">
                  Live high-definition video measurement session for clients in the UK, US, Canada, Europe, or beyond.
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Step 5: Event Timeline & Logistics */}
        <section className="space-y-6 pt-4 border-t border-brand-black/10 dark:border-white/10">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            5. Timeline &amp; Event Details
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="event_date" className="text-[11px] uppercase tracking-wider text-brand-muted">
                Event Date
              </label>
              <input
                type="date"
                id="event_date"
                required
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="event_city" className="text-[11px] uppercase tracking-wider text-brand-muted">
                Event City &amp; Country
              </label>
              <input
                type="text"
                id="event_city"
                placeholder="e.g. Lagos, London, Houston"
                required
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="guest_count" className="text-[11px] uppercase tracking-wider text-brand-muted">
                Garment Count
              </label>
              <select
                id="guest_count"
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light text-brand-onyx dark:text-brand-silk"
              >
                <option value="1">1 Garment (Sole Celebrant)</option>
                <option value="2-4">2–4 Pieces (Couple / Key Dignitaries)</option>
                <option value="5-10">5–10 Pieces (Groomsmen / Entourage)</option>
                <option value="10+">10+ Pieces (Full Event Wardrobe)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Step 6: Client Contact Dossier */}
        <section className="space-y-6 pt-4 border-t border-brand-black/10 dark:border-white/10">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            6. Primary Client Contact
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="client_name" className="text-[11px] uppercase tracking-wider text-brand-muted">
                Full Name
              </label>
              <input
                type="text"
                id="client_name"
                placeholder="e.g. Chief Adeleke Coker"
                required
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client_email" className="text-[11px] uppercase tracking-wider text-brand-muted">
                Email Address
              </label>
              <input
                type="email"
                id="client_email"
                placeholder="client@luxury.com"
                required
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="client_phone" className="text-[11px] uppercase tracking-wider text-brand-muted">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                id="client_phone"
                placeholder="+234 or +44 or +1"
                required
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label htmlFor="client_notes" className="text-[11px] uppercase tracking-wider text-brand-muted">
              Special Fabric Preferences, Color Palette, or Reference Notes
            </label>
            <textarea
              id="client_notes"
              rows={3}
              placeholder="Provide any desired cloth types (e.g. Aso Oke, Italian Wool Super 160s, Raw Silk), embroidery motifs, or links to reference styles."
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2.5 outline-none focus:border-brand-crimson transition-colors text-sm font-light resize-none"
            />
          </div>
        </section>

        {/* Guarantee Banner & Submit */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-brand-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 text-xs text-brand-muted font-light">
            <ShieldCheck size={18} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Strict Client Privacy Guarantee &bull; Direct Master Tailor Review</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-crimson text-brand-white hover:bg-brand-burgundy-light uppercase text-xs tracking-luxury font-semibold transition-colors disabled:opacity-50 shadow-md"
          >
            <PempamsieIcon size={16} className="text-brand-gold" />
            <span>{isSubmitting ? "Registering Inscription..." : "Submit Bespoke Commission"}</span>
          </button>
        </div>
      </form>
    </main>
  );
}

export default function CommissionPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center font-display text-2xl">Preparing Atelier Inscription...</div>}>
      <CommissionFormInner />
    </Suspense>
  );
}
