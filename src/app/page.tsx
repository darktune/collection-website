import Image from "next/image";
import Link from "next/link";
import {
  PempamsieIcon,
  AdinkraheneIcon,
  AdeAreIcon,
  OjuOyaIcon,
  SankofaDiasporaIcon,
} from "@/components/icons/BespokeIcons";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col font-sans">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden bg-brand-onyx">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center opacity-70"
          >
            <source src="/media/hero_video.mp4" type="video/mp4" />
          </video>
          {/* Subtle multi-stop gradient for flawless typographic legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx via-brand-onyx/50 to-transparent" />
        </div>

        <div className="relative z-10 text-brand-white max-w-4xl">
          <div className="inline-flex items-center gap-2 mb-4 bg-brand-onyx/60 backdrop-blur-md px-3.5 py-1.5 border border-white/10">
            <AdinkraheneIcon size={14} className="text-brand-gold" />
            <p className="text-[11px] tracking-ultra-wide uppercase font-medium text-brand-silk">
              Abraham Collection &bull; Est. 2002 &bull; Lagos
            </p>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] mb-6 text-balance tracking-tight">
            Clothing<br />That Suits.
          </h1>

          <p className="text-lg md:text-xl font-light max-w-2xl mb-10 text-brand-silk/90 leading-relaxed text-balance">
            It is not made to measure. It is made to dominate. A second skin that does not give you power, but reveals the power you already possess.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/bespoke/commission"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-brand-crimson text-brand-white hover:bg-brand-burgundy-light transition-colors duration-300 text-[10px] md:text-[10.5px] tracking-[0.25em] uppercase font-medium shadow-md"
            >
              <PempamsieIcon size={14} className="text-brand-gold" />
              <span>Book Bespoke</span>
            </Link>
            <Link
              href="/heritage"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-brand-silk/40 text-brand-silk hover:bg-brand-silk hover:text-brand-onyx transition-colors duration-300 text-[10px] md:text-[10.5px] tracking-[0.25em] uppercase font-medium"
            >
              <AdeAreIcon size={14} />
              <span>Discover Heritage</span>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-3 text-xs tracking-widest text-brand-silk/60 uppercase">
            <span className="w-8 h-[1px] bg-brand-gold/60" />
            <span>Lagos Atelier &bull; Dressing Occasions and Dignitaries Beyond Borders</span>
          </div>
        </div>
      </section>

      {/* 2. THE ATELIER MANIFESTO */}
      <section className="py-32 px-8 md:px-16 lg:px-24 text-center max-w-5xl mx-auto bg-brand-white dark:bg-brand-onyx transition-colors">
        <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-4">
          Est. 2002 &bull; The Atelier Chronicle
        </p>
        <h2 className="font-display text-5xl md:text-7xl mb-10 leading-tight text-balance">
          Over Two Decades of<br />Intentional Craft.
        </h2>

        <div className="divider-loom w-48 mx-auto mb-10" />
        <div className="text-lg md:text-xl font-light opacity-80 leading-relaxed max-w-3xl mx-auto space-y-6 text-balance">
          <p>
            For more than two decades, Abraham Collection has operated around one uncompromising principle: what you wear should suit who you are, where you are going, and what the moment demands.
          </p>
          <p>
            From imperial West African ceremonial dress to architectural contemporary tailoring and institutional wardrobes, every seam begins with purpose.
          </p>
        </div>
        <div className="mt-12">
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            <span>Explore the Atelier Story</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 3. THE HERITAGE COLLECTION (CEREMONIAL AGBADA) */}
      <section className="py-28 px-8 md:px-16 lg:px-24 bg-brand-cream/40 dark:bg-brand-charcoal flex flex-col lg:flex-row gap-16 items-center transition-colors">
        <div className="w-full lg:w-1/2 relative aspect-[3/4] overflow-hidden border border-brand-black/10 dark:border-white/10 group">
          <Image
            src="/media/heritage_1.jpg"
            alt="Abraham Heritage Collection"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="w-full lg:w-1/2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs tracking-ultra-wide uppercase mb-6 font-medium text-brand-crimson dark:text-brand-gold">
            <AdeAreIcon size={16} />
            <span>The Heritage Collection</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-[1.08] text-balance">
            Before anyone asks who the celebrant is, the Agbada has already answered.
          </h2>
          <p className="text-base md:text-lg font-light opacity-80 mb-10 leading-relaxed text-balance">
            A milestone occasion deserves presence to match. Traditional 3-piece ensembles shaped by mathematical proportion, hand-guided embroidery, and intentional drape.
          </p>
          <Link
            href="/heritage"
            className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx hover:bg-brand-crimson dark:hover:bg-brand-crimson dark:hover:text-white transition-colors duration-300 text-[10px] md:text-[10.5px] tracking-[0.25em] uppercase font-medium"
          >
            Explore Heritage Archives
          </Link>
        </div>
      </section>

      {/* 4. CONTEMPORARY TAILORING */}
      <section className="py-28 px-8 md:px-16 lg:px-24 flex flex-col-reverse lg:flex-row gap-16 items-center bg-brand-white dark:bg-brand-onyx transition-colors">
        <div className="w-full lg:w-1/2 max-w-xl lg:pl-8">
          <div className="inline-flex items-center gap-2 text-xs tracking-ultra-wide uppercase mb-6 font-medium text-brand-crimson dark:text-brand-gold">
            <OjuOyaIcon size={16} />
            <span>Sartorial Precision</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-[1.08] text-balance">
            Constructed for how you enter the room.
          </h2>
          <p className="text-base md:text-lg font-light opacity-80 mb-10 leading-relaxed text-balance">
            Savile Row-disciplined suiting, double-breasted blazers, trousers, and evening wear engineered with full floating canvas to mold naturally to your form.
          </p>
          <Link
            href="/men"
            className="inline-flex items-center justify-center px-7 py-3.5 border border-brand-black dark:border-white text-brand-black dark:text-white hover:bg-brand-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300 text-[10px] md:text-[10.5px] tracking-[0.25em] uppercase font-medium"
          >
            View Tailored Suiting
          </Link>
        </div>
        <div className="w-full lg:w-1/2 relative aspect-[3/4] overflow-hidden border border-brand-black/10 dark:border-white/10 group">
          <Image
            src="/media/tailoring_1.jpg"
            alt="Abraham Contemporary Tailoring"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>

      {/* 5. CORPORATE & INSTITUTIONAL WARDROBES */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-brand-charcoal text-brand-white text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-ultra-wide uppercase mb-6 font-medium text-brand-gold">
            Abraham Collection For Business
          </p>
          <h2 className="font-display text-4xl md:text-7xl mb-8 leading-[1.05] text-balance">
            When your people wear your brand.
          </h2>
          <p className="text-base md:text-lg font-light text-brand-silk/80 leading-relaxed max-w-3xl mx-auto mb-12 text-balance">
            Uniforms and executive apparel developed for institutions that recognize visual presentation is an essential facet of institutional authority.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-14 text-xs tracking-luxury uppercase text-brand-silk/60 font-medium">
            <div className="p-4 border border-white/10">24 Years Craft (Est. 2002)</div>
            <div className="p-4 border border-white/10">Institutional Scale</div>
            <div className="p-4 border border-white/10">Bespoke Monogramming</div>
            <div className="p-4 border border-white/10">Seamless Fulfilment</div>
          </div>

          <Link
            href="/corporate"
            className="group inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium text-brand-gold hover:text-brand-cream transition-colors"
          >
            <span>Corporate Wardrobe Inquiries</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
