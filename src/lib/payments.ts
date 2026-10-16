export interface PaymentOrder {
  reference: string;
  amountNgn: number;
  amountUsd: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    size: string;
    priceNgn: number;
    priceUsd: number;
    quantity: number;
  }>;
  status: "staged" | "processing" | "completed" | "failed" | "outage_recovered";
  timestamp: number;
}

export const MERCHANT_CONFIG = {
  companyName: "Abraham Collection",
  companyEmail: "infoac0001@gmail.com",
  directLine: "08122640820",
  whatsAppLine: "08034432759",
  paystackPublicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "pk_live_abraham_collection",
  flutterwavePublicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_KEY || "FLWPUBK_abraham_collection",
};

/**
 * 1. TENACITY PROTOCOL: Stage order into durable local storage BEFORE launching any gateway.
 * Guards against power outages, battery death, and network drops.
 */
export function stageOrderForPayment(
  items: PaymentOrder["items"],
  amountNgn: number,
  amountUsd: number,
  client: { name: string; email: string; phone: string }
): PaymentOrder {
  const reference = `AC-TX-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  const order: PaymentOrder = {
    reference,
    amountNgn,
    amountUsd,
    customerEmail: client.email || MERCHANT_CONFIG.companyEmail,
    customerName: client.name || "Esteemed Patron",
    customerPhone: client.phone || MERCHANT_CONFIG.directLine,
    items,
    status: "staged",
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem("abraham_active_tx", JSON.stringify(order));
    // Also append to audit trail
    const history = JSON.parse(localStorage.getItem("abraham_tx_audit") || "[]");
    history.push(order);
    localStorage.setItem("abraham_tx_audit", JSON.stringify(history.slice(-20)));
  } catch (err) {
    console.warn("Storage warning during order staging:", err);
  }

  return order;
}

/**
 * 2. TENACITY PROTOCOL: Recover interrupted order after browser reboot or connection restore.
 */
export function getInterruptedOrder(): PaymentOrder | null {
  try {
    const raw = localStorage.getItem("abraham_active_tx");
    if (!raw) return null;
    const order: PaymentOrder = JSON.parse(raw);

    // If order was staged within last 24 hours and not completed
    const ageHours = (Date.now() - order.timestamp) / (1000 * 60 * 60);
    if (ageHours < 24 && order.status !== "completed") {
      return order;
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

/**
 * 3. Mark transaction completed and clear active lock
 */
export function markOrderCompleted(reference: string) {
  try {
    const raw = localStorage.getItem("abraham_active_tx");
    if (raw) {
      const order: PaymentOrder = JSON.parse(raw);
      if (order.reference === reference) {
        order.status = "completed";
        localStorage.setItem("abraham_active_tx", JSON.stringify(order));
      }
    }
    setTimeout(() => {
      localStorage.removeItem("abraham_active_tx");
    }, 5000);
  } catch {}
}

/**
 * 4. Generate Emergency Outage Recovery WhatsApp Dispatch
 */
export function generateOutageRecoveryLink(order: PaymentOrder): string {
  const itemsText = order.items.map((i) => `* ${i.name} (${i.size}) x${i.quantity}`).join("\n");
  const msg = encodeURIComponent(
    `[OUTAGE RECOVERY CONFIRMATION]\n` +
    `Hello Bolaji Abraham (Abraham Collection),\n\n` +
    `My connection was interrupted during checkout. Here is my preserved order reference:\n\n` +
    `* Reference: ${order.reference}\n` +
    `* Amount: ₦${order.amountNgn.toLocaleString()} ($${order.amountUsd} USD)\n` +
    `* Client: ${order.customerName}\n` +
    `* Phone: ${order.customerPhone}\n` +
    `* Merchant Contact: ${MERCHANT_CONFIG.companyEmail}\n\n` +
    `Items:\n${itemsText}\n\n` +
    `Please confirm if payment was captured on Paystack/Flutterwave/Kora or generate my direct invoice.`
  );
  return `https://wa.me/2348034432759?text=${msg}`;
}

/**
 * 5. Instant Gateway Initiators
 */
export function initiatePaystackPayment(
  order: PaymentOrder,
  onSuccess: (ref: string) => void,
  onClose: () => void
) {
  if (typeof window === "undefined") return;

  // Check if Paystack inline script is loaded
  const handler = (window as any).PaystackPop?.setup({
    key: MERCHANT_CONFIG.paystackPublicKey,
    email: order.customerEmail,
    amount: order.amountNgn * 100, // Paystack operates in kobo
    ref: order.reference,
    currency: "NGN",
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: order.customerName },
        { display_name: "Phone Number", variable_name: "phone_number", value: order.customerPhone },
        { display_name: "Items", variable_name: "items", value: JSON.stringify(order.items) },
      ],
    },
    callback: (response: any) => {
      markOrderCompleted(order.reference);
      onSuccess(response.reference || order.reference);
    },
    onClose: () => {
      onClose();
    },
  });

  if (handler) {
    handler.openIframe();
  } else {
    // If inline script isn't cached yet or blocked by network, fallback to resilient direct invoice
    window.open(generateOutageRecoveryLink(order), "_blank");
    onSuccess(order.reference);
  }
}

export function initiateFlutterwavePayment(
  order: PaymentOrder,
  onSuccess: (ref: string) => void,
  onClose: () => void
) {
  if (typeof window === "undefined") return;

  const flutterwave = (window as any).FlutterwaveCheckout;
  if (flutterwave) {
    flutterwave({
      public_key: MERCHANT_CONFIG.flutterwavePublicKey,
      tx_ref: order.reference,
      amount: order.amountNgn,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: order.customerEmail,
        phone_number: order.customerPhone,
        name: order.customerName,
      },
      customizations: {
        title: "Abraham Collection Atelier",
        description: "Bespoke Tailoring & Ready-to-Wear",
        logo: "https://abrahamcollection.com/media/logo_transparent.png",
      },
      callback: (data: any) => {
        markOrderCompleted(order.reference);
        onSuccess(order.reference);
      },
      onclose: () => {
        onClose();
      },
    });
  } else {
    window.open(generateOutageRecoveryLink(order), "_blank");
    onSuccess(order.reference);
  }
}
