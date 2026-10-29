import type { Metadata } from "next";
import { Jost, Inter, Cormorant_Garamond, Italiana } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SplashScreen } from "@/components/SplashScreen";
import { AtelierProvider } from "@/context/AtelierContext";
import { StorefrontShell } from "@/components/layout/StorefrontShell";

const displayFont = Jost({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-display",
});

const patronFont = Cormorant_Garamond({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-patron",
});

const nameFont = Italiana({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-name",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abrahamcollection.com"),
  title: "Abraham Collection | Clothing That Suits | Bolaji Abayomi Abraham",
  description: "Traditional heritage. Contemporary tailoring. Corporate excellence. Crafted with intention since 2002 in Lagos, Nigeria by founder Bolaji Abayomi Abraham.",
  keywords: ["Bespoke Tailoring", "Agbada", "Bolaji Abayomi Abraham", "Corporate Uniforms", "Luxury Fashion", "Nigerian Fashion", "Custom Suits"],

  openGraph: {
    title: "Abraham Collection | Clothing That Suits",
    description: "Traditional heritage. Contemporary tailoring. Corporate excellence. Lagos & Worldwide Diaspora.",
    url: "https://abrahamcollection.com",
    siteName: "Abraham Collection",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Abraham Collection Bespoke Atelier Flagship",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abraham Collection | Bespoke Atelier Est. 2002",
    description: "Clothing That Suits. Crafted with intention by Bolaji Abayomi Abraham.",
    images: ["/api/og"],
  },
    images: ["/media/hero_1.jpg"],
  },
  icons: {
    icon: "/media/logo_transparent.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "Abraham Collection",
  "alternateName": "Abraham Collection Atelier",
  "url": "https://abrahamcollection.com",
  "logo": "https://abrahamcollection.com/media/logo_transparent.png",
  "image": "https://abrahamcollection.com/media/hero_1.jpg",
  "description": "Traditional heritage. Contemporary tailoring. Corporate excellence. Crafted with intention since 2002 in Lagos, Nigeria by founder Bolaji Abayomi Abraham.",
  "founder": {
    "@type": "Person",
    "name": "Bolaji Abayomi Abraham",
    "jobTitle": "Creative Director & Master Tailor"
  },
  "foundingDate": "2002",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lagos",
    "addressRegion": "Lagos State",
    "addressCountry": "NG"
  },
  "telephone": "+2348122640820",
  "priceRange": "$$$",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:30"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/abrahams_collection",
    "https://www.facebook.com/bolaji.abraham.10",
    "https://www.tiktok.com/@abraham00031"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${displayFont.variable} ${patronFont.variable} ${nameFont.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="abraham_theme_preference">
          <AtelierProvider>
            <SplashScreen />
            <StorefrontShell>
              {children}
            </StorefrontShell>
          </AtelierProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
