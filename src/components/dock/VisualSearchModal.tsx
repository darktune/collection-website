"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useAtelier, AtelierProduct } from "@/context/AtelierContext";

const CATALOG_ITEMS: AtelierProduct[] = [
  {
    id: "h1",
    name: "Hand-Loomed 8-Piece Dandogo Agbada",
    priceNgn: 650000,
    priceUsd: 480,
    category: "Heritage",
    image: "/media/heritage_1.jpg",
    description: "Ceremonial Aso Oke woven in Iseyin with intricate hand-embroidered neckline.",
  },
  {
    id: "h2",
    name: "Imperial Crimson Ceremonial Ensemble",
    priceNgn: 580000,
    priceUsd: 420,
    category: "Heritage",
    image: "/media/hero_2.jpg",
    description: "Rich crimson Aso Oke with ancestral diamond lattice motifs.",
  },
  {
    id: "m1",
    name: "Midnight Obsidian Bespoke 3-Piece Suit",
    priceNgn: 450000,
    priceUsd: 330,
    category: "Men",
    image: "/media/tailoring_1.jpg",
    description: "Super 150s English wool with structured shoulders and silk lining.",
  },
  {
    id: "m2",
    name: "Architectural Double-Breasted Blazer",
    priceNgn: 380000,
    priceUsd: 280,
    category: "Men",
    image: "/media/hero_1.jpg",
    description: "Modernized Nigerian silhouette with horn buttons and peaked lapels.",
  },
  {
    id: "w1",
    name: "Sculptural Aso Oke Couture Gown",
    priceNgn: 520000,
    priceUsd: 390,
    category: "Women",
    image: "/media/hero_2.jpg",
    description: "Structured corset silhouette with hand-beaded detailing.",
  },
];

export function VisualSearchModal() {
  const { activeModal, setActiveModal, openQuickBuy } = useAtelier();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  if (activeModal !== "search") return null;

  const filtered = CATALOG_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[85vh] warm-glow-ring">
        
        {/* Search Input Bar */}
        <div className="p-4 md:p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] flex items-center gap-3">
          <Search size={18} className="text-brand-gold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Aso Oke, Agbada, Suiting, Wool, Dandogo, Wedding..."
            autoFocus
            className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-brand-black dark:text-white placeholder:text-brand-black/40 dark:placeholder:text-white/40"
          />
          <button
            onClick={() => setActiveModal("none")}
            className="text-brand-black/40 dark:text-white/60 hover:text-brand-crimson dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 px-5 py-2.5 border-b border-brand-black/5 dark:border-white/5 bg-brand-black/5 dark:bg-white/5 overflow-x-auto text-xs">
          {["All", "Heritage", "Men", "Women"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 border text-[10px] uppercase tracking-[0.22em] transition-colors ${
                selectedCategory === cat
                  ? "border-brand-gold bg-brand-gold text-brand-onyx font-semibold shadow-sm"
                  : "border-brand-black/10 dark:border-white/10 bg-transparent text-brand-black/70 dark:text-white/70 hover:border-brand-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-brand-black/50 dark:text-white/50 space-y-2">
              <p className="text-sm">No garments match your search.</p>
              <p className="text-xs">Try searching for "Agbada", "Suit", "Aso Oke", or "Wool".</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-xl hover:border-brand-gold/50 transition-colors"
              >
                <div className="relative w-20 h-24 bg-brand-black/10 dark:bg-brand-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-brand-gold font-mono">{item.category}</span>
                      <span className="text-xs font-mono text-brand-crimson dark:text-brand-gold font-semibold">
                        ₦{item.priceNgn.toLocaleString()} &bull; ${item.priceUsd} USD
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-medium mt-0.5">{item.name}</h4>
                    <p className="text-xs opacity-70 line-clamp-2 mt-1">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-brand-black/5 dark:border-white/5 mt-2">
                    <button
                      onClick={() => openQuickBuy(item)}
                      className="py-1 px-3.5 bg-brand-gold text-brand-onyx rounded text-[10px] font-bold uppercase tracking-wider hover:bg-brand-cream transition-colors"
                    >
                      Buy
                    </button>
                    <Link
                      href={`/bespoke/commission?garment=${encodeURIComponent(item.name)}`}
                      onClick={() => setActiveModal("none")}
                      className="py-1 px-3 border border-brand-black/20 dark:border-white/20 hover:border-brand-gold rounded text-[10px] uppercase tracking-wider transition-colors"
                    >
                      Custom
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
