import Image from "next/image";
import Link from "next/link";

// Mock products
const products = [
  { id: 20, name: "The Structured Midi", type: "Crepe", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop" },
  { id: 21, name: "Bespoke Evening Gown", type: "Silk & Lace", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1000&auto=format&fit=crop" },
  { id: 22, name: "Tailored Power Suit", type: "Wool Blend", image: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?q=80&w=1000&auto=format&fit=crop" },
];

export default function WomenPage() {
  return (
    <main className="flex flex-col">
      {/* Category Hero */}
      <section className="relative min-h-[70vh] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden bg-brand-cream">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2000&auto=format&fit=crop"
            alt="Abraham Collection Women"
            fill
            className="object-cover opacity-80 dark:opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-brand-black">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl mb-4 leading-none">Women.</h1>
          <p className="text-lg md:text-xl font-light max-w-xl text-brand-black/90 bg-brand-white/80 p-6 backdrop-blur-sm mt-8">
            Dresses, occasionwear, bespoke pieces, and contemporary womenswear. Crafted to suit the entrance.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-8 md:px-16 lg:px-24 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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
      
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-black text-brand-white text-center">
        <h2 className="font-display text-4xl mb-6">Womenswear Bespoke</h2>
        <p className="font-light text-brand-white/70 max-w-2xl mx-auto mb-10">
          We specialize in highly detailed, individually commissioned pieces for women, from bridal wear to executive suiting.
        </p>
        <Link 
            href="/bespoke/commission" 
            className="inline-flex items-center justify-center px-8 py-4 border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black transition-colors duration-300 text-sm tracking-wider uppercase"
          >
            Begin a Commission
        </Link>
      </section>

    </main>
  );
}
