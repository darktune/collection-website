"use client";

import React from "react";
import { X } from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";

export function StorytellingAuthPopup() {
  const { storyPopupVisible, dismissStoryPopup, setActiveModal } = useAtelier();

  if (!storyPopupVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg p-[1.5px] rounded-2xl warm-glow-ring shadow-2xl overflow-hidden border border-brand-gold/40">
        
        {/* Main Body - Theme Adaptive (Light Ivory & Dark Onyx) */}
        <div className="relative bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white p-6 sm:p-8 rounded-2xl backdrop-blur-2xl transition-colors duration-300">
          
          {/* Close Button */}
          <button
            onClick={dismissStoryPopup}
            className="absolute top-4 right-4 text-brand-black/40 dark:text-white/50 hover:text-brand-black dark:hover:text-white p-1 rounded-full transition-colors"
            title="Dismiss greeting"
          >
            <X size={18} />
          </button>

          {/* Ancestral Emblem & Delicate Hairline Accent (Replaced pill badge) */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[1px] w-8 bg-brand-gold" />
            <div className="flex items-center gap-2 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-mono font-medium">
              <AdinkraheneIcon size={12} className="text-brand-gold" />
              <span>Atelier Lagos &bull; 25 Years of Lineage</span>
            </div>
            <span className="h-[1px] flex-1 bg-brand-gold/25" />
          </div>

          {/* Conversational Greeting with Cadence & Rhythm */}
          <h3 className="font-display text-2xl sm:text-3xl leading-snug mb-3 text-brand-black dark:text-white">
            "Before the room asks what you wear, the cut should already declare who you are."
          </h3>

          <p className="font-light text-xs sm:text-sm text-brand-black/80 dark:text-brand-silk/80 leading-relaxed mb-6">
            Welcome to the cutting rooms of <span className="font-name italic text-base sm:text-lg font-normal text-brand-gold">Bolaji Abayomi Abraham</span>. For a quarter of a century in Lagos, every stitch has been drawn with singular reverence for your proportions. Enter the private circle to record your anatomical measurements, commission timeless silhouettes, and receive bespoke counsel.
          </p>

          {/* Interactive Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                dismissStoryPopup();
                setActiveModal("auth");
              }}
              className="flex-1 py-3.5 px-5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-luxury font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <PempamsieIcon size={14} className="text-brand-gold" />
              <span>Enter the Private Circle</span>
            </button>

            <button
              onClick={dismissStoryPopup}
              className="py-3 px-5 border border-brand-black/15 dark:border-white/20 hover:border-brand-gold/60 text-brand-black/70 dark:text-white/70 hover:text-brand-black dark:hover:text-white text-xs uppercase tracking-wider rounded-lg transition-colors"
            >
              I Wish to Browse First
            </button>
          </div>

          <p className="text-[10px] text-brand-black/40 dark:text-white/40 text-center mt-4 font-mono">
            You can also open the Atelier Concierge anytime from the gold seal below.
          </p>

        </div>
      </div>
    </div>
  );
}
