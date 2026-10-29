"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ArrowRight,
  UserPlus,
  Layers,
  Ruler,
} from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon, IrukereIcon } from "@/components/icons/BespokeIcons";
import { AtelierDatabase } from "@/lib/services/database";

interface EntourageMember {
  name: string;
  role: string;
  phone: string;
  chest: string;
  waist: string;
  shoulder: string;
  sleeve: string;
  trouserLength: string;
  submittedAt: string;
}

interface EntourageGroup {
  code: string;
  eventTitle: string;
  celebrantName: string;
  celebrantPhone: string;
  eventDate: string;
  destination: string;
  silhouette: string;
  cloth: string;
  targetCount: number;
  members: EntourageMember[];
}

const STORAGE_ENTOURAGE = "abraham_entourage_roster";

const SAMPLE_GROUP: EntourageGroup = {
  code: "ENT-2026-ADELEKE",
  eventTitle: "Adeleke & Folashade Traditional Wedding",
  celebrantName: "Dr. Oluwaseun Adeleke",
  celebrantPhone: "+44 7911 123456",
  eventDate: "2026-12-05",
  destination: "Victoria Island, Lagos",
  silhouette: "Grand 3-Piece Agbada Suite",
  cloth: "Alaari Royal Silk Aso Oke",
  targetCount: 6,
  members: [
    {
      name: "Tunde Bakare",
      role: "Best Man",
      phone: "+234 803 111 2233",
      chest: "42",
      waist: "34",
      shoulder: "19",
      sleeve: "26",
      trouserLength: "42",
      submittedAt: "2026-10-18T14:20:00Z",
    },
    {
      name: "Chukwudi Eze",
      role: "Groomsman",
      phone: "+44 7890 123456",
      chest: "44",
      waist: "36",
      shoulder: "20",
      sleeve: "26.5",
      trouserLength: "43",
      submittedAt: "2026-10-19T09:15:00Z",
    },
    {
      name: "Dr. Kolawole Davies",
      role: "Groomsman",
      phone: "+1 832 555 0199",
      chest: "40",
      waist: "32",
      shoulder: "18.5",
      sleeve: "25",
      trouserLength: "41",
      submittedAt: "2026-10-20T16:45:00Z",
    },
  ],
};

