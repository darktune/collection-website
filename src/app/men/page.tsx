import Image from "next/image";
import Link from "next/link";
import { ProductCommerceCard } from "@/components/commerce/ProductCommerceCard";
import { AtelierProduct } from "@/context/AtelierContext";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";

const MEN_PRODUCTS: AtelierProduct[] = [
  {
    id: "m-double-breasted-suit",
    name: "Obsidian Double-Breasted 2-Piece Suit",
    category: "Men",
    priceNgn: 420000,
    priceUsd: 310,
    image: "/media/tailoring_1.jpg",
    description: "Super 150s English wool with structured shoulders and silk lining.",
  },
  {
    id: "m-classic-tuxedo",
    name: "Imperial Black Satin-Lapel Tuxedo",
    category: "Men",
    priceNgn: 480000,
    priceUsd: 350,
    image: "/media/hero_1.jpg",
    description: "Classic red carpet and black-tie dinner suit with handmade covered buttons.",
  },
  {
    id: "m-everyday-blazer",
    name: "Architectural Virgin Wool Blazer",
    category: "Men",
    priceNgn: 290000,
    priceUsd: 215,
    image: "/media/heritage_1.jpg",
    description: "Breathable tailored blazer engineered for tropical elegance and diaspora travel.",
  },
  {
    id: "m-structured-trouser",
    name: "Bespoke Pleated High-Waisted Trouser",
    category: "Men",
    priceNgn: 140000,
    priceUsd: 105,
    image: "/media/hero_2.jpg",
    description: "Signature side-adjuster trousers with immaculate drape and break.",
  },
];

export default function MenPage() {
  return (
    <main className="flex flex-col">
      {/* Category Hero */}
      <section className="relative min-h-[70vh] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden bg-brand-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/tailoring_1.jpg"
            alt="Abraham Collection Men's Tailoring"
            fill
            className="object-cover object-top opacity-70"
            priority
          />
        </div>
        <div className="relative z-10 text-brand-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-black/60 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-4 backdrop-blur-md">
            <AdinkraheneIcon size={12} />
            <span>Savile Row Precision &bull; Lagos Craft</span>
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-4 leading-none">Tailoring.</h1>
          <p className="text-lg md:text-xl font-light max-w-xl text-brand-white/90">
            Suits, shirts, trousers, formal menswear, jackets, and modern tailoring. Precision fit for the modern gentleman.
          </p>
        </div>
      </section>

      {/* Editorial Callout */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-[var(--background)] text-center border-b border-[var(--border)]">
        <h2 className="font-display text-4xl md:text-6xl mb-6 max-w-4xl mx-auto leading-tight">
          The fit is intentional.
        </h2>
        <p className="font-light opacity-70 max-w-2xl mx-auto leading-relaxed">
          We believe tailoring should enhance your natural silhouette without restricting your movement. Our menswear is designed to suit your profession, your occasion, and your body.
        </p>
      </section>

      {/* Product Grid with 3-Action Overlays (Buy Now, Custom, Wishlist) */}
      <section className="px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {MEN_PRODUCTS.map((product, idx) => (
            <ProductCommerceCard key={product.id} product={product} priority={idx === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
