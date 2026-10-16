"use client";

import React from "react";
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
} from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, IrukereIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

export function UserProfileModal() {
  const { activeModal, setActiveModal, user, logout, wishlist, cart } = useAtelier();

  if (activeModal !== "profile") return null;

  return (
    <div className="fixed z-50 bottom-20 right-4 md:right-6 w-80 md:w-96 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden warm-glow-ring">
        
        {/* Header Profile Summary */}
        <div className="p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] relative">
          <button
            onClick={() => setActiveModal("none")}
            className="absolute top-4 right-4 text-brand-black/50 dark:text-white/60 hover:text-brand-crimson dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-full bg-brand-gold/20 border-2 border-brand-gold flex items-center justify-center text-brand-gold font-display text-lg font-medium shadow-inner p-3">
              {user.isAuthenticated && user.name ? user.name.slice(0, 2).toUpperCase() : <User size={22} />}
            </div>

            <div className="flex flex-col">
              <span className="font-patron italic text-lg font-normal tracking-wide text-brand-black dark:text-brand-white">
                {user.isAuthenticated ? user.name : "Welcome, Esteemed Patron"}
              </span>
              <span className="text-xs opacity-60 font-mono mt-0.5">
                {user.isAuthenticated ? user.email : "Sign in for private measurement vault"}
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

        {/* Profile Menu Items */}
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

          {/* Measurement Vault */}
          <div
            onClick={() => alert("Measurement Vault: 24 anatomical data points secured under Bolaji Abayomi Abraham master cutter key.")}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-black/5 dark:hover:bg-white/5 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Ruler size={16} className="text-brand-gold" />
              <span>Anatomical Measurement Vault</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-brand-gold font-mono">Secured</span>
          </div>

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
              <div className="flex items-center gap-2.5 text-[#25D366]">
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
      </div>
    </div>
  );
}
