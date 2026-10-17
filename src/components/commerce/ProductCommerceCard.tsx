"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowUpRight, Check } from "lucide-react";
import { useAtelier, AtelierProduct } from "@/context/AtelierContext";
import { PempamsieIcon } from "@/components/icons/BespokeIcons";

interface ProductCommerceCardProps {
  product: AtelierProduct;
  priority?: boolean;
}

export function ProductCommerceCard({ product, priority = false }: ProductCommerceCardProps) {
  const { toggleWishlist, isInWishlist, openQuickBuy } = useAtelier();
  const saved = isInWishlist(product.id);

  return (
    <div className="group flex flex-col relative transition-all duration-300">
      {/* Garment Image & Interactive Overlays */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-brand-card/40 border border-brand-black/5 dark:border-white/5 rounded-sm">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Overlay: Category Tag + Wishlist Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className="bg-brand-onyx/80 backdrop-blur-md px-2.5 py-1 text-[10px] tracking-widest uppercase text-brand-gold font-mono border border-brand-gold/20 rounded">
            {product.category}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              saved
                ? "bg-brand-crimson text-white scale-110 shadow-md"
                : "bg-brand-onyx/60 text-white/80 hover:text-brand-crimson hover:bg-brand-onyx hover:scale-110"
            }`}
            title={saved ? "Saved in Wishlist" : "Save to Wishlist"}
          >
            <Heart size={15} className={saved ? "fill-white" : ""} />
          </button>
        </div>

        {/* Bottom Hover/Touch Action Curtain (REAVO & Luxury Reference Pattern) */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-10">
          
          {/* Primary Action: Book Bespoke */}
          <Link
            href={`/bespoke/commission?garment=${encodeURIComponent(product.name)}`}
            className="w-full py-2 px-3 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase tracking-[0.22em] text-[9px] font-medium flex items-center justify-center gap-1.5 transition-colors shadow-md text-center rounded-sm"
          >
            <PempamsieIcon size={12} className="text-brand-gold" />
            <span>Book Bespoke</span>
          </Link>

          {/* Secondary Action: Buy */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickBuy(product);
            }}
            className="w-full py-1.5 px-3 bg-brand-gold text-brand-onyx hover:bg-brand-cream uppercase tracking-[0.22em] text-[9px] font-semibold flex items-center justify-center gap-1.5 transition-colors text-center rounded-sm"
          >
            <ShoppingBag size={11} />
            <span>Buy</span>
          </button>
        </div>
      </div>

      {/* Garment Details & Dual Price */}
      <div className="flex flex-col text-left">
        <h3 className="font-name text-lg md:text-xl mb-1 leading-snug text-brand-black dark:text-brand-white group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-brand-crimson dark:text-brand-gold">
          <span>₦{product.priceNgn.toLocaleString()}</span>
          <span className="text-brand-black/30 dark:text-white/30">&bull;</span>
          <span>${product.priceUsd} USD</span>
        </div>
      </div>
    </div>
  );
}
