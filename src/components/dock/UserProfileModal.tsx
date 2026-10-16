"use client";

import React from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  HelpCircle,
  LogOut,
  LogIn,
  Ruler,
  ChevronRight,
  ShieldCheck,
  X,
  Phone,
  MessageSquare,
} from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, AbereIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

export function UserProfileModal() {
  const { activeModal, setActiveModal, user, logout, wishlist, cart } = useAtelier();

  if (activeModal !== "profile") return null;

  return (
    <div className="fixed z-50 bottom-24 right-4 md:right-16 w-80 md:w-96 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-brand-onyx/95 backdrop-blur-2xl text-brand-white border border-brand-gold/30 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Profile Summary */}
        <div className="p-5 border-b border-white/10 bg-brand-black/40 relative">
          <button
            onClick={() => setActiveModal("none")}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-crimson/50 border-2 border-brand-gold flex items-center justify-center text-brand-gold font-display text-xl font-medium shadow-inner">
              {user.isAuthenticated && user.name ? user.name.slice(0, 2).toUpperCase() : <User size={24} />}
            </div>

            <div className="flex flex-col">
              <span className="font-display text-base font-medium tracking-wide">
                {user.isAuthenticated ? user.name : "Welcome, Guest Patron"}
              </span>
              <span className="text-xs text-white/60 font-mono mt-0.5">
                {user.isAuthenticated ? user.email : "Sign in for private measurement vault"}
              </span>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 font-medium">
                  {user.memberTier}
                </span>
                {user.isAuthenticated && (
                  <span className="text-[9px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Menu Items (REAVO Architecture) */}
        <div className="p-3 space-y-1 text-xs font-light">
          
          {/* Overview */}
          <Link
            href="/bespoke/commission"
            onClick={() => setActiveModal("none")}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <AdinkraheneIcon size={16} className="text-brand-gold" />
              <span>Overview &amp; Private Atelier</span>
            </div>
            <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* My Orders & Commissions */}
          <Link
            href="/admin"
            onClick={() => setActiveModal("none")}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={16} className="text-brand-crimson dark:text-brand-gold" />
              <span>My Commissions &amp; Orders</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono">
                {cart.length > 0 ? `${cart.length} in bag` : "0 Active"}
              </span>
              <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Link>

          {/* Wishlist & Pre-Orders */}
          <button
            onClick={() => setActiveModal("wishlist")}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group text-left"
          >
            <div className="flex items-center gap-3">
              <Heart size={16} className="text-brand-crimson fill-brand-crimson/20" />
              <span>Wishlist &amp; Saved Silhouettes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-brand-crimson/20 text-brand-gold px-1.5 py-0.5 rounded font-mono">
                {wishlist.length} saved
              </span>
              <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>

          {/* Measurement Vault */}
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
            onClick={() => alert("Measurement Vault: 24 anatomical data points secured under Bolaji Abayomi Abraham master cutter key.")}
          >
            <div className="flex items-center gap-3">
              <Ruler size={16} className="text-brand-gold" />
              <span>Anatomical Measurement Vault</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono">Secured</span>
          </div>

          {/* Address Book */}
          <Link
            href="/contact"
            onClick={() => setActiveModal("none")}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-white/70" />
              <span>Fitting &amp; Diaspora Delivery Address</span>
            </div>
            <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </Link>

          {/* Customer Support Line */}
          <div className="pt-2 border-t border-white/10 mt-2">
            <a
              href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20need%20concierge%20support%20with%20my%20order."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-brand-gold/10 transition-colors group"
            >
              <div className="flex items-center gap-3 text-emerald-400">
                <MessageSquare size={16} />
                <span className="font-medium text-white">Direct Tailor Line (Eranibaniso)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">0803 443 2759</span>
            </a>
          </div>

          {/* Sign In or Sign Out Button */}
          <div className="pt-2">
            {user.isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setActiveModal("none");
                }}
                className="w-full flex items-center justify-center gap-2 p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-xs uppercase tracking-wider"
              >
                <LogOut size={14} />
                <span>Sign Out of Atelier</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal("auth")}
                className="w-full flex items-center justify-center gap-2 p-3 bg-brand-crimson text-white hover:bg-brand-burgundy-light rounded-lg transition-colors text-xs uppercase tracking-luxury font-semibold"
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
