"use client";

import { useSyncExternalStore } from "react";

export type Settings = {
  sound: boolean;
  haptic: boolean;
  night: boolean;
};

const KEY = "lulu:settings";
const DEFAULTS: Settings = { sound: true, haptic: true, night: false };

let state: Settings = DEFAULTS;
let hydrated = false;
const listeners = new Set<() => void>();

function read(): Settings {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  state = read();
  hydrated = true;
  applyNight(state.night);
}

function emit() {
  listeners.forEach((l) => l());
}

function applyNight(night: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("night-mode", night);
}

export function setSetting<K extends keyof Settings>(key: K, value: Settings[K]) {
  state = { ...state, [key]: value };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  if (key === "night") applyNight(value as boolean);
  emit();
}

export function toggleSetting(key: keyof Settings) {
  setSetting(key, !state[key]);
}

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// useSyncExternalStore keeps every consumer in sync and SSR-safe.
export function useSettings(): Settings {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => DEFAULTS
  );
}
