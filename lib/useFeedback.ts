"use client";

import { useCallback } from "react";
import { useSettings } from "@/lib/useSettings";

let ctx: AudioContext | null = null;

function ensureCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// A very soft, short "tick" synthesized on the fly — no audio asset to load.
function playTick() {
  const c = ensureCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(660, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, c.currentTime + 0.05);
  gain.gain.setValueAtTime(0.0001, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, c.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.12);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.13);
}

// Returns a tap() that gives sound + haptic feedback, each respecting settings.
export function useFeedback() {
  const { sound, haptic } = useSettings();

  return useCallback(() => {
    if (sound) {
      try {
        playTick();
      } catch {
        /* ignore */
      }
    }
    if (haptic && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }
  }, [sound, haptic]);
}
