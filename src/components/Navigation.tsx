"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ArrowUpRight, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const { user, setActiveModal, currency, setCurrency } = useAtelier();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Full nav reveals when scrolled or when hovered on desktop without height jitter
  const showFullNav = scrolled || isHovered;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500 font-sans"
    >
      {/* Top Heritage Bar: Permanent luxury ticker across all viewports (Mobile & Desktop) */}
      <div className="bg-brand-onyx text-brand-silk/80 text-[7.5px] sm:text-[8px] md:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.28em] uppercase px-3 sm:px-6 md:px-10 lg:px-12 h-6 md:h-7 flex justify-between items-center border-b border-white/5 select-none z-50">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-2">
          <AdinkraheneIcon size={10} className="text-brand-gold flex-shrink-0" />
          <span className="truncate">EST. 2002 &bull; 24 YEARS OF CRAFT &bull; LAGOS</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 text-[8px] md:text-[9px] tracking-[0.22em] md:tracking-[0.25em] flex-shrink-0">
          <Link href="/bespoke/commission?type=diaspora" className="hidden sm:inline hover:text-brand-gold transition-colors truncate">
            DIASPORA CONCIERGE (UK &bull; US &bull; CA &bull; EU)
          </Link>
          <span className="hidden sm:inline text-white/20">|</span>
          <Link href="/bespoke/commission" className="hidden md:inline hover:text-brand-gold transition-colors">
            APPOINTMENTS
          </Link>
          <span className="hidden sm:inline text-white/20">|</span>

          {/* Multi-Currency Switcher (NGN | USD | GBP) */}
          <div className="flex items-center border border-white/20 bg-white/5 divide-x divide-white/10 text-[7.5px] sm:text-[8px] tracking-[0.2em] font-mono flex-shrink-0">
            {(["NGN", "USD", "GBP"] as const).map((code) => (
              <button
                key={code}
                onClick={() => setCurrency(code)}
                className={`px-1.5 py-0.5 transition-colors uppercase font-medium ${
                  currency === code
                    ? "bg-brand-gold text-brand-onyx font-bold"
                    : "text-brand-silk/70 hover:text-brand-gold"
                }`}
                title={`Switch currency to ${code}`}
                aria-label={`Switch currency to ${code}`}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Dedicated Luxury Atelier Theme Switcher (Permanent top-right anchor, unclipped across all viewports) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-0.5 border border-white/20 hover:border-brand-gold text-brand-silk/90 hover:text-brand-gold transition-all duration-300 bg-white/5 hover:bg-white/10 text-[7.5px] sm:text-[8px] md:text-[8.5px] tracking-[0.22em] uppercase font-mono font-medium flex-shrink-0"
            aria-label="Toggle Atelier Theme"
            title={mounted ? (theme === "dark" ? "Switch to Raw Silk Light Theme" : "Switch to Velvet Obsidian Dark Theme") : "Toggle Theme"}
          >
            {mounted && theme === "dark" ? (
              <>
                <Sun size={10} className="text-brand-gold animate-in spin-in-180 duration-500" />
                <span className="font-semibold text-brand-gold">LIGHT</span>
              </>
            ) : (
              <>
                <Moon size={10} className="text-brand-gold animate-in spin-in-180 duration-500" />
                <span className="font-semibold text-brand-silk">DARK</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar - Balanced 3-column architecture:
          - Left: Desktop links / mobile spacer (ensures center logo is 100% centered on mobile)
          - Center: Prominent brand masthead & motto
          - Right: Desktop action links (Atelier Story, Sign In, Book Bespoke) and mobile menu button */}
      <nav
        className={`flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${
          scrolled
            ? "h-14 sm:h-16 md:h-18 bg-[#FCFAF7]/95 dark:bg-[#0B0908]/95 backdrop-blur-xl shadow-md border-b border-brand-black/5 dark:border-white/10"
            : isHovered
            ? "h-16 sm:h-20 md:h-22 bg-[#FCFAF7]/95 dark:bg-[#0B0908]/95 backdrop-blur-xl shadow-sm border-b border-brand-black/5 dark:border-white/10"
            : "h-16 sm:h-20 md:h-22 bg-gradient-to-b from-black/60 via-black/20 to-transparent border-b border-transparent"
        }`}
      >
        {/* Left Column: Desktop navigation links with micro-typography (Balances mobile width) */}
        <div className="flex items-center flex-1 justify-start">
          <div
            className={`hidden lg:flex items-center gap-4 xl:gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showFullNav
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 -translate-x-3 pointer-events-none"
            }`}
          >
            <Link
              href="/heritage"
              className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/85 dark:text-brand-silk/85 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
            >
              Heritage
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/bespoke"
              className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/85 dark:text-brand-silk/85 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
            >
              Bespoke Atelier
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/men"
              className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/85 dark:text-brand-silk/85 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
            >
              Tailoring
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/corporate"
              className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/85 dark:text-brand-silk/85 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
            >
              Corporate
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>

        {/* Center Column: Perfectly centered brand identity on both mobile and desktop */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center text-center px-1 sm:px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 max-w-[65vw] sm:max-w-none">
          <Link href="/" className="group flex flex-col items-center text-center">
            <span
              className={`font-display uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] truncate leading-tight ${
                scrolled
                  ? "text-base sm:text-lg md:text-xl xl:text-2xl tracking-[0.2em] sm:tracking-[0.24em] md:tracking-[0.28em] text-brand-black dark:text-brand-white"
                  : isHovered
                  ? "text-base sm:text-xl md:text-2xl xl:text-3xl tracking-[0.22em] sm:tracking-[0.26em] md:tracking-[0.3em] text-brand-black dark:text-brand-white"
                  : "text-base sm:text-xl md:text-2xl xl:text-3xl tracking-[0.24em] sm:tracking-[0.28em] md:tracking-[0.34em] text-white drop-shadow-sm"
              }`}
            >
              Abraham Collection
            </span>
            <span
              className={`font-sans uppercase font-light transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] truncate leading-none mt-0.5 sm:mt-1 ${
                scrolled
                  ? "text-[7px] sm:text-[7.5px] md:text-[8px] tracking-[0.28em] sm:tracking-[0.32em] text-brand-crimson dark:text-brand-gold opacity-90"
                  : isHovered
                  ? "text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.3em] sm:tracking-[0.36em] text-brand-crimson dark:text-brand-gold opacity-90"
                  : "text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.32em] sm:tracking-[0.4em] text-white/85 opacity-90"
              }`}
            >
              Clothing That Suits
            </span>
          </Link>
        </div>

        {/* Right Column: Theme toggle, desktop CTA links, and mobile menu button */}
        <div className="flex items-center gap-1.5 sm:gap-3 xl:gap-5 flex-1 justify-end">
          {/* Desktop Scroll/Hover Links */}
          <div
            className={`hidden lg:flex items-center gap-3.5 xl:gap-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              showFullNav
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-3 pointer-events-none"
            }`}
          >
            <Link
              href="/about"
              className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/85 dark:text-brand-silk/85 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
            >
              Atelier Story
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Desktop User Profile / Sign In */}
            {user.isAuthenticated ? (
              <button
                onClick={() => setActiveModal("profile")}
                className="whitespace-nowrap flex items-center gap-1.5 py-1 px-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors group"
                title="Client Dossier"
              >
                <span className="w-1 h-1 bg-brand-gold rotate-45 group-hover:scale-125 transition-transform" />
                <span className="font-name italic text-[14px] md:text-[15px] text-brand-gold font-normal tracking-wide">
                  {user.name.split(" ")[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setActiveModal("auth")}
                className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] uppercase text-brand-gold hover:underline font-medium py-1 px-1"
              >
                Sign In
              </button>
            )}

            {/* Book Bespoke Primary CTA */}
            <Link
              href="/bespoke/commission"
              className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-2 bg-brand-crimson text-brand-white dark:bg-brand-silk dark:text-brand-onyx text-[8.5px] md:text-[9px] xl:text-[9.5px] tracking-[0.25em] uppercase font-medium hover:bg-brand-burgundy-light dark:hover:bg-brand-cream transition-colors duration-300 shadow-sm"
            >
              <PempamsieIcon size={11} className="text-brand-gold dark:text-brand-crimson" />
              <span>Book Bespoke</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-1.5 sm:p-2 transition-colors flex items-center gap-1 border ${
              mobileMenuOpen
                ? "text-brand-crimson dark:text-brand-gold border-brand-crimson/40 dark:border-brand-gold/40 bg-brand-crimson/10 dark:bg-brand-gold/10"
                : scrolled || isHovered
                ? "text-brand-black dark:text-brand-silk border-brand-black/15 dark:border-white/15 hover:border-brand-gold hover:text-brand-gold"
                : "text-white border-white/20 bg-black/40 backdrop-blur-md hover:border-brand-gold hover:text-brand-gold"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            <span className="text-[8px] sm:text-[9px] tracking-[0.22em] uppercase font-medium hidden xs:inline">
              {mobileMenuOpen ? "Close" : "Menu"}
            </span>
            {mobileMenuOpen ? <X size={17} strokeWidth={1.75} /> : <Menu size={17} strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer (100% Theme-Reactive: Pristine Raw Silk in Light Mode, Velvet Obsidian in Dark Mode) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(4.75rem)] bottom-0 z-40 bg-[#FCFAF7]/98 dark:bg-[#0B0908]/98 backdrop-blur-2xl text-brand-black dark:text-[#FCFAF7] border-t border-brand-black/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300 transition-colors">
          
          <div className="flex flex-col gap-4 sm:gap-5 text-xs tracking-[0.25em] uppercase font-light">
            
            {/* Mobile Dedicated Theme Switcher Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-black/10 dark:border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-brand-black dark:text-white">
                  Atelier Theme
                </span>
                <span className="text-[8px] font-mono text-brand-black/60 dark:text-white/60">
                  {theme === "dark" ? "Velvet Obsidian Active" : "Raw Silk Light Active"}
                </span>
              </div>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 px-3.5 py-1.5 border text-[9.5px] tracking-[0.2em] uppercase font-mono font-medium transition-all duration-300 shadow-sm border-brand-black/20 dark:border-brand-gold/40 text-brand-black dark:text-brand-gold bg-brand-black/5 dark:bg-brand-gold/15"
              >
                {theme === "dark" ? (
                  <>
                    <Sun size={13} className="text-brand-gold animate-in spin-in-180 duration-500" />
                    <span>Switch to Light</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} className="text-brand-crimson animate-in spin-in-180 duration-500" />
                    <span>Switch to Dark</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Currency Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-brand-black/10 dark:border-white/10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-brand-black dark:text-white">
                  Currency
                </span>
                <span className="text-[8px] font-mono text-brand-black/60 dark:text-white/60">
                  {currency === "NGN" ? "Nigerian Naira (₦)" : currency === "USD" ? "US Dollar ($)" : "British Pound (£)"}
                </span>
              </div>
              <div className="flex items-center border border-brand-black/20 dark:border-white/20 bg-brand-black/5 dark:bg-white/5 divide-x divide-brand-black/10 dark:divide-white/10 text-[9px] tracking-[0.2em] font-mono">
                {(["NGN", "USD", "GBP"] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => setCurrency(code)}
                    className={`px-2.5 py-1.5 transition-colors uppercase font-medium ${
                      currency === code
                        ? "bg-brand-gold text-brand-onyx font-bold"
                        : "text-brand-black/70 dark:text-brand-silk/70 hover:text-brand-gold"
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Client Dossier / Sign In */}
            {user.isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveModal("profile");
                }}
                className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 text-brand-gold"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rotate-45" />
                  <span className="text-[10px] tracking-[0.22em] uppercase">Client Dossier:</span>
                  <span className="font-name italic text-[14px] text-brand-gold lowercase">{user.name.split(" ")[0]}</span>
                </div>
                <ArrowUpRight size={14} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveModal("auth");
                }}
                className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 text-brand-gold hover:text-brand-crimson dark:hover:text-white"
              >
                <span className="text-[10px] tracking-[0.22em] uppercase">Sign In &bull; Client Dossier</span>
                <ArrowUpRight size={14} />
              </button>
            )}

            {/* Core Collections Navigation */}
            <Link
              href="/heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>The Heritage Collection</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/bespoke"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>Bespoke Atelier</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/men"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>Contemporary Tailoring</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/women"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>Womenswear & Gowns</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>Corporate & Institutional</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/stories"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>The Style Anthology</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-2.5 border-b border-brand-black/10 dark:border-white/10 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            >
              <span>Atelier Heritage &bull; Est. 2002</span>
              <ArrowUpRight size={14} />
            </Link>

          </div>

          {/* Bottom Actions & Atelier Contact Channels */}
          <div className="pt-6 border-t border-brand-black/10 dark:border-white/10 flex flex-col gap-3">
            <Link
              href="/bespoke/commission"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-crimson text-white uppercase tracking-[0.25em] text-[10px] font-semibold hover:bg-brand-burgundy-light transition-colors shadow-sm"
            >
              <PempamsieIcon size={14} className="text-brand-gold" />
              <span>Book Bespoke</span>
            </Link>

            <div className="flex items-center justify-center gap-4 text-[10px] font-mono tracking-widest text-brand-black/60 dark:text-white/60 pt-1">
              <a 
                href="https://wa.me/2348034432759?text=Hello%20Bolaji%20Abraham%2C%20I%20am%20reaching%20out%20from%20the%20website."
                target="_blank" 
                rel="noreferrer"
                className="hover:text-brand-gold flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare size={13} className="text-brand-gold" />
                <span>WhatsApp Concierge</span>
              </a>
              <span>&bull;</span>
              <a href="tel:08122640820" className="hover:text-brand-gold flex items-center gap-1.5 transition-colors">
                <Phone size={13} className="text-brand-gold" />
                <span>0812 264 0820</span>
              </a>
            </div>

            <p className="text-[8.5px] tracking-[0.28em] text-center text-brand-black/50 dark:text-white/50 uppercase mt-1">
              Lagos Flagship &bull; London &bull; North America &bull; Est. 2002
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
