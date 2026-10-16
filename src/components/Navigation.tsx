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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showFullNav = scrolled || isHovered;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans"
    >
      {/* Top Heritage Bar: Only reveals when scrolling into full navigation view */}
      <div
        className={`bg-brand-onyx text-brand-silk/80 text-[8.5px] md:text-[9px] tracking-[0.28em] uppercase px-6 hidden md:flex justify-between items-center transition-all duration-500 overflow-hidden ${
          showFullNav
            ? "max-h-7 py-1.5 opacity-100 border-b border-white/5"
            : "max-h-0 py-0 opacity-0 border-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <AdinkraheneIcon size={11} className="text-brand-gold" />
          <span>EST. 1999 &bull; 25 YEARS OF INTENTIONAL CRAFT &bull; LAGOS</span>
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

      {/* Main Navigation Bar */}
      <nav
        className={`flex items-center justify-between px-6 md:px-10 lg:px-14 xl:px-20 transition-all duration-500 ease-out w-full ${
          showFullNav
            ? "h-16 md:h-18 glass shadow-md border-b border-brand-black/5 dark:border-white/10"
            : "h-26 md:h-32 bg-gradient-to-b from-black/45 via-black/15 to-transparent backdrop-blur-[2px]"
        }`}
      >
        {/* Left Links (Tongoro Proportion: Delicate Micro-Typography) */}
        <div
          className={`hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-start transition-all duration-500 ${
            showFullNav
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-6 pointer-events-none"
          }`}
        >
          <Link
            href="/heritage"
            className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
          >
            Heritage
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/bespoke"
            className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
          >
            Bespoke Atelier
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/men"
            className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
          >
            Tailoring
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/corporate"
            className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
          >
            Corporate
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Center Brand Identity & Motto (Tongoro Style: Authoritative, Prominent, Centered) */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-500 z-10">
          <Link href="/" className="group flex flex-col items-center text-center">
            <span
              className={`font-display uppercase font-medium text-brand-black dark:text-brand-white transition-all duration-500 whitespace-nowrap leading-tight ${
                showFullNav
                  ? "text-lg md:text-xl xl:text-2xl tracking-[0.24em] md:tracking-[0.28em]"
                  : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.3em] md:tracking-[0.38em]"
              }`}
            >
              Abraham Collection
            </span>
            <span
              className={`font-sans uppercase font-light text-brand-black/70 dark:text-brand-silk/75 transition-all duration-500 whitespace-nowrap leading-none ${
                showFullNav
                  ? "text-[7.5px] md:text-[8.5px] tracking-[0.32em] opacity-70 mt-1"
                  : "text-[10px] md:text-[12px] tracking-[0.42em] opacity-80 mt-2.5"
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
            className={`hidden lg:flex items-center gap-3.5 xl:gap-5 transition-all duration-500 ${
              showFullNav
                ? "opacity-100 translate-x-0 pointer-events-auto"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
          >
            <Link
              href="/about"
              className="whitespace-nowrap text-[9px] md:text-[9.5px] xl:text-[10px] tracking-[0.25em] xl:tracking-[0.3em] uppercase font-light text-brand-black/80 dark:text-brand-silk/80 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors relative group py-1"
            >
              Atelier Story
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* User Profile / Sign In (No pill capsule, no green dot, bespoke patron font) */}
            {user.isAuthenticated ? (
              <button
                onClick={() => setActiveModal("profile")}
                className="whitespace-nowrap flex items-center gap-1.5 py-1 px-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors group"
                title="Client Dossier"
              >
                <span className="w-1 h-1 bg-brand-gold rotate-45 group-hover:scale-125 transition-transform" />
                <span className="font-patron italic text-[14px] md:text-[15px] text-brand-gold font-normal tracking-wide">
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

          {/* Permanent Theme Toggle (Always visible on desktop and mobile in all scroll states) */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[8.5px] md:text-[9px] tracking-[0.22em] uppercase font-light transition-all duration-300 ${
                showFullNav
                  ? "text-brand-black/80 dark:text-brand-silk/80 border border-brand-black/15 dark:border-white/15 hover:border-brand-crimson dark:hover:border-brand-gold hover:text-brand-crimson dark:hover:text-brand-gold bg-transparent"
                  : "text-white/95 bg-black/40 border border-white/20 backdrop-blur-md hover:border-brand-gold hover:text-brand-gold shadow-sm"
              }`}
              aria-label="Toggle Theme"
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === "dark" ? (
                <>
                  <Sun size={12} strokeWidth={1.5} className="text-brand-gold" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon size={12} strokeWidth={1.5} className="text-brand-crimson dark:text-brand-gold" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          )}

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
          <div className="flex flex-col gap-6 text-xs tracking-[0.25em] uppercase font-light">
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
              <span>25-Year Atelier Story</span>
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
