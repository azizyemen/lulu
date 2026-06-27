"use client";

import { useMemo } from "react";
import { Dhikr } from "@/data/adhkar";
import { useLocalStorage, todayKey } from "@/lib/useLocalStorage";
import { useSettings, toggleSetting } from "@/lib/useSettings";
import { useFeedback } from "@/lib/useFeedback";
import ShareButtons from "@/components/ShareButtons";
import { Moon, Sun, RotateCcw, Check, Repeat } from "lucide-react";

export default function AdhkarReader({
  type,
  title,
  subtitle,
  items,
}: {
  type: "morning" | "evening";
  title: string;
  subtitle: string;
  items: Dhikr[];
}) {
  // Per-dhikr tap counts, reset daily.
  const [counts, setCounts, ready] = useLocalStorage<Record<string, number>>(
    `lulu:adhkar:${type}:${todayKey()}`,
    {}
  );
  const { night } = useSettings();
  const feedback = useFeedback();

  const completed = useMemo(
    () => items.filter((d) => (counts[d.id] ?? 0) >= d.count).length,
    [counts, items]
  );
  const pct = Math.round((completed / items.length) * 100);

  const tap = (d: Dhikr) => {
    setCounts((c) => {
      const cur = c[d.id] ?? 0;
      if (cur >= d.count) return c;
      return { ...c, [d.id]: cur + 1 };
    });
    feedback();
  };
  const reset = (id: string) => setCounts((c) => ({ ...c, [id]: 0 }));
  const resetAll = () => setCounts({});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-strong flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-rose-800">{title}</h1>
          <p className="mt-1 text-rose-600/80">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSetting("night")}
            className="flex items-center gap-1.5 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-white/70"
          >
            {night ? <Sun size={15} /> : <Moon size={15} />}
            {night ? "الوضع النهاري" : "وضع القراءة الليلية"}
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-white/70"
          >
            <RotateCcw size={15} /> إعادة
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="glass flex items-center gap-4 p-4">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-rose-100">
          <div
            className="h-full rounded-full bg-gradient-to-l from-rose-400 to-gold-400 transition-all duration-700"
            style={{ width: ready ? `${pct}%` : "0%" }}
          />
        </div>
        <span className="text-sm font-medium text-rose-600">
          {completed} / {items.length}
        </span>
      </div>

      {/* Dhikr cards */}
      <div className="space-y-4">
        {items.map((d, i) => {
          const cur = counts[d.id] ?? 0;
          const isDone = cur >= d.count;
          return (
            <article
              key={d.id}
              className={`glass relative overflow-hidden p-6 transition-all duration-500 ${
                isDone ? "opacity-70" : ""
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-600">
                  {i + 1}
                </span>
                {isDone && (
                  <span className="chip">
                    <Check size={12} /> تمّ
                  </span>
                )}
              </div>

              <button
                onClick={() => tap(d)}
                disabled={isDone}
                className="block w-full text-right"
                aria-label="عدّ"
              >
                <p className="font-quran text-xl leading-loose text-rose-900 sm:text-2xl">
                  {d.text}
                </p>
              </button>

              {d.virtue && (
                <p className="mt-3 rounded-xl bg-white/40 p-3 text-sm leading-relaxed text-rose-700/85">
                  {d.virtue}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-rose-400">
                  <ShareButtons text={d.text} source={d.source} />
                  {d.source && <span className="hidden sm:inline">{d.source}</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-rose-500">
                    <Repeat size={12} /> {d.count} مرّة
                  </span>
                  <button
                    onClick={() => tap(d)}
                    disabled={isDone}
                    className={`flex h-12 min-w-12 items-center justify-center rounded-2xl px-4 font-display text-lg font-bold tabular-nums transition-all ${
                      isDone
                        ? "bg-rose-100 text-rose-400"
                        : "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-sm active:scale-95"
                    }`}
                  >
                    {cur} / {d.count}
                  </button>
                  {cur > 0 && (
                    <button
                      onClick={() => reset(d.id)}
                      className="text-rose-300 transition-colors hover:text-rose-500"
                      aria-label="إعادة العدّ"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {completed === items.length && (
        <div className="glass-strong p-8 text-center animate-fade-up">
          <p className="font-display text-2xl font-bold text-rose-700">
            تقبّل الله منكِ 🌷
          </p>
          <p className="mt-2 text-rose-600/80">
            أتممتِ {title}. حفظكِ الله ورعاكِ طوال يومكِ.
          </p>
        </div>
      )}
    </div>
  );
}
