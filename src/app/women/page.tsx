import Image from "next/image";
import Link from "next/link";
import { ProductCommerceCard } from "@/components/commerce/ProductCommerceCard";
import { AtelierProduct } from "@/context/AtelierContext";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";

const WOMEN_PRODUCTS: AtelierProduct[] = [
  {
    id: "w-sculptural-midi",
    name: "The Sculptural Crepe Midi Dress",
    category: "Women",
    priceNgn: 340000,
    priceUsd: 250,
    image: "/media/hero_2.jpg",
    description: "Architectural neckline with boned bodice and asymmetric pleating.",
  },
  {
    id: "w-bespoke-gown",
    name: "Royal Aso Oke Bespoke Evening Gown",
    category: "Women",
    priceNgn: 550000,
    priceUsd: 400,
    image: "/media/heritage_1.jpg",
    description: "Hand-beaded corset gown with metallic gold threading and royal train.",
  },
  {
    id: "w-tailored-power-suit",
    name: "Bespoke Structured Women's Power Suit",
    category: "Women",
    priceNgn: 410000,
    priceUsd: 300,
    image: "/media/tailoring_1.jpg",
    description: "Peak-lapel jacket paired with tailored wide-leg trousers in British wool blend.",
  },
];

export default function WomenPage() {
  return (
    <main className="flex flex-col">
      {/* Category Hero */}
      <section className="relative min-h-[70vh] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/hero_2.jpg"
            alt="Abraham Collection Women"
            fill
            className="object-cover opacity-80 dark:opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-brand-black dark:text-brand-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-black dark:border-brand-gold bg-brand-white/80 dark:bg-black/60 text-brand-black dark:text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-4 backdrop-blur-md">
            <AdinkraheneIcon size={12} />
            <span>Sculptural Couture &bull; Lagos</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-4 leading-none">Women.</h1>
          <p className="text-lg md:text-xl font-light max-w-xl text-brand-black/90 dark:text-white/90 bg-brand-white/80 dark:bg-brand-onyx/80 p-6 backdrop-blur-sm mt-8">
            Dresses, occasionwear, bespoke pieces, and contemporary womenswear. Crafted to suit the entrance.
          </p>
        </div>
      </section>

      {/* Product Grid with 3-Action Overlays (Buy Now, Custom, Wishlist) */}
      <section className="px-8 md:px-16 lg:px-24 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {WOMEN_PRODUCTS.map((product, idx) => (
            <ProductCommerceCard key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>
      </section>
      
      {/* Callout */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-black text-brand-white text-center">
        <h2 className="font-display text-4xl mb-6">Womenswear Bespoke</h2>
        <p className="font-light text-brand-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          From red-carpet galas to royal weddings, our head designer Bolaji Abayomi Abraham personally drapes, drafts, and contours womenswear to celebrate proportion and feminine power.
        </p>
        <Link
          href="/bespoke/commission"
          className="inline-flex items-center gap-2 px-8 py-4 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase tracking-luxury text-xs font-semibold transition-colors"
        >
          <PempamsieIcon size={15} className="text-brand-gold" />
          <span>Book Private Draping Consultation</span>
        </Link>
      </section>
    </main>
  );
}
