"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getSurahs, SurahMeta, toArabicDigits, PAGE_COUNT, JUZ_COUNT } from "@/lib/quran";
import { normalizeAr } from "@/data/searchIndex";
import { Search, BookOpen, Loader2, ArrowLeft } from "lucide-react";

type Tab = "surah" | "juz";

export default function QuranIndex() {
  const [tab, setTab] = useState<Tab>("surah");
  const [surahs, setSurahs] = useState<SurahMeta[] | null>(null);
  const [q, setQ] = useState("");
  const [pageJump, setPageJump] = useState("");

  useEffect(() => {
    getSurahs()
      .then(setSurahs)
      .catch(() => setSurahs([]));
  }, []);

  const filtered = useMemo(() => {
    if (!surahs) return [];
    const n = normalizeAr(q);
    if (!n) return surahs;
    return surahs.filter(
      (s) => normalizeAr(s.name).includes(n) || s.englishName.toLowerCase().includes(q.toLowerCase()) || String(s.number) === n
    );
  }, [surahs, q]);

  return (
    <div className="space-y-6">
      {/* Quick page jump */}
      <div className="glass flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-rose-700">
          <BookOpen size={16} className="text-rose-400" />
          تصفّحي صفحة بصفحة كالمصحف المطبوع
        </p>
        <div className="flex items-center gap-2">
          <Link href="/quran/pages/1" className="btn-rose !px-4 !py-2 text-sm">
            ابدئي من الصفحة ١
          </Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const n = parseInt(pageJump, 10);
              if (n >= 1 && n <= PAGE_COUNT) window.location.href = `/quran/pages/${n}`;
            }}
            className="flex items-center rounded-full bg-white/60 px-2"
          >
            <input
              inputMode="numeric"
              value={pageJump}
              onChange={(e) => setPageJump(e.target.value.replace(/\D/g, ""))}
              placeholder="صفحة"
              aria-label="اذهبي إلى صفحة"
              className="w-20 bg-transparent px-2 py-2 text-center text-sm outline-none placeholder:text-rose-300"
            />
          </form>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2">
        {(["surah", "juz"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
              tab === t ? "bg-rose-500 text-white shadow-glow-sm" : "glass text-rose-700"
            }`}
          >
            {t === "surah" ? "السور" : "الأجزاء"}
          </button>
        ))}
      </div>

      {tab === "surah" ? (
        <>
          <div className="glass mx-auto flex max-w-md items-center gap-2 px-4 py-2.5">
            <Search size={18} className="text-rose-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحثي عن سورة…"
              className="flex-1 bg-transparent text-rose-800 placeholder:text-rose-300 outline-none"
            />
          </div>

          {!surahs ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <Link
                  key={s.number}
                  href={`/quran/surah/${s.number}`}
                  className="glass glass-hover group flex items-center gap-3 p-3.5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 font-display text-sm font-bold text-rose-600">
                    {toArabicDigits(s.number)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-quran text-lg leading-tight text-rose-800">{s.name}</span>
                    <span className="text-xs text-rose-500/80">
                      {s.revelationType === "Meccan" ? "مكية" : "مدنية"} · {toArabicDigits(s.numberOfAyahs)} آيات
                    </span>
                  </span>
                  <ArrowLeft size={16} className="text-rose-300 transition-transform group-hover:-translate-x-1" />
                </Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: JUZ_COUNT }, (_, i) => i + 1).map((j) => (
            <Link
              key={j}
              href={`/quran/juz/${j}`}
              className="glass glass-hover flex flex-col items-center gap-1 p-4 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 font-display text-base font-bold text-white shadow-glow-sm">
                {toArabicDigits(j)}
              </span>
              <span className="text-sm font-medium text-rose-700">الجزء {toArabicDigits(j)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Loading() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="skeleton h-[68px] rounded-3xl" />
      ))}
    </div>
  );
}
