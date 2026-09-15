import Image from "next/image";
import Link from "next/link";

// Mock products
const products = [
  { id: 1, name: "The Imperial Agbada", type: "3-Piece Agbada", image: "/media/heritage_1.jpg" },
  { id: 2, name: "Classic Senator", type: "2-Piece Set", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, name: "Ceremonial Dandogo", type: "Hand-Woven Aso Oke", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac0ec?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, name: "Minimalist Kaftan", type: "Silk Blend", image: "https://images.unsplash.com/photo-1618886487325-f665032b6352?q=80&w=1000&auto=format&fit=crop" },
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
        <p className="font-light opacity-70 max-w-2xl mx-auto mb-10">
          Traditional attire carries the weight of history and the gravity of the occasion. We build our heritage pieces to ensure you carry that weight with absolute confidence.
        </p>
      </section>

      {/* Product Grid */}
      <section className="px-8 md:px-16 lg:px-24 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
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
                <h3 className="font-display text-2xl mb-1">{product.name}</h3>
                <p className="text-xs uppercase tracking-widest opacity-50">{product.type}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
