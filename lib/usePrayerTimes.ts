"use client";

import { useEffect, useState } from "react";

export type PrayerTime = { key: string; name: string; time: string };
export type PrayerState = {
  times: PrayerTime[];
  city: string;
  next: { name: string; time: string; countdown: string } | null;
  loading: boolean;
  error: boolean;
};

const NAMES: Record<string, string> = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};
const ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function toCountdown(target: Date, now: Date): string {
  let diff = Math.max(0, target.getTime() - now.getTime());
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  return `${h} س ${m.toString().padStart(2, "0")} د`;
}

export function usePrayerTimes(): PrayerState {
  const [state, setState] = useState<PrayerState>({
    times: [],
    city: "",
    next: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;

    async function load(lat: number, lng: number, city: string) {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`
        );
        const json = await res.json();
        const t = json.data.timings as Record<string, string>;
        const times: PrayerTime[] = ORDER.map((k) => ({
          key: k,
          name: NAMES[k],
          time: t[k],
        }));
        if (active) {
          setState({
            times,
            city,
            next: computeNext(times),
            loading: false,
            error: false,
          });
        }
      } catch {
        if (active) setState((s) => ({ ...s, loading: false, error: true }));
      }
    }

    function fallback() {
      // Default: Makkah al-Mukarramah
      load(21.4225, 39.8262, "مكة المكرمة");
    }

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => load(pos.coords.latitude, pos.coords.longitude, "موقعكِ الحالي"),
        () => fallback(),
        { timeout: 6000 }
      );
    } else {
      fallback();
    }

    return () => {
      active = false;
    };
  }, []);

  // Tick the countdown each minute.
  useEffect(() => {
    const id = setInterval(() => {
      setState((s) =>
        s.times.length ? { ...s, next: computeNext(s.times) } : s
      );
    }, 30000);
    return () => clearInterval(id);
  }, []);

  return state;
}

function computeNext(times: PrayerTime[]): PrayerState["next"] {
  const now = new Date();
  const prayers = times.filter((t) => t.key !== "Sunrise");
  for (const p of prayers) {
    const [h, m] = p.time.split(":").map(Number);
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target > now) {
      return { name: p.name, time: p.time, countdown: toCountdown(target, now) };
    }
  }
  // After Isha → next is tomorrow's Fajr
  const fajr = prayers[0];
  const [h, m] = fajr.time.split(":").map(Number);
  const target = new Date();
  target.setDate(target.getDate() + 1);
  target.setHours(h, m, 0, 0);
  return { name: fajr.name, time: fajr.time, countdown: toCountdown(target, now) };
}