function GroupWardrobeInner() {
  const searchParams = useSearchParams();
  const urlCode = searchParams.get("code");

  const [activeTab, setActiveTab] = useState<"initiate" | "join" | "roster">(
    urlCode ? "join" : "roster"
  );
  const [currentGroup, setCurrentGroup] = useState<EntourageGroup>(SAMPLE_GROUP);
  const [copied, setCopied] = useState(false);

  // Form states for initiating
  const [eventTitle, setEventTitle] = useState("");
  const [celebrantName, setCelebrantName] = useState("");
  const [celebrantPhone, setCelebrantPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [destination, setDestination] = useState("Lagos, Nigeria");
  const [silhouette, setSilhouette] = useState("Grand 3-Piece Agbada");
  const [cloth, setCloth] = useState("Alaari Royal Silk Aso Oke");
  const [targetCount, setTargetCount] = useState(6);

  // Form states for member joining
  const [joinCode, setJoinCode] = useState(urlCode || "ENT-2026-ADELEKE");
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("Groomsman");
  const [memberPhone, setMemberPhone] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [trouserLength, setTrouserLength] = useState("");
  const [memberSubmitted, setMemberSubmitted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ENTOURAGE);
      if (saved) {
        setCurrentGroup(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const handleInitiate = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = `ENT-${new Date().getFullYear()}-${celebrantName
      .trim()
      .split(" ")
      .pop()
      ?.toUpperCase() || "PATRON"}`;

    const newGroup: EntourageGroup = {
      code: generatedCode,
      eventTitle: eventTitle || "Bespoke Entourage Wardrobe",
      celebrantName,
      celebrantPhone,
      eventDate,
      destination,
      silhouette,
      cloth,
      targetCount: Number(targetCount) || 6,
      members: [],
    };

    setCurrentGroup(newGroup);
    try {
      localStorage.setItem(STORAGE_ENTOURAGE, JSON.stringify(newGroup));
    } catch {}
    setActiveTab("roster");
  };

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: EntourageMember = {
      name: memberName,
      role: memberRole,
      phone: memberPhone,
      chest,
      waist,
      shoulder,
      sleeve,
      trouserLength,
      submittedAt: new Date().toISOString(),
    };

    const updated = {
      ...currentGroup,
      members: [...currentGroup.members, newMember],
    };

    setCurrentGroup(updated);
    try {
      localStorage.setItem(STORAGE_ENTOURAGE, JSON.stringify(updated));
    } catch {}
    setMemberSubmitted(true);
  };

  const copyShareLink = () => {
    const link = `${window.location.origin}/bespoke/group?code=${currentGroup.code}`;
    navigator.clipboard.writeText(
      `Hello! You have been invited to enter your measurements for the ${currentGroup.eventTitle} with Abraham Collection.\n\nEnter your measurements here:\n${link}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <main className="min-h-screen pt-28 pb-32 px-4 sm:px-8 md:px-12 lg:px-16 max-w-5xl mx-auto font-sans">
      {/* Masthead */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-mono font-medium mb-4">
          <AdinkraheneIcon size={12} />
          <span>Group Ceremonial Protocol &bull; Est. 2002</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-brand-black dark:text-brand-white mb-3">
          Entourage &amp; Wedding Party Portal
        </h1>
        <p className="text-xs sm:text-sm font-light text-brand-black/70 dark:text-brand-silk/75 max-w-2xl mx-auto leading-relaxed">
          Coordinating bespoke ceremonial attire for groomsmen, chieftaincy councils, and bridal entourages. Generate a private group dossier and invite members to record their individual measurements.
        </p>

        {/* Tab Navigator */}
        <div className="mt-8 inline-flex border border-brand-black/15 dark:border-white/15 bg-brand-black/5 dark:bg-white/5 p-1 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("roster")}
            className={`px-4 py-2 transition-all ${
              activeTab === "roster"
                ? "bg-brand-gold text-brand-onyx font-bold shadow-sm"
                : "text-brand-black/70 dark:text-white/70 hover:text-brand-gold"
            }`}
          >
            Active Roster ({currentGroup.members.length}/{currentGroup.targetCount})
          </button>
          <button
            onClick={() => setActiveTab("join")}
            className={`px-4 py-2 transition-all ${
              activeTab === "join"
                ? "bg-brand-gold text-brand-onyx font-bold shadow-sm"
                : "text-brand-black/70 dark:text-white/70 hover:text-brand-gold"
            }`}
          >
            Submit Measurements
          </button>
          <button
            onClick={() => setActiveTab("initiate")}
            className={`px-4 py-2 transition-all ${
              activeTab === "initiate"
                ? "bg-brand-gold text-brand-onyx font-bold shadow-sm"
                : "text-brand-black/70 dark:text-white/70 hover:text-brand-gold"
            }`}
          >
            Initiate New Group
          </button>
        </div>
      </div>

      {/* TAB 1: ACTIVE ROSTER */}
      {activeTab === "roster" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Group Header Dossier Card */}
          <div className="p-6 sm:p-8 bg-[#FAF7F2] dark:bg-[#0F0D0B] border border-brand-gold/30 shadow-xl relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-black/10 dark:border-white/10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-[10px] font-mono font-semibold tracking-wider uppercase">
                    CODE: {currentGroup.code}
                  </span>
                  <span className="text-xs font-mono text-brand-crimson dark:text-brand-gold">
                    {currentGroup.destination} &bull; {currentGroup.eventDate || "To Be Scheduled"}
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-brand-black dark:text-brand-white">
                  {currentGroup.eventTitle}
                </h2>
                <p className="text-xs font-light text-brand-black/70 dark:text-white/70 mt-1">
                  Host Celebrant: <span className="font-name text-sm text-brand-gold">{currentGroup.celebrantName}</span>
                </p>
              </div>

              {/* Share / WhatsApp Invite Button */}
              <button
                onClick={copyShareLink}
                className="px-5 py-2.5 bg-brand-crimson hover:bg-brand-burgundy-light text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 self-start sm:self-auto shadow"
              >
                {copied ? <Check size={14} className="text-brand-gold" /> : <Copy size={14} />}
                <span>{copied ? "Invite Copied!" : "Copy WhatsApp Invite Link"}</span>
              </button>
            </div>

            {/* Group Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs font-light">
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-muted block">Silhouette</span>
                <span className="font-medium text-brand-black dark:text-white mt-0.5 block">{currentGroup.silhouette}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-muted block">Selected Cloth</span>
                <span className="font-medium text-brand-black dark:text-white mt-0.5 block">{currentGroup.cloth}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-muted block">Progress</span>
                <span className="font-mono text-brand-crimson dark:text-brand-gold font-bold mt-0.5 block">
                  {currentGroup.members.length} of {currentGroup.targetCount} Inscribed
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-brand-muted block">Master Tailor</span>
                <span className="font-name text-sm text-brand-gold mt-0.5 block">Bolaji Abayomi Abraham</span>
              </div>
            </div>
          </div>

          {/* Members Measurement Table */}
          <div className="p-6 sm:p-8 bg-[#FCFAF7] dark:bg-[#12100E] border border-brand-black/10 dark:border-white/10 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-brand-black/10 dark:border-white/10 mb-6">
              <h3 className="font-display text-lg text-brand-black dark:text-white">
                Inscribed Entourage Roster
              </h3>
              <button
                onClick={() => setActiveTab("join")}
                className="text-xs uppercase font-mono tracking-wider text-brand-crimson dark:text-brand-gold hover:underline flex items-center gap-1"
              >
                <UserPlus size={13} />
                <span>Add Member &rarr;</span>
              </button>
            </div>

            {currentGroup.members.length === 0 ? (
              <div className="text-center py-12 text-brand-muted text-xs font-light">
                No measurements recorded yet. Click &quot;Copy WhatsApp Invite Link&quot; to share with your groomsmen.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-brand-black/10 dark:border-white/10 text-[10px] font-mono uppercase text-brand-muted">
                      <th className="py-3 px-2">Member</th>
                      <th className="py-3 px-2">Role</th>
                      <th className="py-3 px-2">Chest</th>
                      <th className="py-3 px-2">Shoulder</th>
                      <th className="py-3 px-2">Sleeve</th>
                      <th className="py-3 px-2">Waist</th>
                      <th className="py-3 px-2">Length</th>
                      <th className="py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-black/5 dark:divide-white/5 font-light">
                    {currentGroup.members.map((m, idx) => (
                      <tr key={idx} className="hover:bg-brand-black/[0.02] dark:hover:bg-white/[0.02]">
                        <td className="py-3.5 px-2 font-medium">
                          <span className="font-name text-sm text-brand-black dark:text-white block">{m.name}</span>
                          <span className="text-[10px] font-mono text-brand-muted">{m.phone}</span>
                        </td>
                        <td className="py-3.5 px-2 font-mono text-brand-gold text-[11px]">{m.role}</td>
                        <td className="py-3.5 px-2 font-mono">{m.chest}&quot;</td>
                        <td className="py-3.5 px-2 font-mono">{m.shoulder}&quot;</td>
                        <td className="py-3.5 px-2 font-mono">{m.sleeve}&quot;</td>
                        <td className="py-3.5 px-2 font-mono">{m.waist}&quot;</td>
                        <td className="py-3.5 px-2 font-mono">{m.trouserLength}&quot;</td>
                        <td className="py-3.5 px-2">
                          <span className="inline-flex items-center gap-1 text-[9.5px] font-mono text-brand-gold bg-brand-gold/10 px-2 py-0.5 border border-brand-gold/20">
                            <CheckCircle2 size={10} />
                            <span>Verified</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MEMBER MEASUREMENT SUBMISSION */}
      {activeTab === "join" && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-[#FCFAF7] dark:bg-[#12100E] border border-brand-gold/30 shadow-xl animate-in fade-in duration-300">
          {memberSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto text-brand-gold">
                <CheckCircle2 size={30} />
              </div>
              <h2 className="font-display text-2xl text-brand-black dark:text-white">
                Measurements Inscribed Successfully
              </h2>
              <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-brand-gold">{memberName}</strong>. Your measurements have been linked to the <strong>{currentGroup.eventTitle}</strong> master cutting roster.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setMemberSubmitted(false);
                    setActiveTab("roster");
                  }}
                  className="px-6 py-2.5 bg-brand-gold text-brand-onyx text-xs uppercase font-mono font-bold tracking-wider"
                >
                  View Group Roster &rarr;
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleMemberSubmit} className="space-y-6">
              <div className="border-b border-brand-black/10 dark:border-white/10 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold block">
                  Entourage Inscription
                </span>
                <h3 className="font-display text-2xl text-brand-black dark:text-white mt-1">
                  Submit Your Measurements
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  Joining: <strong className="text-brand-black dark:text-white">{currentGroup.eventTitle}</strong> (Code: {currentGroup.code})
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-brand-muted">Full Name</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="e.g. Tunde Bakare"
                    className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-brand-muted">Role in Wedding / Event</label>
                  <select
                    value={memberRole}
                    onChange={(e) => setMemberRole(e.target.value)}
                    className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light text-brand-onyx dark:text-brand-silk"
                  >
                    <option value="Best Man">Best Man</option>
                    <option value="Groomsman">Groomsman</option>
                    <option value="Father of the Groom">Father of the Groom / Bride</option>
                    <option value="Chief Dignitary">Chief Dignitary</option>
                    <option value="Entourage Escort">Entourage Escort</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="+234 or +44 or +1"
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                />
              </div>

              {/* 5 Measurements */}
              <div className="pt-4 border-t border-brand-black/10 dark:border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase tracking-wider font-semibold text-brand-onyx dark:text-brand-silk">
                    Key Anatomical Measurements (Inches)
                  </label>
                  <span className="text-[10px] font-mono text-brand-gold">Tape Measure Flat</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono text-brand-muted">Chest (Circumference)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 42"
                      value={chest}
                      onChange={(e) => setChest(e.target.value)}
                      className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-1.5 outline-none focus:border-brand-gold text-sm font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono text-brand-muted">Shoulder (Tip to Tip)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      placeholder="e.g. 19"
                      value={shoulder}
                      onChange={(e) => setShoulder(e.target.value)}
                      className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-1.5 outline-none focus:border-brand-gold text-sm font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono text-brand-muted">Sleeve (Shoulder to Wrist)</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      placeholder="e.g. 26"
                      value={sleeve}
                      onChange={(e) => setSleeve(e.target.value)}
                      className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-1.5 outline-none focus:border-brand-gold text-sm font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono text-brand-muted">Waist (Trouser Band)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 34"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-1.5 outline-none focus:border-brand-gold text-sm font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-mono text-brand-muted">Trouser Length (Outseam)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 42"
                      value={trouserLength}
                      onChange={(e) => setTrouserLength(e.target.value)}
                      className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-1.5 outline-none focus:border-brand-gold text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-crimson hover:bg-brand-burgundy-light text-white uppercase text-xs tracking-luxury font-semibold transition-colors mt-4 shadow"
              >
                Inscribe My Measurements into Entourage Roster
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: INITIATE NEW GROUP */}
      {activeTab === "initiate" && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-[#FCFAF7] dark:bg-[#12100E] border border-brand-gold/30 shadow-xl animate-in fade-in duration-300">
          <form onSubmit={handleInitiate} className="space-y-6">
            <div className="border-b border-brand-black/10 dark:border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold block">
                Ceremonial Host Initialization
              </span>
              <h3 className="font-display text-2xl text-brand-black dark:text-white mt-1">
                Initiate Entourage Wardrobe
              </h3>
              <p className="text-xs text-brand-muted mt-1">
                Create a master registry code to distribute to your wedding party or chieftaincy entourage.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-brand-muted">Event / Wedding Title</label>
              <input
                type="text"
                required
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="e.g. Coker Royal Wedding Traditional Entourage"
                className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Lead Celebrant Name</label>
                <input
                  type="text"
                  required
                  value={celebrantName}
                  onChange={(e) => setCelebrantName(e.target.value)}
                  placeholder="e.g. Chief Adeleke Coker"
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Celebrant Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={celebrantPhone}
                  onChange={(e) => setCelebrantPhone(e.target.value)}
                  placeholder="+234 803 000 0000"
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Event Date</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Destination</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Lagos, Houston, London"
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Target Members</label>
                <input
                  type="number"
                  min="2"
                  max="30"
                  required
                  value={targetCount}
                  onChange={(e) => setTargetCount(Number(e.target.value))}
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Entourage Silhouette</label>
                <select
                  value={silhouette}
                  onChange={(e) => setSilhouette(e.target.value)}
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light text-brand-onyx dark:text-brand-silk"
                >
                  <option value="Grand 3-Piece Agbada">Grand 3-Piece Agbada Suite</option>
                  <option value="Ceremonial Royal Kaftan">Ceremonial Royal Kaftan</option>
                  <option value="Royal Senator Attire">Royal Senator Attire</option>
                  <option value="Double-Breasted Wool Tuxedo">Double-Breasted Wool Tuxedo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-brand-muted">Uniform Heritage Cloth</label>
                <select
                  value={cloth}
                  onChange={(e) => setCloth(e.target.value)}
                  className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-gold text-sm font-light text-brand-onyx dark:text-brand-silk"
                >
                  <option value="Alaari Royal Silk Aso Oke">Alaari Royal Silk Aso Oke</option>
                  <option value="Sanyan Traditional Wild Raw Silk">Sanyan Traditional Wild Raw Silk</option>
                  <option value="Super 150s English Worsted Wool">Super 150s English Worsted Wool</option>
                  <option value="Biella Cashmere Blend">Biella Cashmere Blend</option>
                  <option value="Client-Provided Custom Aso Ebi">Client-Provided Custom Aso Ebi</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-crimson hover:bg-brand-burgundy-light text-white uppercase text-xs tracking-luxury font-semibold transition-colors mt-4 shadow"
            >
              Generate Entourage Portal &amp; Roster Code
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default function GroupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-36 text-center font-display text-2xl">Accessing Entourage Portal...</div>}>
      <GroupWardrobeInner />
    </Suspense>
  );
}
