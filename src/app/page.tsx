import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* HERO SECTION */}
      <section className="relative min-h-[calc(100vh-5rem)] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/media/hero_video.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-brand-white max-w-4xl">
          <p className="text-sm md:text-base tracking-widest uppercase mb-4 font-medium text-brand-cream/90">Abraham Collection</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6">
            Clothing<br />That Suits.
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mb-10 text-brand-white/90 leading-relaxed">
            It is not made to measure. It is made to dominate. A second skin that does not give you power, but reveals the power you already possess.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link 
              href="/collections" 
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-white text-brand-black hover:bg-brand-cream transition-colors duration-300 text-sm tracking-wider uppercase"
            >
              Explore the Collection
            </Link>
            <Link 
              href="/bespoke/commission" 
              className="inline-flex items-center justify-center px-8 py-4 border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black transition-colors duration-300 text-sm tracking-wider uppercase"
            >
              Book a Consultation
            </Link>
          </div>
          <p className="mt-12 text-xs md:text-sm tracking-widest text-brand-white/70 uppercase">
            Lagos, Nigeria · Dressing people, occasions and institutions beyond borders.
          </p>
        </div>
      </section>

      {/* BRAND STORY SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 text-center max-w-5xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl mb-10 leading-tight">
          25 Years of<br />Intentional Craft.
        </h2>
        <div className="text-lg md:text-xl font-light opacity-80 leading-relaxed max-w-3xl mx-auto space-y-6">
          <p>
            For more than two decades, Abraham Collection has created clothing around one principle: what you wear should suit who you are, where you are going and what the moment requires.
          </p>
          <p>
            From ceremonial Nigerian dress to contemporary tailoring and corporate wardrobes, every piece begins with purpose.
          </p>
        </div>
        <div className="mt-12">
          <Link href="/about" className="group inline-flex items-center text-sm tracking-widest uppercase font-medium hover:text-brand-burgundy transition-colors">
            Our Story 
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* HERITAGE CAMPAIGN */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-black/5 dark:bg-white/5 flex flex-col lg:flex-row gap-16 items-center transition-colors duration-500">
        <div className="w-full lg:w-1/2 relative aspect-[3/4]">
          <Image
            src="/media/heritage_1.jpg"
            alt="Heritage Collection"
            fill
            className="object-cover object-top"
          />
        </div>
        <div className="w-full lg:w-1/2 max-w-xl">
          <p className="text-xs tracking-widest uppercase mb-6 font-medium text-brand-burgundy">The Heritage Collection</p>
          <h2 className="font-display text-5xl md:text-7xl mb-8 leading-[1.1]">
            Before anyone asks who the celebrant is, the agbada has already answered.
          </h2>
          <p className="text-lg font-light opacity-80 mb-10 leading-relaxed">
            A big occasion deserves presence to match. Traditional pieces shaped by proportion, craftsmanship and occasion.
          </p>
          <Link 
            href="/heritage" 
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-black dark:bg-white text-white dark:text-black hover:bg-brand-burgundy dark:hover:bg-brand-burgundy dark:hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase"
          >
            Discover Heritage
          </Link>
        </div>
      </section>

      {/* CONTEMPORARY TAILORING */}
      <section className="py-24 px-8 md:px-16 lg:px-24 flex flex-col-reverse lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2 max-w-xl lg:pl-12">
          <h2 className="font-display text-5xl md:text-7xl mb-8 leading-[1.1]">
            Made for how you enter the room.
          </h2>
          <p className="text-lg font-light opacity-80 mb-10 leading-relaxed">
            Tailored suits, shirts, trousers and contemporary pieces built around fit, character and purpose.
          </p>
          <Link 
            href="/men" 
            className="inline-flex items-center justify-center px-8 py-4 border border-brand-black dark:border-white text-brand-black dark:text-white hover:bg-brand-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors duration-300 text-sm tracking-wider uppercase"
          >
            Explore Tailoring
          </Link>
        </div>
        <div className="w-full lg:w-1/2 relative aspect-[3/4]">
          <Image
            src="/media/tailoring_1.jpg"
            alt="Contemporary Tailoring"
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

      {/* CORPORATE BUSINESS */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-brand-black dark:bg-brand-black text-brand-white text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-6 font-medium text-brand-white/70">Abraham Collection For Business</p>
          <h2 className="font-display text-5xl md:text-7xl mb-10 leading-[1.1]">
            When your people wear your brand.
          </h2>
          <p className="text-lg md:text-xl font-light text-brand-white/80 leading-relaxed max-w-3xl mx-auto mb-12">
            Uniforms and corporate clothing developed for organisations that understand presentation is part of identity.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16 text-sm tracking-wide text-brand-white/60">
            <div>25+ Years Experience</div>
            <div>Institutional Production</div>
            <div>Scalable Fulfilment</div>
            <div>Custom Design</div>
          </div>

          <Link href="/corporate" className="group inline-flex items-center text-sm tracking-widest uppercase font-medium hover:text-brand-cream transition-colors">
            Corporate Enquiries 
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
      
    </main>
  );
}
