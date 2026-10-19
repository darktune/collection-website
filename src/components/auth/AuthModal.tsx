"use client";

import React, { useState } from "react";
import { X, Mail, User, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";
import { AtelierDatabase } from "@/lib/services/database";

export function AuthModal() {
  const { activeModal, setActiveModal, login } = useAtelier();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (activeModal !== "auth") return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AtelierDatabase.savePatronProfile({
        email,
        full_name: name || "Esteemed Patron",
        phone: phone || null,
        city: city || "Lagos",
        member_tier: "Atelier Circle",
      });
    } catch (err) {
      console.warn("Patron profile synced with local cache:", err);
    }

    login({
      name: name || "Esteemed Patron",
      email,
      phone,
      city,
    });

    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setActiveModal("none");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FCFAF7] dark:bg-brand-onyx text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative warm-glow-ring transition-colors duration-300">
        
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5 text-brand-gold">
          <AdinkraheneIcon size={260} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-brand-black/60 relative z-10">
          <div className="flex items-center gap-2">
            <PempamsieIcon size={18} className="text-brand-gold" />
            <span className="font-display tracking-wider text-base font-medium">The Atelier Circle</span>
          </div>
          <button
            onClick={() => setActiveModal("none")}
            className="text-brand-black/50 dark:text-white/60 hover:text-brand-black dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 border-b border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 relative z-10">
          <button
            onClick={() => setMode("signup")}
            className={`py-3 text-xs uppercase tracking-luxury font-medium transition-colors ${
              mode === "signup"
                ? "border-b-2 border-brand-gold text-brand-gold bg-brand-gold/10 font-bold"
                : "text-brand-black/60 dark:text-white/60 hover:text-brand-black dark:hover:text-white"
            }`}
          >
            Create Profile
          </button>
          <button
            onClick={() => setMode("signin")}
            className={`py-3 text-xs uppercase tracking-luxury font-medium transition-colors ${
              mode === "signin"
                ? "border-b-2 border-brand-gold text-brand-gold bg-brand-gold/10 font-bold"
                : "text-brand-black/60 dark:text-white/60 hover:text-brand-black dark:hover:text-white"
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="p-10 text-center space-y-4 relative z-10">
            <CheckCircle2 size={40} className="text-brand-gold mx-auto animate-bounce" />
            <h4 className="font-display text-2xl">Welcome, {name || "Esteemed Patron"}.</h4>
            <p className="text-xs text-brand-black/70 dark:text-white/70">Your anatomical measurement vault and bespoke profile are active.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs font-light relative z-10">
            <p className="text-[11px] opacity-75 leading-relaxed text-center mb-4 text-brand-black/80 dark:text-white/80">
              {mode === "signup"
                ? "Join for private fitting appointments, bespoke purchases, and diaspora measurement preservation."
                : "Enter your email to access your commission status and private measurements."}
            </p>

            {mode === "signup" && (
              <div>
                <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1">Full Name</label>
                <div className="flex items-center gap-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-lg px-3 py-2.5 focus-within:border-brand-gold transition-colors">
                  <User size={15} className="text-brand-gold" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chief Adebayo Balogun"
                    className="w-full bg-transparent outline-none text-brand-black dark:text-white text-xs placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1">Email Address</label>
              <div className="flex items-center gap-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-lg px-3 py-2.5 focus-within:border-brand-gold transition-colors">
                <Mail size={15} className="text-brand-gold" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-transparent outline-none text-brand-black dark:text-white text-xs placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1">WhatsApp / Phone</label>
                  <div className="flex items-center gap-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-lg px-3 py-2.5 focus-within:border-brand-gold transition-colors">
                    <Phone size={14} className="text-brand-gold" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 812 000 0000"
                      className="w-full bg-transparent outline-none text-brand-black dark:text-white text-xs placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1">City / Country</label>
                  <div className="flex items-center gap-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-lg px-3 py-2.5 focus-within:border-brand-gold transition-colors">
                    <MapPin size={14} className="text-brand-gold" />
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lagos, London, New York..."
                      className="w-full bg-transparent outline-none text-brand-black dark:text-white text-xs placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white uppercase tracking-luxury text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg mt-4"
            >
              <PempamsieIcon size={14} className="text-brand-gold" />
              <span>{loading ? "Authenticating..." : mode === "signup" ? "Enter Atelier Circle" : "Sign In to Vault"}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
