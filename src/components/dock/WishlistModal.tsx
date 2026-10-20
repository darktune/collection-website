"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Heart } from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";

export function WishlistModal() {
  const { activeModal, setActiveModal, wishlist, toggleWishlist, openQuickBuy } = useAtelier();

  if (activeModal !== "wishlist") return null;

  return (
    <div className="fixed z-50 bottom-16 sm:bottom-20 right-2 sm:right-4 md:right-6 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-w-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] warm-glow-ring">
        
        {/* Header */}
        <div className="p-4 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={17} className="text-brand-crimson fill-brand-crimson" />
            <h3 className="font-display text-base tracking-wide">Saved Silhouettes</h3>
            <span className="text-[10px] bg-brand-gold/15 text-brand-gold px-2 py-0.5 border-l border-brand-gold font-mono font-medium">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setActiveModal("none")}
            className="text-brand-black/50 dark:text-white/60 hover:text-brand-crimson dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 flex items-center justify-center mx-auto text-brand-black/30 dark:text-white/40">
                <Heart size={20} />
              </div>
              <p className="text-xs opacity-70 max-w-xs mx-auto leading-relaxed">
                Your private wardrobe is empty. Tap the heart on any garment to curate your favorites.
              </p>
              <Link
                href="/heritage"
                onClick={() => setActiveModal("none")}
                className="inline-block text-[11px] uppercase tracking-luxury text-brand-crimson dark:text-brand-gold hover:underline font-medium"
              >
                Explore Heritage Pieces &rarr;
              </Link>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-xl group hover:border-brand-gold/40 transition-colors"
              >
                <div className="relative w-16 h-20 bg-brand-black/10 dark:bg-brand-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-name text-sm font-normal leading-tight">{item.name}</h4>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-brand-black/40 dark:text-white/40 hover:text-brand-crimson transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] opacity-60 uppercase tracking-widest mt-0.5">{item.category}</p>
                    <p className="text-[11px] font-mono text-brand-crimson dark:text-brand-gold mt-1 font-medium">
                      ₦{item.priceNgn.toLocaleString()} &bull; ${item.priceUsd} USD
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-brand-black/5 dark:border-white/5 mt-2">
                    <button
                      onClick={() => openQuickBuy(item)}
                      className="flex-1 py-1.5 px-2 bg-brand-gold text-brand-onyx rounded text-[10px] font-bold uppercase tracking-wider hover:bg-brand-cream transition-colors text-center"
                    >
                      Buy
                    </button>
                    <Link
                      href={`/bespoke/commission?garment=${encodeURIComponent(item.name)}`}
                      onClick={() => setActiveModal("none")}
                      className="py-1.5 px-2.5 border border-brand-black/20 dark:border-white/20 hover:border-brand-gold rounded text-[10px] uppercase tracking-wider text-center"
                    >
                      Custom
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] flex items-center justify-between text-xs">
            <span className="text-[11px] opacity-70">Need group fitting?</span>
            <Link
              href="/bespoke/commission"
              onClick={() => setActiveModal("none")}
              className="text-brand-crimson dark:text-brand-gold uppercase tracking-wider hover:underline font-medium text-[11px]"
            >
              Consult Bolaji Abraham &rarr;
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
