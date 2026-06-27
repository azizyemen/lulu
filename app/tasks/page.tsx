"use client";

import { useState } from "react";
import { useDailyTasks } from "@/lib/useDailyTasks";
import Icon from "@/components/Icon";
import { Check, Plus, Trash2 } from "lucide-react";

export default function TasksPage() {
  const { tasks, done, completed, total, toggle, addTask, removeTask, ready } = useDailyTasks();
  const [draft, setDraft] = useState("");
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = draft.trim();
    if (v) {
      addTask(v);
      setDraft("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-strong p-6">
        <h1 className="font-display text-3xl font-bold text-rose-800">مهام اليوم</h1>
        <p className="mt-1 text-rose-600/80">عباداتكِ وعاداتكِ اليومية — تُجدَّد كل صباح</p>
        <div className="mt-5 flex items-center gap-4">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-rose-100">
            <div
              className="h-full rounded-full bg-gradient-to-l from-rose-400 to-gold-400 transition-all duration-700"
              style={{ width: ready ? `${pct}%` : "0%" }}
            />
          </div>
          <span className="text-sm font-medium text-rose-600">
            {completed} / {total}
          </span>
        </div>
      </div>

      <form onSubmit={submit} className="glass flex items-center gap-2 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="أضيفي مهمة جديدة…"
          className="flex-1 bg-transparent px-3 py-2 text-rose-800 placeholder:text-rose-300 outline-none"
        />
        <button type="submit" className="btn-rose !px-4 !py-2.5" aria-label="إضافة">
          <Plus size={18} />
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map((t) => {
          const isDone = !!done[t.id];
          const isCustom = t.id.startsWith("c-");
          return (
            <li
              key={t.id}
              className={`glass flex items-center gap-3 p-4 transition-all duration-300 ${
                isDone ? "opacity-65" : ""
              }`}
            >
              <button
                onClick={() => toggle(t.id)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all ${
                  isDone
                    ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-sm"
                    : "bg-rose-100 text-rose-400 hover:bg-rose-200"
                }`}
                aria-label="إنجاز"
              >
                {isDone ? <Check size={18} /> : <Icon name={t.icon} size={18} />}
              </button>
              <span
                className={`flex-1 font-medium ${
                  isDone ? "text-rose-400 line-through" : "text-rose-800"
                }`}
              >
                {t.label}
              </span>
              {isCustom && (
                <button
                  onClick={() => removeTask(t.id)}
                  className="text-rose-300 transition-colors hover:text-rose-500"
                  aria-label="حذف"
                >
                  <Trash2 size={17} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {ready && completed === total && total > 0 && (
        <div className="glass-strong p-8 text-center animate-fade-up">
          <p className="font-display text-2xl font-bold text-rose-700">يومٌ مبارك! 🌷</p>
          <p className="mt-2 text-rose-600/80">
            أنتِ اليوم أفضل من الأمس — أتممتِ كل مهامكِ بفضل الله.
          </p>
        </div>
      )}
    </div>
  );
}
