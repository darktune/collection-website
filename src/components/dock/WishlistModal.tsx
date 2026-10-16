"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";
import { PempamsieIcon } from "@/components/icons/BespokeIcons";

export function WishlistModal() {
  const { activeModal, setActiveModal, wishlist, toggleWishlist, openQuickBuy } = useAtelier();

  if (activeModal !== "wishlist") return null;

  return (
    <div className="fixed z-50 bottom-24 right-4 md:right-16 w-80 md:w-96 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-brand-onyx/95 backdrop-blur-2xl text-brand-white border border-brand-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-brand-black/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-brand-crimson fill-brand-crimson" />
            <h3 className="font-display text-base tracking-wide">Saved Silhouettes</h3>
            <span className="text-[10px] bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded-full font-mono">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setActiveModal("none")}
            className="text-white/60 hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-white/40">
                <Heart size={20} />
              </div>
              <p className="text-xs opacity-60 max-w-xs mx-auto leading-relaxed">
                Your wishlist is currently empty. Tap the heart icon on any garment across our collections to bookmark your private wardrobe.
              </p>
              <Link
                href="/heritage"
                onClick={() => setActiveModal("none")}
                className="inline-block text-[11px] uppercase tracking-luxury text-brand-gold hover:underline"
              >
                Explore Heritage Pieces &rarr;
              </Link>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-white/5 border border-white/10 rounded-xl group hover:border-brand-gold/40 transition-colors"
              >
                <div className="relative w-16 h-20 bg-brand-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display text-xs font-medium leading-tight">{item.name}</h4>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-white/40 hover:text-brand-crimson transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] opacity-60 uppercase tracking-widest mt-0.5">{item.category}</p>
                    <p className="text-[11px] font-mono text-brand-gold mt-1">
                      ₦{item.priceNgn.toLocaleString()} &bull; ${item.priceUsd} USD
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-white/5 mt-2">
                    <button
                      onClick={() => {
                        openQuickBuy(item);
                      }}
                      className="flex-1 py-1 px-2 bg-brand-gold text-brand-onyx rounded text-[10px] font-semibold uppercase tracking-wider hover:bg-brand-cream transition-colors text-center"
                    >
                      Instant Buy
                    </button>
                    <Link
                      href={`/bespoke/commission?garment=${encodeURIComponent(item.name)}`}
                      onClick={() => setActiveModal("none")}
                      className="py-1 px-2 border border-white/20 hover:border-brand-gold rounded text-[10px] uppercase tracking-wider text-center"
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
          <div className="p-4 border-t border-white/10 bg-brand-black/60 flex items-center justify-between text-xs">
            <span className="text-[11px] opacity-70">Need bespoke alterations?</span>
            <Link
              href="/bespoke/commission"
              onClick={() => setActiveModal("none")}
              className="text-brand-gold uppercase tracking-wider hover:underline font-medium text-[11px]"
            >
              Book Group Fitting &rarr;
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
