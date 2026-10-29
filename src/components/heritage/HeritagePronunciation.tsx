"use client";

import React, { useState } from "react";
import { Volume2 } from "lucide-react";

interface HeritagePronunciationProps {
  term: string;
  phonetic: string;
  translation?: string;
  tones?: ("high" | "mid" | "low")[];
  className?: string;
}

export function HeritagePronunciation({
  term,
  phonetic,
  translation,
  tones = ["mid", "high", "low"],
  className = "",
}: HeritagePronunciationProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const pronounce = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    try {
      // 1. Web Speech Synthesis if available
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phonetic);
        utterance.rate = 0.85;
        utterance.pitch = 1.05;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }

      // 2. Tonal Chime Audio synthesis (Three Yoruba Lexical Tones: Dò [low: 220Hz], Re [mid: 293Hz], Mí [high: 370Hz])
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        tones.forEach((tone, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          const freq = tone === "high" ? 370 : tone === "low" ? 220 : 293.66;
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + idx * 0.16);

          gain.gain.setValueAtTime(0.001, now + idx * 0.16);
          gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.16 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.22);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.16);
          osc.stop(now + idx * 0.16 + 0.24);
        });

        setTimeout(() => {
          setIsPlaying(false);
        }, tones.length * 200 + 400);
      } else {
        setTimeout(() => setIsPlaying(false), 900);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={pronounce}
      title={`Listen to Yoruba pronunciation: ${term} [${phonetic}]`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 border border-brand-gold/30 hover:border-brand-gold bg-brand-gold/5 hover:bg-brand-gold/15 text-brand-gold text-[9px] font-mono tracking-wider transition-all duration-200 select-none ${className}`}
    >
      <Volume2
        size={11}
        className={`flex-shrink-0 transition-transform ${
          isPlaying ? "scale-125 text-brand-gold animate-pulse" : "text-brand-gold/70"
        }`}
      />
      <span className="font-semibold uppercase">Voice</span>
      <span className="hidden sm:inline text-brand-black/60 dark:text-white/60 font-light font-sans lowercase">
        [{phonetic}]
      </span>
    </button>
  );
}
