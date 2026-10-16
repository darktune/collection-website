import Image from "next/image";
import Link from "next/link";
import { Quote, Sparkles, Heart, ArrowUpRight } from "lucide-react";
import { PempamsieIcon, AdinkraheneIcon, IrukereIcon, AsoOkeWeaveIcon } from "@/components/icons/BespokeIcons";

export const metadata = {
  title: "The Style Anthology | Stories & Lookbook Archive | Abraham Collection",
  description: "The living visual archive of Abraham Collection. Featuring 25 years of master tailoring by Bolaji Abayomi Abraham and 'Our love for our customers who have a special place in our hearts'.",
};

interface CustomerStory {
  id: string;
  name: string;
  title: string;
  city: string;
  occasion: string;
  garment: string;
  quote: string;
  image: string;
}

const customerStories: CustomerStory[] = [
  {
    id: "patron-1",
    name: "Chief Babatunde Adeleke",
    title: "Senior Partner & Cultural Patron",
    city: "Lagos & London",
    occasion: "Silver Jubilee Chieftaincy Installation",
    garment: "Hand-Loomed Black & Gold Dandogo Agbada",
    quote: "When you step into a room wearing Bolaji Abraham's Agbada, you don't announce yourself. The weight of the fabric, the symmetry of the embroidery, and the drape command the silence for you. It made me feel ancestral yet sovereign.",
    image: "/media/heritage_1.jpg",
  },
  {
    id: "patron-2",
    name: "Dr. Oluwaseun & Dr. Nneka Davies",
    title: "Diaspora Physicians",
    city: "Toronto, Canada",
    occasion: "Traditional & White Wedding Celebrations",
    garment: "Bespoke Royal Burgundy Aso Oke Ensemble",
    quote: "Ordering from Canada, we were terrified about long-distance measurements. Abraham Collection conducted two virtual fitting reviews and delivered two weeks early. The garment didn't require a single millimetre of alteration. Our pride was overflowing.",
    image: "/media/hero_2.jpg",
  },
  {
    id: "patron-3",
    name: "Tariq Al-Mansoor",
    title: "Managing Director, Global Investments",
    city: "New York & Lagos",
    occasion: "Pan-African Executive Summit Keynote",
    garment: "Midnight Navy Architectural Senator Suit",
    quote: "I've worn Savile Row for fifteen years. Abraham Collection's cut gives you that structured European shoulder, but the silhouette breathes West African authority. It is clothing that suits who I am.",
    image: "/media/tailoring_1.jpg",
  },
];

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white pt-32 pb-24 px-6 md:px-16 lg:px-24 transition-colors duration-500">
      
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-6">
          <AdinkraheneIcon size={12} />
          <span>The Living Visual Archive</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
          The Style Anthology.
        </h1>
        <p className="font-light text-base md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
          Where heritage textiles, master cutting, and personal human stories meet. Every stitch has a rhythm; every garment has a name.
        </p>
      </section>

      {/* Founder Spotlight: Bolaji Abayomi Abraham */}
      <section className="max-w-6xl mx-auto mb-32 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40 p-8 md:p-16 backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-brand-onyx">
            <Image
              src="/media/hero_1.jpg"
              alt="Bolaji Abayomi Abraham - Founder and Head Fashion Designer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-[10px] tracking-widest uppercase text-brand-gold font-medium">Head Designer &amp; Founder</span>
              <span className="font-patron italic text-3xl font-normal text-brand-white">Bolaji Abayomi Abraham</span>
              <span className="text-xs opacity-75 mt-0.5">25 Years of Architectural Tailoring in Lagos</span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-crimson dark:text-brand-gold font-medium">
              <PempamsieIcon size={16} />
              <span>Founder Story &bull; Est. 1999</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl leading-snug">
              "A suit or an Agbada is not merely cloth; it is the physical posture of a person's dignity."
            </h2>

            <div className="space-y-4 font-light text-sm md:text-base opacity-80 leading-relaxed">
              <p>
                In 1999, Bolaji Abayomi Abraham founded Abraham Collection in Lagos with a singular standard: to eradicate ill-fitting African garments and engineer bespoke attire with mathematical precision.
              </p>
              <p>
                Having spent over a quarter-century mastering the drape of Nigerian Aso Oke, the structure of virgin wool, and the anatomical flow of the agbada, Bolaji pioneered a hybrid cutting method—infusing Savile Row discipline into the majesty of Yoruba ceremonial dress.
              </p>
              <p>
                Today, his atelier dresses presidents, international corporate leaders, and diaspora grooms across the United Kingdom, United States, Canada, and Nigeria.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <Link
                href="/bespoke/commission"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase tracking-luxury text-xs font-semibold transition-colors"
              >
                <span>Book Appointment with Bolaji</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://www.facebook.com/bolaji.abraham.10"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-brand-black/20 dark:border-white/20 hover:border-brand-gold uppercase tracking-luxury text-xs font-medium transition-colors"
              >
                <span>Founder Facebook Profile</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Curated Customer Lookbook Chapter */}
      <section className="max-w-6xl mx-auto mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-crimson dark:border-brand-gold bg-brand-crimson/10 dark:bg-brand-gold/10 text-brand-crimson dark:text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-4">
            <Heart size={12} className="fill-current" />
            <span>Chapter VII &bull; Dedicated Patron Exhibition</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl mb-6">
            "Our love for our customers who have a special place in our hearts."
          </h2>
          <p className="font-light text-sm md:text-base opacity-75 leading-relaxed">
            A celebration of the people who bring our creations to life. Here are the weddings, ceremonies, and moments where our clothes gave them confidence, pride, and beauty.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {customerStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col border border-brand-black/10 dark:border-white/10 bg-brand-card/20 overflow-hidden group hover:border-brand-gold transition-colors duration-300"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-brand-onyx">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-onyx/80 backdrop-blur-md px-3 py-1 text-[10px] tracking-widest uppercase text-brand-gold border border-brand-gold/20">
                  {story.occasion}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                <div className="space-y-3">
                  <Quote size={20} className="text-brand-gold/60" />
                  <p className="font-light text-sm italic opacity-90 leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-black/10 dark:border-white/10">
                  <h4 className="font-patron italic text-2xl font-normal text-brand-black dark:text-brand-white">{story.name}</h4>
                  <p className="text-xs opacity-60 mt-0.5">{story.title} &bull; {story.city}</p>
                  <p className="text-[11px] font-mono text-brand-crimson dark:text-brand-gold mt-2 uppercase tracking-wider">
                    {story.garment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lookbook Callout to Join the Anthology */}
      <section className="max-w-4xl mx-auto text-center p-12 border border-brand-gold/30 bg-brand-gold/5 backdrop-blur-sm">
        <AsoOkeWeaveIcon size={32} className="text-brand-gold mx-auto mb-6" />
        <h3 className="font-display text-2xl md:text-3xl mb-4">Have You Worn Abraham Collection?</h3>
        <p className="font-light text-sm opacity-80 max-w-xl mx-auto mb-8 leading-relaxed">
          We invite all clients to submit your high-resolution event photographs for inclusion in our permanent Anthology.
        </p>
        <a
          href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20would%20love%20to%20submit%20my%20event%20pictures%20for%20The%20Style%20Anthology."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase tracking-luxury text-xs font-semibold transition-colors"
        >
          <span>Submit Photos to WhatsApp Concierge</span>
          <ArrowUpRight size={14} />
        </a>
      </section>

    </main>
  );
}
