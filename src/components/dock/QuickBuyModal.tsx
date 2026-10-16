"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, ShieldCheck, CreditCard, MessageSquare, ArrowRight } from "lucide-react";
import { useAtelier, AtelierProduct } from "@/context/AtelierContext";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";

const SIZES = ["38 Regular", "40 Regular", "42 Regular", "44 Regular", "46 Regular", "Custom Fit via WhatsApp"];

export function QuickBuyModal() {
  const { activeModal, setActiveModal, selectedProductForQuickBuy, addToCart, user } = useAtelier();
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const [clientName, setClientName] = useState(user.name || "");
  const [clientPhone, setClientPhone] = useState(user.phone || "");
  const [deliveryCity, setDeliveryCity] = useState(user.city || "");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState("");

  if (activeModal !== "quickBuy" || !selectedProductForQuickBuy) return null;

  const product = selectedProductForQuickBuy;

  const handleInstantBuy = (paymentType: "online" | "whatsapp") => {
    const ref = `AC-${Date.now().toString().slice(-6)}`;
    setOrderRef(ref);

    addToCart(product, selectedSize);

    if (paymentType === "whatsapp") {
      const msg = encodeURIComponent(
        `Hello Bolaji Abraham (Abraham Collection),\n\nI would like to instantly purchase:\n- Garment: ${product.name}\n- Reference: ${ref}\n- Size: ${selectedSize}\n- Price: ₦${product.priceNgn.toLocaleString()} ($${product.priceUsd} USD)\n- Client Name: ${clientName || "Esteemed Patron"}\n- Delivery City: ${deliveryCity || "Lagos/Worldwide"}\n- Phone: ${clientPhone || "Provided"}\n\nPlease confirm availability and payment details.`
      );
      window.open(`https://wa.me/2348034432759?text=${msg}`, "_blank");
    }

    setOrderComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-brand-onyx text-brand-white border border-brand-gold/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-brand-black/50">
          <div className="flex items-center gap-2">
            <PempamsieIcon size={18} className="text-brand-gold" />
            <h3 className="font-display text-lg tracking-wide">3-Click Instant Checkout</h3>
          </div>
          <button
            onClick={() => {
              setActiveModal("none");
              setOrderComplete(false);
            }}
            className="text-white/60 hover:text-white p-1 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {orderComplete ? (
          /* Order Confirmed Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <Check size={32} />
            </div>
            <div>
              <h4 className="font-display text-2xl text-white mb-2">Order Dispatched to Atelier</h4>
              <p className="text-xs text-white/70 font-mono">Reference: <span className="text-brand-gold font-bold">{orderRef}</span></p>
            </div>
            <p className="text-xs text-white/80 max-w-sm mx-auto font-light leading-relaxed">
              Your instant order for <strong>{product.name} ({selectedSize})</strong> has been received by Bolaji Abayomi Abraham's cutting room. Our concierge will contact you via WhatsApp for final sleeve &amp; trouser drop confirmations.
            </p>
            <button
              onClick={() => {
                setActiveModal("none");
                setOrderComplete(false);
              }}
              className="w-full py-3.5 bg-brand-crimson text-white hover:bg-brand-burgundy-light uppercase tracking-luxury text-xs font-semibold transition-colors"
            >
              Continue Exploring Atelier
            </button>
          </div>
        ) : (
          /* Checkout Steps */
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Selected Product Card */}
            <div className="flex gap-4 p-3 bg-white/5 border border-white/10 rounded-xl items-center">
              <div className="relative w-16 h-20 bg-brand-black rounded-lg overflow-hidden flex-shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-brand-gold uppercase tracking-widest">{product.category}</span>
                <h4 className="font-display text-base leading-tight mt-0.5">{product.name}</h4>
                <div className="flex items-center gap-3 mt-1.5 font-mono text-sm text-brand-gold font-medium">
                  <span>₦{product.priceNgn.toLocaleString()}</span>
                  <span className="text-white/40">&bull;</span>
                  <span>${product.priceUsd} USD</span>
                </div>
              </div>
            </div>

            {/* Step 2: Select Size / Measurements */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <label className="uppercase tracking-widest font-medium opacity-80">
                  Click 2: Choose Tailoring Size
                </label>
                <span className="text-[10px] text-brand-gold font-mono">Standard British / Nigerian Cut</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs rounded border transition-colors ${
                      selectedSize === size
                        ? "border-brand-gold bg-brand-gold/20 text-brand-gold font-medium"
                        : "border-white/10 bg-white/5 hover:border-white/25 text-white/80"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] uppercase tracking-wider opacity-70 mb-1">Your Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Adebayo Adeleke"
                  className="w-full bg-white/5 border border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider opacity-70 mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. 0812 264 0820"
                  className="w-full bg-white/5 border border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-white text-xs"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider opacity-70 mb-1">Delivery City &amp; Country</label>
                <input
                  type="text"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="e.g. Lagos, Abuja, London, Atlanta, Toronto..."
                  className="w-full bg-white/5 border border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-white text-xs"
                />
              </div>
            </div>

            {/* Step 3: Confirm & Place Order */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="block text-xs uppercase tracking-widest font-medium opacity-80">
                Click 3: Confirm Instant Purchase
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInstantBuy("whatsapp")}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-black font-semibold rounded text-xs tracking-wider uppercase transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Direct Buy</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleInstantBuy("online")}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-gold hover:bg-brand-cream text-brand-onyx font-semibold rounded text-xs tracking-wider uppercase transition-colors"
                >
                  <CreditCard size={16} />
                  <span>Card / Paystack (Instant)</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/50 pt-2">
                <ShieldCheck size={14} className="text-brand-gold" />
                <span>100% Insured Diaspora Fitting &amp; Delivery Guarantee</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
