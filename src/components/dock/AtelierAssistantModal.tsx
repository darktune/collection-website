"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Send,
  Sparkles,
  Phone,
  MessageSquare,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";
import { AbereIcon, PempamsieIcon, AdinkraheneIcon } from "@/components/icons/BespokeIcons";
import { useAtelier } from "@/context/AtelierContext";

interface ChatMessage {
  id: string;
  sender: "assistant" | "user";
  text: string;
  suggestions?: string[];
  actionLink?: { label: string; href: string };
}

export function AtelierAssistantModal() {
  const { activeModal, setActiveModal, user } = useAtelier();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 440, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [aiState, setAiState] = useState<"idle" | "thinking" | "gathering" | "analyzing" | "solving">("idle");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: user.name
        ? `Welcome back, ${user.name}. I am the Abraham Collection Atelier Concierge. How may we assist your bespoke or collection journey today?`
        : "Greetings. I am the Abraham Collection Atelier Concierge. Welcome to our digital atelier. How may I assist your bespoke commission, sizing, or styling requirements today?",
      suggestions: [
        "How does Diaspora fitting work?",
        "Recommend an Agbada for a Chieftaincy Title",
        "Book a direct call with Bolaji Abraham",
        "Explain Aso Oke weave varieties",
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (activeModal !== "assistant") return null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");

    // Progressive Multi-Stage Loading
    setAiState("thinking");
    await new Promise((r) => setTimeout(r, 600));

    setAiState("gathering");
    await new Promise((r) => setTimeout(r, 700));

    setAiState("analyzing");
    await new Promise((r) => setTimeout(r, 600));

    setAiState("solving");
    await new Promise((r) => setTimeout(r, 500));

    // Dynamic Intelligent Response based on keywords
    let replyText = "";
    let actionLink: { label: string; href: string } | undefined = undefined;
    let newSuggestions: string[] | undefined = undefined;

    const lower = q.toLowerCase();

    if (lower.includes("diaspora") || lower.includes("uk") || lower.includes("us") || lower.includes("canada") || lower.includes("shipping")) {
      replyText = "Our Diaspora Concierge regularly dresses clients across London, Atlanta, Houston, Toronto, and Europe. We conduct two 30-minute virtual fitting reviews, deliver via tracked DHL Express in 3–5 weeks, and provide a 100% insured fit guarantee with local alteration credits if ever required.";
      actionLink = { label: "Open Diaspora Commission Form", href: "/bespoke/commission?type=diaspora" };
      newSuggestions = ["Book a direct video fitting", "What measurements do you need?"];
    } else if (lower.includes("bolaji") || lower.includes("call") || lower.includes("speak") || lower.includes("phone") || lower.includes("talk")) {
      replyText = "You can speak directly with our Founder and Head Designer, Bolaji Abayomi Abraham. You can call directly on 0812 264 0820 or message our WhatsApp concierge at 0803 443 2759 (Eranibaniso in Yoruba).";
      actionLink = { label: "Chat on WhatsApp Now", href: "https://wa.me/2348034432759" };
      newSuggestions = ["View Founder Story & 25-Year Craft", "Book Studio Appointment in Lagos"];
    } else if (lower.includes("agbada") || lower.includes("chieftaincy") || lower.includes("wedding") || lower.includes("ceremony")) {
      replyText = "For chieftaincy installations and royal weddings, we recommend our hand-loomed 8-strip Dandogo or Imperial Agbada in heavy Aso Oke with metallic gold or deep burgundy embroidery. Dandogo requires 4 weeks of hand-guided drafting.";
      actionLink = { label: "Explore Heritage Collection", href: "/heritage" };
      newSuggestions = ["How do I buy immediately in 3 clicks?", "What is the cost in Naira and USD?"];
    } else if (lower.includes("buy") || lower.includes("purchase") || lower.includes("order") || lower.includes("cart") || lower.includes("price")) {
      replyText = "To purchase immediately: hover or tap any garment card across Heritage, Men, or Women sections and click 'Instant Buy'. In 3 clicks—Select Size, Enter Delivery Coordinates, Confirm via Card or WhatsApp Invoice—your order is securely placed!";
      actionLink = { label: "Browse Contemporary Tailoring", href: "/men" };
      newSuggestions = ["View My Wishlist", "Book Bespoke Instead"];
    } else {
      replyText = `Thank you for your inquiry regarding "${q}". Bolaji Abraham's 25-year atelier specializes in custom bespoke cutting and ready-to-wear architectural tailoring. You can explore our collections, schedule a private studio appointment, or message our master cutter directly.`;
      actionLink = { label: "Book Private Bespoke Consultation", href: "/bespoke/commission" };
      newSuggestions = ["Call 0812 264 0820", "View Customer Testimonials"];
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: replyText,
        actionLink,
        suggestions: newSuggestions,
      },
    ]);

    setAiState("idle");
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isFullscreen
          ? "inset-4 md:inset-8"
          : "bottom-24 right-4 md:right-8"
      }`}
      style={{
        width: isFullscreen ? "auto" : `${dimensions.width}px`,
        height: isFullscreen ? "auto" : `${dimensions.height}px`,
        maxWidth: "96vw",
        maxHeight: "86vh",
      }}
    >
      {/* Siri Glowing Border Outer Shell */}
      <div className="relative w-full h-full p-[2px] rounded-2xl siri-glow-ring shadow-2xl overflow-hidden flex flex-col">
        
        {/* Main Assistant Body */}
        <div className="w-full h-full bg-brand-onyx/95 backdrop-blur-2xl text-brand-white rounded-2xl flex flex-col overflow-hidden border border-white/10">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-brand-black/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/40 text-brand-gold">
                  <AbereIcon size={16} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-brand-onyx animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display tracking-wider text-sm font-medium">Abraham Concierge</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-gold/20 text-brand-gold tracking-widest uppercase font-mono">
                    AI 2.0
                  </span>
                </div>
                <div className="text-[10px] text-brand-silk/60 flex items-center gap-1 font-mono">
                  <span>Atelier Lagos</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400">Online</span>
                </div>
              </div>
            </div>

            {/* Actions: Fullscreen, Minimize, Close */}
            <div className="flex items-center gap-1 text-white/70">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
                title={isFullscreen ? "Restore window" : "Maximize to fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button
                onClick={() => setActiveModal("none")}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Close Assistant"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Direct Line Quick Strip */}
          <div className="bg-brand-gold/10 px-4 py-2 border-b border-brand-gold/20 flex items-center justify-between text-[11px] text-brand-gold">
            <div className="flex items-center gap-2">
              <Phone size={13} />
              <span>Direct Tailor Line:</span>
              <a href="tel:08122640820" className="underline font-mono font-medium">0812 264 0820</a>
            </div>
            <a
              href="https://wa.me/2348034432759"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline text-[#25D366] font-medium"
            >
              <MessageSquare size={12} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 text-xs font-light leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex-shrink-0 flex items-center justify-center text-brand-gold mt-1">
                    <AbereIcon size={12} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-brand-crimson text-white rounded-br-none"
                      : "bg-white/5 border border-white/10 text-brand-silk rounded-bl-none space-y-3"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Optional Action Link */}
                  {msg.actionLink && (
                    <a
                      href={msg.actionLink.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold text-brand-onyx font-medium uppercase tracking-widest text-[10px] rounded hover:bg-brand-cream transition-colors mt-2"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight size={12} />
                    </a>
                  )}

                  {/* Suggestion Pills */}
                  {msg.suggestions && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-white/5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(sug)}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 hover:bg-brand-gold/20 hover:text-brand-gold border border-white/10 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-white/80 mt-1">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}

            {/* AI Multi-Stage Thinking Indicator */}
            {aiState !== "idle" && (
              <div className="flex gap-3 items-center">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                  <Sparkles size={13} className="animate-spin text-brand-gold" />
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl rounded-bl-none text-[11px] text-brand-gold flex items-center gap-2 font-mono">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                  {aiState === "thinking" && "Atelier Intelligence: Thinking..."}
                  {aiState === "gathering" && "Atelier Intelligence: Gathering fabric and textile facts..."}
                  {aiState === "analyzing" && "Atelier Intelligence: Analyzing silhouette and posture balance..."}
                  {aiState === "solving" && "Atelier Intelligence: Solving fit requirements..."}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Pill Bar */}
          <div className="p-3 bg-brand-black/80 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-white/5 border border-white/15 rounded-full px-4 py-1.5 focus-within:border-brand-gold transition-colors"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about bespoke fittings, fabrics, pricing, or shipping..."
                className="bg-transparent border-none outline-none text-xs w-full text-white placeholder:text-white/40"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-1.5 bg-brand-gold text-brand-onyx rounded-full hover:bg-brand-cream disabled:opacity-30 disabled:hover:bg-brand-gold transition-colors"
                title="Send inquiry"
              >
                <Send size={13} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
