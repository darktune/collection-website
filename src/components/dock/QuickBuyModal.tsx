"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Check,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  ArrowRight,
  WifiOff,
  Building,
  Globe,
} from "lucide-react";
import { useAtelier } from "@/context/AtelierContext";
import { PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";
import {
  stageOrderForPayment,
  initiatePaystackPayment,
  initiateFlutterwavePayment,
  generateOutageRecoveryLink,
  MERCHANT_CONFIG,
} from "@/lib/payments";

const SIZES = [
  "38 Regular",
  "40 Regular",
  "42 Regular",
  "44 Regular",
  "46 Regular",
  "Custom Fit via WhatsApp",
];

export function QuickBuyModal() {
  const { activeModal, setActiveModal, selectedProductForQuickBuy, addToCart, user } = useAtelier();
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const [clientName, setClientName] = useState(user.name || "");
  const [clientPhone, setClientPhone] = useState(user.phone || "");
  const [clientEmail, setClientEmail] = useState(user.email || "");
  const [deliveryCity, setDeliveryCity] = useState(user.city || "");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [selectedGateway, setSelectedGateway] = useState<"paystack" | "flutterwave" | "kora" | "whatsapp">("paystack");

  if (activeModal !== "quickBuy" || !selectedProductForQuickBuy) return null;

  const product = selectedProductForQuickBuy;

  const handleInstantBuy = () => {
    // 1. Stage Order in local storage first (Tenacity Protocol against power cuts/network drops)
    const order = stageOrderForPayment(
      [
        {
          name: product.name,
          size: selectedSize,
          priceNgn: product.priceNgn,
          priceUsd: product.priceUsd,
          quantity: 1,
        },
      ],
      product.priceNgn,
      product.priceUsd,
      {
        name: clientName || "Esteemed Patron",
        email: clientEmail || MERCHANT_CONFIG.companyEmail,
        phone: clientPhone || MERCHANT_CONFIG.directLine,
      }
    );

    setOrderRef(order.reference);
    addToCart(product, selectedSize);

    // 2. Gateway Dispatch
    if (selectedGateway === "paystack") {
      initiatePaystackPayment(
        order,
        (ref) => {
          setOrderComplete(true);
        },
        () => {
          // User closed gateway modal
        }
      );
    } else if (selectedGateway === "flutterwave") {
      initiateFlutterwavePayment(
        order,
        (ref) => {
          setOrderComplete(true);
        },
        () => {}
      );
    } else if (selectedGateway === "kora") {
      // Kora Pay virtual account failover
      const koraMsg = encodeURIComponent(
        `Hello Bolaji Abraham (Abraham Collection),\n\nI am requesting a Kora Pay / Virtual Account Transfer for:\n- Ref: ${order.reference}\n- Amount: ₦${product.priceNgn.toLocaleString()} ($${product.priceUsd} USD)\n- Garment: ${product.name} (${selectedSize})\n- Merchant: ${MERCHANT_CONFIG.companyEmail}\n\nPlease dispatch your virtual account number.`
      );
      window.open(`https://wa.me/2348034432759?text=${koraMsg}`, "_blank");
      setOrderComplete(true);
    } else {
      // WhatsApp Direct Buy
      window.open(generateOutageRecoveryLink(order), "_blank");
      setOrderComplete(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FCFAF7] dark:bg-brand-onyx text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative transition-colors duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-brand-black/60">
          <div className="flex items-center gap-2">
            <PempamsieIcon size={18} className="text-brand-gold" />
            <h3 className="font-display text-lg tracking-wide">Atelier Checkout</h3>
          </div>
          <button
            onClick={() => {
              setActiveModal("none");
              setOrderComplete(false);
            }}
            className="text-brand-black/60 dark:text-white/60 hover:text-brand-black dark:hover:text-white p-1 rounded-full transition-colors"
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
              <h4 className="font-display text-2xl text-white mb-2">Order Confirmed &amp; Protected</h4>
              <p className="text-xs text-white/70 font-mono">
                Order Reference: <span className="text-brand-gold font-bold">{orderRef}</span>
              </p>
            </div>
            <p className="text-xs text-white/80 max-w-sm mx-auto font-light leading-relaxed">
              Your instant order for <strong>{product.name} ({selectedSize})</strong> is safely recorded under <strong>{MERCHANT_CONFIG.companyEmail}</strong>. In case of network drops or power outages, your order state remains preserved in your device.
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
          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Selected Product Card */}
            <div className="flex gap-4 p-3 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-xl items-center">
              <div className="relative w-16 h-20 bg-brand-black rounded-lg overflow-hidden flex-shrink-0">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-brand-gold uppercase tracking-widest">{product.category}</span>
                <h4 className="font-display text-base leading-tight mt-0.5">{product.name}</h4>
                <div className="flex items-center gap-3 mt-1.5 font-mono text-sm text-brand-gold font-medium">
                  <span>₦{product.priceNgn.toLocaleString()}</span>
                  <span className="text-brand-black/40 dark:text-white/40">&bull;</span>
                  <span>${product.priceUsd} USD</span>
                </div>
              </div>
            </div>

            {/* Choose Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="uppercase tracking-widest font-medium opacity-80 text-[11px]">
                  Choose Tailoring Size
                </label>
                <span className="text-[10px] text-brand-gold font-mono">British &bull; Nigerian Standard</span>
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
                        : "border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 hover:border-brand-gold/40 text-brand-black/80 dark:text-white/80"
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
                <label className="block text-[10px] uppercase tracking-wider opacity-70 mb-1">Your Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Adebayo Adeleke"
                  className="w-full bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-brand-black dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider opacity-70 mb-1">Email (for Receipt)</label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-brand-black dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider opacity-70 mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="e.g. 0812 264 0820"
                  className="w-full bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-brand-black dark:text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider opacity-70 mb-1">City &amp; Country</label>
                <input
                  type="text"
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="Lagos, London, Atlanta..."
                  className="w-full bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded p-2.5 outline-none focus:border-brand-gold text-brand-black dark:text-white text-xs"
                />
              </div>
            </div>

            {/* Gateway Selection */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <label className="block text-xs uppercase tracking-widest font-medium opacity-80">
                Select Payment Channel (Tenacity Protocol Protected)
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedGateway("paystack")}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    selectedGateway === "paystack"
                      ? "border-brand-gold bg-brand-gold/15 text-brand-black dark:text-white"
                      : "border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 text-brand-black/70 dark:text-white/70 hover:border-brand-gold/40"
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>Paystack</span>
                    <CreditCard size={14} className="text-brand-gold" />
                  </div>
                  <span className="text-[10px] opacity-60 mt-1">Cards, Apple Pay, USSD, Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway("flutterwave")}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    selectedGateway === "flutterwave"
                      ? "border-brand-gold bg-brand-gold/15 text-brand-black dark:text-white"
                      : "border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 text-brand-black/70 dark:text-white/70 hover:border-brand-gold/40"
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>Flutterwave</span>
                    <Globe size={14} className="text-brand-gold" />
                  </div>
                  <span className="text-[10px] opacity-60 mt-1">USD, GBP, EUR &amp; Diaspora</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway("kora")}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    selectedGateway === "kora"
                      ? "border-brand-gold bg-brand-gold/15 text-brand-black dark:text-white"
                      : "border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 text-brand-black/70 dark:text-white/70 hover:border-brand-gold/40"
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>Kora Pay / Bachs</span>
                    <Building size={14} className="text-brand-gold" />
                  </div>
                  <span className="text-[10px] opacity-60 mt-1">Virtual Bank Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedGateway("whatsapp")}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                    selectedGateway === "whatsapp"
                      ? "border-[#25D366] bg-[#25D366]/15 text-brand-black dark:text-white"
                      : "border-brand-black/10 dark:border-white/10 bg-brand-black/5 dark:bg-white/5 text-brand-black/70 dark:text-white/70 hover:border-[#25D366]/40"
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>WhatsApp Concierge</span>
                    <MessageSquare size={14} className="text-[#25D366]" />
                  </div>
                  <span className="text-[10px] opacity-60 mt-1">Eranibaniso Direct (0ms Latency)</span>
                </button>
              </div>

              {/* Action Trigger */}
              <button
                type="button"
                onClick={handleInstantBuy}
                className="w-full py-3.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-luxury font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg mt-2"
              >
                <PempamsieIcon size={14} className="text-brand-gold" />
                <span>Complete Purchase with {selectedGateway.toUpperCase()}</span>
              </button>

              <div className="flex items-center justify-between text-[10px] text-brand-black/50 dark:text-white/50 pt-2 border-t border-brand-black/10 dark:border-white/5">
                <span className="font-mono">Merchant: {MERCHANT_CONFIG.companyEmail}</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={13} />
                  <span>Outage &amp; Disconnection Resilient</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
