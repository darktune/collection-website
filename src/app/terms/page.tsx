import Link from "next/link";
import { Scale, CheckCircle2, Truck, RefreshCcw } from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";

export const metadata = {
  title: "Bespoke Commission Terms & Client Agreement | Abraham Collection",
  description: "Terms of bespoke commission, fitting schedules, deposit milestones, diaspora shipping insurance, and alteration policies at Abraham Collection Lagos.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white pt-32 pb-24 px-6 md:px-16 lg:px-24 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-brand-black/10 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase rounded-full mb-6">
            <AdinkraheneIcon size={12} />
            <span>Sartorial Agreement</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Terms of Commission.
          </h1>
          <p className="text-xs uppercase tracking-widest opacity-60">
            Last Updated: October 2026 &bull; Abraham Collection Atelier Lagos
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40">
            <Scale size={20} className="text-brand-crimson dark:text-brand-gold mb-4" />
            <h3 className="font-display text-lg mb-2">Deposit &amp; Production Start</h3>
            <p className="font-light text-xs opacity-80 leading-relaxed">
              Bespoke commissions initiate upon a 70% commencement commitment. The concluding 30% balance is payable upon final baste inspection approval prior to worldwide dispatch.
            </p>
          </div>
          <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40">
            <Truck size={20} className="text-brand-crimson dark:text-brand-gold mb-4" />
            <h3 className="font-display text-lg mb-2">Worldwide Insured Transit</h3>
            <p className="font-light text-xs opacity-80 leading-relaxed">
              All diaspora shipments (UK, USA, Canada, Europe) are dispatched via tracked DHL Express or FedEx Priority with 100% loss and transit damage insurance coverage.
            </p>
          </div>
          <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40">
            <RefreshCcw size={20} className="text-brand-crimson dark:text-brand-gold mb-4" />
            <h3 className="font-display text-lg mb-2">Alteration Guarantee</h3>
            <p className="font-light text-xs opacity-80 leading-relaxed">
              In the rare event of fit deviation, Abraham Collection provides complimentary alterations at our Lagos studio, or covers up to $100 USD local tailoring credit for diaspora clients.
            </p>
          </div>
          <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40">
            <CheckCircle2 size={20} className="text-brand-crimson dark:text-brand-gold mb-4" />
            <h3 className="font-display text-lg mb-2">Handmade Textile Variations</h3>
            <p className="font-light text-xs opacity-80 leading-relaxed">
              Authentic hand-loomed Aso Oke and artisanal Adire cloths feature natural weave variations. These are not flaws; they are the certified signature of human artistry.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm font-light opacity-85 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-xl opacity-100 font-medium">1. Commission Timelines</h2>
            <p>
              Standard bespoke commissions require <strong>3 to 5 weeks</strong> from final measurement sign-off. Express ceremonial services (10 to 14 business days) are available subject to fabric availability and an express studio surge fee.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl opacity-100 font-medium">2. Client Measurement Accuracy</h2>
            <p>
              For diaspora commissions completed via self-measurement or local tailor sheets, clients must adhere to the Abraham Collection video guide. Any subsequent client weight changes exceeding 5kg between baste approval and delivery may necessitate fee-based alterations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl opacity-100 font-medium">3. Cancellations &amp; Bespoke Nature</h2>
            <p>
              Because bespoke fabrics are individually cut and loomed to individual anatomical contours, orders may not be cancelled once fabric cutting has commenced. Deposits are non-refundable after cutting milestone sign-off.
            </p>
          </section>
        </div>

        {/* Back CTA */}
        <div className="mt-16 pt-8 border-t border-brand-black/10 dark:border-white/10 flex justify-between items-center text-xs uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-crimson dark:hover:text-brand-gold">
            &larr; Return to Atelier
          </Link>
          <Link href="/bespoke/commission" className="hover:text-brand-crimson dark:hover:text-brand-gold">
            Begin Commission &rarr;
          </Link>
        </div>

      </div>
    </main>
  );
}
