"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const { user, setActiveModal } = useAtelier();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Full nav reveals when scrolled or when hovered without height jitter
  const showFullNav = scrolled || isHovered;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500 font-sans"
    >
      {/* Top Heritage Bar: Permanent, stable luxury ticker (Zero layout shifts on hover) */}
      <div className="bg-brand-onyx text-brand-silk/80 text-[8.5px] md:text-[9px] tracking-[0.28em] uppercase px-6 md:px-12 h-7 hidden md:flex justify-between items-center border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          <AdinkraheneIcon size={11} className="text-brand-gold" />
          <span>EST. 2002 &bull; 24 YEARS OF INTENTIONAL CRAFT &bull; LAGOS</span>
        </div>

        <div className="flex items-center gap-6 text-[8.5px] md:text-[9px] tracking-[0.25em]">
          <Link href="/bespoke/commission?type=diaspora" className="hover:text-brand-gold transition-colors">
            DIASPORA CONCIERGE (UK &bull; US &bull; CA &bull; EU)
          </Link>
          <span className="text-white/20">|</span>
          <Link href="/bespoke/commission" className="hover:text-brand-gold transition-colors">
            PRIVATE APPOINTMENTS
          </Link>
        </div>
      </div>

      {/* Main Navigation Bar - Stable height dynamics:
          - Unscrolled: stable h-20 md:h-22 (does NOT collapse on hover, eliminating jitter)
          - Scrolled: compact h-16 md:h-18 for sticky viewing
          - Hover: background smoothly transitions from subtle gradient to rich frosted glass */}
      <nav
        className={`flex items-center justify-between px-6 md:px-10 lg:px-14 xl:px-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full ${
          scrolled
            ? "h-16 md:h-18 bg-[#FCFAF7]/95 dark:bg-[#0B0908]/95 backdrop-blur-xl shadow-md border-b border-brand-black/5 dark:border-white/10"
            : isHovered
            ? "h-20 md:h-22 bg-[#FCFAF7]/95 dark:bg-[#0B0908]/95 backdrop-blur-xl shadow-sm border-b border-brand-black/5 dark:border-white/10"
            : "h-20 md:h-22 bg-gradient-to-b from-black/55 via-black/20 to-transparent border-b border-transparent"
        }`}
      >
        {/* Left Links (Tongoro Proportion: Delicate Micro-Typography) */}
        <div
          className={`hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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

        {/* Center Brand Identity & Motto (Seamless, luxurious typography transitions) */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10">
          <Link href="/" className="group flex flex-col items-center text-center">
            <span
              className={`font-display uppercase font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap leading-tight ${
                scrolled
                  ? "text-lg md:text-xl xl:text-2xl tracking-[0.24em] md:tracking-[0.28em] text-brand-black dark:text-brand-white"
                  : isHovered
                  ? "text-xl md:text-2xl xl:text-3xl tracking-[0.26em] md:tracking-[0.3em] text-brand-black dark:text-brand-white"
                  : "text-xl md:text-2xl xl:text-3xl tracking-[0.28em] md:tracking-[0.34em] text-white drop-shadow-sm"
              }`}
            >
              Abraham Collection
            </span>
            <span
              className={`font-sans uppercase font-light transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap leading-none mt-1 ${
                scrolled
                  ? "text-[7.5px] md:text-[8px] tracking-[0.32em] text-brand-crimson dark:text-brand-gold opacity-90"
                  : isHovered
                  ? "text-[8px] md:text-[9px] tracking-[0.36em] text-brand-crimson dark:text-brand-gold opacity-90"
                  : "text-[8px] md:text-[9px] tracking-[0.4em] text-white/80 opacity-90"
              }`}
            >
              Clothing That Suits
            </span>
          </Link>
        </div>

        {/* Right Links & Permanent Theme Switcher */}
        <div className="flex items-center gap-3.5 xl:gap-5 flex-1 justify-end">
          {/* Scroll/Hover Links */}
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

            {/* User Profile / Sign In (No pill capsule, no green dot, bespoke Italiana font for names) */}
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

            {/* Book Bespoke Primary CTA (Crisp Micro-Button) */}
            <Link
              href="/bespoke/commission"
              className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-2 bg-brand-crimson text-brand-white dark:bg-brand-silk dark:text-brand-onyx text-[8.5px] md:text-[9px] xl:text-[9.5px] tracking-[0.25em] uppercase font-medium hover:bg-brand-burgundy-light dark:hover:bg-brand-cream transition-colors duration-300 shadow-sm"
            >
              <PempamsieIcon size={11} className="text-brand-gold dark:text-brand-crimson" />
              <span>Book Bespoke</span>
            </Link>
          </div>

          {/* Unmistakable Atelier Theme Toggle (Permanent, high-contrast, always visible) */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex items-center gap-2 px-3 py-1.5 text-[8.5px] md:text-[9px] tracking-[0.24em] uppercase font-medium transition-all duration-300 shadow-sm ${
              showFullNav
                ? "text-brand-black dark:text-brand-silk border border-brand-black/20 dark:border-brand-gold/40 hover:border-brand-crimson dark:hover:border-brand-gold bg-brand-black/5 dark:bg-brand-gold/10 hover:bg-brand-black/10 dark:hover:bg-brand-gold/20"
                : "text-white bg-black/60 border border-brand-gold/60 backdrop-blur-md hover:border-brand-gold hover:bg-black/85 hover:text-brand-gold"
            }`}
            aria-label="Toggle Atelier Theme"
            title={mounted ? (theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme") : "Toggle Theme"}
          >
            {mounted && theme === "dark" ? (
              <>
                <Sun size={13} strokeWidth={2} className="text-brand-gold animate-in spin-in-180 duration-500" />
                <span className="font-semibold text-brand-gold tracking-[0.24em]">Light</span>
              </>
            ) : (
              <>
                <Moon size={13} strokeWidth={2} className="text-brand-crimson dark:text-brand-gold animate-in spin-in-180 duration-500" />
                <span className="font-semibold tracking-[0.24em]">Dark</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors flex items-center gap-1.5"
            aria-label="Toggle Menu"
          >
            <span className="text-[9px] tracking-[0.25em] uppercase font-medium hidden sm:inline opacity-70">
              {mobileMenuOpen ? "Close" : "Menu"}
            </span>
            {mobileMenuOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-dark text-brand-white fixed inset-x-0 top-[calc(4.5rem)] bottom-0 p-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
          <div className="flex flex-col gap-5 text-xs tracking-[0.25em] uppercase font-light">
            
            {/* Mobile Dedicated Theme Switcher Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">Atelier Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-brand-gold/50 text-brand-gold text-[10px] tracking-[0.2em] uppercase font-mono font-medium"
              >
                {theme === "dark" ? <Sun size={13} className="text-brand-gold" /> : <Moon size={13} />}
                <span>{theme === "dark" ? "Switch to Light" : "Switch to Dark"}</span>
              </button>
            </div>

            <Link
              href="/heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>The Heritage Collection</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/bespoke"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Bespoke Atelier</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/men"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Contemporary Tailoring</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Corporate & Institutional</span>
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Atelier Heritage &bull; Est. 2002</span>
              <ArrowUpRight size={14} />
            </Link>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <Link
              href="/bespoke/commission"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-crimson text-white uppercase tracking-[0.25em] text-[10px] font-semibold hover:bg-brand-burgundy-light transition-colors"
            >
              <PempamsieIcon size={14} className="text-brand-gold" />
              <span>Book Bespoke</span>
            </Link>
            <p className="text-[9px] tracking-[0.3em] text-center text-white/50 uppercase">
              Lagos Flagship &bull; London &bull; North America
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
