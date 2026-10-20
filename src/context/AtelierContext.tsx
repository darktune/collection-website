"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

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
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  isAuthenticated: boolean;
  memberTier: "Guest Patron" | "Atelier Circle" | "Royal Benefactor";
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

  activeModal: "none" | "assistant" | "search" | "wishlist" | "profile" | "cart" | "auth" | "quickBuy";
  setActiveModal: (modal: "none" | "assistant" | "search" | "wishlist" | "profile" | "cart" | "auth" | "quickBuy") => void;

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
    "none" | "assistant" | "search" | "wishlist" | "profile" | "cart" | "auth" | "quickBuy"
  >("none");
  const [selectedProductForQuickBuy, setSelectedProductForQuickBuy] = useState<AtelierProduct | null>(null);
  const [dockOrientation, setDockOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [storyPopupVisible, setStoryPopupVisible] = useState(false);

  // Load persisted state from localStorage
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
      name: profile.name || "Esteemed Patron",
      email: profile.email || "client@abrahamcollection.com",
      phone: profile.phone || "",
      city: profile.city || "Lagos",
      country: profile.country || "Nigeria",
      isAuthenticated: true,
      memberTier: "Atelier Circle",
    };
    setUser(updatedUser);
    try {
      localStorage.setItem("abraham_user", JSON.stringify(updatedUser));
    } catch {}
    setStoryPopupVisible(false);
  };

  const logout = () => {
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
