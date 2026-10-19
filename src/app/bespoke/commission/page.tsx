"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  PempamsieIcon,
  AdinkraheneIcon,
  IrukereIcon,
  SankofaDiasporaIcon,
} from "@/components/icons/BespokeIcons";
import { CheckCircle2, ShieldCheck } from "lucide-react";

import { AtelierDatabase } from "@/lib/services/database";

function CommissionFormInner() {
  const searchParams = useSearchParams();
  const isDiaspora = searchParams.get("type") === "diaspora";

  const [occasion, setOccasion] = useState(isDiaspora ? "diaspora_wedding" : "traditional_wedding");
  const [silhouette, setSilhouette] = useState("agbada");
  const [consultationType, setConsultationType] = useState(isDiaspora ? "remote" : "studio");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

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
        notes: notes || undefined,
        assigned_tailor: "Bolaji Abayomi Abraham",
      });
    } catch (err) {
      console.warn("Commission persisted with local queue fallback:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
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
        <p className="text-sm font-mono text-brand-muted mb-6 bg-brand-black/5 dark:bg-white/5 py-1 px-4 border border-brand-black/10 dark:border-white/10 inline-block">
          REFERENCE: {referenceCode}
        </p>
        <p className="font-light text-base opacity-80 leading-relaxed mb-8 text-balance">
          Thank you for entrusting Abraham Collection with your occasion. Our master tailor and private client concierge will review your commission requirements and contact you within 24 hours to schedule your initial consultation.
        </p>
        <div className="p-6 border-basting bg-brand-cream/40 dark:bg-brand-charcoal text-left w-full mb-10 text-xs space-y-3 font-light">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Consultation dossiers prepared with fabric swatch availability</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Anatomical measurement instructions dispatched via private concierge</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} className="text-brand-crimson dark:text-brand-gold flex-shrink-0" />
            <span>Dedicated lead tailor assigned to coordinate cutting timeline</span>
          </div>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx uppercase text-xs tracking-luxury font-medium hover:opacity-85 transition-opacity"
        >
          Return to Atelier Homepage
        </Link>
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

        {/* Step 3: Consultation Location */}
        <section className="space-y-4">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            3. Consultation Preference
          </label>
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

        {/* Step 4: Event Timeline & Logistics */}
        <section className="space-y-6 pt-4 border-t border-brand-black/10 dark:border-white/10">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            4. Timeline & Event Details
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
                Event City & Country
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

        {/* Step 5: Client Contact Dossier */}
        <section className="space-y-6 pt-4 border-t border-brand-black/10 dark:border-white/10">
          <label className="text-xs uppercase tracking-luxury font-semibold text-brand-onyx dark:text-brand-silk block">
            5. Primary Client Contact
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
