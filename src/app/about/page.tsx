import Image from "next/image";
import { AdinkraheneIcon } from "@/components/icons/BespokeIcons";

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center">
      
      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
         <Image 
            src="/media/hero_2.jpg" 
            alt="Abraham Collection History" 
            fill 
            className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3000ms]"
            priority
         />
         <div className="relative z-10 text-center text-white p-8">
            <h1 className="font-display text-5xl md:text-8xl mb-6">Our Story</h1>
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-[#FCFAF7]/70">25 Years of Intentional Craft</p>
         </div>
      </section>

      {/* Story Content */}
      <section className="max-w-3xl w-full px-8 py-32 space-y-32 text-center text-balance">
        
        {/* Chapter 1 */}
        <div className="space-y-12">
          <h2 className="font-display text-4xl md:text-6xl text-brand-burgundy">Clothing was never just clothing.</h2>
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>There is always somewhere you are going.</p>
            <p>Someone you are meeting.</p>
            <p>Something you are celebrating.</p>
            <p>A reason you chose that colour.</p>
            <p>A reason the agbada had to be that big.</p>
            <p>A reason the suit had to sit exactly that way.</p>
            <p>A reason everyone in the family had to look like they belonged together.</p>
          </div>
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>That is where <strong className="font-medium">Abraham Collection</strong> begins.</p>
            <p>Not with fabric.</p>
            <p>With the person wearing it.</p>
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="space-y-12">
          <p className="font-light text-lg md:text-xl opacity-80 leading-relaxed">
            More than 25 years ago, Abraham Collection began with a simple idea:
          </p>
          <h2 className="font-display text-4xl md:text-5xl">Make clothing that suits.</h2>
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>Not only clothing that fits.</p>
            <p>Clothing that suits <strong className="font-medium">you</strong>.</p>
            <p>Your personality.</p>
            <p>Your profession.</p>
            <p>Your culture.</p>
            <p>Your family.</p>
            <p>Your position.</p>
            <p>Your occasion.</p>
            <p>Your moment.</p>
          </div>
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>Because the clothes you wear to work should understand where you work.</p>
            <p>The clothes you wear to your wedding should understand what that day means.</p>
            <p>And the clothes you wear when you are the celebrant should never make anyone ask who the celebrant is.</p>
            <p>Sometimes, <strong className="font-medium">the agbada should have already answered.</strong></p>
          </div>
        </div>

        {/* Divider Image */}
        <div className="relative w-full aspect-video my-16 overflow-hidden">
           <Image src="/media/heritage_1.jpg" alt="Craftsmanship" fill className="object-cover object-center" />
        </div>

        {/* Chapter 3 */}
        <div className="space-y-12">
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>Our Nigerian heritage has always been part of the work.</p>
            <p>Not because heritage is a trend. Because it is ours.</p>
            <p>A Dandogo has presence for a reason.</p>
            <p>An agbada carries weight for a reason.</p>
            <p>Traditional clothing has always understood something modern fashion sometimes forgets:</p>
            <p><strong className="font-medium">Clothing communicates.</strong></p>
            <p>Before introductions. Before conversation. Before photographs.</p>
            <p>People see you. They understand something.</p>
          </div>
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>So when Abraham Collection creates traditional clothing, we are not trying to make the past look modern.</p>
            <p>We are taking what has always been powerful about our culture and giving it the craftsmanship, restraint and attention it deserves today.</p>
          </div>
        </div>

        {/* Chapter 4 */}
        <div className="space-y-12">
          <p className="font-light text-lg md:text-xl opacity-80 leading-relaxed">
            Because trends will come. Trends will leave.
            <br />Colours will change. Cuts will change.
            <br />The world around fashion will change.
            <br />But one question will always remain:
          </p>
          <h2 className="font-display text-5xl md:text-7xl">Does it suit?</h2>
          <div className="space-y-4 font-light text-lg md:text-xl opacity-80 leading-relaxed">
            <p>The person.</p>
            <p>The purpose.</p>
            <p>The place.</p>
            <p>The occasion.</p>
            <p>The moment.</p>
          </div>
          <div className="space-y-6 font-light text-lg md:text-xl opacity-80 leading-relaxed mt-12">
            <p>If the answer is yes, we have done our work.</p>
            <p>If the answer is no, we are not finished.</p>
          </div>
        </div>

        {/* Founder Spotlight: Bolaji Abayomi Abraham */}
        <div className="pt-24 pb-16 border-y border-brand-black/10 dark:border-white/10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 relative aspect-[4/5] rounded overflow-hidden shadow-xl bg-brand-onyx">
              <Image
                src="/media/hero_1.jpg"
                alt="Bolaji Abayomi Abraham - Founder and Creative Director"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] tracking-widest uppercase text-brand-gold font-medium">Head Designer &amp; Founder</span>
                <span className="font-patron italic text-3xl font-normal text-brand-black dark:text-brand-white">Bolaji Abayomi Abraham</span>
                <span className="text-xs opacity-75 mt-0.5">25 Years of Architectural Master Tailoring</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium">
                <AdinkraheneIcon size={12} />
                <span>The Master Cutter</span>
              </div>
              <h3 className="font-patron italic text-4xl md:text-5xl font-normal text-brand-black dark:text-brand-white">
                Bolaji Abayomi Abraham
              </h3>
              <div className="space-y-4 font-light text-base opacity-80 leading-relaxed">
                <p>
                  For over two and a half decades, Bolaji Abayomi Abraham has anchored the cutting rooms of Lagos with an unyielding ethos: dignity is engineered through the needle.
                </p>
                <p>
                  Blending traditional Yoruba regal silhouettes—Dandogo, Agbada, and Senator—with the anatomical precision of British-Italian suiting, Bolaji has dressed national leaders, corporate chieftains, and diaspora grooms across the globe.
                </p>
              </div>

              {/* Verified Direct Channels */}
              <div className="pt-4 space-y-3">
                <div className="text-xs uppercase tracking-widest font-semibold opacity-70">
                  Direct Line to Bolaji (Eranibaniso):
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-mono">
                  <a href="tel:08122640820" className="hover:text-brand-crimson dark:hover:text-brand-gold underline">
                    0812 264 0820 (Phone)
                  </a>
                  <span className="opacity-40">&bull;</span>
                  <a href="https://wa.me/2348034432759" target="_blank" rel="noreferrer" className="text-[#25D366] hover:underline">
                    0803 443 2759 (WhatsApp)
                  </a>
                  <span className="opacity-40">&bull;</span>
                  <a href="https://www.facebook.com/bolaji.abraham.10" target="_blank" rel="noreferrer" className="hover:text-brand-gold underline">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="pt-20 space-y-8">
           <h2 className="font-display text-3xl md:text-5xl">ABRAHAM COLLECTION</h2>
           <p className="text-xs uppercase tracking-[0.3em] font-medium text-brand-burgundy dark:text-brand-gold">Clothing That Suits.</p>
           
           <div className="pt-8 space-y-2 font-light opacity-60 text-sm">
             <p>25 years of craft.</p>
             <p>Rooted in Nigerian heritage.</p>
             <p>Designed around people.</p>
             <p>Made with intention.</p>
           </div>
           
           <div className="pt-12 space-y-2 text-xs uppercase tracking-widest font-medium">
             <p>This is intentional.</p>
             <p>This is Abraham Collection.</p>
           </div>
        </div>

      </section>
    </main>
  );
}
