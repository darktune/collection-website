"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Sparkles, Compass, Eye, ShieldCheck } from "lucide-react";
import { AdinkraheneIcon, PempamsieIcon } from "@/components/icons/BespokeIcons";

interface WeaveData {
  id: string;
  name: string;
  yorubaName: string;
  origin: string;
  warpComposition: string;
  weftComposition: string;
  threadCount: string;
  significance: string;
  colors: {
    warp: string;
    weft: string;
    accent: string;
  };
}

const WEAVES: WeaveData[] = [
  {
    id: "alaari",
    name: "Alaari Royal Silk Aso Oke",
    yorubaName: "Aṣọ Ọba Aláàrí",
    origin: "Iseyin Weaving Guilds, Oyo State",
    warpComposition: "Mulberry Silk (Indigo/Crimson vat dyed)",
    weftComposition: "Metallic Gold Lurex & Hand-spun Cotton",
    threadCount: "180 Ends Per Inch (EPI)",
    significance: "Reserved for imperial coronations, royal celebrants, and grooms carrying dynastic titles.",
    colors: {
      warp: "#7A0C1E",
      weft: "#F2C14E",
      accent: "#A61C32",
    },
  },
  {
    id: "sanyan",
    name: "Sanyan Traditional Wild Raw Silk",
    yorubaName: "Sányán Àdìmúla",
    origin: "Oyo Town Master Weavers, Nigeria",
    warpComposition: "Wild Anaphe Silk Cocoon (Unbleached)",
    weftComposition: "Hand-carded Indigenous Cotton",
    threadCount: "140 Ends Per Inch (EPI)",
    significance: "The undisputed 'King of Cloth'. Natural champagne-khaki patina that softens over generations.",
    colors: {
      warp: "#C9A76E",
      weft: "#E6D7B8",
      accent: "#B89047",
    },
  },
  {
    id: "etu",
    name: "Etu Indigo Pinstripe Cloth",
    yorubaName: "Ẹtù Oní-Láìkì",
    origin: "Oshogbo Sacred Dye Pits, Osun State",
    warpComposition: "Triple-dipped Fermented Indigo Cotton",
    weftComposition: "Bleached Ivory Cotton Pinstripe",
    threadCount: "160 Ends Per Inch (EPI)",
    significance: "The cloth of statesmen and high judiciary. Crisp contrast symbolizing clarity of thought and judicial integrity.",
    colors: {
      warp: "#131C2D",
      weft: "#EAE7DF",
      accent: "#22334D",
    },
  },
  {
    id: "asake",
    name: "Asake Open-Lattice Metallic Brocade",
    yorubaName: "Àṣàkẹ́ Oní-Dúrà",
    origin: "Abraham Collection Western Atelier",
    warpComposition: "Fine Worsted Merino Wool & Silk",
    weftComposition: "Pure Gold Wire & Perforated Eyelets",
    threadCount: "210 Ends Per Inch (EPI)",
    significance: "A 21st-century evolution blending historical Yoruba open-work perforations with British suiting warp.",
    colors: {
      warp: "#1A1715",
      weft: "#F2C14E",
      accent: "#D4AF37",
    },
  },
];

