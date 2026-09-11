import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({ 
  weight: "400",
  subsets: ["latin"], 
  variable: "--font-instrument-serif",
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Abraham Collection | Clothing That Suits.",
  description: "Traditional heritage. Contemporary tailoring. Corporate excellence. Crafted with intention for over 25 years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans bg-brand-white text-brand-black`}>
        {children}
      </body>
    </html>
  );
}
