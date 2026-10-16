"use client";

import React, { useState } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  Sparkles,
  ChevronUp,
  ChevronDown,
  RotateCw,
  Phone,
} from "lucide-react";
import { AbereIcon, PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

export function FloatingDock() {
  const {
    activeModal,
    setActiveModal,
    wishlist,
    cart,
    user,
    dockOrientation,
    toggleDockOrientation,
    isDockCollapsed,
    setIsDockCollapsed,
  } = useAtelier();

  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Swipe handling to switch orientation or collapse
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 40) {
      // Swiped vertically
      toggleDockOrientation();
    }
    setTouchStart(null);
  };

  const isHorizontal = dockOrientation === "horizontal";

  return (
    <aside
      aria-label="Atelier Navigation Dock"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed z-40 transition-all duration-500 ease-out select-none ${
        isHorizontal
          ? "bottom-6 left-1/2 -translate-x-1/2"
          : "right-4 top-1/2 -translate-y-1/2"
      }`}
    >
      <div
        className={`glass-dock rounded-full p-2 flex items-center gap-1.5 md:gap-2 shadow-2xl transition-all duration-300 ${
          isHorizontal ? "flex-row" : "flex-col"
        } ${isDockCollapsed ? "opacity-40 hover:opacity-100 scale-90" : "opacity-100 scale-100"}`}
      >
        {/* Node 1: AI Atelier Assistant (Siri Luminous Glow Ring) */}
        <button
          onClick={() => setActiveModal(activeModal === "assistant" ? "none" : "assistant")}
          className={`relative p-3 rounded-full transition-all duration-300 group ${
            activeModal === "assistant"
              ? "bg-brand-gold text-brand-onyx scale-110 shadow-lg"
              : "text-brand-gold hover:bg-white/10"
          }`}
          title="Abraham Atelier AI Assistant (Direct Voice & Concierge)"
        >
          {/* Pulsing Siri Glow Aura Ring */}
          <span className="absolute inset-0 rounded-full siri-glow-ring opacity-75 group-hover:opacity-100 -z-10 blur-[2px]" />
          
          <AbereIcon size={19} className="group-hover:rotate-12 transition-transform duration-300" />
          
          {/* Active online green dot */}
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-brand-onyx animate-pulse" />
        </button>

        <div className={`bg-white/10 ${isHorizontal ? "w-px h-6" : "h-px w-6"}`} />

        {/* Node 2: Visual Search / Garment Finder */}
        <button
          onClick={() => setActiveModal(activeModal === "search" ? "none" : "search")}
          className={`p-3 rounded-full transition-all duration-300 text-brand-silk/80 hover:text-white hover:bg-white/10 ${
            activeModal === "search" ? "bg-white/20 text-white scale-105" : ""
          }`}
          title="Search Atelier Collections & Textiles"
        >
          <Search size={18} />
        </button>

        {/* Node 3: Wishlist & Saved Pieces */}
        <button
          onClick={() => setActiveModal(activeModal === "wishlist" ? "none" : "wishlist")}
          className={`relative p-3 rounded-full transition-all duration-300 text-brand-silk/80 hover:text-brand-crimson hover:bg-white/10 ${
            activeModal === "wishlist" ? "bg-white/20 text-brand-crimson scale-105" : ""
          }`}
          title="View Saved Silhouettes"
        >
          <Heart size={18} className={wishlist.length > 0 ? "text-brand-crimson fill-brand-crimson" : ""} />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-1 bg-brand-crimson text-white text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Node 4: User Profile Card (REAVO Architecture) */}
        <button
          onClick={() => setActiveModal(activeModal === "profile" ? "none" : "profile")}
          className={`relative p-3 rounded-full transition-all duration-300 text-brand-silk/80 hover:text-white hover:bg-white/10 ${
            activeModal === "profile" ? "bg-white/20 text-white scale-105" : ""
          }`}
          title="Client Profile & Measurement Vault"
        >
          {user.isAuthenticated && user.name ? (
            <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-onyx text-[10px] font-bold flex items-center justify-center font-display">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
          ) : (
            <User size={18} />
          )}

          {/* Status Indicator Dot */}
          <span
            className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ring-1 ring-brand-onyx ${
              user.isAuthenticated ? "bg-emerald-400" : "bg-brand-gold/60"
            }`}
          />
        </button>

        {/* Node 5: Shopping Bag / Instant Cart */}
        <button
          onClick={() => setActiveModal(activeModal === "cart" ? "none" : "cart")}
          className={`relative p-3 rounded-full transition-all duration-300 text-brand-silk/80 hover:text-white hover:bg-white/10 ${
            activeModal === "cart" ? "bg-white/20 text-white scale-105" : ""
          }`}
          title="Sartorial Bag & 3-Click Checkout"
        >
          <ShoppingBag size={18} />
          {cart.length > 0 && (
            <span className="absolute top-1 right-1 bg-brand-gold text-brand-onyx text-[9px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
              {cart.length}
            </span>
          )}
        </button>

        <div className={`bg-white/10 ${isHorizontal ? "w-px h-6" : "h-px w-6"}`} />

        {/* Orientation & Collapse Control */}
        <button
          onClick={toggleDockOrientation}
          className="p-2 text-white/40 hover:text-white transition-colors"
          title={isHorizontal ? "Switch dock to vertical edge pill" : "Switch dock to horizontal bottom bar"}
        >
          <RotateCw size={13} className="hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </aside>
  );
}
