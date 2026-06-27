"use client";

import { usePrayerTimes } from "@/lib/usePrayerTimes";
import { MapPin, Moon, Sunrise, Sun, Sunset, CloudSun, Stars } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  Fajr: <Sunrise size={16} />,
  Sunrise: <CloudSun size={16} />,
  Dhuhr: <Sun size={16} />,
  Asr: <Sunset size={16} />,
  Maghrib: <Sunset size={16} />,
  Isha: <Moon size={16} />,
};

function to12h(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "م" : "ص";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
}

export default function PrayerTimesCard() {
  const { times, city, next, loading, error } = usePrayerTimes();

  return (
    <div className="glass glass-hover p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-rose-700">
          <Stars size={18} className="text-gold-500" />
          مواقيت الصلاة
        </h3>
        <span className="chip">
          <MapPin size={12} />
          {city || "…"}
        </span>
      </div>

      {next && (
        <div className="mb-4 rounded-2xl bg-gradient-to-l from-rose-500 to-rose-600 p-4 text-white shadow-glow-sm">
          <p className="text-xs opacity-90">الصلاة القادمة</p>
          <div className="mt-1 flex items-end justify-between">
            <span className="font-display text-2xl font-bold">{next.name}</span>
            <span className="text-sm">بعد {next.countdown}</span>
          </div>
        </div>
      )}

      {loading && <p className="py-6 text-center text-sm text-rose-600/70">جارٍ تحديد المواقيت…</p>}
      {error && <p className="py-6 text-center text-sm text-rose-600/70">تعذّر جلب المواقيت، حاولي لاحقًا.</p>}

      {!loading && !error && (
        <ul className="grid grid-cols-2 gap-2">
          {times.map((p) => {
            const isNext = next?.name === p.name;
            return (
              <li
                key={p.key}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${
                  isNext ? "bg-rose-100 text-rose-800" : "bg-white/40 text-rose-700/90"
                }`}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="text-rose-400">{ICONS[p.key]}</span>
                  {p.name}
                </span>
                <span className="tabular-nums">{to12h(p.time)}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