export function LoomExperience() {
  const [activeWeave, setActiveWeave] = useState<WeaveData>(WEAVES[0]);
  const [zoomLevel, setZoomLevel] = useState<"macro" | "micro">("micro");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Audio Context & Timer references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioTimerRef = useRef<number | null>(null);

  // Render tactile micro-weave texture on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    const render = () => {
      tick += 0.02;
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas with deep obsidian/charcoal ground
      ctx.fillStyle = "#0D0B0A";
      ctx.fillRect(0, 0, width, height);

      const density = zoomLevel === "micro" ? 14 : 26;
      const cellWidth = width / density;
      const cellHeight = height / density;

      // Draw interlacing warp (vertical) and weft (horizontal) threads
      for (let x = 0; x < density; x++) {
        for (let y = 0; y < density; y++) {
          const isOver = (x + y) % 2 === 0;
          const px = x * cellWidth;
          const py = y * cellHeight;

          // Subtle organic loom shimmer
          const shimmer = Math.sin(tick + (x * 0.4) + (y * 0.3)) * 0.08;

          if (isOver) {
            // Warp thread (vertical pass)
            ctx.fillStyle = activeWeave.colors.warp;
            ctx.fillRect(px + 1, py, cellWidth - 2, cellHeight);

            // Warp thread highlight gradient
            const grad = ctx.createLinearGradient(px, py, px + cellWidth, py);
            grad.addColorStop(0, "rgba(0,0,0,0.4)");
            grad.addColorStop(0.5, `rgba(255,255,255,${0.25 + shimmer})`);
            grad.addColorStop(1, "rgba(0,0,0,0.5)");
            ctx.fillStyle = grad;
            ctx.fillRect(px + 1, py, cellWidth - 2, cellHeight);
          } else {
            // Weft thread (horizontal pass)
            ctx.fillStyle = activeWeave.colors.weft;
            ctx.fillRect(px, py + 1, cellWidth, cellHeight - 2);

            // Weft thread highlight gradient
            const grad = ctx.createLinearGradient(px, py, px, py + cellHeight);
            grad.addColorStop(0, "rgba(0,0,0,0.4)");
            grad.addColorStop(0.5, `rgba(255,255,255,${0.3 + shimmer})`);
            grad.addColorStop(1, "rgba(0,0,0,0.5)");
            ctx.fillStyle = grad;
            ctx.fillRect(px, py + 1, cellWidth, cellHeight - 2);
          }
        }
      }

      // Border frame baste lines
      ctx.strokeStyle = "rgba(242, 193, 78, 0.25)";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeWeave, zoomLevel]);

  // Synthesize rhythmic Yoruba loom sound using Web Audio API
  const playLoomCycle = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // 1. Wooden Treadle Clack (Harness shifting)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(70, now + 0.08);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      // 2. Shuttle Slide Through Warp (Filtered noise sweep)
      const bufferSize = ctx.sampleRate * 0.2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.32);
      filter.Q.value = 3.0;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now + 0.12);
      noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.2);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now + 0.12);
      noise.stop(now + 0.36);

      // 3. Wooden Beater Strike (Beating the weft tight into the fell)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(220, now + 0.45);
      osc2.frequency.exponentialRampToValueAtTime(45, now + 0.58);
      gain2.gain.setValueAtTime(0.3, now + 0.45);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.45);
      osc2.stop(now + 0.61);
    } catch (e) {
      console.warn("Web Audio synthesis error:", e);
    }
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (audioTimerRef.current) {
        window.clearInterval(audioTimerRef.current);
        audioTimerRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playLoomCycle();
      audioTimerRef.current = window.setInterval(() => {
        playLoomCycle();
      }, 1050); // Authentic 57 BPM artisan weaving rhythm
    }
  };

  useEffect(() => {
    return () => {
      if (audioTimerRef.current) {
        window.clearInterval(audioTimerRef.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section className="my-20 border-y border-brand-black/10 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0B0908] py-16 px-6 sm:px-10 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-mono font-medium mb-4">
          <AdinkraheneIcon size={12} />
          <span>Interactive Craft Experience &bull; Yoruba Weave Archive</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-brand-black dark:text-brand-white mb-3">
          The Master Weaver&apos;s Loom
        </h2>
        <p className="text-xs sm:text-sm font-light text-brand-black/70 dark:text-brand-silk/75 max-w-2xl mx-auto leading-relaxed">
          Every yard of ceremonial Aso Oke begins on the wooden treadle loom. Examine our microscopic thread architecture and experience the authentic acoustics of the Oyo master weavers.
        </p>

        {/* Ambient Loom Sound Toggle */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2.5 px-4 py-2 border text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-mono transition-all duration-300 ${
              isPlayingAudio
                ? "border-brand-gold bg-brand-gold text-brand-onyx font-bold shadow-md"
                : "border-brand-black/20 dark:border-white/20 text-brand-black/80 dark:text-brand-silk/80 hover:border-brand-gold hover:text-brand-gold bg-brand-black/5 dark:bg-white/5"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 size={14} className="animate-pulse" />
                <span>Pause Loom Shuttle (57 BPM)</span>
              </>
            ) : (
              <>
                <VolumeX size={14} />
                <span>Listen to Loom Shuttle Acoustics</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: Weave Swatches & Dynamic Microscope Canvas */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Textile Selector Cards */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-muted block font-mono">
            Select Yoruba Textile Heritage
          </span>

          {WEAVES.map((weave) => {
            const isSelected = activeWeave.id === weave.id;
            return (
              <button
                key={weave.id}
                onClick={() => setActiveWeave(weave)}
                className={`w-full p-4 text-left border transition-all duration-300 flex items-start gap-3 relative ${
                  isSelected
                    ? "border-brand-crimson bg-brand-crimson/5 dark:border-brand-gold dark:bg-brand-gold/10 shadow-sm"
                    : "border-brand-black/10 dark:border-white/10 hover:border-brand-black/30 dark:hover:border-white/30 bg-white/40 dark:bg-white/[0.02]"
                }`}
              >
                {/* Visual Swatch Pill */}
                <div
                  className="w-4 h-12 rounded-sm border border-black/20 shadow-inner flex-shrink-0 mt-0.5"
                  style={{
                    background: `linear-gradient(180deg, ${weave.colors.warp} 0%, ${weave.colors.weft} 100%)`,
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-display text-base text-brand-black dark:text-brand-white truncate">
                      {weave.name}
                    </h3>
                    <span className="text-[9px] font-mono text-brand-gold flex-shrink-0">
                      {weave.threadCount.split(" ")[0]} EPI
                    </span>
                  </div>
                  <p className="text-[10px] font-mono italic text-brand-crimson dark:text-brand-gold">
                    {weave.yorubaName}
                  </p>
                  <p className="text-[11px] font-light text-brand-black/60 dark:text-white/60 line-clamp-1 mt-0.5">
                    {weave.origin}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Tactile Micro-Weave Canvas & Technical Dossier */}
        <div className="lg:col-span-7 bg-[#0D0B0A] text-[#FCFAF7] border border-brand-gold/30 p-6 shadow-2xl relative">
          
          {/* Top Dossier Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2">
              <Eye size={15} className="text-brand-gold" />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-gold">
                Thread Matrix Inspector
              </span>
            </div>

            {/* Magnification Controls */}
            <div className="flex items-center border border-white/20 bg-white/5 divide-x divide-white/10 text-[9px] font-mono uppercase">
              <button
                onClick={() => setZoomLevel("micro")}
                className={`px-2.5 py-1 transition-colors ${
                  zoomLevel === "micro"
                    ? "bg-brand-gold text-brand-onyx font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Microscopic (14x)
              </button>
              <button
                onClick={() => setZoomLevel("macro")}
                className={`px-2.5 py-1 transition-colors ${
                  zoomLevel === "macro"
                    ? "bg-brand-gold text-brand-onyx font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Macro (26x)
              </button>
            </div>
          </div>

          {/* Canvas Rendering Area */}
          <div className="relative aspect-[16/9] w-full border border-brand-gold/20 overflow-hidden bg-black shadow-inner">
            <canvas
              ref={canvasRef}
              width={560}
              height={315}
              className="w-full h-full object-cover"
            />

            {/* Overlay Watermark Badge */}
            <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/15 text-[8.5px] font-mono text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
              <PempamsieIcon size={10} />
              <span>{activeWeave.name}</span>
            </div>
          </div>

          {/* Weave Technical Specifications Grid */}
          <div className="mt-5 grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-4 text-xs font-light">
            <div>
              <span className="text-[9.5px] font-mono text-white/50 uppercase tracking-widest block">
                Warp (Vertical Tension)
              </span>
              <span className="text-[11.5px] text-white/90 font-medium">
                {activeWeave.warpComposition}
              </span>
            </div>
            <div>
              <span className="text-[9.5px] font-mono text-white/50 uppercase tracking-widest block">
                Weft (Shuttle Pass)
              </span>
              <span className="text-[11.5px] text-brand-gold font-medium">
                {activeWeave.weftComposition}
              </span>
            </div>

            <div className="col-span-2 pt-1 border-t border-white/5">
              <span className="text-[9.5px] font-mono text-white/50 uppercase tracking-widest block">
                Ceremonial Significance &amp; Lineage
              </span>
              <p className="text-[11.5px] text-white/80 leading-relaxed mt-0.5 font-light">
                {activeWeave.significance}
              </p>
            </div>
          </div>

          {/* Quality Guarantee Seal */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-white/50">
            <span className="flex items-center gap-1.5 text-brand-gold">
              <ShieldCheck size={12} />
              <span>100% Authentic Hand-Loomed Artisan Selvedge</span>
            </span>
            <span>Est. 2002 &bull; Lagos Atelier</span>
          </div>

        </div>
      </div>
    </section>
  );
}
