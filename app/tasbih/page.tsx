"use client";

import { useState } from "react";
import { tasbihItems } from "@/data/tasks";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useFeedback } from "@/lib/useFeedback";
import { RotateCcw, Check } from "lucide-react";

export default function TasbihPage() {
  const [activeId, setActiveId] = useState(tasbihItems[0].id);
  const [counts, setCounts] = useLocalStorage<Record<string, number>>("lulu:tasbih", {});
  const [total, setTotal] = useLocalStorage<number>("lulu:tasbihTotal", 0);

  const active = tasbihItems.find((t) => t.id === activeId)!;
  const count = counts[activeId] ?? 0;
  const reached = count >= active.target;
  const pct = Math.min(100, (count / active.target) * 100);
  const r = 120;
  const circ = 2 * Math.PI * r;

  const feedback = useFeedback();
  const tap = () => {
    setCounts((c) => ({ ...c, [activeId]: (c[activeId] ?? 0) + 1 }));
    setTotal((t) => t + 1);
    feedback();
  };
  const resetActive = () => setCounts((c) => ({ ...c, [activeId]: 0 }));

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold text-rose-800">المسبحة الإلكترونية</h1>
        <p className="mt-2 text-rose-600/80">سبّحي واحمدي وكبّري — والمجموع محفوظٌ لكِ</p>
      </div>

      {/* Dhikr selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {tasbihItems.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              t.id === activeId
                ? "bg-rose-500 text-white shadow-glow-sm"
                : "glass text-rose-700 hover:bg-white/70"
            }`}
          >
            {t.text}
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={tap}
          className="group relative h-72 w-72 select-none rounded-full outline-none"
          aria-label="عدّ التسبيح"
        >
          <svg className="h-full w-full -rotate-90" viewBox="0 0 288 288">
            <circle cx="144" cy="144" r={r} fill="none" stroke="rgba(193,122,145,0.15)" strokeWidth="14" />
            <circle
              cx="144"
              cy="144"
              r={r}
              fill="none"
              stroke="url(#tasbihGrad)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ - (pct / 100) * circ}
              style={{ transition: "stroke-dashoffset 0.4s cubic-bezier(0.22,1,0.36,1)" }}
            />
            <defs>
              <linearGradient id="tasbihGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D38497" />
                <stop offset="100%" stopColor="#C99A5E" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-6 flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-white/70 to-rose-50/70 backdrop-blur-xl shadow-card transition-transform duration-150 group-active:scale-95">
            <span className="font-quran text-2xl text-rose-700">{active.text}</span>
            <span className="font-display text-6xl font-bold tabular-nums text-rose-800">{count}</span>
            <span className="text-sm text-rose-500">الهدف {active.target}</span>
          </div>
        </button>

        {reached && (
          <span className="chip animate-fade-up">
            <Check size={13} /> بلغتِ الهدف، تقبّل الله
          </span>
        )}

        <div className="flex items-center gap-3">
          <button onClick={resetActive} className="flex items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm font-medium text-rose-700 hover:bg-white/70">
            <RotateCcw size={15} /> تصفير
          </button>
          <div className="rounded-full glass px-5 py-2.5 text-sm font-medium text-rose-700">
            المجموع الكلي: <span className="font-bold tabular-nums">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
