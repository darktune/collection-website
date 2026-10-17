"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook, MessageSquare, CheckCircle2 } from "lucide-react";

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 16 16">
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
  </svg>
);

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#EAE0D2] dark:bg-black text-brand-black dark:text-[#FCFAF7] pt-24 pb-8 px-8 md:px-16 lg:px-24 overflow-hidden relative transition-colors duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-32 relative z-10">
        
        {/* Nav 1 */}
        <div className="flex flex-col gap-4 text-sm font-light text-brand-black/80 dark:text-[#FCFAF7]/80">
          <h4 className="text-xs uppercase tracking-widest font-medium text-brand-black dark:text-white mb-2">Collections</h4>
          <Link href="/heritage" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Heritage</Link>
          <Link href="/men" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Men</Link>
          <Link href="/women" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Women</Link>
          <Link href="/bespoke" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Bespoke</Link>
          <Link href="/corporate" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Corporate</Link>
        </div>

        {/* Nav 2 */}
        <div className="flex flex-col gap-4 text-sm font-light text-brand-black/80 dark:text-[#FCFAF7]/80">
          <h4 className="text-xs uppercase tracking-widest font-medium text-brand-black dark:text-white mb-2">Brand</h4>
          <Link href="/about" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Our Story</Link>
          <Link href="/stories" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">The Style Anthology</Link>
          <Link href="/contact" className="hover:text-brand-burgundy dark:hover:text-white hover:translate-x-1 transition-all duration-300">Contact Studio</Link>
        </div>

        {/* Socials under META & TikTok */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-widest font-medium text-brand-black dark:text-white">Official Channels</h4>
          <div className="flex gap-4 text-brand-black/80 dark:text-[#FCFAF7]/80 items-center">
            <a 
              href="https://www.instagram.com/abrahams_collection" 
              target="_blank" 
              rel="noreferrer" 
              title="Abraham Collection Instagram"
              className="hover:text-brand-burgundy dark:hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.facebook.com/bolaji.abraham.10" 
              target="_blank" 
              rel="noreferrer" 
              title="Founder Bolaji Abraham Facebook"
              className="hover:text-brand-burgundy dark:hover:text-white hover:scale-110 transition-all duration-300"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a 
              href="https://www.tiktok.com/@abraham00031" 
              target="_blank" 
              rel="noreferrer" 
              title="TikTok: @abraham00031"
              className="hover:text-brand-burgundy dark:hover:text-white hover:scale-110 transition-all duration-300"
            >
              <TikTokIcon size={18} />
            </a>
            <a 
              href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20am%20reaching%20out%20from%20the%20website." 
              target="_blank" 
              rel="noreferrer" 
              title="WhatsApp Concierge (Eranibaniso: 08034432759)"
              className="hover:text-brand-gold hover:scale-110 transition-all duration-300"
            >
              <MessageSquare size={19} strokeWidth={1.5} />
            </a>
          </div>
          <div className="text-[11px] font-mono opacity-60">
            Direct Calls: <a href="tel:08122640820" className="hover:underline">0812 264 0820</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-widest font-medium text-brand-black dark:text-white">Newsletter</h4>
          <p className="text-sm font-light text-brand-black/70 dark:text-[#FCFAF7]/70 leading-relaxed">
            Updates on collections, editorial stories, and bespoke availability.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 text-xs text-brand-gold py-2">
              <CheckCircle2 size={16} />
              <span>Welcome to the Atelier Circle.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex border-b border-brand-black/30 dark:border-[#FCFAF7]/30 pb-2 mt-2 group">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-brand-black/40 dark:placeholder:text-[#FCFAF7]/30 focus:placeholder:text-brand-black/70 dark:focus:placeholder:text-[#FCFAF7]/50 transition-colors"
                required
              />
              <button type="submit" className="text-xs uppercase tracking-widest font-medium text-brand-black/70 dark:text-[#FCFAF7]/70 group-hover:text-brand-burgundy dark:group-hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Centered Brand Logo */}
      <div className="w-full flex justify-center items-center py-16 relative z-10 opacity-70 hover:opacity-100 transition-opacity duration-500">
        <img 
          src="/media/logo_transparent.png" 
          alt="Abraham Collection Logo" 
          className="h-32 md:h-48 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-500"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-brand-black/10 dark:border-[#FCFAF7]/10 text-center md:text-left gap-6 relative z-10 text-brand-black/50 dark:text-[#FCFAF7]/50 text-xs tracking-widest uppercase transition-colors duration-500">
        <div>© 2026 Abraham Collection. All rights reserved. &bull; <span className="font-name italic text-sm tracking-normal font-normal text-brand-gold">Bolaji Abayomi Abraham</span></div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-brand-burgundy dark:hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-brand-burgundy dark:hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
