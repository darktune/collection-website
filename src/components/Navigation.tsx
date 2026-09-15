"use client";

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass transition-all duration-300">
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-24 h-20 text-xs md:text-sm uppercase tracking-widest font-medium w-full">
        
        {/* Left Side Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 flex-1">
          <Link href="/new" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">New</Link>
          <Link href="/heritage" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Heritage</Link>
          <Link href="/men" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Men</Link>
          <Link href="/women" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Women</Link>
        </div>

        {/* Brand Center */}
        <div className="flex-shrink-0 flex justify-center mx-8">
          <Link href="/" className="hover:opacity-80 transition-opacity block">
            <img 
              src="/media/logo_transparent.png" 
              alt="Abraham Collection Logo" 
              className="h-12 md:h-16 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
            />
          </Link>
        </div>

        {/* Right Side Navigation Links & Actions */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
          <Link href="/corporate" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Corporate</Link>
          <Link href="/bespoke" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Bespoke</Link>
          <Link href="/stories" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Stories</Link>
          
          <div className="flex items-center gap-6 ml-4 border-l border-[var(--border)] pl-8">
            <Link href="/account" className="hover:text-brand-burgundy hover:scale-105 transition-all duration-300">Account</Link>
            
            {/* Theme Toggle */}
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:text-brand-burgundy hover:scale-110 transition-all duration-300"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center justify-end flex-1 gap-6">
          {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:text-brand-burgundy hover:scale-110 transition-all duration-300"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
              </button>
          )}
          <button className="hover:text-brand-burgundy hover:scale-110 transition-all duration-300">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </header>
  );
}
