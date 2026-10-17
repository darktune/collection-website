"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Send,
  Phone,
  MessageSquare,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { IrukereIcon, AbereIcon, AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";
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
  const [dimensions, setDimensions] = useState({ width: 420, height: 560 });
  const [isResizing, setIsResizing] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [aiState, setAiState] = useState<"idle" | "thinking" | "gathering" | "analyzing" | "solving">("idle");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "assistant",
      text: user.name
        ? `Welcome, ${user.name}. It is an honor to receive you. How may we guide your commission or curate a design that honors your occasion today?`
        : "Welcome to the atelier. Whether you know your exact silhouette or wish us to curate an attire that honors your personal station and identity, how may we assist you today?",
      suggestions: [
        "Curate an Agbada for my Chieftaincy / Wedding",
        "How does Diaspora fitting work?",
        "Speak directly with Bolaji Abraham",
        "Aso Oke weave & color guidance",
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

    // Gentle progressive loading
    setAiState("thinking");
    await new Promise((r) => setTimeout(r, 500));

    setAiState("gathering");
    await new Promise((r) => setTimeout(r, 600));

    setAiState("analyzing");
    await new Promise((r) => setTimeout(r, 500));

    setAiState("solving");
    await new Promise((r) => setTimeout(r, 400));

    let replyText = "";
    let actionLink: { label: string; href: string } | undefined = undefined;
    let newSuggestions: string[] | undefined = undefined;

    const lower = q.toLowerCase();

    if (lower.includes("diaspora") || lower.includes("uk") || lower.includes("us") || lower.includes("canada") || lower.includes("shipping")) {
      replyText = "For our patrons in London, Atlanta, Houston, Toronto, and across the globe, we conduct private virtual fitting reviews with Bolaji Abraham. We dispatch via tracked DHL Express in 3–5 weeks with full insurance and a bespoke fit guarantee.";
      actionLink = { label: "Open Diaspora Commission", href: "/bespoke/commission?type=diaspora" };
      newSuggestions = ["Book a video fitting session", "What measurements are required?"];
    } else if (lower.includes("bolaji") || lower.includes("call") || lower.includes("speak") || lower.includes("phone") || lower.includes("talk")) {
      replyText = "Bolaji Abayomi Abraham personally attends to client inquiries. You may place a direct call on 0812 264 0820 or send a private note via WhatsApp at 0803 443 2759 (Eranibaniso).";
      actionLink = { label: "Message Bolaji on WhatsApp", href: "https://wa.me/2348034432759" };
      newSuggestions = ["View Founder Story & 25-Year Craft", "Book Studio Appointment in Lagos"];
    } else if (lower.includes("agbada") || lower.includes("chieftaincy") || lower.includes("wedding") || lower.includes("curate") || lower.includes("identity")) {
      replyText = "When curating an attire for your identity, we begin with your presence: for royal celebrations and chieftaincies, our hand-loomed 8-strip Dandogo or Imperial Agbada in heavy Aso Oke drapes with sovereign weight. If you are unsure of your color or cut, we study your occasion and advise.";
      actionLink = { label: "Explore The Heritage Collection", href: "/heritage" };
      newSuggestions = ["How do I purchase immediately?", "Can I see pictures of patrons?"];
    } else if (lower.includes("buy") || lower.includes("purchase") || lower.includes("order") || lower.includes("price")) {
      replyText = "To purchase immediately: hover or tap any garment across our collections and choose 'Buy'. Your order is protected by our offline tenacity protocol—never double-charged, even during connection drops.";
      actionLink = { label: "Browse Tailoring", href: "/men" };
      newSuggestions = ["View Saved Silhouettes", "Book Bespoke Fitting Instead"];
    } else {
      replyText = `Thank you for sharing your thoughts on "${q}". At Abraham Collection, tailoring is an intentional dialogue between your identity and master craftsmanship. Let us guide your next milestone.`;
      actionLink = { label: "Book Bespoke", href: "/bespoke/commission" };
      newSuggestions = ["Direct Call: 0812 264 0820", "View Customer Stories"];
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

  // Drag resize handler from top-left corner
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = dimensions.width;
    const startH = dimensions.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = startX - moveEvent.clientX;
      const deltaY = startY - moveEvent.clientY;
      setDimensions({
        width: Math.min(Math.max(startW + deltaX, 320), 750),
        height: Math.min(Math.max(startH + deltaY, 400), 800),
      });
    };

    const onMouseUp = () => {
      setIsResizing(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-out select-none ${
        isFullscreen
          ? "inset-4 md:inset-8"
          : "bottom-20 right-4 md:right-6"
      }`}
      style={{
        width: isFullscreen ? "auto" : `${dimensions.width}px`,
        height: isFullscreen ? "auto" : `${dimensions.height}px`,
        maxWidth: "96vw",
        maxHeight: "86vh",
      }}
    >
      {/* Deep Warm Brand Glow Container */}
      <div className="relative w-full h-full p-[1.5px] rounded-2xl warm-glow-ring shadow-2xl overflow-hidden flex flex-col border border-brand-gold/40">
        
        {/* Resize Handle (Top-Left corner affordance) */}
        {!isFullscreen && (
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 w-5 h-5 cursor-nwse-resize z-50 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity"
            title="Drag to resize window"
          >
            <div className="w-2 h-2 border-t-2 border-l-2 border-brand-gold rounded-tl-sm" />
          </div>
        )}

        {/* Main Body - Theme Adaptive (Light & Dark) */}
        <div className="w-full h-full bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white rounded-2xl flex flex-col overflow-hidden transition-colors duration-300">
          
          {/* Header - Uncluttered, Elegant, Warm */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-[#151210]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <IrukereIcon size={17} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-medium tracking-wide">
                  Atelier Concierge
                </span>
                <span className="text-[10px] opacity-60 font-sans -mt-0.5">
                  Bolaji Abayomi Abraham &bull; Lagos
                </span>
              </div>
            </div>

            {/* Actions: Fullscreen, Minimize/Close */}
            <div className="flex items-center gap-1 opacity-70">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 hover:opacity-100 hover:bg-brand-black/5 dark:hover:bg-white/10 rounded transition-colors"
                title={isFullscreen ? "Restore window" : "Maximize window"}
              >
                {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={() => setActiveModal("none")}
                className="p-1.5 hover:opacity-100 hover:bg-brand-black/5 dark:hover:bg-white/10 rounded transition-colors"
                title="Close Concierge"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Understated Tailor Direct Strip */}
          <div className="bg-brand-gold/10 px-4 py-2 border-b border-brand-gold/20 flex items-center justify-between text-[11px] text-brand-gold">
            <div className="flex items-center gap-1.5">
              <Phone size={12} />
              <span className="opacity-80">Direct Line:</span>
              <a href="tel:08122640820" className="underline font-mono font-medium hover:opacity-100">0812 264 0820</a>
            </div>
            <a
              href="https://wa.me/2348034432759"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-brand-gold font-medium hover:underline"
            >
              <MessageSquare size={12} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4 text-xs font-light leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex-shrink-0 flex items-center justify-center text-brand-gold mt-1">
                    <IrukereIcon size={12} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-3.5 rounded-xl transition-colors ${
                    msg.sender === "user"
                      ? "bg-brand-crimson text-white rounded-br-none shadow-sm"
                      : "bg-[#F5EFE6] dark:bg-white/5 border border-brand-black/10 dark:border-white/10 text-brand-black dark:text-brand-silk rounded-bl-none space-y-3"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Action Link */}
                  {msg.actionLink && (
                    <a
                      href={msg.actionLink.href}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-gold text-brand-onyx font-medium uppercase tracking-wider text-[10px] rounded hover:bg-brand-cream transition-colors mt-2"
                    >
                      <span>{msg.actionLink.label}</span>
                      <ArrowRight size={11} />
                    </a>
                  )}

                  {/* Curated Suggestion Pills */}
                  {msg.suggestions && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-brand-black/5 dark:border-white/5">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(sug)}
                          className="text-[10px] px-2.5 py-1 border border-brand-black/15 dark:border-white/15 hover:border-brand-gold hover:text-brand-gold bg-brand-black/[0.02] dark:bg-white/[0.03] text-brand-black/80 dark:text-white/80 transition-colors text-left"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-brand-black/10 dark:bg-white/10 flex-shrink-0 flex items-center justify-center text-brand-black/60 dark:text-white/80 mt-1">
                    <User size={12} />
                  </div>
                )}
              </div>
            ))}

            {/* AI Multi-Stage Thinking Indicator */}
            {aiState !== "idle" && (
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-full bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <Sparkles size={12} className="animate-spin text-brand-gold" />
                </div>
                <div className="p-2.5 bg-brand-gold/10 border border-brand-gold/25 rounded-md text-[11px] text-brand-gold font-mono flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-gold rotate-45" />
                  {aiState === "thinking" && "Reflecting on your identity..."}
                  {aiState === "gathering" && "Reviewing textile drape & weaves..."}
                  {aiState === "analyzing" && "Balancing silhouette proportions..."}
                  {aiState === "solving" && "Preparing bespoke counsel..."}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar - Architectural Luxury Form */}
          <div className="p-3 bg-[#F5EFE6] dark:bg-[#151210] border-t border-brand-black/10 dark:border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 bg-white dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-md px-3 py-2 focus-within:border-brand-gold transition-colors"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about bespoke fittings, fabrics, or identity curation..."
                className="bg-transparent border-none outline-none text-xs w-full text-brand-black dark:text-white placeholder:text-brand-black/40 dark:placeholder:text-white/40"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-1.5 bg-brand-gold text-brand-onyx rounded hover:bg-brand-cream disabled:opacity-30 disabled:hover:bg-brand-gold transition-colors"
                title="Send inquiry"
              >
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
