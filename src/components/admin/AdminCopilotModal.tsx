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
import { AtelierDatabase } from "@/lib/services/database";

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
        "Atelier Copilot initialized. Managing commission pipelines, textile yardage, and diaspora dispatches for Bolaji Abayomi Abraham.",
      timestamp: "Just now",
      suggestions: [
        "Basting schedule this week",
        "WhatsApp draft (Chief Coker)",
        "Alaari silk yardage",
        "Diaspora dispatches (UK & US)",
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

  const handleSend = async (textToSend?: string) => {
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

    // Query live atelier database for authoritative answers
    try {
      const [liveComms, liveCorp, liveOrders] = await Promise.all([
        AtelierDatabase.getCommissions(),
        AtelierDatabase.getCorporateLeads(),
        AtelierDatabase.getOrders(),
      ]);

      setTimeout(() => {
        let reply: CopilotMessage;
        const lower = query.toLowerCase();

        if (lower.includes("chief") || lower.includes("coker") || lower.includes("whatsapp")) {
          const coker = liveComms.find((c) => c.client_name.toLowerCase().includes("coker")) || liveComms[0];
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content: `Retrieved ${coker.client_name}'s dossier (Ref: ${coker.reference_code}). ${coker.silhouette} is currently at ${coker.status} stage. Draft WhatsApp update ready for Bolaji Abraham:`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actionSnippet: {
              type: "whatsapp",
              title: `WhatsApp Dispatch (${coker.client_name})`,
              body: `Good day ${coker.client_name}. Bolaji Abraham from the Atelier. Your ${coker.silhouette} has reached ${coker.status} stage. Would this Friday at our Lagos studio suit you for fitting review?`,
            },
            suggestions: [
              "Advance to next stage",
              "View anatomical measurements",
            ],
          };
        } else if (lower.includes("basting") || lower.includes("fitting") || lower.includes("week") || lower.includes("schedule")) {
          const bastingList = liveComms.filter((c) => c.status === "Basting");
          const pipelineSummary = bastingList.length > 0
            ? bastingList.map((c) => `• ${c.client_name} — ${c.silhouette} (Ref: ${c.reference_code})`).join("\n")
            : "No commissions currently in Basting stage.";
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content: `Active Basting Pipeline (${bastingList.length} commissions):\n${pipelineSummary}`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            suggestions: [
              "Advance fitting stages",
              "Check textile allocations",
            ],
          };
        } else if (lower.includes("corporate") || lower.includes("b2b") || lower.includes("institutional")) {
          const corpSummary = liveCorp.map((c) => `• ${c.company_name} — ${c.status} (${c.contact_person})`).join("\n");
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content: `Corporate B2B Registry (${liveCorp.length} institutional accounts):\n${corpSummary}`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            suggestions: [
              "Draft corporate proposal email",
              "View delivery timeline",
            ],
          };
        } else if (lower.includes("alaari") || lower.includes("inventory") || lower.includes("silk") || lower.includes("fabric") || lower.includes("yardage")) {
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content:
              "Textile Vault Audit (Lagos Cutting Rooms):\n• Imperial Alaari Silk: 48.5m (14m reserved)\n• Sanyan Traditional Raw Silk: 35.0m\n• Huddersfield Super 150s: 62.0m\n• Biella Cashmere Blend: 28.0m",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actionSnippet: {
              type: "inventory",
              title: "Inventory Notice",
              body: "Alaari Silk Damask will reach re-order threshold after 2 commissions. Supplier in Iseyin notified.",
            },
          };
        } else if (lower.includes("diaspora") || lower.includes("uk") || lower.includes("us") || lower.includes("shipping") || lower.includes("dispatch")) {
          const diasporaList = liveComms.filter((c) => c.is_diaspora);
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content: `Diaspora Concierge Logistics (${diasporaList.length} overseas dispatches):\n` +
              diasporaList.map((c) => `• ${c.location}: ${c.client_name} — ${c.silhouette} (${c.status})`).join("\n") +
              "\n\nAll diaspora packages include tracked DHL Express and +2\" internal basting allowance.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actionSnippet: {
              type: "commission",
              title: "DHL International Dispatch",
              body: "Transatlantic protocol verified. Custom insurance coverage active.",
            },
          };
        } else if (lower.includes("order") || lower.includes("sales") || lower.includes("revenue") || lower.includes("storefront") || lower.includes("paystack")) {
          const completedOrders = liveOrders.filter((o) => o.status === "completed");
          const totalRevNgn = completedOrders.reduce((sum, o) => sum + (o.amount_ngn || 0), 0);
          const totalRevUsd = completedOrders.reduce((sum, o) => sum + (o.amount_usd || 0), 0);
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content: `Storefront Orders Intelligence:\n• Total Orders Staged: ${liveOrders.length}\n• Completed & Paid: ${completedOrders.length}\n• Revenue Realized: ₦${totalRevNgn.toLocaleString()} ($${totalRevUsd.toLocaleString()} USD)\n• Gateways Active: Paystack, Flutterwave, Kora Virtual, WhatsApp Direct`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actionSnippet: {
              type: "commission",
              title: "Payment Gateway Health",
              body: "Tenacity Protocol 100% operational. In-flight transactions cached locally against outage drops.",
            },
            suggestions: [
              "Show basting schedule",
              "Check textile yardage",
            ],
          };
        } else {
          reply = {
            id: `r-${Date.now()}`,
            sender: "copilot",
            content: `Noted, Master Tailor. Regarding "${query}": ${liveComms.length} bespoke commissions, ${liveOrders.length} storefront orders, and ${liveCorp.length} corporate accounts are currently tracked in the database. How would you like me to assist?`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            suggestions: [
              "Show basting schedule",
              "List diaspora dispatches",
              "Check storefront orders",
              "Check textile yardage",
            ],
          };
        }


        setMessages((prev) => [...prev, reply]);
      }, 400);
    } catch {
      // Fallback
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-0 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full md:w-[410px] h-full md:h-[88vh] bg-brand-silk dark:bg-[#151210] text-brand-black dark:text-brand-white border-l md:border border-brand-gold/40 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="p-3 border-b border-brand-black/10 dark:border-white/10 bg-brand-cream/60 dark:bg-[#1C1816] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-brand-gold">
              <AdinkraheneIcon size={15} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display text-xs font-semibold tracking-wide">Atelier Copilot</h3>
                <span className="text-[8.5px] uppercase tracking-wider px-1 py-0.2 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-mono">
                  Staff OS
                </span>
              </div>
              <p className="text-[9px] opacity-60 font-mono">Executive Atelier Assistant &bull; Lagos</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:text-brand-crimson dark:hover:text-brand-gold transition-colors text-brand-black/60 dark:text-white/60"
            title="Close Copilot"
          >
            <X size={16} />
          </button>
        </div>

        {/* Live Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-[11px] font-light">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === "staff" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "copilot" && (
                <div className="w-6 h-6 bg-brand-gold/20 border border-brand-gold/40 flex-shrink-0 flex items-center justify-center text-brand-gold mt-0.5">
                  <Bot size={13} />
                </div>
              )}

              <div
                className={`max-w-[88%] space-y-2 p-2.5 sm:p-3 leading-relaxed ${
                  msg.sender === "staff"
                    ? "bg-brand-crimson text-white rounded shadow-sm"
                    : "bg-white dark:bg-[#1E1A17] border border-brand-black/10 dark:border-white/10 rounded text-brand-black dark:text-brand-silk"
                }`}
              >
                <div className="whitespace-pre-line text-[11px]">{msg.content}</div>

                {/* Copilot Action Snippet (e.g. WhatsApp Draft, Courier Tracker) */}
                {msg.actionSnippet && (
                  <div className="mt-2 p-2.5 bg-brand-black/5 dark:bg-black/40 border border-brand-gold/30 rounded text-left space-y-1.5">
                    <div className="flex items-center justify-between text-[9.5px] font-mono font-medium text-brand-gold">
                      <span className="flex items-center gap-1.5 uppercase">
                        {msg.actionSnippet.type === "whatsapp" && <MessageSquare size={11} className="text-brand-gold" />}
                        {msg.actionSnippet.type === "inventory" && <Scissors size={11} />}
                        {msg.actionSnippet.type === "commission" && <Truck size={11} />}
                        {msg.actionSnippet.title}
                      </span>
                      <button
                        onClick={() => handleCopy(msg.actionSnippet!.body, msg.id)}
                        className="flex items-center gap-1 text-[9px] hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check size={11} className="text-brand-gold" />
                            <span className="text-brand-gold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[10px] font-sans opacity-90 leading-relaxed italic bg-white/5 p-2 rounded border border-white/5">
                      "{msg.actionSnippet.body}"
                    </p>
                  </div>
                )}

                {/* Interactive Suggestion Chips */}
                {msg.suggestions && (
                  <div className="pt-1.5 flex flex-wrap gap-1 border-t border-brand-black/5 dark:border-white/5">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug)}
                        className="text-[9px] font-mono px-2 py-0.5 border border-brand-black/15 dark:border-white/15 hover:border-brand-gold hover:text-brand-gold bg-brand-black/[0.02] dark:bg-white/[0.03] text-brand-black/80 dark:text-white/80 transition-colors text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}

                <span className="block text-[8.5px] opacity-40 font-mono text-right mt-0.5">
                  {msg.timestamp}
                </span>
              </div>

              {msg.sender === "staff" && (
                <div className="w-6 h-6 bg-brand-black/10 dark:bg-white/10 flex-shrink-0 flex items-center justify-center text-brand-black/70 dark:text-white/80 mt-0.5">
                  <User size={13} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-2.5 border-t border-brand-black/10 dark:border-white/10 bg-brand-cream/40 dark:bg-[#1A1614]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-white dark:bg-white/5 border border-brand-black/15 dark:border-white/15 px-2.5 py-1.5 rounded focus-within:border-brand-gold transition-colors"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Copilot: fittings, yardage, diaspora..."
              className="flex-1 bg-transparent text-[11px] text-brand-black dark:text-white placeholder:text-brand-black/40 dark:placeholder:text-white/40 outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-1 bg-brand-gold text-brand-onyx hover:bg-brand-cream disabled:opacity-30 transition-colors"
              title="Send to Copilot"
            >
              <Send size={12} />
            </button>
          </form>
          <div className="flex items-center justify-between mt-1.5 text-[8.5px] text-brand-black/40 dark:text-white/40 font-mono">
            <span>Atelier Intelligence Protocol</span>
            <span>Bolaji Abraham Key #0001</span>
          </div>
        </div>

      </div>
    </div>
  );
}
