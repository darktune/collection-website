import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SplashScreen } from "@/components/SplashScreen";
import { AtelierProvider } from "@/context/AtelierContext";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { AtelierAssistantModal } from "@/components/dock/AtelierAssistantModal";
import { UserProfileModal } from "@/components/dock/UserProfileModal";
import { WishlistModal } from "@/components/dock/WishlistModal";
import { CartDrawerModal } from "@/components/dock/CartDrawerModal";
import { QuickBuyModal } from "@/components/dock/QuickBuyModal";
import { VisualSearchModal } from "@/components/dock/VisualSearchModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { StorytellingAuthPopup } from "@/components/auth/StorytellingAuthPopup";
import { PwaManager } from "@/components/pwa/PwaManager";

const displayFont = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abrahamcollection.com"),
  title: "Abraham Collection | Clothing That Suits | Bolaji Abayomi Abraham",
  description: "Traditional heritage. Contemporary tailoring. Corporate excellence. Crafted with intention for over 25 years in Lagos, Nigeria by founder Bolaji Abayomi Abraham.",
  keywords: ["Bespoke Tailoring", "Agbada", "Bolaji Abayomi Abraham", "Corporate Uniforms", "Luxury Fashion", "Nigerian Fashion", "Custom Suits"],
  openGraph: {
    title: "Abraham Collection | Clothing That Suits",
    description: "Traditional heritage. Contemporary tailoring. Corporate excellence. Lagos & Worldwide Diaspora.",
    url: "https://abrahamcollection.com",
    siteName: "Abraham Collection",
    images: [
      {
        url: "/media/hero_1.jpg",
        width: 1200,
        height: 630,
        alt: "Abraham Collection Flagship",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abraham Collection",
    description: "Clothing That Suits. Crafted with intention by Bolaji Abayomi Abraham.",
    images: ["/media/hero_1.jpg"],
  },
  icons: {
    icon: "/media/logo_transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${displayFont.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AtelierProvider>
            <SplashScreen />
            <Navigation />
            <div className="pt-20">
              {children}
            </div>
            <Footer />

            {/* Global All-in-One Floating Dock & Modals (REAVO Architecture) */}
            <FloatingDock />
            <AtelierAssistantModal />
            <UserProfileModal />
            <WishlistModal />
            <CartDrawerModal />
            <QuickBuyModal />
            <VisualSearchModal />
            <AuthModal />
            <StorytellingAuthPopup />
            <PwaManager />
          </AtelierProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
