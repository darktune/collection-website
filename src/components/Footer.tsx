import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white pt-24 pb-12 px-8 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
        
        {/* Nav 1 */}
        <div className="flex flex-col gap-4 text-sm font-light text-brand-white/80">
          <Link href="/shop" className="hover:text-brand-white transition-colors">Shop</Link>
          <Link href="/heritage" className="hover:text-brand-white transition-colors">Heritage</Link>
          <Link href="/bespoke" className="hover:text-brand-white transition-colors">Bespoke</Link>
          <Link href="/corporate" className="hover:text-brand-white transition-colors">Corporate</Link>
          <Link href="/stories" className="hover:text-brand-white transition-colors">Stories</Link>
        </div>

        {/* Nav 2 */}
        <div className="flex flex-col gap-4 text-sm font-light text-brand-white/80">
          <Link href="/about" className="hover:text-brand-white transition-colors">Our Story</Link>
          <Link href="/contact" className="hover:text-brand-white transition-colors">Contact</Link>
          <Link href="/delivery" className="hover:text-brand-white transition-colors">Delivery</Link>
          <Link href="/returns" className="hover:text-brand-white transition-colors">Returns</Link>
        </div>

        {/* Legal & Social */}
        <div className="flex flex-col gap-4 text-sm font-light text-brand-white/80">
          <Link href="/privacy" className="hover:text-brand-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-brand-white transition-colors">Terms</Link>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-white transition-colors">Instagram</a>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-6">
          <h4 className="text-xs uppercase tracking-widest font-medium">Newsletter</h4>
          <p className="text-sm font-light text-brand-white/70">
            Updates on collections, editorial stories, and bespoke availability.
          </p>
          <form className="flex border-b border-brand-white/30 pb-2 mt-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-brand-white/30"
              required
            />
            <button type="submit" className="text-xs uppercase tracking-widest font-medium hover:text-brand-cream transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-brand-white/10 text-center md:text-left gap-6">
        <div className="font-display text-2xl tracking-wide">ABRAHAM COLLECTION</div>
        <div className="text-xs uppercase tracking-widest text-brand-white/50">Clothing That Suits.</div>
      </div>
    </footer>
  );
}
