"use client";

import { useDailyTasks } from "@/lib/useDailyTasks";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AchievementsRing() {
  const { completed, total, ready } = useDailyTasks();
  const pct = total ? Math.round((completed / total) * 100) : 0;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  const message =
    pct === 100
      ? "ما شاء الله! أكملتِ كل أهداف اليوم 🌷"
      : pct >= 60
      ? "أحسنتِ، أنتِ على الطريق الصحيح"
      : pct > 0
      ? "بدايةٌ موفّقة، أكملي ما تبقّى"
      : "ابدئي يومكِ بأول خطوة";

  return (
    <div className="glass glass-hover flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h3 className="font-display text-lg font-bold text-rose-700">إنجاز اليوم</h3>
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(193,122,145,0.15)" strokeWidth="10" />
          <circle
            cx="64"
            cy="64"
            r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={ready ? offset : circ}
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D38497" />
              <stop offset="100%" stopColor="#C99A5E" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold text-rose-700">{ready ? pct : 0}%</span>
          <span className="text-xs text-rose-500">{completed} من {total}</span>
        </div>
      </div>
      <p className="text-sm text-rose-700/90">{message}</p>
      <Link href="/tasks" className="text-sm font-medium text-rose-600 hover:text-rose-700 flex items-center gap-1">
        مهام اليوم <ArrowLeft size={14} />
      </Link>
    </div>
  );
}
