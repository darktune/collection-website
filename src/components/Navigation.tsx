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
        className={`bg-brand-onyx text-brand-silk/80 text-[10px] tracking-ultra-wide uppercase px-6 hidden md:flex justify-between items-center transition-all duration-500 overflow-hidden ${
          showFullNav
            ? "max-h-8 py-1.5 opacity-100 border-b border-white/5"
            : "max-h-0 py-0 opacity-0 border-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <AdinkraheneIcon size={12} className="text-brand-gold" />
          <span>EST. 1999 &bull; 25 YEARS OF INTENTIONAL CRAFT &bull; LAGOS</span>
        </div>
        <div className="flex items-center gap-6 text-[10px]">
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
            ? "h-16 md:h-18 glass shadow-md border-b border-brand-black/10 dark:border-white/10"
            : "h-24 md:h-28 bg-gradient-to-b from-black/40 via-black/15 to-transparent backdrop-blur-[2px]"
        }`}
      >
        {/* Left Links - Hidden at first, smoothly glides in when scrolled/hovered */}
        <div
          className={`hidden lg:flex items-center gap-4 xl:gap-7 flex-1 justify-start transition-all duration-500 ${
            showFullNav
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-6 pointer-events-none"
          }`}
        >
          <Link
            href="/heritage"
            className="whitespace-nowrap text-[11px] xl:text-xs tracking-luxury uppercase font-medium relative group py-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            Heritage
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/bespoke"
            className="whitespace-nowrap text-[11px] xl:text-xs tracking-luxury uppercase font-medium relative group py-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            Bespoke Atelier
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/men"
            className="whitespace-nowrap text-[11px] xl:text-xs tracking-luxury uppercase font-medium relative group py-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            Tailoring
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/corporate"
            className="whitespace-nowrap text-[11px] xl:text-xs tracking-luxury uppercase font-medium relative group py-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            Corporate
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Center Brand Identity & Motto - Always Mathematically Centered, Majestic at First */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-500 z-10">
          <Link href="/" className="group flex flex-col items-center text-center">
            <span
              className={`font-display uppercase font-medium tracking-[0.22em] text-brand-black dark:text-brand-white transition-all duration-500 whitespace-nowrap leading-tight ${
                showFullNav
                  ? "text-base md:text-lg xl:text-xl"
                  : "text-2xl sm:text-3xl md:text-4xl tracking-[0.28em] md:tracking-[0.35em]"
              }`}
            >
              Abraham Collection
            </span>
            <span
              className={`font-sans uppercase font-light text-brand-black/75 dark:text-brand-silk/80 transition-all duration-500 whitespace-nowrap leading-none ${
                showFullNav
                  ? "text-[8px] md:text-[9px] tracking-[0.24em] opacity-70 mt-1"
                  : "text-[10px] md:text-[12px] tracking-[0.32em] md:tracking-[0.4em] opacity-85 mt-2"
              }`}
            >
              Clothing That Suits
            </span>
          </Link>
        </div>

        {/* Right Links & Bespoke CTA - Hidden at first, smoothly glides in when scrolled/hovered */}
        <div
          className={`hidden lg:flex items-center gap-3.5 xl:gap-5 flex-1 justify-end transition-all duration-500 ${
            showFullNav
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-6 pointer-events-none"
          }`}
        >
          <Link
            href="/about"
            className="whitespace-nowrap text-[11px] xl:text-xs tracking-luxury uppercase font-medium relative group py-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            Atelier Story
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* User Profile / Sign In */}
          {user.isAuthenticated ? (
            <button
              onClick={() => setActiveModal("profile")}
              className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold text-[10px] uppercase tracking-luxury font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveModal("auth")}
              className="whitespace-nowrap text-[10px] xl:text-[11px] tracking-luxury uppercase text-brand-gold hover:underline font-medium py-1 px-1"
            >
              Sign In
            </button>
          )}

          {/* Book Bespoke Primary CTA */}
          <Link
            href="/bespoke/commission"
            className="whitespace-nowrap inline-flex items-center gap-2 px-4 xl:px-5 py-2 xl:py-2.5 bg-brand-crimson text-brand-white dark:bg-brand-silk dark:text-brand-onyx text-[10px] xl:text-[11px] tracking-luxury uppercase font-semibold hover:bg-brand-burgundy-light dark:hover:bg-brand-cream transition-colors duration-300 shadow-sm"
          >
            <PempamsieIcon size={13} className="text-brand-gold dark:text-brand-crimson" />
            <span>Book Bespoke</span>
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>
          )}
        </div>

        {/* Mobile Actions: Discreet Theme + Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors flex items-center gap-1.5"
            aria-label="Toggle Menu"
          >
            <span className="text-[10px] tracking-widest uppercase font-medium hidden sm:inline opacity-70">
              {mobileMenuOpen ? "Close" : "Menu"}
            </span>
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-dark text-brand-white fixed inset-x-0 top-[calc(4.5rem)] bottom-0 p-8 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
          <div className="flex flex-col gap-6 text-sm tracking-luxury uppercase font-medium">
            <Link
              href="/heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>The Heritage Collection</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/bespoke"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Bespoke Atelier</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/men"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Contemporary Tailoring</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>Corporate & Institutional</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex justify-between items-center py-3 border-b border-white/10 hover:text-brand-gold"
            >
              <span>25-Year Atelier Story</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <Link
              href="/bespoke/commission"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-brand-crimson text-white uppercase tracking-luxury text-xs font-semibold hover:bg-brand-burgundy-light transition-colors"
            >
              <PempamsieIcon size={16} className="text-brand-gold" />
              <span>Book a Bespoke Consultation</span>
            </Link>
            <p className="text-[10px] tracking-widest text-center text-white/50 uppercase">
              Lagos Flagship &bull; London &bull; North America
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
