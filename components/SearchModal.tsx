"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { searchAll, normalizeAr } from "@/data/searchIndex";
import { Search, X } from "lucide-react";

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchAll(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-20 sm:pt-28"
      role="dialog"
      aria-modal="true"
      aria-label="البحث"
    >
      <div className="absolute inset-0 bg-rose-900/20 backdrop-blur-sm animate-fade-up" onClick={onClose} />

      <div className="glass-strong relative w-full max-w-xl overflow-hidden animate-fade-up">
        <div className="flex items-center gap-3 border-b border-rose-100/70 px-5 py-4">
          <Search size={20} className="shrink-0 text-rose-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحثي في الأذكار والأدعية…"
            className="flex-1 bg-transparent text-rose-800 placeholder:text-rose-300 outline-none"
          />
          <button onClick={onClose} aria-label="إغلاق" className="rounded-full p-1.5 text-rose-400 hover:bg-rose-100/70 hover:text-rose-600">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {normalizeAr(query).length < 2 ? (
            <p className="px-4 py-8 text-center text-sm text-rose-500/80">
              اكتبي كلمة للبحث في الأذكار والأدعية والحِكَم…
            </p>
          ) : results.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-rose-500/80">لا توجد نتائج لـ «{query}»</p>
          ) : (
            <ul className="space-y-1">
              {results.map((r) => (
                <li key={r.id}>
                  <Link
                    href={r.href}
                    onClick={onClose}
                    className="block rounded-2xl px-4 py-3 transition-colors hover:bg-rose-100/60"
                  >
                    <span className="chip mb-1.5">{r.category}</span>
                    <p className="line-clamp-2 text-sm leading-relaxed text-rose-800">{r.text}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
