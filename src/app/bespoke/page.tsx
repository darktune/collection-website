import Image from "next/image";
import Link from "next/link";

export default function BespokeLanding() {
  return (
    <main className="flex flex-col">
      <section className="relative h-[60vh] w-full flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden bg-brand-black text-brand-white">
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
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-white text-brand-black hover:bg-brand-cream transition-colors duration-300 text-sm tracking-wider uppercase"
          >
            Begin a Commission
          </Link>
        </div>
      </section>

      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-white text-brand-black max-w-5xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-8">The Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left mt-16">
          <div>
            <div className="text-brand-burgundy font-display text-4xl mb-4">01</div>
            <h3 className="uppercase tracking-widest text-sm font-medium mb-3">Consultation</h3>
            <p className="font-light text-brand-black/70 leading-relaxed">
              We discuss your occasion, stylistic preferences, and material choices, either in our studio or via a dedicated remote session.
            </p>
          </div>
          <div>
            <div className="text-brand-burgundy font-display text-4xl mb-4">02</div>
            <h3 className="uppercase tracking-widest text-sm font-medium mb-3">Fittings</h3>
            <p className="font-light text-brand-black/70 leading-relaxed">
              Precision measurements and staged fittings ensure the drape and structure are absolutely perfect.
            </p>
          </div>
          <div>
            <div className="text-brand-burgundy font-display text-4xl mb-4">03</div>
            <h3 className="uppercase tracking-widest text-sm font-medium mb-3">Delivery</h3>
            <p className="font-light text-brand-black/70 leading-relaxed">
              The final garment is presented, having been crafted with intentionality. We keep your measurements on file for future commissions.
            </p>
          </div>
        </div>
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
