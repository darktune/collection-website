"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { AtelierAssistantModal } from "@/components/dock/AtelierAssistantModal";
import { UserProfileModal } from "@/components/dock/UserProfileModal";
import { WishlistModal } from "@/components/dock/WishlistModal";
import { CartDrawerModal } from "@/components/dock/CartDrawerModal";
import { QuickBuyModal } from "@/components/dock/QuickBuyModal";
import { VisualSearchModal } from "@/components/dock/VisualSearchModal";
import { AuthModal } from "@/components/auth/AuthModal";
import { OnboardingModal } from "@/components/auth/OnboardingModal";
import { StorytellingAuthPopup } from "@/components/auth/StorytellingAuthPopup";
import { PwaManager } from "@/components/pwa/PwaManager";

/**
 * StorefrontShell - Decouples Storefront from Admin Studio OS.
 * Industry Standard Architecture:
 * - Public routes: Mounts luxury navigation, footer, consumer floating dock, and shopper modals.
 * - Admin routes (/admin*): Isolated OS layer without storefront chrome or consumer shopping docks.
 */
export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHomePage = pathname === "/";

  if (isAdminRoute) {
    // Admin OS renders isolated from storefront navigation and shopping modals
    return <main className="min-h-screen w-full">{children}</main>;
  }

  return (
    <>
      <Navigation />
      <div className={isHomePage ? "pt-0" : "pt-20 sm:pt-24"}>
        {children}
      </div>
      <Footer />

      {/* Global Shopper & Concierge Modals */}
      <FloatingDock />
      <AtelierAssistantModal />
      <UserProfileModal />
      <WishlistModal />
      <CartDrawerModal />
      <QuickBuyModal />
      <VisualSearchModal />
      <AuthModal />
      <OnboardingModal />
      <StorytellingAuthPopup />
      <PwaManager />
    </>
  );
}
