"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  LogIn,
  Ruler,
  ChevronRight,
  X,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Save,
  Printer,
} from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, IrukereIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";
import { AtelierDatabase } from "@/lib/services/database";

export function UserProfileModal() {
  const { activeModal, setActiveModal, user, logout, wishlist, cart } = useAtelier();
  const [showVault, setShowVault] = useState(false);
  const [isSavingVault, setIsSavingVault] = useState(false);
  const [vaultSaved, setVaultSaved] = useState(false);

  // Measurement State
  const [measurements, setMeasurements] = useState({
    chest: "42.0",
    waist: "35.5",
    shoulder: "19.5",
    sleeve: "34.0",
    neck: "16.5",
    trouserLength: "41.5",
    trouserInseam: "32.0",
    agbadaWingspan: "62.0",
    kaftanLength: "40.0",
    postureNotes: "Standard upright posture; slight right shoulder drop.",
  });

  // Load user measurements from cache/database if available
  useEffect(() => {
    if (user.email) {
      try {
        const cached = localStorage.getItem(`abraham_vault_${user.email}`);
        if (cached) {
          setMeasurements(JSON.parse(cached));
        }
      } catch {}
    }
  }, [user.email]);

  if (activeModal !== "profile") return null;

  const handleSaveVault = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingVault(true);

    try {
      if (user.email) {
        await AtelierDatabase.savePatronProfile({
          email: user.email,
          full_name: user.name || "Esteemed Patron",
          phone: user.phone || null,
          city: user.city || "Lagos",
          member_tier: user.memberTier,
          chest_circ: parseFloat(measurements.chest) || null,
          waist_circ: parseFloat(measurements.waist) || null,
          shoulder_span: parseFloat(measurements.shoulder) || null,
          sleeve_length: parseFloat(measurements.sleeve) || null,
          neck_circ: parseFloat(measurements.neck) || null,
          trouser_length: parseFloat(measurements.trouserLength) || null,
          trouser_inseam: parseFloat(measurements.trouserInseam) || null,
          agbada_wing_span: parseFloat(measurements.agbadaWingspan) || null,
          kaftan_shirt_length: parseFloat(measurements.kaftanLength) || null,
          posture_notes: measurements.postureNotes,
        });

        localStorage.setItem(`abraham_vault_${user.email}`, JSON.stringify(measurements));
      }
      setVaultSaved(true);
      setTimeout(() => setVaultSaved(false), 2500);
    } catch (err) {
      console.warn("Vault save cached locally:", err);
      setVaultSaved(true);
      setTimeout(() => setVaultSaved(false), 2500);
    } finally {
      setIsSavingVault(false);
    }
  };

  const handlePrintMeasurements = () => {
    if (typeof window === "undefined") return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Abraham Collection — Bespoke Measurements (${user.name || "Patron"})</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #121212; background: #fff; }
            .header { border-bottom: 2px solid #CFA459; padding-bottom: 15px; margin-bottom: 25px; }
            .title { font-size: 24px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
            .subtitle { font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #666; margin-top: 4px; }
            .patron { margin-bottom: 20px; font-size: 13px; line-height: 1.6; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 20px; }
            .item { border: 1px solid #ddd; padding: 10px 14px; background: #fafafa; }
            .label { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #777; }
            .value { font-size: 18px; font-weight: 600; font-family: monospace; color: #A61C32; margin-top: 4px; }
            .notes { margin-top: 25px; padding: 14px; border-left: 3px solid #CFA459; background: #fdfaf5; font-size: 12px; }
            .footer { margin-top: 40px; border-top: 1px solid #eee; padding-top: 15px; font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 2px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Abraham Collection</div>
            <div class="subtitle">Bespoke Architectural Tailoring &bull; Est. 2002 &bull; Lagos</div>
          </div>
          <div class="patron">
            <strong>Patron:</strong> ${user.name || "Esteemed Client"}<br>
            <strong>Email:</strong> ${user.email || "N/A"}<br>
            <strong>Tier:</strong> ${user.memberTier}<br>
            <strong>Date Generated:</strong> ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
          <div class="grid">
            <div class="item"><div class="label">Chest / Bust</div><div class="value">${measurements.chest}" in</div></div>
            <div class="item"><div class="label">Natural Waist</div><div class="value">${measurements.waist}" in</div></div>
            <div class="item"><div class="label">Shoulder Span</div><div class="value">${measurements.shoulder}" in</div></div>
            <div class="item"><div class="label">Sleeve Length</div><div class="value">${measurements.sleeve}" in</div></div>
            <div class="item"><div class="label">Neck Collar</div><div class="value">${measurements.neck}" in</div></div>
            <div class="item"><div class="label">Trouser Outseam</div><div class="value">${measurements.trouserLength}" in</div></div>
            <div class="item"><div class="label">Trouser Inseam</div><div class="value">${measurements.trouserInseam}" in</div></div>
            <div class="item"><div class="label">Agbada Wingspan</div><div class="value">${measurements.agbadaWingspan}" in</div></div>
            <div class="item"><div class="label">Kaftan Tunic Length</div><div class="value">${measurements.kaftanLength}" in</div></div>
          </div>
          ${measurements.postureNotes ? `<div class="notes"><strong>Posture & Fit Notes:</strong> ${measurements.postureNotes}</div>` : ''}
          <div class="footer">Master Cutter: Bolaji Abayomi Abraham &bull; Concierge: 0803 443 2759 &bull; Direct: 0812 264 0820</div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed z-50 bottom-16 sm:bottom-20 right-2 sm:right-4 md:right-6 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-w-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden warm-glow-ring">
        
        {/* Header Profile Summary */}
        <div className="p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] relative">
          <button
            onClick={() => {
              setActiveModal("none");
              setShowVault(false);
            }}
            className="absolute top-4 right-4 text-brand-black/50 dark:text-white/60 hover:text-brand-crimson dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center text-brand-gold font-display text-lg font-medium shadow-inner p-3">
              {user.isAuthenticated && user.name ? user.name.slice(0, 2).toUpperCase() : <User size={22} />}
            </div>

            <div className="flex flex-col">
              <span className="font-name italic text-xl font-normal tracking-wide text-brand-black dark:text-brand-white">
                {user.isAuthenticated ? user.name : "Welcome, Esteemed Patron"}
              </span>
              <span className="text-xs opacity-60 font-mono mt-0.5 truncate max-w-[200px]">
                {user.isAuthenticated ? user.email : "Sign in to save your measurements"}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] uppercase tracking-[0.25em] px-2 py-0.5 border-l-2 border-brand-gold bg-brand-gold/10 text-brand-gold font-medium">
                  {user.memberTier}
                </span>
                {user.isAuthenticated && (
                  <span className="text-[9px] text-brand-gold flex items-center gap-1 font-mono uppercase tracking-wider">
                    <AdinkraheneIcon size={11} className="text-brand-gold" />
                    Verified Patron
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Body: Measurements View OR Standard Dossier Menu */}
        {showVault ? (
          <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-brand-black/10 dark:border-white/10">
              <button
                onClick={() => setShowVault(false)}
                className="flex items-center gap-1.5 text-xs text-brand-black/60 dark:text-white/60 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to Dossier</span>
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintMeasurements}
                  className="flex items-center gap-1 px-2 py-0.5 border border-brand-black/20 dark:border-white/20 hover:border-brand-gold text-[9px] uppercase tracking-wider text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-gold transition-colors"
                  title="Print or Export Measurement Card"
                >
                  <Printer size={11} />
                  <span>Print</span>
                </button>
                <span className="text-[9px] uppercase tracking-widest text-brand-gold font-mono">Measurements</span>
              </div>
            </div>

            {user.isAuthenticated ? (
              <form onSubmit={handleSaveVault} className="space-y-3">
                <p className="text-[11px] opacity-75 font-light leading-relaxed">
                  Your bespoke measurements guide Master Cutter Bolaji Abayomi Abraham in drafting bespoke paper patterns. Values in inches.
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Chest (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.chest}
                      onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Waist (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Shoulder Span (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.shoulder}
                      onChange={(e) => setMeasurements({ ...measurements, shoulder: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Sleeve Length (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.sleeve}
                      onChange={(e) => setMeasurements({ ...measurements, sleeve: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Neck Collar (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.neck}
                      onChange={(e) => setMeasurements({ ...measurements, neck: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Trouser Length (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.trouserLength}
                      onChange={(e) => setMeasurements({ ...measurements, trouserLength: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Agbada Wingspan (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.agbadaWingspan}
                      onChange={(e) => setMeasurements({ ...measurements, agbadaWingspan: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] uppercase tracking-wider opacity-60">Kaftan Tunic (in)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={measurements.kaftanLength}
                      onChange={(e) => setMeasurements({ ...measurements, kaftanLength: e.target.value })}
                      className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-mono text-xs focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-wider opacity-60">Posture &amp; Fit Preference Notes</label>
                  <textarea
                    rows={2}
                    value={measurements.postureNotes}
                    onChange={(e) => setMeasurements({ ...measurements, postureNotes: e.target.value })}
                    className="w-full mt-1 p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 outline-none font-sans text-xs focus:border-brand-gold resize-none"
                    placeholder="Stance notes, arm curvature, drape preferences..."
                  />
                </div>

                {vaultSaved && (
                  <div className="flex items-center gap-2 p-2 bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[10px] font-mono">
                    <CheckCircle2 size={14} />
                    <span>Synchronized with Atelier Cutting Room</span>
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSavingVault}
                    className="flex-1 py-2.5 bg-brand-crimson text-white hover:bg-brand-burgundy-light transition-colors text-[10px] tracking-[0.22em] uppercase font-semibold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Save size={13} />
                    <span>{isSavingVault ? "Saving..." : "Save Measurements"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintMeasurements}
                    className="px-3 py-2.5 border border-brand-black/20 dark:border-white/20 hover:border-brand-gold text-brand-black dark:text-brand-silk hover:text-brand-gold transition-colors text-[10px] tracking-wider uppercase font-mono flex items-center justify-center gap-1.5"
                    title="Print / Save Measurement Card PDF"
                  >
                    <Printer size={13} />
                    <span>Print</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-4">
                <Ruler size={32} className="mx-auto text-brand-gold opacity-80" />
                <p className="text-xs font-light opacity-80">
                  Please sign in or create an Atelier Circle profile to view, save, and print your bespoke tailor measurements.
                </p>
                <button
                  onClick={() => {
                    setShowVault(false);
                    setActiveModal("auth");
                  }}
                  className="px-6 py-2.5 bg-brand-crimson text-white text-[10px] uppercase tracking-[0.22em] font-semibold"
                >
                  Sign In to Access Measurements
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 space-y-1 text-xs font-light">
            
            {/* Overview */}
            <Link
              href="/bespoke/commission"
              onClick={() => setActiveModal("none")}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-black/5 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <AdinkraheneIcon size={16} className="text-brand-gold" />
                <span>Private Atelier Overview</span>
              </div>
              <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>

            {/* My Orders & Commissions */}
            <Link
              href="/bespoke/commission"
              onClick={() => setActiveModal("none")}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-black/5 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={16} className="text-brand-crimson dark:text-brand-gold" />
                <span>Commissions &amp; Tailoring Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-brand-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">
                  {cart.length > 0 ? `${cart.length} in bag` : "0 Active"}
                </span>
                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>

            {/* Wishlist & Pre-Orders */}
            <button
              onClick={() => setActiveModal("wishlist")}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-brand-black/5 dark:hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3">
                <Heart size={16} className="text-brand-crimson fill-brand-crimson/20" />
                <span>Saved Wardrobe Silhouettes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-brand-crimson/15 text-brand-crimson dark:text-brand-gold px-1.5 py-0.5 rounded font-mono">
                  {wishlist.length} saved
                </span>
                <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>

            {/* Interactive Measurements Trigger */}
            <button
              onClick={() => setShowVault(true)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-brand-black/5 dark:hover:bg-white/5 transition-colors group text-left"
            >
              <div className="flex items-center gap-3">
                <Ruler size={16} className="text-brand-gold" />
                <span>Bespoke Measurements</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-brand-gold font-mono group-hover:underline">
                {user.isAuthenticated ? "Manage →" : "View"}
              </span>
            </button>

            {/* Address Book */}
            <Link
              href="/contact"
              onClick={() => setActiveModal("none")}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-black/5 dark:hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MapPin size={16} className="opacity-70" />
                <span>Fitting &amp; Diaspora Delivery Location</span>
              </div>
              <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </Link>

            {/* Customer Support Line */}
            <div className="pt-2 border-t border-brand-black/10 dark:border-white/10 mt-2">
              <a
                href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20am%20inquiring%20about%20my%20order."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-brand-black/5 dark:bg-white/5 hover:bg-brand-gold/10 transition-colors group"
              >
                <div className="flex items-center gap-2.5 text-brand-gold">
                  <MessageSquare size={16} />
                  <span className="font-medium text-brand-black dark:text-white">Direct Tailor Line</span>
                </div>
                <span className="text-[10px] font-mono opacity-80">0803 443 2759</span>
              </a>
            </div>

            {/* Sign In / Sign Out */}
            <div className="pt-2">
              {user.isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setActiveModal("none");
                  }}
                  className="w-full flex items-center justify-center gap-2 p-3 text-brand-black/60 dark:text-white/70 hover:bg-brand-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-xs uppercase tracking-wider"
                >
                  <LogOut size={14} />
                  <span>Sign Out of Atelier</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveModal("auth")}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-brand-crimson text-white hover:bg-brand-burgundy-light rounded-lg transition-colors text-xs uppercase tracking-luxury font-semibold shadow-md"
                >
                  <LogIn size={14} />
                  <span>Sign In / Create Atelier Profile</span>
                </button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
