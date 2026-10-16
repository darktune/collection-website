import Link from "next/link";
import { ShieldCheck, Lock, UserCheck, EyeOff } from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";

export const metadata = {
  title: "Client Privacy & Measurement Security | Abraham Collection",
  description: "Privacy policy, anatomical measurement confidentiality, NDPR/GDPR compliance, and client security standards at Abraham Collection.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white pt-32 pb-24 px-6 md:px-16 lg:px-24 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 pb-8 border-b border-brand-black/10 dark:border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase rounded-full mb-6">
            <AdinkraheneIcon size={12} />
            <span>Client Confidentiality Protocol</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            Bespoke Privacy Policy.
          </h1>
          <p className="text-xs uppercase tracking-widest opacity-60">
            Last Updated: October 2026 &bull; Compliant with Nigeria Data Protection Act (NDPA) &amp; GDPR
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40">
            <Lock size={20} className="text-brand-crimson dark:text-brand-gold mb-4" />
            <h3 className="font-display text-lg mb-2">Anatomical Measurement Vault</h3>
            <p className="font-light text-xs opacity-80 leading-relaxed">
              Your 24 individual body measurements and fitting profiles are stored in an encrypted vault accessible solely by master cutter Bolaji Abayomi Abraham and designated senior pattern makers.
            </p>
          </div>
          <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-brand-onyx/40">
            <EyeOff size={20} className="text-brand-crimson dark:text-brand-gold mb-4" />
            <h3 className="font-display text-lg mb-2">VIP Non-Disclosure (NDA)</h3>
            <p className="font-light text-xs opacity-80 leading-relaxed">
              For state dignitaries, royalty, and high-profile wedding parties, garment designs and sketches are never published or previewed before the official event date without written consent.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 text-sm font-light opacity-85 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-xl opacity-100 font-medium">1. Information We Collect</h2>
            <p>
              When commissioning a garment or creating an Atelier profile, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs opacity-80">
              <li>Contact coordinates: Full legal name, WhatsApp number, telephone, delivery address, and email.</li>
              <li>Sartorial profile: Height, posture notes, shoulder slope, and 24 specific anatomical measurements.</li>
              <li>Fabric preferences: Preferred weave weights, color swatches, and ceremonial event deadlines.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl opacity-100 font-medium">2. Purpose of Data Processing</h2>
            <p>
              Your data is exclusively utilized to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs opacity-80">
              <li>Draft bespoke paper patterns and conduct virtual diaspora baste reviews.</li>
              <li>Coordinate insured international delivery via DHL Express / FedEx Priority.</li>
              <li>Transmit status updates regarding fabric weaving, embroidery, and dispatch.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl opacity-100 font-medium">3. Data Retention &amp; Right to Erase</h2>
            <p>
              We maintain measurement records for 5 years to facilitate seamless re-orders without requiring new fitting sessions. You retain the absolute right at any moment to request full deletion of your measurement file by messaging our concierge at <a href="mailto:concierge@abrahamcollection.com" className="underline hover:text-brand-gold">concierge@abrahamcollection.com</a>.
            </p>
          </section>
        </div>

        {/* Back CTA */}
        <div className="mt-16 pt-8 border-t border-brand-black/10 dark:border-white/10 flex justify-between items-center text-xs uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-crimson dark:hover:text-brand-gold">
            &larr; Return to Atelier
          </Link>
          <Link href="/contact" className="hover:text-brand-crimson dark:hover:text-brand-gold">
            Contact Privacy Officer &rarr;
          </Link>
        </div>

      </div>
    </main>
  );
}
