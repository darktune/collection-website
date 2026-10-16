import Image from "next/image";
import Link from "next/link";
import {
  PempamsieIcon,
  OjuOyaIcon,
  AbereIcon,
  AdeAreIcon,
  AdinkraheneIcon,
  IrukereIcon,
  SankofaDiasporaIcon,
} from "@/components/icons/BespokeIcons";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function BespokeLanding() {
  return (
    <main className="flex flex-col font-sans">
      {/* 1. HERO PROCLAMATION */}
      <section className="relative min-h-[75vh] w-full flex flex-col justify-end py-24 px-8 md:px-16 lg:px-24 overflow-hidden bg-brand-onyx text-brand-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/media/hero_1.jpg"
            alt="Abraham Collection Bespoke Atelier"
            fill
            className="object-cover object-top opacity-45"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-onyx via-brand-onyx/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <AdinkraheneIcon size={16} className="text-brand-gold" />
            <p className="text-xs tracking-ultra-wide uppercase font-medium text-brand-gold">
              Private Client Atelier &bull; Lagos &bull; Global Concierge
            </p>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.95] text-balance">
            Individually<br />Commissioned.
          </h1>
          <p className="text-lg md:text-xl font-light text-brand-silk/90 leading-relaxed mb-10 max-w-2xl text-balance">
            Garments built from raw canvas to honor your posture, character, and occasion. Not adapted from a template. Created exclusively for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/bespoke/commission"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-brand-crimson text-brand-white hover:bg-brand-burgundy-light text-xs tracking-luxury uppercase font-medium transition-colors"
            >
              <PempamsieIcon size={16} className="text-brand-gold" />
              <span>Begin a Commission</span>
            </Link>
            <Link
              href="/bespoke/commission?type=diaspora"
              className="inline-flex items-center justify-center gap-2 px-9 py-4 border border-brand-silk/30 text-brand-silk hover:bg-brand-silk hover:text-brand-onyx text-xs tracking-luxury uppercase font-medium transition-colors"
            >
              <SankofaDiasporaIcon size={16} />
              <span>Diaspora Celebration Service</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE DISTINCTION: BESPOKE VS. READY-TO-WEAR */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-white dark:bg-brand-charcoal text-brand-onyx dark:text-brand-silk border-b border-brand-black/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-3">
              The Sartorial Standard
            </p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              What Defines True Bespoke?
            </h2>
            <div className="divider-loom w-48 mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02] relative group hover:border-brand-crimson transition-colors">
              <div className="text-brand-crimson dark:text-brand-gold mb-6">
                <OjuOyaIcon size={32} />
              </div>
              <h3 className="font-display text-2xl mb-3">Oju Oya (Anatomical Symmetry)</h3>
              <p className="font-light opacity-75 text-sm leading-relaxed">
                Guided by the sacred diamond proportion grid of traditional master weavers. Over 28 distinct anatomical measurements are drafted onto blank brown paper, accounting for shoulder slope, hollow chests, and natural posture.
              </p>
            </div>

            <div className="p-8 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02] relative group hover:border-brand-crimson transition-colors">
              <div className="text-brand-crimson dark:text-brand-gold mb-6">
                <AbereIcon size={32} />
              </div>
              <h3 className="font-display text-2xl mb-3">Abere (Hand-Forged Craft)</h3>
              <p className="font-light opacity-75 text-sm leading-relaxed">
                Honoring the royal needle tradition. Suits and structured agbada bibs feature floating natural horsehair and linen canvas hand-padded inside. The garment breathes, drapes without stiffness, and molds to your contours over time.
              </p>
            </div>

            <div className="p-8 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02] relative group hover:border-brand-crimson transition-colors">
              <div className="text-brand-crimson dark:text-brand-gold mb-6">
                <AdeAreIcon size={32} />
              </div>
              <h3 className="font-display text-2xl mb-3">Ade Are (Ceremonial Majesty)</h3>
              <p className="font-light opacity-75 text-sm leading-relaxed">
                Embodying royal celebrant status. Traditional Nigerian Agbada engineered with intentional shoulder weight distribution. The wings billow with royal majesty without bunching at the neck or shifting when arms are raised.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 5-STAGE BESPOKE PROTOCOL */}
      <section className="py-28 px-8 md:px-16 lg:px-24 bg-brand-silk dark:bg-brand-onyx text-brand-onyx dark:text-brand-silk">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-3">
                Methodology
              </p>
              <h2 className="font-display text-4xl md:text-6xl">
                The Atelier Protocol
              </h2>
            </div>
            <p className="text-sm font-light opacity-70 max-w-sm">
              Each commission undergoes a rigorous progression from initial dialogue to final ceremonial delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "The Dialogue",
                desc: "We discuss your milestone event, venue acoustics, lighting, and desired presence.",
              },
              {
                step: "02",
                title: "Measurement",
                desc: "28 body points recorded alongside stance, pitch, and neck curvature analysis.",
              },
              {
                step: "03",
                title: "Cloth Curation",
                desc: "Selecting from rare Italian wools, Super 160s, hand-woven Aso Oke, and custom silks.",
              },
              {
                step: "04",
                title: "The Baste Fitting",
                desc: "The garment is assembled in raw white basting stitch for intermediate sculptural adjustments.",
              },
              {
                step: "05",
                title: "Hand Finishing",
                desc: "Hand-rolled lapels, horn buttons, silk embroidery, and archive registry sealing.",
              },
            ].map((stage, i) => (
              <div
                key={i}
                className="p-6 border-t-2 border-brand-crimson/30 dark:border-brand-gold/30 flex flex-col justify-between hover:border-brand-crimson dark:hover:border-brand-gold transition-colors"
              >
                <div>
                  <span className="font-display text-3xl text-brand-crimson dark:text-brand-gold font-medium">
                    {stage.step}
                  </span>
                  <h4 className="uppercase text-xs tracking-luxury font-semibold mt-4 mb-2">
                    {stage.title}
                  </h4>
                  <p className="text-xs font-light opacity-75 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE DIASPORA CELEBRATION CONCIERGE (SANKOFA INHERITANCE) */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-charcoal text-brand-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase mb-6">
              <SankofaDiasporaIcon size={14} />
              <span>Sankofa Transatlantic Program</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              One Family.<br />One Occasion.<br />Across Continents.
            </h2>
            <p className="font-light text-brand-white/80 text-base leading-relaxed mb-8">
              Guided by the Sankofa principle of reclaiming ancestral inheritance. A specialized service designed for our diaspora clients in London, Atlanta, Houston, Toronto, and Dubai. Whether coordinating an 18-person bridal entourage or crafting an individual ceremonial piece from abroad, we eliminate distance with precision remote video measurement protocols, fabric swatch couriering, and timely international dispatch.
            </p>
            <ul className="space-y-3 mb-10 text-xs tracking-wider uppercase font-medium text-brand-white/90">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-brand-gold flex-shrink-0" />
                <span>Standardized measurement guide & live video verification</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-brand-gold flex-shrink-0" />
                <span>Direct DHL Express dispatch with garment garment-bag protection</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-brand-gold flex-shrink-0" />
                <span>Emergency alteration network partners in key diaspora hubs</span>
              </li>
            </ul>
            <Link
              href="/bespoke/commission?type=diaspora"
              className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-onyx hover:bg-brand-cream text-xs tracking-luxury uppercase font-semibold transition-colors"
            >
              <span>Inquire for Diaspora Group Booking</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="w-full lg:w-1/2 relative aspect-[4/5] overflow-hidden border border-white/10">
            <Image
              src="/media/hero_2.jpg"
              alt="Abraham Diaspora Ceremonial Service"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION: BEGIN CONSULTATION */}
      <section className="py-28 px-8 md:px-16 lg:px-24 text-center bg-brand-cream/50 dark:bg-brand-onyx border-t border-brand-black/5 dark:border-white/5">
        <div className="max-w-3xl mx-auto">
          <AdinkraheneIcon size={36} className="text-brand-crimson dark:text-brand-gold mx-auto mb-6" />
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            Your Occasion Awaits.
          </h2>
          <p className="font-light text-base md:text-lg opacity-80 leading-relaxed mb-10">
            Initial consultations are held in our private Lagos atelier or via secure digital appointment. Commission slots are strictly limited each month to ensure master tailor focus.
          </p>
          <Link
            href="/bespoke/commission"
            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-crimson text-brand-white hover:bg-brand-burgundy-light text-xs tracking-luxury uppercase font-semibold transition-colors shadow-lg"
          >
            <PempamsieIcon size={16} className="text-brand-gold" />
            <span>Schedule Initial Consultation</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
