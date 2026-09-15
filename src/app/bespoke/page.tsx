import Image from "next/image";
import Link from "next/link";

export default function BespokeLanding() {
  return (
    <main className="flex flex-col">
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center py-32 px-8 md:px-16 lg:px-24 overflow-hidden bg-brand-black text-brand-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/hero_1.jpg"
            alt="Bespoke Tailoring"
            fill
            className="object-cover object-top opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs tracking-widest uppercase mb-4 font-medium text-brand-cream">Abraham Collection Bespoke</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-none">
            Individually Commissioned.
          </h1>
          <p className="text-lg md:text-xl font-light text-brand-white/80 leading-relaxed mb-10 max-w-2xl">
            A private-client service for those who require garments built entirely around their measurements, preferences, and the specific demands of their occasion.
          </p>
          <Link 
            href="/bespoke/commission" 
            className="inline-flex items-center justify-center px-10 py-5 font-sans border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black text-xs tracking-[0.2em] uppercase mt-4"
          >
            Begin a Commission
          </Link>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-white dark:bg-black text-brand-black dark:text-white max-w-5xl mx-auto text-center border-b border-brand-black/10 dark:border-white/10">
        <h2 className="font-display text-4xl md:text-5xl mb-8">What is Bespoke?</h2>
        <p className="font-light opacity-80 leading-relaxed mb-16 max-w-3xl mx-auto text-lg">
          A bespoke fashion designer creates custom, made-to-order clothing crafted from scratch based on a client's exact measurements, fabric choices, and style preferences. Unlike off-the-rack ready-to-wear or standard tailoring adjustments, bespoke is built entirely around you.
        </p>

        <h2 className="font-display text-4xl md:text-5xl mb-8 mt-24">The Bespoke Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-16">
          <div className="group">
            <div className="text-brand-burgundy font-display text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">01</div>
            <h3 className="uppercase tracking-widest text-sm font-medium mb-3">Initial Consultation</h3>
            <p className="font-light opacity-70 leading-relaxed">
              You meet with the designer to discuss your vision, event, fabric options, and design details.
            </p>
          </div>
          <div className="group">
            <div className="text-brand-burgundy font-display text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">02</div>
            <h3 className="uppercase tracking-widest text-sm font-medium mb-3">Taking Measurements</h3>
            <p className="font-light opacity-70 leading-relaxed">
              Precise, individual body measurements are taken to build a unique pattern exclusively for your shape.
            </p>
          </div>
          <div className="group">
            <div className="text-brand-burgundy font-display text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">03</div>
            <h3 className="uppercase tracking-widest text-sm font-medium mb-3">Fittings & Construction</h3>
            <p className="font-light opacity-70 leading-relaxed">
              The garment is constructed through stages, often including intermediate mock-up or base fittings to ensure a flawless final fit.
            </p>
          </div>
        </div>
      </section>
      
      {/* Educational context */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-cream dark:bg-[#111] text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-6">A Tradition of Nigerian Excellence</h2>
        <p className="font-light opacity-80 leading-relaxed max-w-3xl mx-auto mb-10">
          Abraham Collection stands alongside the noted bespoke designers and brands elevating Nigerian fashion globally. Like Mai Atafo's sophisticated formal wear, Deji & Kola's contemporary native wear, A1 Bridal's custom event dresses, and Bibireola Bespoke's intricate asoebi creations—we believe in uncompromised craftsmanship and intentional dressing.
        </p>
      </section>
      
      {/* Diaspora Callout */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-cream text-brand-black flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
           <p className="text-xs tracking-widest uppercase mb-4 font-medium text-brand-burgundy">Abraham Celebration Service</p>
           <h2 className="font-display text-4xl md:text-5xl mb-6">One family. One occasion.<br/>One coordinated wardrobe.</h2>
           <p className="font-light text-brand-black/80 leading-relaxed mb-8 max-w-lg">
             A specialized service for our diaspora clients requiring coordinated ceremonial wear for weddings, anniversaries, and naming ceremonies across the UK, US, Canada, and Europe.
           </p>
           <Link href="/bespoke/commission?type=diaspora" className="uppercase tracking-widest text-sm font-medium hover:text-brand-burgundy transition-colors underline underline-offset-4">
             Learn More
           </Link>
        </div>
        <div className="w-full md:w-1/2 h-80 relative">
          <Image
            src="/media/hero_2.jpg"
            alt="Abraham Celebration Service"
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

    </main>
  );
}
