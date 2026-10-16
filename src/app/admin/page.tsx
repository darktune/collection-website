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
    <main className="flex min-h-screen bg-brand-silk dark:bg-brand-onyx text-brand-onyx dark:text-brand-silk pt-24 pb-16 px-6 md:px-12 font-sans transition-colors duration-500">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 pr-8 border-r border-brand-black/10 dark:border-white/10 hidden lg:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <AdinkraheneIcon size={22} className="text-brand-crimson dark:text-brand-gold" />
            <div>
              <h1 className="font-display text-xl leading-none">Atelier Studio</h1>
              <p className="text-[10px] tracking-ultra-wide uppercase opacity-60 mt-1">Abraham Admin</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2 text-xs uppercase tracking-luxury font-medium">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 p-3 text-left transition-colors ${
                activeTab === "dashboard"
                  ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Package size={15} /> Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab("bespoke")}
              className={`flex items-center gap-3 p-3 text-left transition-colors ${
                activeTab === "bespoke"
                  ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <PempamsieIcon size={15} /> Bespoke Inscriptions
            </button>
            <button
              onClick={() => setActiveTab("clients")}
              className={`flex items-center gap-3 p-3 text-left transition-colors ${
                activeTab === "clients"
                  ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <OjuOyaIcon size={15} /> Anatomical Vault
            </button>
            <button
              onClick={() => setActiveTab("heritage")}
              className={`flex items-center gap-3 p-3 text-left transition-colors ${
                activeTab === "heritage"
                  ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <AdeAreIcon size={15} /> Heritage Archives
            </button>
            <button
              onClick={() => setActiveTab("corporate")}
              className={`flex items-center gap-3 p-3 text-left transition-colors ${
                activeTab === "corporate"
                  ? "bg-brand-onyx text-brand-silk dark:bg-brand-silk dark:text-brand-onyx shadow-sm"
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Briefcase size={15} /> Corporate B2B
            </button>
          </nav>
        </div>

        <div className="pt-8 border-t border-brand-black/10 dark:border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 p-2.5 text-xs tracking-luxury uppercase text-brand-muted hover:text-brand-crimson dark:hover:text-brand-gold transition-colors"
          >
            <ExternalLink size={14} /> View Flagship Store
          </Link>
          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-2 p-2.5 w-full text-left text-xs tracking-luxury uppercase text-brand-crimson hover:opacity-80 transition-opacity"
          >
            <LogOut size={14} /> Exit Vault
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <section className="flex-1 pl-0 lg:pl-10">
        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 border-b border-brand-black/10 dark:border-white/10 text-xs uppercase tracking-luxury font-medium whitespace-nowrap">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-2 ${activeTab === "dashboard" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("bespoke")}
            className={`px-3 py-2 ${activeTab === "bespoke" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
          >
            Bespoke Orders
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={`px-3 py-2 ${activeTab === "clients" ? "bg-brand-onyx text-white dark:bg-white dark:text-black" : "bg-black/5 dark:bg-white/5"}`}
          >
            Client Vault
          </button>
        </div>

        {/* 1. DASHBOARD OVERVIEW TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-10 animate-in fade-in duration-300">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-1">
                  Atelier Status &bull; Lagos Studio
                </p>
                <h2 className="font-display text-4xl md:text-5xl">Executive Overview</h2>
              </div>
              <p className="text-xs font-mono opacity-60">SYSTEM STATUS: ALL REPOSITORIES ONLINE</p>
            </header>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] tracking-ultra-wide uppercase opacity-70">Active Commissions</span>
                  <PempamsieIcon size={18} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-4xl mb-1">18</div>
                <span className="text-[11px] text-green-700 dark:text-green-400 font-medium">+4 this fortnight</span>
              </div>

              <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] tracking-ultra-wide uppercase opacity-70">Diaspora Entourages</span>
                  <SankofaDiasporaIcon size={18} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-4xl mb-1">7</div>
                <span className="text-[11px] opacity-70">London &bull; Atlanta &bull; Toronto</span>
              </div>

              <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] tracking-ultra-wide uppercase opacity-70">In-Studio Fittings</span>
                  <IrukereIcon size={18} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-4xl mb-1">12</div>
                <span className="text-[11px] opacity-70">Scheduled for October</span>
              </div>

              <div className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] tracking-ultra-wide uppercase opacity-70">Vault Profiles</span>
                  <OjuOyaIcon size={18} className="text-brand-crimson dark:text-brand-gold" />
                </div>
                <div className="font-display text-4xl mb-1">142</div>
                <span className="text-[11px] opacity-70">Verified 28-point profiles</span>
              </div>
            </div>

            {/* Recent Inscription Pipeline */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-display text-2xl">Recent Bespoke Inscriptions</h3>
                <button onClick={() => setActiveTab("bespoke")} className="text-xs uppercase tracking-luxury text-brand-crimson dark:text-brand-gold hover:underline">
                  View Full Registry &rarr;
                </button>
              </div>

              <div className="border border-brand-black/10 dark:border-white/10 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-brand-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10 uppercase tracking-wider text-[10px] opacity-75">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Client</th>
                      <th className="p-4">Occasion & Silhouette</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-black/10 dark:divide-white/10">
                    {mockCommissions.map((comm) => (
                      <tr key={comm.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-medium text-brand-crimson dark:text-brand-gold">{comm.id}</td>
                        <td className="p-4 font-medium">{comm.client}</td>
                        <td className="p-4 font-light opacity-80">{comm.silhouette}</td>
                        <td className="p-4 font-light flex items-center gap-1.5">
                          {comm.isDiaspora ? <SankofaDiasporaIcon size={14} className="text-brand-gold flex-shrink-0" /> : <MapPin size={12} className="opacity-60 flex-shrink-0" />}
                          <span>{comm.location}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 uppercase tracking-wider text-[9px] font-semibold ${
                              comm.status === "Basting"
                                ? "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-300"
                                : comm.status === "Production"
                                ? "bg-blue-100 text-blue-900 dark:bg-blue-950/50 dark:text-blue-300"
                                : comm.status === "Consultation"
                                ? "bg-purple-100 text-purple-900 dark:bg-purple-950/50 dark:text-purple-300"
                                : "bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                            }`}
                          >
                            {comm.status}
                          </span>
                        </td>
                        <td className="p-4 font-light opacity-70">{comm.dateNeeded}</td>
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
          <div className="space-y-8 animate-in fade-in duration-300">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-1">
                  Master Cutting Pipeline
                </p>
                <h2 className="font-display text-4xl">Bespoke Inscriptions</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-3 text-brand-muted" />
                  <input
                    type="text"
                    placeholder="Search client, ID, city..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-brand-black/20 dark:border-white/20 bg-transparent text-xs outline-none focus:border-brand-crimson"
                  />
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order List */}
              <div className="lg:col-span-2 space-y-4">
                {filteredCommissions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCommission(item)}
                    className={`p-6 border transition-all cursor-pointer ${
                      selectedCommission?.id === item.id
                        ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/5 shadow-sm"
                        : "border-brand-black/10 dark:border-white/10 hover:border-brand-black/30 dark:hover:border-white/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-xs text-brand-crimson dark:text-brand-gold font-semibold">{item.id}</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-black/5 dark:bg-white/5">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-display text-xl mb-1">{item.client}</h4>
                    <p className="text-xs font-light opacity-75 mb-3">{item.silhouette}</p>
                    <div className="flex flex-wrap items-center gap-4 text-[11px] opacity-60">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {item.dateNeeded}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {item.location}
                      </span>
                      <span>Pieces: {item.garmentCount}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail Inspection Card */}
              {selectedCommission && (
                <div className="p-6 border-basting bg-brand-cream/40 dark:bg-brand-charcoal space-y-6">
                  <div>
                    <span className="text-[10px] tracking-ultra-wide uppercase text-brand-crimson dark:text-brand-gold font-medium">
                      Atelier Dossier
                    </span>
                    <h3 className="font-display text-2xl mt-1">{selectedCommission.client}</h3>
                    <p className="font-mono text-xs opacity-60">{selectedCommission.id}</p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-brand-muted block uppercase text-[10px] tracking-wider">Garment Silhouette</span>
                      <p className="font-medium mt-0.5">{selectedCommission.silhouette}</p>
                    </div>
                    <div>
                      <span className="text-brand-muted block uppercase text-[10px] tracking-wider">Occasion</span>
                      <p className="font-medium mt-0.5">{selectedCommission.occasion}</p>
                    </div>
                    <div>
                      <span className="text-brand-muted block uppercase text-[10px] tracking-wider">Client Contact</span>
                      <p className="font-light mt-0.5">{selectedCommission.email}</p>
                      <p className="font-light">{selectedCommission.phone}</p>
                    </div>
                    <div>
                      <span className="text-brand-muted block uppercase text-[10px] tracking-wider">Consultation Type</span>
                      <p className="font-medium mt-0.5">{selectedCommission.isDiaspora ? "Sankofa Diaspora Remote Video" : "Lagos Atelier In-Studio"}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-brand-black/10 dark:border-white/10 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted block">Advance Fitting Status</span>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-brand-crimson text-white text-[10px] uppercase tracking-luxury font-medium hover:bg-brand-burgundy-light transition-colors">
                        Advance Stage
                      </button>
                      <button className="px-4 py-2 border border-brand-black/20 dark:border-white/20 text-[10px] uppercase tracking-luxury font-medium hover:bg-black/5">
                        WhatsApp Lead
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. CLIENT ANATOMICAL VAULT TAB */}
        {activeTab === "clients" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header>
              <p className="text-xs uppercase tracking-ultra-wide text-brand-crimson dark:text-brand-gold font-medium mb-1">
                Oju Oya Proportional Archive
              </p>
              <h2 className="font-display text-4xl">Client Measurement Vault</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div key={i} className="p-6 border border-brand-black/10 dark:border-white/10 bg-brand-cream/30 dark:bg-white/[0.02] space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display text-2xl">{c.name}</h4>
                      <p className="text-xs opacity-60 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> {c.city}
                      </p>
                    </div>
                    <OjuOyaIcon size={20} className="text-brand-crimson dark:text-brand-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs border-t border-brand-black/10 dark:border-white/10 pt-3">
                    <div>
                      <span className="opacity-60 text-[10px] uppercase">Chest</span>
                      <p className="font-mono font-medium">{c.measures.chest}</p>
                    </div>
                    <div>
                      <span className="opacity-60 text-[10px] uppercase">Waist</span>
                      <p className="font-mono font-medium">{c.measures.waist}</p>
                    </div>
                    <div>
                      <span className="opacity-60 text-[10px] uppercase">Shoulder Breadth</span>
                      <p className="font-mono font-medium">{c.measures.shoulder}</p>
                    </div>
                    <div>
                      <span className="opacity-60 text-[10px] uppercase">Agbada Wing Span</span>
                      <p className="font-mono font-medium">{c.measures.agbada_span}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-muted font-light border-t border-dashed border-brand-black/10 dark:border-white/10 pt-2">
                    Stance Profile: {c.measures.posture}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. HERITAGE ARCHIVES & CORPORATE */}
        {(activeTab === "heritage" || activeTab === "corporate") && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <header>
              <h2 className="font-display text-4xl capitalize">{activeTab} Management</h2>
              <p className="text-xs font-light opacity-70 mt-1">Manage institutional contracts and heritage textile records.</p>
            </header>
            <div className="p-8 border border-brand-black/10 dark:border-white/10 text-center max-w-xl mx-auto space-y-4">
              <AdinkraheneIcon size={32} className="text-brand-gold mx-auto" />
              <h3 className="font-display text-2xl">Archival Access Verified</h3>
              <p className="text-xs font-light opacity-80 leading-relaxed">
                Records are synchronized with the 25-Year Lagos master archive. Institutional leads and Aso Oke loom registries are active.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
