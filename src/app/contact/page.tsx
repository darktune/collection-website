"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import { PempamsieIcon, AdinkraheneIcon, IrukereIcon } from "@/components/icons/BespokeIcons";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-white dark:bg-brand-black text-brand-black dark:text-brand-white pt-32 pb-24 px-6 md:px-16 lg:px-24 transition-colors duration-500">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-6">
          <AdinkraheneIcon size={12} />
          <span>Atelier Direct &bull; Lagos Flagship</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
          Connect With The Atelier.
        </h1>
        <p className="font-light text-base md:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
          Whether you are in Lagos or commissioning from London, New York, or Toronto, our master cutters and diaspora concierge ensure seamless bespoke service.
        </p>
      </section>

      {/* Main Grid: Direct Lines & Consultation Form */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Direct Communication Lines */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="p-8 border border-brand-black/10 dark:border-white/10 bg-brand-cream/40 dark:bg-brand-onyx/40 backdrop-blur-sm">
            <h2 className="font-display text-2xl mb-6 flex items-center gap-3">
              <PempamsieIcon size={20} className="text-brand-crimson dark:text-brand-gold" />
              <span>Direct Tailor Lines</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-brand-gold mb-6 font-medium">
              Eranibaniso &bull; Speak Directly with Bolaji Abraham
            </p>

            <div className="flex flex-col gap-6 text-sm">
              <a
                href="tel:08122640820"
                className="flex items-start gap-4 p-4 border border-brand-black/5 dark:border-white/5 hover:border-brand-gold transition-colors group"
              >
                <Phone size={18} className="text-brand-crimson dark:text-brand-gold mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">Primary Atelier Line</div>
                  <div className="text-base font-mono opacity-80 mt-0.5">0812 264 0820</div>
                  <div className="text-[10px] opacity-60 uppercase tracking-widest mt-1">Direct Calls & Urgent Fittings</div>
                </div>
              </a>

              <a
                href="https://wa.me/2348034432759?text=Hello%20Abraham%20Collection%2C%20I%20would%20like%20to%20enquire%20about%20a%20bespoke%20commission."
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-4 border border-brand-black/5 dark:border-white/5 hover:border-brand-gold transition-colors group"
              >
                <MessageSquare size={18} className="text-brand-gold mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">WhatsApp Concierge</div>
                  <div className="text-base font-mono opacity-80 mt-0.5">0803 443 2759</div>
                  <div className="text-[10px] opacity-60 uppercase tracking-widest mt-1">Instant Fabric Photos & Video Consultations</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 border border-brand-black/5 dark:border-white/5">
                <MapPin size={18} className="text-brand-crimson dark:text-brand-gold mt-0.5" />
                <div>
                  <div className="font-medium">Atelier Location</div>
                  <div className="opacity-80 mt-0.5">Lagos Studio & Cutting Rooms, Nigeria</div>
                  <div className="text-[10px] opacity-60 uppercase tracking-widest mt-1">By Private Appointment Only</div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-brand-black/5 dark:border-white/5">
                <Clock size={18} className="text-brand-crimson dark:text-brand-gold mt-0.5" />
                <div>
                  <div className="font-medium">Studio Hours (WAT)</div>
                  <div className="opacity-80 mt-0.5">Monday &ndash; Saturday: 09:00 &ndash; 18:30</div>
                  <div className="text-[10px] opacity-60 uppercase tracking-widest mt-1">Sunday: Reserved for diaspora video fittings</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="p-6 border border-brand-black/10 dark:border-white/10 flex flex-col gap-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold opacity-70">Official Channels</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <a
                href="https://www.facebook.com/bolaji.abraham.10"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 border border-brand-black/5 dark:border-white/5 hover:border-brand-gold transition-colors"
              >
                <span>Facebook</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <a
                href="https://www.instagram.com/abrahams_collection"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 border border-brand-black/5 dark:border-white/5 hover:border-brand-gold transition-colors"
              >
                <span>Instagram</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <a
                href="https://www.tiktok.com/@abraham00031"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 border border-brand-black/5 dark:border-white/5 hover:border-brand-gold transition-colors"
              >
                <span>TikTok</span>
                <ArrowUpRight size={14} className="opacity-60" />
              </a>
              <Link
                href="/bespoke/commission?type=diaspora"
                className="flex items-center justify-between p-3 bg-brand-crimson text-white hover:bg-brand-burgundy-light transition-colors"
              >
                <span>VIP Diaspora</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Consultation Booking Form */}
        <div className="lg:col-span-7 p-8 md:p-12 border border-brand-black/10 dark:border-white/10 bg-brand-card/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-black/10 dark:border-white/10">
            <div>
              <h2 className="font-display text-2xl">Send Studio Inquiry</h2>
              <p className="text-xs opacity-60 uppercase tracking-widest mt-1">Guaranteed Response within 4 Business Hours</p>
            </div>
            <IrukereIcon size={24} className="text-brand-gold opacity-80" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you. Your message has reached the Abraham Collection atelier concierge. We will contact you via WhatsApp or phone shortly.");
            }}
            className="flex flex-col gap-6 text-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Adeleke Balogun"
                  className="w-full bg-transparent border border-brand-black/20 dark:border-white/20 p-3.5 focus:border-brand-gold outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 812 000 0000"
                  className="w-full bg-transparent border border-brand-black/20 dark:border-white/20 p-3.5 focus:border-brand-gold outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-transparent border border-brand-black/20 dark:border-white/20 p-3.5 focus:border-brand-gold outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">Location / Country</label>
                <input
                  type="text"
                  required
                  placeholder="Lagos, London, Atlanta, Toronto..."
                  className="w-full bg-transparent border border-brand-black/20 dark:border-white/20 p-3.5 focus:border-brand-gold outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">Inquiry Type</label>
              <select className="w-full bg-transparent border border-brand-black/20 dark:border-white/20 p-3.5 focus:border-brand-gold outline-none transition-colors dark:bg-brand-onyx">
                <option value="bespoke">Private Bespoke Garment Commission</option>
                <option value="wedding">Wedding / Groom Royal Attire</option>
                <option value="diaspora">Diaspora Measurement & Delivery (UK/US/Canada)</option>
                <option value="corporate">Corporate Uniform & Executive Identity</option>
                <option value="alterations">Atelier Fitting & Archive Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest opacity-70 mb-2 font-medium">Project Brief or Fitting Date</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your occasion, target event date, fabric preferences, or specific tailoring requirements..."
                className="w-full bg-transparent border border-brand-black/20 dark:border-white/20 p-3.5 focus:border-brand-gold outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase tracking-luxury text-xs font-semibold transition-colors duration-300 shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <PempamsieIcon size={14} className="text-brand-gold" />
              <span>Transmit Studio Inquiry</span>
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
