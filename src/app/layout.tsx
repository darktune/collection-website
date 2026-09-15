import type { Metadata } from "next";
import { Jost, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SplashScreen } from "@/components/SplashScreen";

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
  metadataBase: new URL('https://abrahamcollection.com'),
  title: "Abraham Collection | Clothing That Suits",
  description: "Traditional heritage. Contemporary tailoring. Corporate excellence. Crafted with intention for over 25 years in Lagos, Nigeria.",
  keywords: ["Bespoke Tailoring", "Agbada", "Corporate Uniforms", "Luxury Fashion", "Nigerian Fashion", "Custom Suits"],
  openGraph: {
    title: "Abraham Collection",
    description: "Traditional heritage. Contemporary tailoring. Corporate excellence.",
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
    description: "Clothing That Suits. Crafted with intention.",
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
          <SplashScreen />
          <Navigation />
          <div className="pt-20">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
