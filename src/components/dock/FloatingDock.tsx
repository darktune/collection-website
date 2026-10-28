"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  RotateCw,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  Sun,
  Moon,
} from "lucide-react";
import { IrukereIcon, AbereIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

export function FloatingDock() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 40) {
      toggleDockOrientation();
    }
    setTouchStart(null);
  };

  const isHorizontal = dockOrientation === "horizontal";

  // If collapsed: show single discreet warm trigger at bottom-right
  if (isDockCollapsed) {
    return (
      <aside
        aria-label="Atelier Navigation Trigger"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 transition-all duration-300"
      >
        <button
          onClick={() => setIsDockCollapsed(false)}
          className="relative p-3.5 rounded-full glass-dock border border-brand-gold/40 text-brand-gold hover:scale-105 transition-transform shadow-2xl warm-glow-ring flex items-center justify-center group"
          title="Open Atelier Concierge & Wardrobe"
        >
          <IrukereIcon size={20} className="group-hover:rotate-6 transition-transform" />
          
          {/* Subtle active notification dot */}
          {(wishlist.length > 0 || cart.length > 0) && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-brand-crimson ring-2 ring-brand-onyx" />
          )}
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Atelier Navigation Dock"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 transition-all duration-300 ease-out select-none`}
    >
      <div
        className={`glass-dock rounded-full p-1.5 md:p-2 flex items-center gap-1 md:gap-2 shadow-2xl border border-brand-gold/30 transition-all duration-300 ${
          isHorizontal ? "flex-row" : "flex-col-reverse"
        }`}
      >
        {/* Collapse Button (tucks away into corner) */}
        <button
          onClick={() => setIsDockCollapsed(true)}
          className="p-1.5 md:p-2 text-brand-black/40 dark:text-white/40 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          title="Minimize dock to corner"
        >
          {isHorizontal ? <ChevronRight size={16} /> : <ChevronRight size={16} className="rotate-90" />}
        </button>

        <div className={`bg-brand-black/10 dark:bg-white/10 ${isHorizontal ? "w-px h-5" : "h-px w-5"}`} />

        {/* Node 1: AI Atelier Assistant (Irukere - The Royal Scepter of Audience) */}
        <button
          onClick={() => setActiveModal(activeModal === "assistant" ? "none" : "assistant")}
          className={`relative p-2.5 rounded-full transition-all duration-300 group ${
            activeModal === "assistant"
              ? "bg-brand-gold text-brand-onyx scale-110 shadow-lg"
              : "text-brand-gold hover:bg-brand-gold/15"
          }`}
          title="Atelier Concierge (Bespoke Guidance & Consultation)"
        >
          {/* Deep Warm Brand Glow Ring */}
          <span className="absolute inset-0 rounded-full warm-glow-ring opacity-75 group-hover:opacity-100 -z-10 blur-[2px]" />
          <IrukereIcon size={19} className="group-hover:rotate-6 transition-transform duration-300" />
        </button>

        {/* Node 2: Visual Search / Garment Finder */}
        <button
          onClick={() => setActiveModal(activeModal === "search" ? "none" : "search")}
          className={`p-2.5 rounded-full transition-all duration-300 text-brand-black/70 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-white hover:bg-brand-black/5 dark:hover:bg-white/10 ${
            activeModal === "search" ? "bg-brand-gold/20 text-brand-gold scale-105" : ""
          }`}
          title="Search Collections & Textiles"
        >
          <Search size={17} />
        </button>

        {/* Node 3: Wishlist & Saved Pieces */}
        <button
          onClick={() => setActiveModal(activeModal === "wishlist" ? "none" : "wishlist")}
          className={`relative p-2.5 rounded-full transition-all duration-300 text-brand-black/70 dark:text-brand-silk/80 hover:text-brand-crimson hover:bg-brand-black/5 dark:hover:bg-white/10 ${
            activeModal === "wishlist" ? "bg-brand-crimson/20 text-brand-crimson scale-105" : ""
          }`}
          title="View Saved Silhouettes"
        >
          <Heart size={17} className={wishlist.length > 0 ? "text-brand-crimson fill-brand-crimson" : ""} />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-1 bg-brand-crimson text-white text-[9px] font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Node 4: User Profile Card */}
        <button
          onClick={() => setActiveModal(activeModal === "profile" ? "none" : "profile")}
          className={`relative p-2.5 rounded-full transition-all duration-300 text-brand-black/70 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-white hover:bg-brand-black/5 dark:hover:bg-white/10 ${
            activeModal === "profile" ? "bg-brand-gold/20 text-brand-gold scale-105" : ""
          }`}
          title="Client Profile & Measurements"
        >
          {user.isAuthenticated && user.name ? (
            <span className="w-4 h-4 rounded-full bg-brand-gold text-brand-onyx text-[9px] font-bold flex items-center justify-center font-display">
              {user.name.slice(0, 1).toUpperCase()}
            </span>
          ) : (
            <User size={17} />
          )}
        </button>

        {/* Node 5: Shopping Bag */}
        <button
          onClick={() => setActiveModal(activeModal === "cart" ? "none" : "cart")}
          className={`relative p-2.5 rounded-full transition-all duration-300 text-brand-black/70 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-white hover:bg-brand-black/5 dark:hover:bg-white/10 ${
            activeModal === "cart" ? "bg-brand-gold/20 text-brand-gold scale-105" : ""
          }`}
          title="Sartorial Bag"
        >
          <ShoppingBag size={17} />
          {cart.length > 0 && (
            <span className="absolute top-1 right-1 bg-brand-gold text-brand-onyx text-[9px] font-mono font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>

        {/* Node 6: Dedicated Theme Switcher (Always accessible on every page) */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full transition-all duration-300 text-brand-black/70 dark:text-brand-silk/80 hover:text-brand-gold hover:bg-brand-black/5 dark:hover:bg-white/10"
          title={mounted ? (theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme") : "Toggle Theme"}
          aria-label="Toggle Theme"
        >
          {mounted && theme === "dark" ? (
            <Sun size={17} className="text-brand-gold animate-in spin-in-180 duration-500" />
          ) : (
            <Moon size={17} className="text-brand-crimson dark:text-brand-gold animate-in spin-in-180 duration-500" />
          )}
        </button>

        <div className={`bg-brand-black/10 dark:bg-white/10 ${isHorizontal ? "w-px h-5" : "h-px w-5"}`} />

        {/* Orientation Switch (Vertical / Horizontal) */}
        <button
          onClick={toggleDockOrientation}
          className="p-2 text-brand-black/40 dark:text-white/40 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          title={isHorizontal ? "Dock vertically along right edge" : "Dock horizontally at lower right"}
        >
          <RotateCw size={12} className="hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>
    </aside>
  );
}
