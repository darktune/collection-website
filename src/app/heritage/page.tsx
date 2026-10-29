import Image from "next/image";
import Link from "next/link";
import { ProductCommerceCard } from "@/components/commerce/ProductCommerceCard";
import { AtelierProduct } from "@/context/AtelierContext";
import { AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";
import { LoomExperience } from "@/components/heritage/LoomExperience";

const HERITAGE_PRODUCTS: AtelierProduct[] = [
  {
    id: "h-imperial-agbada",
    name: "The Imperial 3-Piece Agbada",
    category: "Heritage",
    priceNgn: 580000,
    priceUsd: 420,
    image: "/media/heritage_1.jpg",
    description: "Ceremonial Aso Oke woven in Iseyin with intricate hand-embroidered neckline.",
  },
  {
    id: "h-ceremonial-dandogo",
    name: "Ceremonial Royal Dandogo",
    category: "Heritage",
    priceNgn: 680000,
    priceUsd: 490,
    image: "/media/hero_2.jpg",
    description: "Hand-loomed heavy Aso Oke with 360-degree pleated structural drapery.",
  },
  {
    id: "h-classic-senator",
    name: "Bespoke Royal Senator Attire",
    category: "Heritage",
    priceNgn: 320000,
    priceUsd: 235,
    image: "/media/hero_1.jpg",
    description: "Precision-cut Senator tunic and tapered trousers in fine wool-cashmere blend.",
  },
  {
    id: "h-minimalist-kaftan",
    name: "Lagos Minimalist Silk Kaftan",
    category: "Heritage",
    priceNgn: 260000,
    priceUsd: 190,
    image: "/media/tailoring_1.jpg",
    description: "Fluid silk blend kaftan designed for discerning diaspora events and warm-climate poise.",
  },
];

export default function HeritagePage() {
  return (
    <main className="flex flex-col">
      {/* Category Hero */}
      <section className="relative min-h-[70vh] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden bg-brand-cream dark:bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/heritage_1.jpg"
            alt="Abraham Collection Heritage"
            fill
            className="object-cover object-top opacity-90 dark:opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-brand-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-black/60 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-4 backdrop-blur-md">
            <AdinkraheneIcon size={12} />
            <span>Ceremonial Royalty &bull; Est. 2002</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-4 leading-none">Heritage.</h1>
          <p className="text-lg md:text-xl font-light max-w-xl text-brand-white/90">
            Agbada, Dandogo, Senator, kaftans, and traditional wedding clothing crafted with uncompromised cultural authenticity.
          </p>
        </div>
      </section>

      {/* Editorial Callout */}
      <section className="py-24 px-8 md:px-16 lg:px-24 text-center">
        <h2 className="font-display text-4xl md:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
          "Dandogo is not for children."
        </h2>
        <p className="font-light opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed">
          Traditional attire carries the weight of history and the gravity of the occasion. We build our heritage pieces to ensure you carry that weight with absolute confidence.
        </p>
        <Link
          href="/bespoke/commission?type=diaspora"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-brand-crimson dark:text-brand-gold hover:underline font-medium"
        >
          <PempamsieIcon size={14} />
          <span>Diaspora Concierge Available Worldwide (UK, US, Canada) &rarr;</span>
        </Link>
      </section>

      {/* Interactive Master Weaver's Loom & Yoruba Textile Archive */}
      <LoomExperience />

      {/* Product Grid with 3-Action Overlays (Buy Now, Custom, Wishlist) */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {HERITAGE_PRODUCTS.map((product, idx) => (
            <ProductCommerceCard key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
