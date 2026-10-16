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
import {
  Users,
  Briefcase,
  Package,
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
  Sparkles,
} from "lucide-react";

interface BespokeCommission {
  id: string;
  client: string;
  email: string;
  phone: string;
  location: string;
  occasion: string;
  silhouette: string;
  status: "Inscription" | "Consultation" | "Basting" | "Production" | "Delivered";
  dateNeeded: string;
  isDiaspora: boolean;
  garmentCount: number;
}

const mockCommissions: BespokeCommission[] = [
  {
    id: "AB-2026-8941",
    client: "Chief Adeleke Coker",
    email: "coker.a@lagosgroup.ng",
    phone: "+234 803 555 0192",
    location: "Ikoyi, Lagos",
    occasion: "Chieftaincy Installation",
    silhouette: "Grand 3-Piece Agbada (Alaari Silk)",
    status: "Basting",
    dateNeeded: "Nov 14, 2026",
    isDiaspora: false,
    garmentCount: 1,
  },
  {
    id: "AB-2026-7230",
    client: "Dr. Oluwaseun Adeleke",
    email: "o.adeleke@nhs.uk",
    phone: "+44 7911 123456",
    location: "London, UK",
    occasion: "Diaspora Traditional Wedding",
    silhouette: "Ceremonial Agbada & Bridal Couple",
    status: "Consultation",
    dateNeeded: "Dec 05, 2026",
    isDiaspora: true,
    garmentCount: 4,
  },
  {
    id: "AB-2026-6184",
    client: "Toluwani Banjo",
    email: "tbanjo@fintechcapital.com",
    phone: "+1 404 892 4410",
    location: "Atlanta, GA, USA",
    occasion: "Black-Tie Gala",
    silhouette: "Bespoke Double-Breasted Tuxedo",
    status: "Production",
    dateNeeded: "Oct 28, 2026",
    isDiaspora: true,
    garmentCount: 1,
  },
  {
    id: "AB-2026-5519",
    client: "Folake Alabi & Family",
    email: "folake.alabi@yahoo.ca",
    phone: "+1 416 332 9981",
    location: "Toronto, Canada",
    occasion: "Diaspora Entourage Celebration",
    silhouette: "Ceremonial Kaftan Suite",
    status: "Inscription",
    dateNeeded: "Dec 18, 2026",
    isDiaspora: true,
    garmentCount: 8,
  },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeTab, setActiveTab] = useState<"dashboard" | "bespoke" | "clients" | "corporate" | "heritage">("dashboard");
  const [selectedCommission, setSelectedCommission] = useState<BespokeCommission | null>(mockCommissions[0]);
  const [filterQuery, setFilterQuery] = useState("");
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check if user is already authenticated in this session
    const token = typeof window !== "undefined" ? localStorage.getItem("atelier_admin_token") : null;
    if (token === "authenticated_bolaji_2026") {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    const validUsers = ["abraham", "infoac0001@gmail.com", "bolaji", "admin"];
    const validPass = "Vault2026!";

    if (validUsers.includes(adminUser.trim().toLowerCase()) && adminPass === validPass) {
      if (typeof window !== "undefined") {
        localStorage.setItem("atelier_admin_token", "authenticated_bolaji_2026");
      }
      setIsAuthenticated(true);
    } else {
      setAuthError("Invalid credentials. Please verify your Master Tailor passkey.");
    }
    setIsSubmitting(false);
  };

  const handleAdminLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("atelier_admin_token");
    }
    setIsAuthenticated(false);
  };

  const filteredCommissions = mockCommissions.filter(
    (c) =>
      c.client.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(filterQuery.toLowerCase())
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
                  className="w-full py-3.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-luxury font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <PempamsieIcon size={14} className="text-brand-gold" />
                  <span>{isSubmitting ? "Verifying Credentials..." : "Authenticate & Enter Vault"}</span>
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

  return (
    <div className="min-h-screen bg-brand-silk dark:bg-brand-onyx text-brand-onyx dark:text-brand-silk flex flex-col font-sans transition-colors duration-500">
      {/* Dedicated Atelier Studio OS Topbar */}
      <header className="h-16 px-6 md:px-10 border-b border-brand-black/10 dark:border-white/10 bg-white/70 dark:bg-[#151210]/90 backdrop-blur-md flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <AdinkraheneIcon size={22} className="text-brand-crimson dark:text-brand-gold" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-semibold text-base tracking-wide">Abraham Collection</span>
              <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-brand-crimson/10 dark:bg-brand-gold/15 text-brand-crimson dark:text-brand-gold font-mono font-medium border border-brand-crimson/20 dark:border-brand-gold/30">
                Studio OS
              </span>
            </div>
            <p className="text-[9px] font-mono opacity-50 hidden sm:block">Lagos Cutting Rooms &bull; Bolaji Abayomi Abraham</p>
          </div>
        </div>

        {/* Administrative Utility Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
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
                <PempamsieIcon size={14} /> <span>Bespoke Registry</span>
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
                onClick={() => setActiveTab("heritage")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "heritage"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <AdeAreIcon size={14} /> <span>Heritage Archive</span>
              </button>
              <button
                onClick={() => setActiveTab("corporate")}
                className={`flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                  activeTab === "corporate"
                    ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                    : "hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <Briefcase size={14} /> <span>Corporate B2B</span>
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
            Bespoke
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-2.5 py-1.5 ${activeTab === "clients" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
          >
            Vault
          </button>
          <button
            onClick={() => setActiveTab("heritage")}
            className={`px-2.5 py-1.5 ${activeTab === "heritage" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
          >
            Heritage
          </button>
        </div>

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <header className="flex items-center justify-between pb-3 border-b border-brand-black/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Studio Overview</h2>
                <span className="w-1 h-1 bg-brand-gold rotate-45" />
                <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">25-Yr Lineage OS</span>
              </div>
              <p className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">0ms Latency &bull; Lagos Studio</p>
            </header>

            {/* Metric KPI Cards (Refined Proportions) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                  <span>Commissions</span>
                  <PempamsieIcon size={13} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">18</div>
                <span className="text-[9.5px] font-mono text-brand-gold">+4 this fortnight</span>
              </div>

              <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                  <span>Diaspora</span>
                  <SankofaDiasporaIcon size={13} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">7</div>
                <span className="text-[9.5px] font-mono opacity-60">UK &bull; US &bull; Canada</span>
              </div>

              <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                  <span>Fittings</span>
                  <IrukereIcon size={13} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">12</div>
                <span className="text-[9.5px] font-mono opacity-60">Scheduled Oct</span>
              </div>

              <div className="p-3.5 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02]">
                <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-[0.22em] opacity-60">
                  <span>Vault Profiles</span>
                  <OjuOyaIcon size={13} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-2xl font-light mt-1 mb-0.5 text-brand-black dark:text-brand-white">142</div>
                <span className="text-[9.5px] font-mono opacity-60">28-pt Anatomical</span>
              </div>
            </div>

            {/* Recent Registry (Clean Editorial Proportions) */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center pb-2 border-b border-brand-black/5 dark:border-white/5">
                <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-brand-black dark:text-brand-white">
                  Bespoke Registry
                </h3>
                <button
                  onClick={() => setActiveTab("bespoke")}
                  className="text-[9px] font-mono uppercase tracking-[0.2em] text-brand-crimson dark:text-brand-gold hover:underline"
                >
                  Full Registry &rarr;
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
                    {mockCommissions.map((comm) => (
                      <tr key={comm.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="py-2 px-3 font-mono text-[9.5px] font-semibold text-brand-crimson dark:text-brand-gold whitespace-nowrap">
                          {comm.id.replace("AB-2026-", "AB-")}
                        </td>
                        <td className="py-2 px-3 font-patron italic text-[14px] text-brand-black dark:text-brand-white whitespace-nowrap">
                          {comm.client}
                        </td>
                        <td className="py-2 px-3 font-light opacity-80 whitespace-nowrap text-[10.5px]">
                          {comm.silhouette}
                        </td>
                        <td className="py-2 px-3 font-light opacity-75 whitespace-nowrap text-[10.5px] flex items-center gap-1.5">
                          {comm.isDiaspora ? (
                            <SankofaDiasporaIcon size={11} className="text-brand-gold flex-shrink-0" />
                          ) : (
                            <MapPin size={10} className="opacity-50 flex-shrink-0" />
                          )}
                          <span>{comm.location}</span>
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
                          {comm.dateNeeded}
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
                        {item.id.replace("AB-2026-", "AB-")}
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
                    <h4 className="font-patron italic text-[15px] sm:text-base text-brand-black dark:text-brand-white">
                      {item.client}
                    </h4>
                    <p className="text-[11px] font-light opacity-80 mb-2 truncate">{item.silhouette}</p>
                    <div className="flex flex-wrap items-center gap-3 text-[9.5px] font-mono opacity-65">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} /> {item.dateNeeded}
                      </span>
                      <span className="flex items-center gap-1">
                        {item.isDiaspora ? <SankofaDiasporaIcon size={11} className="text-brand-gold" /> : <MapPin size={11} />}
                        {item.location}
                      </span>
                      <span>Pieces: {item.garmentCount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Inspection Card */}
              {selectedCommission && (
                <div className="p-4 border border-brand-gold/40 bg-brand-cream/30 dark:bg-white/[0.02] space-y-4 h-fit">
                  <div>
                    <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-brand-crimson dark:text-brand-gold font-medium">
                      Atelier Dossier
                    </span>
                    <h3 className="font-patron italic text-lg text-brand-black dark:text-brand-white mt-0.5">
                      {selectedCommission.client}
                    </h3>
                    <p className="font-mono text-[9.5px] opacity-60">{selectedCommission.id}</p>
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
                      <p className="font-medium mt-0.5">{selectedCommission.isDiaspora ? "Sankofa Diaspora Remote Video" : "Lagos Atelier In-Studio"}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-black/10 dark:border-white/10 space-y-2">
                    <span className="text-[9px] uppercase tracking-wider opacity-50 font-mono block">Advance Fitting Status</span>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-[9px] uppercase tracking-[0.16em] font-medium transition-colors">
                        Advance Stage
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

        {/* 3. CLIENT ANATOMICAL VAULT TAB */}
        {activeTab === "clients" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <header className="flex items-center justify-between pb-3 border-b border-brand-black/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium">Client Measurement Vault</h2>
                <span className="w-1 h-1 bg-brand-gold rotate-45" />
                <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Oju Oya Archive</span>
              </div>
              <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">28-Point Anatomical</span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "Chief Adeleke Coker",
                  city: "Ikoyi, Lagos",
                  measures: { chest: "44.5 in", waist: "38 in", shoulder: "19.5 in", agbada_span: "64 in", posture: "Erect / Chieftaincy Stance" },
                },
                {
                  name: "Dr. Oluwaseun Adeleke",
                  city: "London, UK",
                  measures: { chest: "41.0 in", waist: "34 in", shoulder: "18.0 in", agbada_span: "60 in", posture: "Square Shoulders" },
                },
              ].map((c, i) => (
                <div key={i} className="p-4 border border-brand-black/10 dark:border-white/10 bg-brand-cream/20 dark:bg-white/[0.02] space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-patron italic text-[16px] text-brand-black dark:text-brand-white">{c.name}</h4>
                      <p className="text-[10px] font-mono opacity-60 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {c.city}
                      </p>
                    </div>
                    <OjuOyaIcon size={16} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border-t border-brand-black/10 dark:border-white/10 pt-2.5">
                    <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5">
                      <span className="opacity-50 text-[8.5px] uppercase font-mono block">Chest</span>
                      <p className="font-mono text-xs font-medium text-brand-black dark:text-brand-white mt-0.5">{c.measures.chest}</p>
                    </div>
                    <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5">
                      <span className="opacity-50 text-[8.5px] uppercase font-mono block">Waist</span>
                      <p className="font-mono text-xs font-medium text-brand-black dark:text-brand-white mt-0.5">{c.measures.waist}</p>
                    </div>
                    <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5">
                      <span className="opacity-50 text-[8.5px] uppercase font-mono block">Shoulder</span>
                      <p className="font-mono text-xs font-medium text-brand-black dark:text-brand-white mt-0.5">{c.measures.shoulder}</p>
                    </div>
                    <div className="p-1.5 bg-black/[0.02] dark:bg-white/[0.02] border border-brand-black/5 dark:border-white/5">
                      <span className="opacity-50 text-[8.5px] uppercase font-mono block">Agbada Span</span>
                      <p className="font-mono text-xs font-medium text-brand-black dark:text-brand-white mt-0.5">{c.measures.agbada_span}</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono opacity-65 border-t border-dashed border-brand-black/10 dark:border-white/10 pt-2">
                    Stance Profile: <span className="text-brand-gold">{c.measures.posture}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. HERITAGE ARCHIVES & CORPORATE */}
        {(activeTab === "heritage" || activeTab === "corporate") && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <header className="flex items-center justify-between pb-3 border-b border-brand-black/10 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <h2 className="font-display text-lg uppercase tracking-[0.2em] font-medium capitalize">{activeTab} Archive</h2>
                <span className="w-1 h-1 bg-brand-gold rotate-45" />
                <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest hidden sm:inline">Institutional Registry</span>
              </div>
              <span className="text-[9px] font-mono text-brand-gold uppercase tracking-[0.2em]">Synchronized</span>
            </header>
            <div className="p-6 border border-brand-black/10 dark:border-white/10 text-center max-w-lg mx-auto space-y-3 bg-brand-cream/20 dark:bg-white/[0.02]">
              <AdinkraheneIcon size={24} className="text-brand-gold mx-auto" />
              <h3 className="font-patron italic text-lg text-brand-black dark:text-brand-white">Archival Access Verified</h3>
              <p className="text-[11px] font-light opacity-75 leading-relaxed">
                Records are synchronized with the 25-Year Lagos master archive. Institutional leads and Aso Oke loom registries are active.
              </p>
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
