import Image from "next/image";
import Link from "next/link";

// Mock products
const products = [
  { id: 10, name: "The Double Breasted Suit", type: "Italian Wool Blend", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1000&auto=format&fit=crop" },
  { id: 11, name: "Classic Tuxedo", type: "Satin Lapel", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop" },
  { id: 12, name: "Everyday Blazer", type: "Linen", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1000&auto=format&fit=crop" },
  { id: 13, name: "Structured Trouser", type: "Slim Fit", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000&auto=format&fit=crop" },
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
        <p className="font-light opacity-70 max-w-2xl mx-auto">
          We believe tailoring should enhance your natural silhouette without restricting your movement. Our menswear is designed to suit your profession, your occasion, and your body.
        </p>
      </section>

      {/* Product Grid */}
      <section className="px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product) => (
            <Link href={`/bespoke/commission?garment=${encodeURIComponent(product.name)}`} key={product.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[var(--card)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white uppercase tracking-widest text-sm font-medium border border-white px-6 py-3 backdrop-blur-sm">Discuss Design</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-display text-xl mb-1">{product.name}</h3>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-3">{product.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
