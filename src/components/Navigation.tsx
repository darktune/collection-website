import Link from 'next/link';

export function Navigation() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-white/80 backdrop-blur-md border-b border-brand-cream transition-colors duration-300">
      <nav className="flex items-center justify-between px-8 md:px-16 lg:px-24 h-20 text-xs md:text-sm uppercase tracking-widest font-medium">
        
        {/* Left Side Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/new" className="hover:text-brand-burgundy transition-colors">New</Link>
          <Link href="/heritage" className="hover:text-brand-burgundy transition-colors">Heritage</Link>
          <Link href="/men" className="hover:text-brand-burgundy transition-colors">Men</Link>
          <Link href="/women" className="hover:text-brand-burgundy transition-colors">Women</Link>
        </div>

        {/* Brand Center */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="font-display normal-case text-2xl md:text-3xl tracking-normal whitespace-nowrap hover:opacity-80 transition-opacity">
            Abraham Collection
          </Link>
        </div>

        {/* Right Side Navigation Links & Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/corporate" className="hover:text-brand-burgundy transition-colors">Corporate</Link>
          <Link href="/bespoke" className="hover:text-brand-burgundy transition-colors">Bespoke</Link>
          <Link href="/stories" className="hover:text-brand-burgundy transition-colors">Stories</Link>
          
          <div className="flex items-center gap-6 ml-4 border-l border-brand-stone pl-8">
            <button className="hover:text-brand-burgundy transition-colors">Search</button>
            <Link href="/account" className="hover:text-brand-burgundy transition-colors">Account</Link>
            <button className="hover:text-brand-burgundy transition-colors">Bag (0)</button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-6">
          <button className="hover:text-brand-burgundy transition-colors">Search</button>
          <button className="hover:text-brand-burgundy transition-colors">Bag (0)</button>
          <button className="hover:text-brand-burgundy transition-colors ml-2">Menu</button>
        </div>
      </nav>
    </header>
  );
}
