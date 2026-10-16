"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  Send,
  MessageSquare,
  Scissors,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  Bot,
  User,
  Shield,
  Layers,
} from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, OjuOyaIcon } from "@/components/icons/BespokeIcons";

interface CopilotMessage {
  id: string;
  sender: "copilot" | "staff";
  content: string;
  timestamp: string;
  actionSnippet?: {
    type: "whatsapp" | "inventory" | "commission";
    title: string;
    body: string;
  };
  suggestions?: string[];
}

interface AdminCopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminCopilotModal({ isOpen, onClose }: AdminCopilotModalProps) {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: "m-1",
      sender: "copilot",
      content:
        "Greetings, Master Tailor. I am the Atelier Studio AI Copilot. I manage commission pipelines, textile yardage, diaspora logistics, and client correspondence for Bolaji Abayomi Abraham.",
      timestamp: "Just now",
      suggestions: [
        "Summarize basting fittings this week",
        "Draft WhatsApp update for Chief Adeleke Coker",
        "Check Alaari silk damask inventory",
        "List diaspora shipments due for UK & US",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: "staff",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Intelligent studio response engine
    setTimeout(() => {
      let reply: CopilotMessage;
      const lower = query.toLowerCase();

      if (lower.includes("chief") || lower.includes("coker") || lower.includes("whatsapp")) {
        reply = {
          id: `r-${Date.now()}`,
          sender: "copilot",
          content:
            "I have retrieved Chief Adeleke Coker's dossier (Ref: AB-2026-8941). His Grand 3-Piece Agbada is currently at the basting stitch stage. Here is a curated WhatsApp update ready for Bolaji Abraham to send:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionSnippet: {
            type: "whatsapp",
            title: "WhatsApp Dispatch Draft (Chief Coker)",
            body: "Good afternoon, Chief Coker. Bolaji Abraham here from the Atelier. Your Alaari Silk Grand Agbada has completed hand-cutting and is now on the basting stage. We have your erect chieftaincy shoulder span (64 in) perfectly framed. When would suit you best for a 15-minute in-studio basting fitting at our Lagos flagship this Friday?",
          },
          suggestions: [
            "Advance Chief Coker to Production",
            "View Chief Coker's 28 anatomical measurements",
          ],
        };
      } else if (lower.includes("basting") || lower.includes("fitting") || lower.includes("week")) {
        reply = {
          id: `r-${Date.now()}`,
          sender: "copilot",
          content:
            "Active Pipeline Analysis: You have 3 urgent fittings scheduled for this fortnight:\n\n1. Chief Adeleke Coker — Grand Agbada (Basting Fitting due Nov 14)\n2. Dr. Oluwaseun Adeleke — Ceremonial Couple Set (London Video Consultation due Dec 05)\n3. Toluwani Banjo — Bespoke Double-Breasted Tuxedo (Atlanta Production Stage due Oct 28)",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: [
            "Export fitting schedule to Google Calendar",
            "Generate pre-fitting checklist for cutter",
          ],
        };
      } else if (lower.includes("alaari") || lower.includes("inventory") || lower.includes("silk") || lower.includes("fabric")) {
        reply = {
          id: `r-${Date.now()}`,
          sender: "copilot",
          content:
            "Textile Vault Audit (Lagos Cutting Rooms):\n\n• Imperial Alaari Damask Silk: 42 meters remaining (Reserved: 14m for Chief Coker & Senator Balogun)\n• Woven Aso Oke Heritage Sets: 18 bundles in stock\n• Huddersfield Super 160s Virgin Wool: 65 meters (Midnight Black & Imperial Navy)\n• Egyptian Giza 87 Cotton: 120 meters",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionSnippet: {
            type: "inventory",
            title: "Inventory Alert",
            body: "Alaari Silk Damask stock will dip below re-order threshold after next 2 bridal commissions. Supplier in Iseyin notified.",
          },
        };
      } else if (lower.includes("diaspora") || lower.includes("uk") || lower.includes("us") || lower.includes("shipping")) {
        reply = {
          id: `r-${Date.now()}`,
          sender: "copilot",
          content:
            "Diaspora Concierge Logistics:\n\n• London, UK: Dr. Oluwaseun Adeleke (Remote 28-point video fitting complete)\n• Atlanta, USA: Toluwani Banjo (DHL Express air waybill generated; transit time: 3 business days)\n• Toronto, Canada: Folake Alabi & Family (Inscriptions confirmed for December wedding)\n\nAll diaspora packages include emergency seam adjustments allowance (+2 inches internal basting).",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actionSnippet: {
            type: "commission",
            title: "DHL International Express Booking",
            body: "Lagos (LOS) -> Atlanta (ATL) AWB: 9482-1029-44. Insured value: $1,450 USD.",
          },
        };
      } else {
        reply = {
          id: `r-${Date.now()}`,
          sender: "copilot",
          content: `Understood, Master Tailor. Regarding "${query}": the studio records are synchronized across all 18 active commissions, the 28-point anatomical vault, and diaspora routes. How would you like me to proceed?`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: [
            "Summarize active commissions",
            "Draft WhatsApp message to client",
            "Check fabric yardage",
          ],
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full md:w-[480px] h-full md:h-[90vh] bg-brand-silk dark:bg-[#151210] text-brand-black dark:text-brand-white border-l md:border border-brand-gold/40 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-brand-black/10 dark:border-white/10 bg-brand-cream/60 dark:bg-[#1C1816] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-brand-gold">
              <AdinkraheneIcon size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-semibold tracking-wide">Atelier Studio Copilot</h3>
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-mono">
                  Staff AI
                </span>
              </div>
              <p className="text-[10px] opacity-60 font-mono">Management &amp; Master Cutter Assistant</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors text-brand-black/60 dark:text-white/60"
            title="Close Copilot"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-light">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "staff" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "copilot" && (
                <div className="w-7 h-7 bg-brand-gold/20 border border-brand-gold/40 flex-shrink-0 flex items-center justify-center text-brand-gold mt-1">
                  <Bot size={14} />
                </div>
              )}

              <div
                className={`max-w-[85%] space-y-2 p-3.5 leading-relaxed ${
                  msg.sender === "staff"
                    ? "bg-brand-crimson text-white rounded-lg shadow-sm"
                    : "bg-white dark:bg-[#1E1A17] border border-brand-black/10 dark:border-white/10 rounded-lg text-brand-black dark:text-brand-silk"
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Copilot Action Snippet (e.g. WhatsApp Draft, Courier Tracker) */}
                {msg.actionSnippet && (
                  <div className="mt-3 p-3 bg-brand-black/5 dark:bg-black/40 border border-brand-gold/30 rounded text-left space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono font-medium text-brand-gold">
                      <span className="flex items-center gap-1.5 uppercase">
                        {msg.actionSnippet.type === "whatsapp" && <MessageSquare size={12} className="text-[#25D366]" />}
                        {msg.actionSnippet.type === "inventory" && <Scissors size={12} />}
                        {msg.actionSnippet.type === "commission" && <Truck size={12} />}
                        {msg.actionSnippet.title}
                      </span>
                      <button
                        onClick={() => handleCopy(msg.actionSnippet!.body, msg.id)}
                        className="flex items-center gap-1 text-[10px] hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={12} className="text-brand-gold" />
                            <span className="text-brand-gold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] font-sans opacity-90 leading-relaxed italic bg-white/5 p-2 rounded border border-white/5">
                      "{msg.actionSnippet.body}"
                    </p>
                  </div>
                )}

                {/* Interactive Suggestion Chips */}
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

                <span className="block text-[9px] opacity-40 font-mono text-right mt-1">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === "staff" && (
                <div className="w-7 h-7 bg-brand-black/10 dark:bg-white/10 flex-shrink-0 flex items-center justify-center text-brand-black/70 dark:text-white/80 mt-1">
                  <User size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-brand-black/10 dark:border-white/10 bg-brand-cream/40 dark:bg-[#1A1614]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-white dark:bg-white/5 border border-brand-black/15 dark:border-white/15 px-3 py-2 rounded focus-within:border-brand-gold transition-colors"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot about commissions, yardage, clients..."
              className="flex-1 bg-transparent text-xs text-brand-black dark:text-white placeholder:text-brand-black/40 dark:placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-1.5 bg-brand-gold text-brand-onyx hover:bg-brand-cream disabled:opacity-30 transition-colors"
              title="Send to Copilot"
            >
              <Send size={13} />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[9px] text-brand-black/40 dark:text-white/40 font-mono">
            <span>Powered by Atelier Studio Intelligence</span>
            <span>Bolaji Abraham Key #0001</span>
          </div>
        </div>

      </div>
    </div>
  );
}
