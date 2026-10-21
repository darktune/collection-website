"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AtelierDatabase } from "@/lib/services/database";

export interface AtelierProduct {
  id: string;
  name: string;
  priceNgn: number;
  priceUsd: number;
  category: string;
  image: string;
  description?: string;
}

export interface CartItem extends AtelierProduct {
  size: string;
  quantity: number;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  isAuthenticated: boolean;
  memberTier: "Guest Patron" | "Atelier Circle" | "Royal Benefactor";
  avatarUrl?: string;
  preferredSilhouette?: string;
  hasVaultMeasurements?: boolean;
}

interface AtelierContextType {
  wishlist: AtelierProduct[];
  toggleWishlist: (product: AtelierProduct) => void;
  isInWishlist: (id: string) => boolean;

  cart: CartItem[];
  addToCart: (product: AtelierProduct, size?: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  user: UserProfile;
  login: (profile: Partial<UserProfile>) => void;
  logout: () => void;

  activeModal: "none" | "assistant" | "search" | "wishlist" | "profile" | "cart" | "auth" | "quickBuy" | "onboarding";
  setActiveModal: (modal: "none" | "assistant" | "search" | "wishlist" | "profile" | "cart" | "auth" | "quickBuy" | "onboarding") => void;

  selectedProductForQuickBuy: AtelierProduct | null;
  openQuickBuy: (product: AtelierProduct) => void;

  dockOrientation: "horizontal" | "vertical";
  toggleDockOrientation: () => void;
  isDockCollapsed: boolean;
  setIsDockCollapsed: (collapsed: boolean) => void;

  storyPopupVisible: boolean;
  dismissStoryPopup: () => void;
  triggerStoryPopup: () => void;
}

const AtelierContext = createContext<AtelierContextType | undefined>(undefined);

export function AtelierProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<AtelierProduct[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "Nigeria",
    isAuthenticated: false,
    memberTier: "Guest Patron",
  });

  const [activeModal, setActiveModal] = useState<
    "none" | "assistant" | "search" | "wishlist" | "profile" | "cart" | "auth" | "quickBuy" | "onboarding"
  >("none");
  const [selectedProductForQuickBuy, setSelectedProductForQuickBuy] = useState<AtelierProduct | null>(null);
  const [dockOrientation, setDockOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [storyPopupVisible, setStoryPopupVisible] = useState(false);

  const syncUserSession = async (sbUser: any) => {
    if (!sbUser?.email) return;
    const email = sbUser.email;
    const meta = sbUser.user_metadata || {};
    const fallbackName = meta.full_name || meta.name || email.split('@')[0] || "Esteemed Patron";
    const profile = await AtelierDatabase.getPatronProfile(email);

    const hasMeasurements = !!(
      profile?.chest_circ || profile?.waist_circ || profile?.shoulder_span || profile?.sleeve_length
    );

    const syncedUser: UserProfile = {
      id: sbUser.id,
      name: profile?.full_name || fallbackName,
      email,
      phone: profile?.phone || meta.phone || "",
      city: profile?.city || "Lagos",
      country: profile?.country || "Nigeria",
      isAuthenticated: true,
      memberTier: (profile?.member_tier as any) || "Atelier Circle",
      avatarUrl: profile?.avatar_url || meta.avatar_url || undefined,
      preferredSilhouette: profile?.preferred_silhouette || undefined,
      hasVaultMeasurements: hasMeasurements,
    };

    setUser(syncedUser);
    try {
      localStorage.setItem("abraham_user", JSON.stringify(syncedUser));
    } catch {}
    return syncedUser;
  };

  // Load persisted state from localStorage and listen to Supabase Auth
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("abraham_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedUser = localStorage.getItem("abraham_user");
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedCart = localStorage.getItem("abraham_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setDockOrientation("vertical");
      }
    } catch {
      // LocalStorage access handling
    }

    // Supabase Auth listener (syncs Google OAuth redirect and email sessions)
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.email) {
          syncUserSession(session.user);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user?.email) {
          await syncUserSession(session.user);
          if (event === "SIGNED_IN") {
            const profile = await AtelierDatabase.getPatronProfile(session.user.email);
            if (!profile?.onboarding_completed) {
              setActiveModal("onboarding");
            }
          }
        } else if (event === "SIGNED_OUT") {
          logoutLocal();
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.warn("Supabase auth subscription fallback:", err);
    }
  }, []);

  // 2-minute timer for storytelling popup (Max 2 appearances per session)
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerStoryPopup();
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, []);

  const triggerStoryPopup = () => {
    try {
      const count = parseInt(sessionStorage.getItem("abraham_story_count") || "0", 10);
      if (count < 2 && !user.isAuthenticated) {
        setStoryPopupVisible(true);
        sessionStorage.setItem("abraham_story_count", (count + 1).toString());
      }
    } catch {
      // Ignore
    }
  };

  const dismissStoryPopup = () => {
    setStoryPopupVisible(false);
  };

  const toggleWishlist = (product: AtelierProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const updated = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      try {
        localStorage.setItem("abraham_wishlist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isInWishlist = (id: string) => wishlist.some((p) => p.id === id);

  const addToCart = (product: AtelierProduct, size = "42 Regular") => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, size, quantity: 1 }];
      }
      try {
        localStorage.setItem("abraham_cart", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem("abraham_cart", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("abraham_cart");
    } catch {}
  };

  const login = (profile: Partial<UserProfile>) => {
    const updatedUser: UserProfile = {
      ...user,
      name: profile.name || user.name || "Esteemed Patron",
      email: profile.email || user.email || "client@abrahamcollection.com",
      phone: profile.phone ?? user.phone,
      city: profile.city ?? user.city,
      country: profile.country ?? user.country,
      isAuthenticated: true,
      memberTier: profile.memberTier || user.memberTier || "Atelier Circle",
      avatarUrl: profile.avatarUrl ?? user.avatarUrl,
      preferredSilhouette: profile.preferredSilhouette ?? user.preferredSilhouette,
      hasVaultMeasurements: profile.hasVaultMeasurements ?? user.hasVaultMeasurements,
    };
    setUser(updatedUser);
    try {
      localStorage.setItem("abraham_user", JSON.stringify(updatedUser));
    } catch {}
    setStoryPopupVisible(false);
  };

  const logoutLocal = () => {
    const guestUser: UserProfile = {
      name: "",
      email: "",
      phone: "",
      city: "",
      country: "Nigeria",
      isAuthenticated: false,
      memberTier: "Guest Patron",
    };
    setUser(guestUser);
    try {
      localStorage.removeItem("abraham_user");
    } catch {}
  };

  const logout = async () => {
    logoutLocal();
    try {
      await supabase.auth.signOut();
    } catch {}
  };

  const openQuickBuy = (product: AtelierProduct) => {
    setSelectedProductForQuickBuy(product);
    setActiveModal("quickBuy");
  };

  const toggleDockOrientation = () => {
    setDockOrientation((prev) => (prev === "horizontal" ? "vertical" : "horizontal"));
  };

  return (
    <AtelierContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        user,
        login,
        logout,
        activeModal,
        setActiveModal,
        selectedProductForQuickBuy,
        openQuickBuy,
        dockOrientation,
        toggleDockOrientation,
        isDockCollapsed,
        setIsDockCollapsed,
        storyPopupVisible,
        dismissStoryPopup,
        triggerStoryPopup,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
}

export function useAtelier() {
  const context = useContext(AtelierContext);
  if (!context) {
    throw new Error("useAtelier must be used within an AtelierProvider");
  }
  return context;
}
