"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PempamsieIcon,
  OjuOyaIcon,
  AdeAreIcon,
  AdinkraheneIcon,
  IrukereIcon,
  SankofaDiasporaIcon,
  AbereIcon,
  AsoOkeWeaveIcon,
} from "@/components/icons/BespokeIcons";
import { useTheme } from "next-themes";
import { AdminCopilotModal } from "@/components/admin/AdminCopilotModal";
import { AtelierDatabase } from "@/lib/services/database";
import {
  CommissionRecord,
  CorporateLeadRecord,
  NewsletterSubscriberRecord,
  PatronProfileRecord,
  OrderRecord,
  CommissionStatus,
} from "@/types/database.types";
import {
  Users,
  Briefcase,
  Package,
  ShoppingBag,
  LogOut,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldAlert,
  User,
  Lock,
  Sun,
  Moon,
  Bot,
  RefreshCw,
  Mail,
  Check,
  Download,
  Ruler,
  Phone,
  Scissors,
  FileSpreadsheet,
  Eye,
  X,
} from "lucide-react";


export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Studio OS Data State
  const [commissions, setCommissions] = useState<CommissionRecord[]>([]);
  const [corporateLeads, setCorporateLeads] = useState<CorporateLeadRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriberRecord[]>([]);
  const [patrons, setPatrons] = useState<PatronProfileRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [activeTab, setActiveTab] = useState<"dashboard" | "bespoke" | "orders" | "clients" | "corporate" | "subscribers">("dashboard");
  const [selectedCommission, setSelectedCommission] = useState<CommissionRecord | null>(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [clientSearchQuery, setClientSearchQuery] = useState("");
  const [clientCategory, setClientCategory] = useState<"all" | "complete" | "pending" | "diaspora" | "domestic">("all");
  const [inspectedPatron, setInspectedPatron] = useState<PatronProfileRecord | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const { theme, setTheme } = useTheme();

  const exportPatronsCSV = () => {
    if (patrons.length === 0) return;
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "City",
      "Country",
      "Member Tier",
      "Preferred Silhouette",
      "Chest (in)",
      "Waist (in)",
      "Shoulder Span (in)",
      "Sleeve (in)",
      "Trouser Outseam (in)",
      "Trouser Inseam (in)",
      "Agbada Span (in)",
      "Kaftan Length (in)",
      "Posture Notes",
      "Created At"
    ];

    const rows = patrons.map((p) => [
      `"${(p.full_name || '').replace(/"/g, '""')}"`,
      `"${p.email || ''}"`,
      `"${p.phone || ''}"`,
      `"${p.city || ''}"`,
      `"${p.country || ''}"`,
      `"${p.member_tier || ''}"`,
      `"${p.preferred_silhouette || ''}"`,
      p.chest_circ || '',
      p.waist_circ || '',
      p.shoulder_span || '',
      p.sleeve_length || '',
      p.trouser_length || '',
      p.trouser_inseam || '',
      p.agbada_wing_span || '',
      p.kaftan_shirt_length || '',
      `"${(p.posture_notes || '').replace(/"/g, '""')}"`,
      `"${p.created_at || ''}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `abraham_collection_patrons_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Session verification on mount
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("atelier_admin_token") : null;
    if (token === "authenticated_bolaji_2026") {
      setIsAuthenticated(true);
      loadStudioData();
    }
    setAuthChecked(true);
  }, []);

  // 2. Fetch live data from Supabase / database service
  const loadStudioData = async () => {
    setIsLoadingData(true);
    try {
      const [comms, corp, subs, profs, ords] = await Promise.all([
        AtelierDatabase.getCommissions(),
        AtelierDatabase.getCorporateLeads(),
        AtelierDatabase.getNewsletterSubscribers(),
        AtelierDatabase.getPatronProfiles(),
        AtelierDatabase.getOrders(),
      ]);

      setCommissions(comms);
      setCorporateLeads(corp);
      setSubscribers(subs);
      setPatrons(profs);
      setOrders(ords);

      if (comms.length > 0 && !selectedCommission) {
        setSelectedCommission(comms[0]);
      }
    } catch (err) {
      console.warn("Studio data loading fallback:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleUpdateOrderStatus = async (orderRef: string, newStatus: OrderRecord['status']) => {
    await AtelierDatabase.updateOrderStatus(orderRef, newStatus);
    setOrders((prev) =>
      prev.map((ord) => (ord.reference === orderRef ? { ...ord, status: newStatus } : ord))
    );
  };


  // 3. Secure Admin Authentication (Calls /api/admin/verify)
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: adminUser,
          passkey: adminPass,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("atelier_admin_token", data.token || "authenticated_bolaji_2026");
        }
        setIsAuthenticated(true);
        loadStudioData();
      } else {
        setAuthError(data.message || "Invalid credentials. Master Tailor passkey verification failed.");
      }
    } catch {
      // Offline fallback: allow master cutter credentials
      const validUsers = ["abraham", "infoac0001@gmail.com", "bolaji", "admin"];
      if (validUsers.includes(adminUser.trim().toLowerCase()) && (adminPass === "Vault2026!" || adminPass === "abraham2002" || adminPass === "abraham1999")) {
        if (typeof window !== "undefined") {

          localStorage.setItem("atelier_admin_token", "authenticated_bolaji_2026");
        }
        setIsAuthenticated(true);
        loadStudioData();
      } else {
        setAuthError("Authentication server unreachable and offline credentials failed.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("atelier_admin_token");
    }
    setIsAuthenticated(false);
  };

  // 4. Advance Bespoke Fitting Stage
  const handleAdvanceStage = async (commission: CommissionRecord) => {
    const stageProgression: CommissionStatus[] = ["Inscription", "Consultation", "Basting", "Production", "Delivered"];
    const currentIndex = stageProgression.indexOf(commission.status);
    if (currentIndex >= stageProgression.length - 1) return;

    const nextStage = stageProgression[currentIndex + 1];
    setStatusUpdating(true);

    try {
      await AtelierDatabase.updateCommissionStatus(
        commission.id,
        nextStage,
        `Status advanced to ${nextStage} by Master Tailor`
      );

      // Update state locally
      setCommissions((prev) =>
        prev.map((c) => (c.id === commission.id ? { ...c, status: nextStage } : c))
      );
      if (selectedCommission?.id === commission.id) {
        setSelectedCommission({ ...selectedCommission, status: nextStage });
      }
    } finally {
      setStatusUpdating(false);
    }
  };

  const filteredCommissions = commissions.filter(
    (c) =>
      c.client_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.reference_code.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.silhouette.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // If initial auth check not yet performed, render dark loading state
  if (!authChecked) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-silk dark:bg-brand-onyx">
        <div className="w-8 h-8 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
      </main>
    );
  }

  // If not authenticated, render the Custom Luxury Atelier Authentication Form (No raw browser popups)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-silk dark:bg-brand-onyx text-brand-onyx dark:text-brand-silk p-6 font-sans">
        <div className="w-full max-w-md p-[1.5px] rounded-2xl warm-glow-ring shadow-2xl overflow-hidden border border-brand-gold/40">
          <div className="bg-[#FCFAF7] dark:bg-[#0D0B0A] text-brand-black dark:text-brand-white p-8 sm:p-10 rounded-2xl relative">
            
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5 text-brand-gold">
              <AdinkraheneIcon size={240} />
            </div>

            <div className="relative z-10 space-y-6">
              {/* Ancestral Header */}
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-8 bg-brand-gold" />
                <div className="flex items-center gap-2 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-mono font-medium">
                  <AdinkraheneIcon size={12} className="text-brand-gold" />
                  <span>Atelier Studio OS &bull; Lagos</span>
                </div>
                <span className="h-[1px] flex-1 bg-brand-gold/25" />
              </div>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-wide">
                  Master Tailor Vault
                </h2>
                <p className="text-xs text-brand-black/70 dark:text-brand-silk/70 font-light mt-1.5 leading-relaxed">
                  Administrative authentication required to access bespoke commissions, diaspora dossiers, and client measurements.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-brand-crimson/15 border border-brand-crimson/30 text-brand-crimson dark:text-red-300 text-xs flex items-center gap-2">
                  <ShieldAlert size={14} className="flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1 font-mono">
                    Admin Identifier
                  </label>
                  <div className="flex items-center gap-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-lg px-3.5 py-2.5 focus-within:border-brand-gold transition-colors">
                    <User size={15} className="text-brand-gold flex-shrink-0" />
                    <input
                      type="text"
                      required
                      value={adminUser}
                      onChange={(e) => setAdminUser(e.target.value)}
                      placeholder="e.g. abraham or infoac0001@gmail.com"
                      className="w-full bg-transparent outline-none text-brand-black dark:text-white text-xs placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[10px] opacity-70 mb-1 font-mono">
                    Master Passkey
                  </label>
                  <div className="flex items-center gap-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/15 dark:border-white/15 rounded-lg px-3.5 py-2.5 focus-within:border-brand-gold transition-colors">
                    <Lock size={15} className="text-brand-gold flex-shrink-0" />
                    <input
                      type="password"
                      required
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="Enter passkey"
                      className="w-full bg-transparent outline-none text-brand-black dark:text-white text-xs placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-luxury font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg mt-2 disabled:opacity-50"
                >
                  <PempamsieIcon size={14} className="text-brand-gold" />
                  <span>{isSubmitting ? "Verifying with Server..." : "Authenticate & Enter Vault"}</span>
                </button>
              </form>

              <div className="pt-4 border-t border-brand-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-brand-black/50 dark:text-white/50">
                <Link href="/" className="hover:text-brand-crimson dark:hover:text-brand-gold transition-colors">
                  &larr; Return to Flagship Store
                </Link>
                <span className="font-mono text-[10px] text-brand-gold/70">Vault Protocol 2026</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Metrics calculations from live data
  const diasporaCount = commissions.filter((c) => c.is_diaspora).length;
  const bastingCount = commissions.filter((c) => c.status === "Basting").length;

  return (
    <div className="min-h-screen bg-brand-silk dark:bg-brand-onyx text-brand-onyx dark:text-brand-silk flex flex-col font-sans transition-colors duration-500">
      {/* Dedicated Atelier Studio OS Topbar */}
      <header className="h-16 px-6 md:px-10 border-b border-brand-black/10 dark:border-white/10 bg-white/70 dark:bg-[#151210]/90 backdrop-blur-md flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <AdinkraheneIcon size={22} className="text-brand-crimson dark:text-brand-gold" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-name text-lg font-medium tracking-wide">Abraham Collection</span>
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-brand-crimson/10 dark:bg-brand-gold/15 text-brand-crimson dark:text-brand-gold font-mono font-medium border border-brand-crimson/20 dark:border-brand-gold/30">
                Studio OS
              </span>
            </div>
            <p className="text-[9px] font-mono opacity-50 hidden sm:block">Lagos Cutting Rooms &bull; Bolaji Abayomi Abraham</p>
          </div>
        </div>

        {/* Administrative Utility Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Refresh Data */}
          <button
            onClick={loadStudioData}
            disabled={isLoadingData}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-brand-black/15 dark:border-white/15 text-[9px] uppercase tracking-wider hover:border-brand-gold transition-colors text-brand-black/70 dark:text-white/70 disabled:opacity-50"
            title="Refresh Live Data from Supabase"
          >
            <RefreshCw size={12} className={isLoadingData ? "animate-spin text-brand-gold" : ""} />
            <span className="hidden sm:inline">Sync Data</span>
          </button>

          {/* Atelier AI Copilot Trigger */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/40 text-brand-onyx dark:text-brand-gold text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-sm group"
            title="Open Atelier Studio AI Copilot"
          >
            <Bot size={14} className="text-brand-gold group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Atelier Copilot</span>
            <span className="w-1.5 h-1.5 bg-brand-gold" />
          </button>

          {/* Admin Theme Switcher */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-brand-black/15 dark:border-white/15 text-[9px] uppercase tracking-wider hover:border-brand-gold transition-colors text-brand-black/70 dark:text-white/70"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <Sun size={12} className="text-brand-gold" /> : <Moon size={12} className="text-brand-onyx" />}
            <span className="hidden md:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>

          {/* View Public Storefront */}
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border border-brand-black/10 dark:border-white/10 text-[9px] uppercase tracking-wider opacity-60 hover:opacity-100 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
            title="Preview Public Storefront in new tab"
          >
            <ExternalLink size={12} />
            <span>Storefront</span>
          </a>

          {/* Exit / Lock Vault */}
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-crimson/10 hover:bg-brand-crimson text-brand-crimson hover:text-white text-[9px] uppercase tracking-wider font-medium transition-colors"
            title="Lock Vault & Sign Out"
          >
            <LogOut size={12} />
            <span className="hidden sm:inline">Lock Vault</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <div className="flex flex-1 px-4 sm:px-6 md:px-10 py-6 sm:py-8">
        {/* Sidebar Navigation */}
        <aside className="w-56 flex-shrink-0 pr-6 border-r border-brand-black/10 dark:border-white/10 hidden lg:flex flex-col justify-between">
          <div>
            <nav className="flex flex-col gap-1.5 text-[10px] uppercase tracking-[0.18em] font-medium">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <Package size={14} /> <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("bespoke")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "bespoke"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <PempamsieIcon size={14} /> <span>Bespoke ({commissions.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "orders"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <ShoppingBag size={14} /> <span>Orders ({orders.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("clients")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "clients"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <OjuOyaIcon size={14} /> <span>Anatomical Vault</span>
              </button>
              <button
                onClick={() => setActiveTab("corporate")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "corporate"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <Briefcase size={14} /> <span>Corporate ({corporateLeads.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "subscribers"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <Mail size={14} /> <span>Newsletter ({subscribers.length})</span>
              </button>

              {/* Sidebar Copilot Action */}
              <button
                onClick={() => setIsCopilotOpen(true)}
                className="flex items-center gap-2.5 px-3 py-2 text-left transition-colors border border-brand-gold/30 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 mt-2 font-medium"
              >
                <Bot size={14} /> <span>Atelier Copilot</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-brand-black/10 dark:border-white/10 space-y-1.5">
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-2 p-2 w-full text-left text-[9.5px] tracking-luxury uppercase text-brand-crimson hover:opacity-80 transition-opacity"
            >
              <LogOut size={13} /> <span>Lock Vault</span>
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <section className="flex-1 pl-0 lg:pl-8">
          {/* Mobile Navigation Tabs */}
          <div className="lg:hidden flex overflow-x-auto gap-1.5 pb-3 mb-5 border-b border-brand-black/10 dark:border-white/10 text-[10px] uppercase tracking-luxury font-medium whitespace-nowrap">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-2.5 py-1.5 ${activeTab === "dashboard" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("bespoke")}
              className={`px-2.5 py-1.5 ${activeTab === "bespoke" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
            >
              Bespoke ({commissions.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-2.5 py-1.5 ${activeTab === "orders" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("clients")}
              className={`px-2.5 py-1.5 ${activeTab === "clients" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
            >
              Vault
            </button>
            <button
              onClick={() => setActiveTab("corporate")}
              className={`px-2.5 py-1.5 ${activeTab === "corporate" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
            >
              Corporate ({corporateLeads.length})
            </button>
            <button
              onClick={() => setActiveTab("subscribers")}
              className={`px-2.5 py-1.5 ${activeTab === "subscribers" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
            >
              Newsletter ({subscribers.length})
            </button>
          </div>


          {/* 1. DASHBOARD OVERVIEW TAB */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <header className="flex items-center justify-between pb-3 border-b border-brand-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Studio Overview</h2>
                  <span className="w-1 h-1 bg-brand-gold rotate-45" />
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Est. 2002 &bull; Atelier OS</span>
                </div>

                <p className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">0ms Latency &bull; Lagos Studio</p>
              </header>

              {/* Metric KPI Cards (Calculated directly from live database state) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                    <span>Commissions</span>
                    <PempamsieIcon size={13} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">
                    {commissions.length}
                  </div>
                  <span className="text-[9.5px] font-mono text-brand-gold">{bastingCount} in basting stage</span>
                </div>

                <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                    <span>Diaspora</span>
                    <SankofaDiasporaIcon size={13} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">
                    {diasporaCount}
                  </div>
                  <span className="text-[9.5px] font-mono opacity-60">UK &bull; US &bull; Canada</span>
                </div>

                <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                    <span>Orders</span>
                    <ShoppingBag size={13} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">
                    {orders.length}
                  </div>
                  <span className="text-[9.5px] font-mono text-brand-gold">
                    {orders.filter((o) => o.status === "completed").length} fulfilled / paid
                  </span>
                </div>

                <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                    <span>Corporate B2B</span>
                    <Briefcase size={13} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">
                    {corporateLeads.length}
                  </div>
                  <span className="text-[9.5px] font-mono opacity-60">Institutional Inquiries</span>
                </div>

                <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                    <span>Newsletter</span>
                    <Mail size={13} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">
                    {subscribers.length}
                  </div>
                  <span className="text-[9.5px] font-mono opacity-60">Active Subscribers</span>
                </div>

                <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                    <span>Patrons Vault</span>
                    <Users size={13} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">
                    {patrons.length}
                  </div>
                  <span className="text-[9.5px] font-mono text-brand-gold">
                    {patrons.filter((p) => p.chest_circ && p.waist_circ).length} measured (24-pt)
                  </span>
                </div>
              </div>

              {/* Patron Intelligence & Demographic Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02] rounded space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                    <span className="font-semibold text-brand-gold">Prestige Tiers</span>
                    <AdeAreIcon size={14} className="text-brand-gold" />
                  </div>
                  <div className="space-y-1.5 text-xs font-mono pt-1">
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Royal Benefactor (Tier 1)</span>
                      <span className="font-bold text-brand-gold">{patrons.filter((p) => p.member_tier === "Royal Benefactor").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Atelier Circle (Tier 2)</span>
                      <span className="font-bold">{patrons.filter((p) => p.member_tier === "Atelier Circle").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Guest Patron (Tier 3)</span>
                      <span className="font-bold opacity-70">{patrons.filter((p) => p.member_tier === "Guest Patron").length}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02] rounded space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                    <span className="font-semibold text-brand-gold">Geographic Distribution</span>
                    <MapPin size={14} className="text-brand-gold" />
                  </div>
                  <div className="space-y-1.5 text-xs font-mono pt-1">
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Lagos &amp; Nigeria Domestic</span>
                      <span className="font-bold">{patrons.filter((p) => !p.country || p.country.toLowerCase() === "nigeria" || p.country.toLowerCase() === "ng").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Transatlantic Diaspora (UK, US, CA)</span>
                      <span className="font-bold text-brand-gold">{patrons.filter((p) => p.country && p.country.toLowerCase() !== "nigeria" && p.country.toLowerCase() !== "ng").length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Diaspora Ratio</span>
                      <span className="font-bold font-mono">
                        {patrons.length > 0 ? Math.round((patrons.filter((p) => p.country && p.country.toLowerCase() !== "nigeria" && p.country.toLowerCase() !== "ng").length / patrons.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02] rounded space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                    <span className="font-semibold text-brand-gold">Sartorial Vault Health</span>
                    <Ruler size={14} className="text-brand-gold" />
                  </div>
                  <div className="space-y-1.5 text-xs font-mono pt-1">
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Vault Measurements Secured</span>
                      <span className="font-bold text-brand-gold">{patrons.filter((p) => p.chest_circ && p.waist_circ).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Pending Measurements</span>
                      <span className="font-bold opacity-60">{patrons.filter((p) => !p.chest_circ || !p.waist_circ).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Vault Completion Rate</span>
                      <span className="font-bold text-brand-gold">
                        {patrons.length > 0 ? Math.round((patrons.filter((p) => p.chest_circ && p.waist_circ).length / patrons.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>



              {/* Recent Registry Table */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center pb-2 border-b border-brand-black/5 dark:border-white/5">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-black dark:text-brand-white">
                    Live Bespoke Registry
                  </h3>
                  <button
                    onClick={() => setActiveTab("bespoke")}
                    className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-crimson dark:text-brand-gold hover:underline"
                  >
                    View All ({commissions.length}) &rarr;
                  </button>
                </div>

                <div className="border border-brand-black/10 dark:border-white/10 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-brand-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10 uppercase tracking-[0.22em] text-[8.5px] font-mono opacity-60">
                      <tr>
                        <th className="py-2 px-3 font-medium">Ref</th>
                        <th className="py-2 px-3 font-medium">Client</th>
                        <th className="py-2 px-3 font-medium">Silhouette</th>
                        <th className="py-2 px-3 font-medium">Destination</th>
                        <th className="py-2 px-3 font-medium">Stage</th>
                        <th className="py-2 px-3 font-medium text-right">Target Due</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-black/5 dark:divide-white/5 text-[11px]">
                      {commissions.slice(0, 5).map((comm) => (
                        <tr key={comm.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-2 px-3 font-mono text-[9.5px] font-semibold text-brand-crimson dark:text-brand-gold whitespace-nowrap">
                            {comm.reference_code}
                          </td>
                          <td className="py-2 px-3 font-name italic text-[15px] text-brand-black dark:text-brand-white whitespace-nowrap">
                            {comm.client_name}
                          </td>
                          <td className="py-2 px-3 font-light opacity-80 whitespace-nowrap text-[10.5px]">
                            {comm.silhouette}
                          </td>
                          <td className="py-2 px-3 font-light opacity-75 whitespace-nowrap text-[10.5px]">
                            <div className="flex items-center gap-1.5">
                              {comm.is_diaspora ? (
                                <SankofaDiasporaIcon size={11} className="text-brand-gold flex-shrink-0" />
                              ) : (
                                <MapPin size={10} className="opacity-50 flex-shrink-0" />
                              )}
                              <span>{comm.location}</span>
                            </div>
                          </td>
                          <td className="py-2 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 uppercase tracking-wider text-[8px] font-mono font-medium border ${
                                comm.status === "Basting"
                                  ? "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                                  : comm.status === "Production"
                                  ? "border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-300"
                                  : comm.status === "Consultation"
                                  ? "border-purple-500/40 bg-purple-500/10 text-purple-800 dark:text-purple-300"
                                  : "border-neutral-500/40 bg-neutral-500/10 text-neutral-800 dark:text-neutral-200"
                              }`}
                            >
                              {comm.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono text-[9.5px] opacity-60 text-right whitespace-nowrap">
                            {comm.date_needed || "Flexible"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. BESPOKE ORDERS TAB */}
          {activeTab === "bespoke" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Bespoke Registry</h2>
                  <span className="w-1 h-1 bg-brand-gold rotate-45" />
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Cutting Pipeline</span>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search size={13} className="absolute left-2.5 top-2.5 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Filter by ref, patron, city..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-brand-black/15 dark:border-white/15 bg-transparent text-[11px] outline-none focus:border-brand-gold"
                  />
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Order List */}
                <div className="lg:col-span-2 space-y-2.5">
                  {filteredCommissions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCommission(item)}
                      className={`p-3.5 border transition-all cursor-pointer ${
                        selectedCommission?.id === item.id
                          ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5 shadow-sm"
                          : "border-brand-black/10 dark:border-white/10 hover:border-brand-black/30 dark:hover:border-white/30 bg-brand-cream/10 dark:bg-white/[0.01]"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[9.5px] text-brand-crimson dark:text-brand-gold font-semibold">
                          {item.reference_code}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 uppercase tracking-wider text-[8px] font-mono font-medium border ${
                            item.status === "Basting"
                              ? "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                              : item.status === "Production"
                              ? "border-blue-500/40 bg-blue-500/10 text-blue-800 dark:text-blue-300"
                              : item.status === "Consultation"
                              ? "border-purple-500/40 bg-purple-500/10 text-purple-800 dark:text-purple-300"
                              : "border-neutral-500/40 bg-neutral-500/10 text-neutral-800 dark:text-neutral-200"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h4 className="font-name italic text-[16px] text-brand-black dark:text-brand-white">
                        {item.client_name}
                      </h4>
                      <p className="text-[11px] font-light opacity-80 mb-2 truncate">{item.silhouette}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[9.5px] font-mono opacity-65">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {item.date_needed || "Flexible"}
                        </span>
                        <span className="flex items-center gap-1">
                          {item.is_diaspora ? <SankofaDiasporaIcon size={11} className="text-brand-gold" /> : <MapPin size={11} />}
                          {item.location}
                        </span>
                        <span>Pieces: {item.garment_count}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detail Inspection Card with Stage Advancement */}
                {selectedCommission && (
                  <div className="p-4 border border-brand-gold/40 bg-brand-cream/30 dark:bg-white/[0.02] space-y-4 h-fit">
                    <div>
                      <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-brand-crimson dark:text-brand-gold font-medium">
                        Atelier Dossier
                      </span>
                      <h3 className="font-name italic text-lg text-brand-black dark:text-brand-white mt-0.5">
                        {selectedCommission.client_name}
                      </h3>
                      <p className="font-mono text-[9.5px] opacity-60">{selectedCommission.reference_code}</p>
                    </div>

                    <div className="space-y-2.5 text-[11px]">
                      <div>
                        <span className="opacity-50 block uppercase text-[9px] font-mono tracking-wider">Garment Silhouette</span>
                        <p className="font-medium mt-0.5">{selectedCommission.silhouette}</p>
                      </div>
                      <div>
                        <span className="opacity-50 block uppercase text-[9px] font-mono tracking-wider">Occasion</span>
                        <p className="font-medium mt-0.5">{selectedCommission.occasion}</p>
                      </div>
                      <div>
                        <span className="opacity-50 block uppercase text-[9px] font-mono tracking-wider">Client Contact</span>
                        <p className="font-light mt-0.5 font-mono text-[10.5px]">{selectedCommission.email}</p>
                        <p className="font-light font-mono text-[10.5px]">{selectedCommission.phone}</p>
                      </div>
                      <div>
                        <span className="opacity-50 block uppercase text-[9px] font-mono tracking-wider">Consultation Type</span>
                        <p className="font-medium mt-0.5">
                          {selectedCommission.is_diaspora ? "Sankofa Diaspora Remote Video" : "Lagos Atelier In-Studio"}
                        </p>
                      </div>
                      {selectedCommission.notes && (
                        <div>
                          <span className="opacity-50 block uppercase text-[9px] font-mono tracking-wider">Fabric & Stylistic Notes</span>
                          <p className="font-light mt-0.5 opacity-80 text-[10.5px] leading-relaxed">{selectedCommission.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-brand-black/10 dark:border-white/10 space-y-2">
                      <span className="text-[9px] uppercase tracking-wider opacity-50 font-mono block">Advance Fitting Status</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAdvanceStage(selectedCommission)}
                          disabled={statusUpdating || selectedCommission.status === "Delivered"}
                          className="flex-1 py-2 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-[9px] uppercase tracking-[0.16em] font-medium transition-colors disabled:opacity-50 shadow-sm"
                        >
                          {statusUpdating ? "Updating..." : selectedCommission.status === "Delivered" ? "Fully Delivered" : `Advance to Next Stage`}
                        </button>
                        <a
                          href={`https://wa.me/${selectedCommission.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 border border-brand-black/20 dark:border-white/20 text-[9px] uppercase tracking-[0.16em] font-medium hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. STOREFRONT & INSTANT ORDERS TAB */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Storefront & Instant Orders</h2>
                  <span className="w-1 h-1 bg-brand-gold rotate-45" />
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Transaction Vault</span>
                </div>
                <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">
                  {orders.length} {orders.length === 1 ? "Order" : "Orders"} Recorded
                </span>
              </header>

              {orders.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-brand-black/15 dark:border-white/15 space-y-3">
                  <ShoppingBag size={28} className="mx-auto text-brand-gold/60" />
                  <p className="text-xs uppercase tracking-wider font-mono opacity-70">No Instant Orders Yet Staged</p>
                  <p className="text-[11px] opacity-50 max-w-sm mx-auto font-light">
                    Storefront instant purchases from the Quick-Buy checkout and cart modal will appear here with live payment and fulfillment status.
                  </p>
                </div>
              ) : (
                <div className="border border-brand-black/10 dark:border-white/10 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-brand-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10 uppercase tracking-[0.22em] text-[8.5px] font-mono opacity-60">
                      <tr>
                        <th className="py-2.5 px-3 font-medium">Reference</th>
                        <th className="py-2.5 px-3 font-medium">Patron</th>
                        <th className="py-2.5 px-3 font-medium">Garments</th>
                        <th className="py-2.5 px-3 font-medium">Amount</th>
                        <th className="py-2.5 px-3 font-medium">Gateway</th>
                        <th className="py-2.5 px-3 font-medium">Status</th>
                        <th className="py-2.5 px-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-black/5 dark:divide-white/5 text-[11px]">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3 font-mono text-[9.5px] font-semibold text-brand-crimson dark:text-brand-gold whitespace-nowrap">
                            {ord.reference}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="font-name italic text-[15px] text-brand-black dark:text-brand-white block">
                              {ord.customer_name}
                            </span>
                            <span className="font-mono text-[9px] opacity-60 block">{ord.customer_email}</span>
                          </td>
                          <td className="py-3 px-3 text-[10.5px]">
                            {ord.items && ord.items.length > 0 ? (
                              <div className="space-y-0.5">
                                {ord.items.map((item, idx) => (
                                  <div key={idx} className="font-light">
                                    {item.name} <span className="opacity-60 text-[9px] font-mono">({item.size}) &times; {item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className="opacity-50 font-mono text-[9px]">Garment</span>
                            )}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap font-mono text-[10.5px]">
                            <div>₦{ord.amount_ngn?.toLocaleString() || "0"}</div>
                            <div className="text-[9px] opacity-60">${ord.amount_usd || "0"} USD</div>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="px-2 py-0.5 uppercase tracking-wider text-[8px] font-mono font-medium border border-brand-black/20 dark:border-white/20">
                              {ord.gateway}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 uppercase tracking-wider text-[8px] font-mono font-medium border ${
                                ord.status === "completed"
                                  ? "border-brand-gold/40 bg-brand-gold/10 text-brand-gold font-semibold"
                                  : ord.status === "pending"
                                  ? "border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300"
                                  : "border-brand-crimson/40 bg-brand-crimson/10 text-brand-crimson"
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap text-right">
                            <button
                              onClick={() =>
                                handleUpdateOrderStatus(
                                  ord.reference,
                                  ord.status === "completed" ? "pending" : "completed"
                                )
                              }
                              className="px-2.5 py-1 text-[8.5px] font-mono uppercase tracking-wider border border-brand-black/20 dark:border-white/20 hover:border-brand-gold transition-colors"
                            >
                              Mark {ord.status === "completed" ? "Pending" : "Fulfilled"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 4. PATRON INTELLIGENCE & ANATOMICAL VAULT TAB */}
          {activeTab === "clients" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brand-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Patron Intelligence &amp; Vault</h2>
                  <span className="w-1 h-1 bg-brand-gold rotate-45" />
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Anatomical Registry</span>
                </div>
                
                {/* Actions: CSV Export */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={exportPatronsCSV}
                    className="flex items-center gap-2 px-3 py-1.5 bg-brand-black/5 dark:bg-white/5 hover:bg-brand-gold/15 border border-brand-black/15 dark:border-white/15 hover:border-brand-gold text-brand-black dark:text-white text-[10px] uppercase font-mono tracking-wider rounded transition-all"
                    title="Export Patrons to CSV for Marketing & Records"
                  >
                    <Download size={13} className="text-brand-gold" />
                    <span>Export CSV ({patrons.length})</span>
                  </button>
                  <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">
                    {patrons.length} {patrons.length === 1 ? "Patron" : "Patrons"}
                  </span>
                </div>
              </header>

              {/* Patron Intelligence Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <span className="text-[8.5px] uppercase opacity-50 block tracking-widest">Total Patrons</span>
                  <div className="text-xl font-display font-light text-brand-black dark:text-brand-white mt-0.5">{patrons.length}</div>
                  <span className="text-[9px] text-brand-gold">100% cloud persistent</span>
                </div>

                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <span className="text-[8.5px] uppercase opacity-50 block tracking-widest">Vault Complete</span>
                  <div className="text-xl font-display font-light text-brand-black dark:text-brand-white mt-0.5">
                    {patrons.filter((p) => p.chest_circ && p.waist_circ).length}
                  </div>
                  <span className="text-[9px] text-brand-gold">
                    {patrons.length > 0 ? Math.round((patrons.filter((p) => p.chest_circ && p.waist_circ).length / patrons.length) * 100) : 0}% Measured
                  </span>
                </div>

                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <span className="text-[8.5px] uppercase opacity-50 block tracking-widest">Transatlantic Diaspora</span>
                  <div className="text-xl font-display font-light text-brand-black dark:text-brand-white mt-0.5">
                    {patrons.filter((p) => p.country && p.country.toLowerCase() !== "nigeria" && p.country.toLowerCase() !== "ng").length}
                  </div>
                  <span className="text-[9px] opacity-60">UK &bull; US &bull; Canada</span>
                </div>

                <div className="p-3 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                  <span className="text-[8.5px] uppercase opacity-50 block tracking-widest">Royal Benefactors</span>
                  <div className="text-xl font-display font-light text-brand-black dark:text-brand-white mt-0.5">
                    {patrons.filter((p) => p.member_tier === "Royal Benefactor").length}
                  </div>
                  <span className="text-[9px] text-brand-crimson dark:text-brand-gold font-semibold">Tier 1 Elite</span>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between pt-1">
                <div className="relative flex-1 max-w-md">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gold" />
                  <input
                    type="text"
                    value={clientSearchQuery}
                    onChange={(e) => setClientSearchQuery(e.target.value)}
                    placeholder="Search patrons by name, email, city, or silhouette..."
                    className="w-full pl-9 pr-3 py-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded-lg text-xs outline-none focus:border-brand-gold transition-colors text-brand-black dark:text-white placeholder:text-brand-black/40 dark:placeholder:text-white/30"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-[10px] uppercase font-mono tracking-wider whitespace-nowrap">
                  <button
                    onClick={() => setClientCategory("all")}
                    className={`px-2.5 py-1.5 rounded transition-all ${clientCategory === "all" ? "bg-brand-onyx text-white dark:bg-white dark:text-black font-bold" : "bg-brand-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"}`}
                  >
                    All ({patrons.length})
                  </button>
                  <button
                    onClick={() => setClientCategory("complete")}
                    className={`px-2.5 py-1.5 rounded transition-all ${clientCategory === "complete" ? "bg-brand-onyx text-white dark:bg-white dark:text-black font-bold" : "bg-brand-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"}`}
                  >
                    Vault Complete
                  </button>
                  <button
                    onClick={() => setClientCategory("pending")}
                    className={`px-2.5 py-1.5 rounded transition-all ${clientCategory === "pending" ? "bg-brand-onyx text-white dark:bg-white dark:text-black font-bold" : "bg-brand-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"}`}
                  >
                    Vault Pending
                  </button>
                  <button
                    onClick={() => setClientCategory("diaspora")}
                    className={`px-2.5 py-1.5 rounded transition-all ${clientCategory === "diaspora" ? "bg-brand-onyx text-white dark:bg-white dark:text-black font-bold" : "bg-brand-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"}`}
                  >
                    Diaspora
                  </button>
                  <button
                    onClick={() => setClientCategory("domestic")}
                    className={`px-2.5 py-1.5 rounded transition-all ${clientCategory === "domestic" ? "bg-brand-onyx text-white dark:bg-white dark:text-black font-bold" : "bg-brand-black/5 dark:bg-white/5 opacity-70 hover:opacity-100"}`}
                  >
                    Domestic (NG)
                  </button>
                </div>
              </div>

              {/* Patrons Card Grid */}
              {(() => {
                const filtered = patrons.filter((p) => {
                  const q = clientSearchQuery.toLowerCase();
                  const matches =
                    !q ||
                    p.full_name?.toLowerCase().includes(q) ||
                    p.email?.toLowerCase().includes(q) ||
                    p.city?.toLowerCase().includes(q) ||
                    p.country?.toLowerCase().includes(q) ||
                    p.preferred_silhouette?.toLowerCase().includes(q);

                  if (!matches) return false;
                  const isComplete = !!(p.chest_circ && p.waist_circ);
                  const isDiaspora = !!(p.country && p.country.toLowerCase() !== "nigeria" && p.country.toLowerCase() !== "ng");

                  if (clientCategory === "complete") return isComplete;
                  if (clientCategory === "pending") return !isComplete;
                  if (clientCategory === "diaspora") return isDiaspora;
                  if (clientCategory === "domestic") return !isDiaspora;
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-12 text-center border border-dashed border-brand-black/15 dark:border-white/15 space-y-2">
                      <Users size={24} className="mx-auto text-brand-gold/60" />
                      <p className="text-xs font-mono uppercase tracking-wider opacity-70">No Patrons Match Query</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((patron) => {
                      const isComplete = !!(patron.chest_circ && patron.waist_circ);
                      const isDiaspora = !!(patron.country && patron.country.toLowerCase() !== "nigeria" && patron.country.toLowerCase() !== "ng");

                      return (
                        <div
                          key={patron.id || patron.email}
                          className="p-4 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02] rounded-lg space-y-3 hover:border-brand-gold/50 transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            {/* Card Header */}
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center font-display font-semibold text-brand-gold text-sm flex-shrink-0">
                                  {patron.full_name ? patron.full_name.charAt(0).toUpperCase() : "P"}
                                </div>
                                <div>
                                  <h4 className="font-name italic text-[17px] text-brand-black dark:text-brand-white leading-tight">
                                    {patron.full_name || "Esteemed Patron"}
                                  </h4>
                                  <p className="text-[10px] font-mono opacity-60 flex items-center gap-1 mt-0.5">
                                    <Mail size={10} /> {patron.email}
                                  </p>
                                </div>
                              </div>

                              <div className="text-right flex-shrink-0 space-y-1">
                                <span className="text-[8.5px] uppercase tracking-wider px-2 py-0.5 border border-brand-gold/40 text-brand-gold font-mono font-medium block">
                                  {patron.member_tier}
                                </span>
                                <span
                                  className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded block ${
                                    isComplete
                                      ? "bg-brand-gold/15 text-brand-gold"
                                      : "bg-brand-black/5 dark:bg-white/5 opacity-50"
                                  }`}
                                >
                                  {isComplete ? "Vault Complete" : "Pending Vault"}
                                </span>
                              </div>
                            </div>

                            {/* Location & Preferred Silhouette */}
                            <div className="flex items-center gap-3 text-[10.5px] pt-1">
                              <span className="flex items-center gap-1 opacity-70">
                                <MapPin size={11} className="text-brand-gold" />
                                {patron.city || "Lagos"}, {patron.country || "Nigeria"}
                                {isDiaspora && <span className="text-[9px] font-mono text-brand-gold ml-1">[Diaspora]</span>}
                              </span>

                              {patron.preferred_silhouette && (
                                <span className="px-2 py-0.5 bg-brand-black/5 dark:bg-white/5 border border-brand-black/10 dark:border-white/10 rounded text-[9.5px] font-mono text-brand-gold capitalize">
                                  {patron.preferred_silhouette}
                                </span>
                              )}
                            </div>

                            {/* 4 Core Measurements Preview */}
                            <div className="grid grid-cols-4 gap-1.5 text-xs border-t border-brand-black/10 dark:border-white/10 pt-2 font-mono">
                              <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5 text-center">
                                <span className="opacity-50 text-[8px] uppercase block">Chest</span>
                                <p className="font-semibold text-xs mt-0.5 text-brand-gold">{patron.chest_circ ? `${patron.chest_circ}"` : "—"}</p>
                              </div>
                              <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5 text-center">
                                <span className="opacity-50 text-[8px] uppercase block">Waist</span>
                                <p className="font-semibold text-xs mt-0.5 text-brand-gold">{patron.waist_circ ? `${patron.waist_circ}"` : "—"}</p>
                              </div>
                              <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5 text-center">
                                <span className="opacity-50 text-[8px] uppercase block">Shoulder</span>
                                <p className="font-semibold text-xs mt-0.5 text-brand-gold">{patron.shoulder_span ? `${patron.shoulder_span}"` : "—"}</p>
                              </div>
                              <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5 text-center">
                                <span className="opacity-50 text-[8px] uppercase block">Trouser</span>
                                <p className="font-semibold text-xs mt-0.5 text-brand-gold">{patron.trouser_length ? `${patron.trouser_length}"` : "—"}</p>
                              </div>
                            </div>

                            {patron.posture_notes && (
                              <p className="text-[10px] font-mono opacity-65 border-t border-dashed border-brand-black/10 dark:border-white/10 pt-1.5">
                                Stance Profile: <span className="text-brand-gold">{patron.posture_notes}</span>
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2.5 flex items-center gap-2 border-t border-brand-black/10 dark:border-white/10 mt-1">
                            <button
                              onClick={() => setInspectedPatron(patron)}
                              className="flex-1 py-1.5 px-2 bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/40 text-brand-black dark:text-brand-gold text-[10px] uppercase font-mono tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 font-semibold"
                            >
                              <Eye size={12} />
                              <span>Inspect 24-Point Vault</span>
                            </button>

                            {patron.phone && (
                              <a
                                href={`https://wa.me/${patron.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(patron.full_name || 'Patron')}%2C%20this%20is%20the%20Master%20Cutter%20from%20Abraham%20Collection%20Atelier.`}
                                target="_blank"
                                rel="noreferrer"
                                className="py-1.5 px-2.5 border border-brand-black/15 dark:border-white/15 hover:border-brand-gold text-[10px] font-mono uppercase tracking-wider rounded transition-colors flex items-center gap-1 text-brand-gold"
                                title="WhatsApp Bespoke Consultation"
                              >
                                <Phone size={11} />
                                <span className="hidden sm:inline">WhatsApp</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Master Cutter 24-Point Anatomical Inspection Modal */}
              {inspectedPatron && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
                  <div className="bg-[#FCFAF7] dark:bg-brand-onyx text-brand-black dark:text-brand-white border border-brand-gold/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative warm-glow-ring flex flex-col max-h-[90vh]">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-brand-black/60 flex-shrink-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <Ruler size={18} className="text-brand-gold" />
                          <h3 className="font-name italic text-xl">{inspectedPatron.full_name || "Esteemed Patron"}</h3>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 border border-brand-gold/40 text-brand-gold font-mono font-medium">
                            {inspectedPatron.member_tier}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono opacity-60 mt-0.5">
                          {inspectedPatron.email} &bull; {inspectedPatron.city || "Lagos"}, {inspectedPatron.country || "Nigeria"}
                        </p>
                      </div>

                      <button
                        onClick={() => setInspectedPatron(null)}
                        className="p-1 rounded-full text-brand-black/50 dark:text-white/60 hover:text-brand-black dark:hover:text-white"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Coordinates Body (Scrollable) */}
                    <div className="overflow-y-auto p-6 space-y-5 text-xs font-mono">
                      {/* 1. Upper Body */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 border-b border-brand-black/10 dark:border-white/10 pb-1 text-brand-gold uppercase text-[10px] tracking-wider font-semibold">
                          <Scissors size={13} />
                          <span>Upper Anatomical Points (Inches)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { label: "Chest", val: inspectedPatron.chest_circ },
                            { label: "Stomach", val: inspectedPatron.stomach_circ },
                            { label: "Waist", val: inspectedPatron.waist_circ },
                            { label: "Hips", val: inspectedPatron.hip_circ },
                            { label: "Shoulder Span", val: inspectedPatron.shoulder_span },
                            { label: "Sleeve Length", val: inspectedPatron.sleeve_length },
                            { label: "Bicep", val: inspectedPatron.bicep_circ },
                            { label: "Wrist", val: inspectedPatron.wrist_circ },
                            { label: "Neck Collar", val: inspectedPatron.neck_circ },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/5 dark:border-white/5 rounded">
                              <span className="opacity-50 text-[8px] uppercase block">{item.label}</span>
                              <p className="font-semibold text-sm mt-0.5 text-brand-gold">{item.val ? `${item.val}"` : "—"}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Lower Body */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 border-b border-brand-black/10 dark:border-white/10 pb-1 text-brand-gold uppercase text-[10px] tracking-wider font-semibold">
                          <Scissors size={13} />
                          <span>Trouser &amp; Lower Body (Inches)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { label: "Trouser Waist", val: inspectedPatron.trouser_waist },
                            { label: "Outseam Length", val: inspectedPatron.trouser_length },
                            { label: "Inseam", val: inspectedPatron.trouser_inseam },
                            { label: "Thigh", val: inspectedPatron.thigh_circ },
                            { label: "Knee", val: inspectedPatron.knee_circ },
                            { label: "Ankle Hem", val: inspectedPatron.ankle_circ },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/5 dark:border-white/5 rounded">
                              <span className="opacity-50 text-[8px] uppercase block">{item.label}</span>
                              <p className="font-semibold text-sm mt-0.5 text-brand-gold">{item.val ? `${item.val}"` : "—"}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 3. African Regalia Silhouettes */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 border-b border-brand-black/10 dark:border-white/10 pb-1 text-brand-gold uppercase text-[10px] tracking-wider font-semibold">
                          <AdeAreIcon size={14} />
                          <span>Traditional Regalia Silhouettes (Inches)</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { label: "Agbada Drop", val: inspectedPatron.agbada_drop_length },
                            { label: "Agbada Wingspan", val: inspectedPatron.agbada_wing_span },
                            { label: "Kaftan Tunic Length", val: inspectedPatron.kaftan_shirt_length },
                          ].map((item, idx) => (
                            <div key={idx} className="p-2 bg-brand-black/5 dark:bg-white/5 border border-brand-black/5 dark:border-white/5 rounded">
                              <span className="opacity-50 text-[8px] uppercase block">{item.label}</span>
                              <p className="font-semibold text-sm mt-0.5 text-brand-gold">{item.val ? `${item.val}"` : "—"}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. Stance & Posture */}
                      {inspectedPatron.posture_notes && (
                        <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-lg space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block">
                            Master Cutter Stance Profile
                          </span>
                          <p className="text-xs font-sans text-brand-black dark:text-white leading-relaxed">
                            {inspectedPatron.posture_notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-brand-black/10 dark:border-white/10 bg-[#F5EFE6] dark:bg-brand-black/60 flex items-center justify-between gap-3 flex-shrink-0">
                      <span className="text-[9px] font-mono opacity-50">
                        Inscribed: {inspectedPatron.created_at ? new Date(inspectedPatron.created_at).toLocaleDateString() : "Active"}
                      </span>

                      <div className="flex items-center gap-2">
                        {inspectedPatron.phone && (
                          <a
                            href={`https://wa.me/${inspectedPatron.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inspectedPatron.full_name || 'Patron')}%2C%20this%20is%20Bolaji%20Abayomi%20Abraham%20regarding%20your%20bespoke%20measurement%20vault.`}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2 px-3 bg-brand-gold/20 hover:bg-brand-gold/30 border border-brand-gold/50 text-brand-black dark:text-brand-gold text-xs font-mono uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                          >
                            <Phone size={12} />
                            <span>Direct Tailor Line</span>
                          </a>
                        )}
                        <button
                          onClick={() => setInspectedPatron(null)}
                          className="py-2 px-4 bg-brand-black/10 dark:bg-white/10 hover:bg-brand-black/20 text-xs uppercase font-mono tracking-wider rounded transition-colors"
                        >
                          Close Vault
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}


          {/* 4. CORPORATE B2B LEADS TAB */}
          {activeTab === "corporate" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <header className="flex items-center justify-between pb-3 border-b border-brand-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Corporate & Institutional Leads</h2>
                  <span className="w-1 h-1 bg-brand-gold rotate-45" />
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">B2B Wardrobes</span>
                </div>
                <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">{corporateLeads.length} Inquiries</span>
              </header>

              <div className="space-y-3">
                {corporateLeads.map((lead) => (
                  <div key={lead.id} className="p-4 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-name italic text-lg text-brand-black dark:text-brand-white">{lead.company_name}</h4>
                        <p className="text-xs font-light opacity-80 mt-0.5">Contact: {lead.contact_person}</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 font-mono font-medium w-fit">
                        {lead.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border-t border-brand-black/10 dark:border-white/10 pt-2.5 font-mono">
                      <div>
                        <span className="opacity-50 text-[8.5px] uppercase block">Industry</span>
                        <p className="text-[11px] font-medium mt-0.5">{lead.industry || "General Enterprise"}</p>
                      </div>
                      <div>
                        <span className="opacity-50 text-[8.5px] uppercase block">Scale</span>
                        <p className="text-[11px] font-medium mt-0.5">{lead.employees_count || "N/A"}</p>
                      </div>
                      <div>
                        <span className="opacity-50 text-[8.5px] uppercase block">Estimated Qty</span>
                        <p className="text-[11px] font-medium mt-0.5">{lead.estimated_quantity ? `${lead.estimated_quantity} pieces` : "Flexible"}</p>
                      </div>
                      <div>
                        <span className="opacity-50 text-[8.5px] uppercase block">Delivery Due</span>
                        <p className="text-[11px] font-medium mt-0.5">{lead.required_date || "Open Timeline"}</p>
                      </div>
                    </div>

                    {lead.project_description && (
                      <p className="text-xs font-light opacity-75 border-t border-dashed border-brand-black/10 dark:border-white/10 pt-2 leading-relaxed">
                        {lead.project_description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs font-mono pt-1 text-brand-crimson dark:text-brand-gold">
                      <a href={`mailto:${lead.email}`} className="hover:underline flex items-center gap-1">
                        <Mail size={12} /> {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="hover:underline">
                        {lead.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. NEWSLETTER SUBSCRIBERS TAB */}
          {activeTab === "subscribers" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <header className="flex items-center justify-between pb-3 border-b border-brand-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Newsletter Subscribers</h2>
                  <span className="w-1 h-1 bg-brand-gold rotate-45" />
                  <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Atelier Circle</span>
                </div>
                <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">{subscribers.length} Members</span>
              </header>

              <div className="border border-brand-black/10 dark:border-white/10 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-brand-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10 uppercase tracking-[0.22em] text-[8.5px] font-mono opacity-60">
                    <tr>
                      <th className="py-2 px-3 font-medium">Subscriber Email</th>
                      <th className="py-2 px-3 font-medium">Acquisition Channel</th>
                      <th className="py-2 px-3 font-medium">Status</th>
                      <th className="py-2 px-3 font-medium text-right">Inscription Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-black/5 dark:divide-white/5 text-[11px] font-mono">
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="py-2 px-3 font-medium text-brand-black dark:text-brand-white">
                          {sub.email}
                        </td>
                        <td className="py-2 px-3 opacity-70">
                          {sub.source}
                        </td>
                        <td className="py-2 px-3">
                          <span className="inline-flex items-center gap-1 text-[9px] text-brand-gold">
                            <Check size={10} /> Active
                          </span>
                        </td>
                        <td className="py-2 px-3 opacity-60 text-right">
                          {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : "Recent"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Dedicated Atelier Management Copilot */}
      <AdminCopilotModal isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
}
