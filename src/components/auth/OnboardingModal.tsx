"use client";

import React, { useState } from "react";
import { X, Check, ArrowRight, Sparkles, Shield, Ruler, MapPin, Scissors } from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, OjuOyaIcon, AdeAreIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";
import { AtelierDatabase } from "@/lib/services/database";

const SILHOUETTES = [
  { id: "agbada", label: "Grand 3-Piece Agbada", desc: "Ceremonial robe with hand-stitched Aso Oke bib" },
  { id: "suiting", label: "British-Italian Bespoke Suit", desc: "Floating canvas, peak/notch lapels, virgin wool" },
  { id: "senator", label: "Modern Senator Tunic Suite", desc: "Sharply tailored collar and tapered trousers" },
  { id: "dandogo", label: "Royal Dandogo Regalia", desc: "360-degree pleated Yoruba imperial robe" },
  { id: "womenswear", label: "Sculptural Eveningwear", desc: "Architectural crepe gowns and bespoke draping" },
];

export function OnboardingModal() {
  const { activeModal, setActiveModal, user, login } = useAtelier();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedSilhouette, setSelectedSilhouette] = useState("agbada");
  const [consultationPref, setConsultationPref] = useState<"studio" | "remote">("studio");
  const [chestCirc, setChestCirc] = useState("");
  const [waistCirc, setWaistCirc] = useState("");
  const [shoulderSpan, setShoulderSpan] = useState("");
  const [trouserLength, setTrouserLength] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (activeModal !== "onboarding") return null;

  const handleFinishOnboarding = async (skipMeasurements = false) => {
    setIsSaving(true);
    const profileUpdate = {
      email: user.email,
      full_name: user.name,
      preferred_silhouette: selectedSilhouette,
      onboarding_completed: true,
      ...(skipMeasurements
        ? {}
        : {
            chest_circ: chestCirc ? parseFloat(chestCirc) : null,
            waist_circ: waistCirc ? parseFloat(waistCirc) : null,
            shoulder_span: shoulderSpan ? parseFloat(shoulderSpan) : null,
            trouser_length: trouserLength ? parseFloat(trouserLength) : null,
          }),
    };

    try {
      await AtelierDatabase.savePatronProfile(profileUpdate);
    } catch (err) {
      console.warn("Onboarding profile save notice:", err);
    }

    login({
      preferredSilhouette: selectedSilhouette,
      hasVaultMeasurements: !skipMeasurements && !!(chestCirc || waistCirc),
    });

    setIsSaving(false);
    setActiveModal("none");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#FCFAF7] dark:bg-brand-onyx text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative warm-glow-ring flex flex-col max-h-[92vh]">
        
        {/* Subtle Heritage Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5 text-brand-gold">
          <AdinkraheneIcon size={320} />
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-brand-black/60 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <AdeAreIcon size={18} className="text-brand-gold" />
            <div>
              <span className="font-display tracking-wider text-sm sm:text-base font-medium">The Atelier Initiation</span>
              <p className="text-[9px] font-mono text-brand-black/50 dark:text-white/50">Est. 2002 &bull; 24 Years of Master Tailoring</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal("none")}
            className="text-brand-black/50 dark:text-white/60 hover:text-brand-black dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="grid grid-cols-3 border-b border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 text-[10px] uppercase font-mono tracking-widest relative z-10">
          <div className={`py-2 text-center border-b-2 transition-colors ${step >= 1 ? "border-brand-gold text-brand-gold font-bold" : "border-transparent opacity-40"}`}>
            1. Prestige Tier
          </div>
          <div className={`py-2 text-center border-b-2 transition-colors ${step >= 2 ? "border-brand-gold text-brand-gold font-bold" : "border-transparent opacity-40"}`}>
            2. Silhouette Affinity
          </div>
          <div className={`py-2 text-center border-b-2 transition-colors ${step >= 3 ? "border-brand-gold text-brand-gold font-bold" : "border-transparent opacity-40"}`}>
            3. Vault Setup
          </div>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 space-y-5 text-xs relative z-10">
          
          {/* STEP 1: WELCOME & TIER INDUCTION */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="text-center space-y-2 pb-2">
                <span className="inline-block px-2.5 py-1 text-[9px] uppercase tracking-widest font-mono bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                  Patron Induction
                </span>
                <h3 className="font-display text-2xl font-light">
                  Welcome to <span className="font-name italic">Abraham Collection</span>, {user.name || "Esteemed Patron"}.
                </h3>
                <p className="text-xs text-brand-black/70 dark:text-white/70 max-w-sm mx-auto leading-relaxed">
                  Your profile has been elevated to the <span className="text-brand-gold font-semibold font-mono">Atelier Circle</span>. Under the direction of Master Cutter Bolaji Abayomi Abraham, enjoy private salon access and diaspora fittings.
                </p>
              </div>

              {/* Privilege Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 rounded-lg space-y-1">
                  <Sparkles size={16} className="text-brand-gold" />
                  <h4 className="font-display uppercase tracking-wider text-[11px] font-medium">Textile Priority</h4>
                  <p className="text-[10px] opacity-70 leading-normal">First selection of hand-loomed Royal Alaari Silk and Super 150s English Wool.</p>
                </div>

                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 rounded-lg space-y-1">
                  <Shield size={16} className="text-brand-gold" />
                  <h4 className="font-display uppercase tracking-wider text-[11px] font-medium">Anatomical Vault</h4>
                  <p className="text-[10px] opacity-70 leading-normal">24 structural coordinates secured under Master Cutter passkey.</p>
                </div>

                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 rounded-lg space-y-1">
                  <MapPin size={16} className="text-brand-gold" />
                  <h4 className="font-display uppercase tracking-wider text-[11px] font-medium">Diaspora Courier</h4>
                  <p className="text-[10px] opacity-70 leading-normal">Direct DHL Express delivery across UK, USA, Canada, and Western Europe.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white uppercase tracking-luxury text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg mt-4"
              >
                <span>Select Your Silhouette Affinity</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* STEP 2: SILHOUETTE PREFERENCE & FITTING PROTOCOL */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h4 className="font-display text-lg uppercase tracking-wider font-medium">Sartorial Preference</h4>
                <p className="text-xs opacity-70">Which archival silhouettes define your upcoming wardrobe commissions?</p>
              </div>

              <div className="space-y-2">
                {SILHOUETTES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSilhouette(s.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                      selectedSilhouette === s.id
                        ? "border-brand-gold bg-brand-gold/10 text-brand-black dark:text-white"
                        : "border-brand-black/10 dark:border-white/10 hover:border-brand-gold/40"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs flex items-center gap-2">
                        <Scissors size={12} className={selectedSilhouette === s.id ? "text-brand-gold" : "opacity-40"} />
                        <span>{s.label}</span>
                      </div>
                      <p className="text-[10px] opacity-60 mt-0.5">{s.desc}</p>
                    </div>
                    {selectedSilhouette === s.id && (
                      <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-onyx flex items-center justify-center text-[10px] font-bold">
                        <Check size={12} />
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Consultation Preference */}
              <div className="pt-2">
                <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1.5">Fitting Protocol</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setConsultationPref("studio")}
                    className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                      consultationPref === "studio"
                        ? "border-brand-gold bg-brand-gold/15 text-brand-gold font-bold"
                        : "border-brand-black/10 dark:border-white/10 opacity-70"
                    }`}
                  >
                    Lagos Studio Fitting
                  </button>
                  <button
                    type="button"
                    onClick={() => setConsultationPref("remote")}
                    className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                      consultationPref === "remote"
                        ? "border-brand-gold bg-brand-gold/15 text-brand-gold font-bold"
                        : "border-brand-black/10 dark:border-white/10 opacity-70"
                    }`}
                  >
                    Diaspora Virtual Video
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 border border-brand-black/15 dark:border-white/15 hover:border-brand-gold text-xs uppercase tracking-wider rounded-lg transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-brand-crimson hover:bg-brand-burgundy-light text-white uppercase tracking-luxury text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Vault Setup</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ANATOMICAL MEASUREMENT VAULT QUICK-START */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-gold">
                  <Ruler size={16} />
                  <h4 className="font-display text-lg uppercase tracking-wider font-medium">Anatomical Vault Quick-Start</h4>
                </div>
                <p className="text-xs opacity-70">
                  Input your 4 core structural measurements now (in inches), or skip to explore the catalog and complete the 24-point vault later.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-lg">
                  <label className="block text-[9.5px] uppercase tracking-wider opacity-60 mb-1 font-mono">Chest / Bust (in)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={chestCirc}
                    onChange={(e) => setChestCirc(e.target.value)}
                    placeholder="e.g. 42.0"
                    className="w-full bg-transparent outline-none font-mono text-base text-brand-gold font-semibold"
                  />
                </div>

                <div className="p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-lg">
                  <label className="block text-[9.5px] uppercase tracking-wider opacity-60 mb-1 font-mono">Natural Waist (in)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={waistCirc}
                    onChange={(e) => setWaistCirc(e.target.value)}
                    placeholder="e.g. 36.0"
                    className="w-full bg-transparent outline-none font-mono text-base text-brand-gold font-semibold"
                  />
                </div>

                <div className="p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-lg">
                  <label className="block text-[9.5px] uppercase tracking-wider opacity-60 mb-1 font-mono">Shoulder Span (in)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={shoulderSpan}
                    onChange={(e) => setShoulderSpan(e.target.value)}
                    placeholder="e.g. 19.5"
                    className="w-full bg-transparent outline-none font-mono text-base text-brand-gold font-semibold"
                  />
                </div>

                <div className="p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-lg">
                  <label className="block text-[9.5px] uppercase tracking-wider opacity-60 mb-1 font-mono">Trouser Outseam (in)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={trouserLength}
                    onChange={(e) => setTrouserLength(e.target.value)}
                    placeholder="e.g. 41.5"
                    className="w-full bg-transparent outline-none font-mono text-base text-brand-gold font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleFinishOnboarding(false)}
                  className="w-full py-3.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white uppercase tracking-luxury text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <PempamsieIcon size={14} className="text-brand-gold" />
                  <span>{isSaving ? "Preserving Vault..." : "Seal Vault & Enter Flagship"}</span>
                </button>

                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleFinishOnboarding(true)}
                  className="w-full py-2.5 text-center text-xs opacity-60 hover:opacity-100 hover:text-brand-gold transition-colors underline uppercase tracking-widest font-mono"
                >
                  I will complete my 24 measurements later
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
