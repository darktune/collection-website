"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, CreditCard, MessageSquare } from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";

export function CartDrawerModal() {
  const { activeModal, setActiveModal, cart, removeFromCart, clearCart, user } = useAtelier();

  if (activeModal !== "cart") return null;

  const totalNgn = cart.reduce((acc, item) => acc + item.priceNgn * item.quantity, 0);
  const totalUsd = cart.reduce((acc, item) => acc + item.priceUsd * item.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    const itemsList = cart.map((i) => `- ${i.name} (${i.size}) x${i.quantity}: ₦${(i.priceNgn * i.quantity).toLocaleString()}`).join("\n");
    const msg = encodeURIComponent(
      `Hello Bolaji Abraham (Abraham Collection),\n\nI would like to place an order for my bag:\n${itemsList}\n\nTotal: ₦${totalNgn.toLocaleString()} ($${totalUsd} USD)\nClient Name: ${user.name || "Client"}\nPhone: ${user.phone || "Please provide details"}`
    );
    window.open(`https://wa.me/2348034432759?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed z-50 bottom-16 sm:bottom-20 right-2 sm:right-4 md:right-6 w-[calc(100vw-1rem)] sm:w-80 md:w-96 max-w-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh] warm-glow-ring">
        
        {/* Header */}
        <div className="p-4 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={17} className="text-brand-gold" />
            <h3 className="font-display text-base tracking-wide">Sartorial Bag</h3>
            <span className="text-[10px] bg-brand-gold/15 text-brand-gold px-2 py-0.5 border-l border-brand-gold font-mono font-medium">
              {cart.length}
            </span>
          </div>
          <button
            onClick={() => setActiveModal("none")}
            className="text-brand-black/50 dark:text-white/60 hover:text-brand-crimson dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 flex items-center justify-center mx-auto text-brand-black/30 dark:text-white/40">
                <ShoppingBag size={20} />
              </div>
              <p className="text-xs opacity-70 max-w-xs mx-auto leading-relaxed">
                Your bag is empty. Explore our pieces to commission or buy directly.
              </p>
              <Link
                href="/men"
                onClick={() => setActiveModal("none")}
                className="inline-block text-[11px] uppercase tracking-luxury text-brand-crimson dark:text-brand-gold hover:underline font-medium"
              >
                Browse Tailoring &rarr;
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-3 p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-xl"
              >
                <div className="relative w-16 h-20 bg-brand-black/10 dark:bg-brand-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-name text-sm font-medium leading-tight">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-brand-black/40 dark:text-white/40 hover:text-brand-crimson transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] opacity-70 uppercase font-mono mt-0.5">Size: {item.size}</p>
                    <p className="text-[11px] font-mono text-brand-crimson dark:text-brand-gold mt-1 font-medium">
                      ₦{(item.priceNgn * item.quantity).toLocaleString()} &bull; ${item.priceUsd * item.quantity} USD
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210] space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="opacity-70 uppercase tracking-widest text-[10px]">Total Order</span>
              <span className="font-mono text-brand-crimson dark:text-brand-gold text-sm font-semibold">
                ₦{totalNgn.toLocaleString()} &bull; ${totalUsd} USD
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleCheckoutWhatsApp}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-crimson text-white font-medium rounded-sm text-[11px] uppercase tracking-wider hover:bg-brand-burgundy-light transition-colors"
              >
                <MessageSquare size={14} className="text-brand-gold" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => {
                  alert(`Connecting to Paystack/Stripe checkout for ₦${totalNgn.toLocaleString()}...`);
                  clearCart();
                  setActiveModal("none");
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-brand-gold text-brand-onyx font-bold rounded text-[11px] uppercase tracking-wider hover:bg-brand-cream transition-colors"
              >
                <CreditCard size={14} />
                <span>Card Pay</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
