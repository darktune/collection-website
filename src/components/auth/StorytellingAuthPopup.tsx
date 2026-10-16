"use client";

import React from "react";
import Image from "next/image";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";

export function StorytellingAuthPopup() {
  const { storyPopupVisible, dismissStoryPopup, setActiveModal } = useAtelier();

  if (!storyPopupVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-brand-onyx/95 text-brand-white border border-brand-gold/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6 sm:p-8 backdrop-blur-2xl">
        
        {/* Close Button */}
        <button
          onClick={dismissStoryPopup}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-full transition-colors"
          title="Dismiss (max 2 displays per session)"
        >
          <X size={18} />
        </button>

        {/* Story Content */}
        <div className="flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase rounded-full w-fit mb-4">
          <AdinkraheneIcon size={12} />
          <span>25 Years of Intentional Craft &bull; Lagos</span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl leading-snug mb-3">
          "Clothing that suits who you are."
        </h3>

        <p className="font-light text-xs sm:text-sm opacity-80 leading-relaxed mb-6">
          Every silhouette created by Bolaji Abayomi Abraham is cut with architectural intention. Create your Atelier Profile to secure your 24 anatomical measurements, save bespoke pieces, and unlock priority tailoring slots.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              dismissStoryPopup();
              setActiveModal("auth");
            }}
            className="flex-1 py-3 px-5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-luxury font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <PempamsieIcon size={14} className="text-brand-gold" />
            <span>Join Atelier Circle (Sign In)</span>
          </button>

          <button
            onClick={dismissStoryPopup}
            className="py-3 px-5 border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-xs uppercase tracking-wider rounded-lg transition-colors"
          >
            Continue Exploring
          </button>
        </div>

        <p className="text-[10px] text-white/40 text-center mt-4">
          You can also access your profile anytime via the floating dock below.
        </p>

      </div>
    </div>
  );
}
