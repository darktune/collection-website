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

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans">
      {/* Top Heritage Bar */}
      <div className="bg-brand-onyx text-brand-silk/80 text-[10px] tracking-ultra-wide uppercase py-1.5 px-6 hidden md:flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <AdinkraheneIcon size={13} className="text-brand-gold" />
          <span>EST. 1999 &bull; 25 YEARS OF INTENTIONAL CRAFT &bull; LAGOS, NIGERIA</span>
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
        className={`flex items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500 ${
          scrolled ? "h-16 glass shadow-sm" : "h-20 bg-transparent"
        } text-xs uppercase tracking-luxury font-medium w-full`}
      >
        {/* Left Links */}
        <div className="hidden lg:flex items-center gap-8 flex-1">
          <Link href="/heritage" className="relative group py-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
            Heritage
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/bespoke" className="relative group py-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
            Bespoke Atelier
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/men" className="relative group py-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
            Tailoring
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/corporate" className="relative group py-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
            Corporate
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        {/* Center Brand Identity */}
        <div className="flex-shrink-0 flex justify-center mx-6">
          <Link href="/" className="group flex flex-col items-center text-center">
            <span className="font-display tracking-[0.2em] text-xl md:text-2xl font-medium uppercase group-hover:opacity-85 transition-opacity">
              Abraham Collection
            </span>
            <span className="text-[9px] tracking-ultra-wide opacity-60 font-sans uppercase -mt-0.5">
              Clothing That Suits
            </span>
          </Link>
        </div>

        {/* Right Links & Bespoke CTA */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          <Link href="/about" className="relative group py-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
            Atelier Story
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-crimson dark:bg-brand-gold transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Atelier User Greeting or Sign In Trigger */}
          {user.isAuthenticated ? (
            <button
              onClick={() => setActiveModal("profile")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold text-[10px] uppercase tracking-luxury font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Welcome, {user.name.split(" ")[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveModal("auth")}
              className="text-[10px] tracking-luxury uppercase text-brand-gold hover:underline font-medium"
            >
              Sign In
            </button>
          )}

          {/* Book Bespoke Primary CTA using Pempamsie (Symbol of Stitching & Tailoring Readiness) */}
          <Link
            href="/bespoke/commission"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-crimson text-brand-white dark:bg-brand-silk dark:text-brand-onyx text-[11px] tracking-luxury uppercase font-medium hover:bg-brand-burgundy-light dark:hover:bg-brand-cream transition-colors duration-300 shadow-sm"
          >
            <PempamsieIcon size={14} className="text-brand-gold dark:text-brand-crimson" />
            <span>Book Bespoke</span>
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
            </button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
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
