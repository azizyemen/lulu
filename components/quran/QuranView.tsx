"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ayah, getByPage, getBySurah, getByJuz, toArabicDigits, PAGE_COUNT, JUZ_COUNT, SURAH_COUNT } from "@/lib/quran";
import MushafReader from "@/components/quran/MushafReader";
import { ChevronRight, ChevronLeft, List, Loader2 } from "lucide-react";

type Mode = "page" | "surah" | "juz";

const MAX: Record<Mode, number> = { page: PAGE_COUNT, surah: SURAH_COUNT, juz: JUZ_COUNT };
const NOUN: Record<Mode, string> = { page: "صفحة", surah: "سورة", juz: "جزء" };
// URL segment per mode ("pages" avoids a folder/route collision with app/quran/page.tsx)
const SEG: Record<Mode, string> = { page: "pages", surah: "surah", juz: "juz" };

export default function QuranView({ mode, num }: { mode: Mode; num: number }) {
  const [ayahs, setAyahs] = useState<Ayah[] | null>(null);
  const [error, setError] = useState(false);
  const [jump, setJump] = useState("");
  const router = useRouter();

  useEffect(() => {
    let active = true;
    setAyahs(null);
    setError(false);
    const fetcher = mode === "page" ? getByPage : mode === "surah" ? getBySurah : getByJuz;
    fetcher(num)
      .then((a) => active && setAyahs(a))
      .catch(() => active && setError(true));
    window.scrollTo({ top: 0 });
    return () => {
      active = false;
    };
  }, [mode, num]);

  const title =
    mode === "surah" && ayahs?.length
      ? ayahs[0].surah.name
      : `${NOUN[mode] === "صفحة" ? "صفحة" : "ال" + NOUN[mode]} ${toArabicDigits(num)}`;

  const prev = num > 1 ? num - 1 : null;
  const next = num < MAX[mode] ? num + 1 : null;

  const doJump = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(jump, 10);
    if (n >= 1 && n <= MAX[mode]) {
      router.push(`/quran/${SEG[mode]}/${n}`);
      setJump("");
    }
  };

  return (
    <div className="space-y-5">
      {/* Header / controls */}
      <div className="glass-strong flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/quran" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-rose-600 transition-colors hover:bg-white/80" aria-label="فهرس المصحف">
            <List size={18} />
          </Link>
          <h1 className="font-display text-2xl font-bold text-rose-800">{title}</h1>
        </div>

        <div className="flex items-center gap-2">
          <NavBtn href={next ? `/quran/${SEG[mode]}/${next}` : null} aria-label="التالي">
            <ChevronRight size={20} />
          </NavBtn>
          <form onSubmit={doJump} className="flex items-center gap-1 rounded-full bg-white/50 px-2 py-1">
            <input
              inputMode="numeric"
              value={jump}
              onChange={(e) => setJump(e.target.value.replace(/\D/g, ""))}
              placeholder={`${NOUN[mode]} (١-${toArabicDigits(MAX[mode])})`}
              className="w-28 bg-transparent px-2 py-1 text-center text-sm text-rose-800 placeholder:text-rose-300 outline-none"
              aria-label={`اذهبي إلى ${NOUN[mode]}`}
            />
          </form>
          <NavBtn href={prev ? `/quran/${SEG[mode]}/${prev}` : null} aria-label="السابق">
            <ChevronLeft size={20} />
          </NavBtn>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <div className="glass p-10 text-center">
          <p className="text-rose-700/80">تعذّر تحميل المحتوى. تأكّدي من الاتصال وحاولي مجددًا.</p>
        </div>
      ) : !ayahs ? (
        <div className="glass-strong flex flex-col items-center gap-3 p-16 text-center">
          <Loader2 size={28} className="animate-spin text-rose-400" />
          <p className="text-sm text-rose-500/80">جارٍ تحميل {NOUN[mode]} {toArabicDigits(num)}…</p>
        </div>
      ) : (
        <MushafReader ayahs={ayahs} />
      )}

      {/* Bottom nav */}
      <div className="flex items-center justify-between">
        <NavLinkWide href={next ? `/quran/${SEG[mode]}/${next}` : null} side="next">
          {NOUN[mode]} {next ? toArabicDigits(next) : ""}
        </NavLinkWide>
        <NavLinkWide href={prev ? `/quran/${SEG[mode]}/${prev}` : null} side="prev">
          {NOUN[mode]} {prev ? toArabicDigits(prev) : ""}
        </NavLinkWide>
      </div>
    </div>
  );
}

function NavBtn({ href, children, ...props }: { href: string | null; children: React.ReactNode; "aria-label": string }) {
  if (!href) return <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/30 text-rose-300" {...props}>{children}</span>;
  return (
    <Link href={href} className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-glow-sm transition-transform hover:scale-105" {...props}>
      {children}
    </Link>
  );
}

function NavLinkWide({ href, side, children }: { href: string | null; side: "prev" | "next"; children: React.ReactNode }) {
  if (!href) return <span />;
  return (
    <Link href={href} className="btn-ghost text-sm">
      {side === "next" ? <ChevronRight size={16} /> : null}
      {children}
      {side === "prev" ? <ChevronLeft size={16} /> : null}
    </Link>
  );
}
