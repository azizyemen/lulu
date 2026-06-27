"use client";

import { useState, Fragment } from "react";
import { Ayah, toArabicDigits } from "@/lib/quran";
import VerseSheet from "@/components/quran/VerseSheet";
import { useFeedback } from "@/lib/useFeedback";

export default function MushafReader({ ayahs }: { ayahs: Ayah[] }) {
  const [selected, setSelected] = useState<Ayah | null>(null);
  const feedback = useFeedback();

  const open = (a: Ayah) => {
    feedback();
    setSelected(a);
  };

  return (
    <>
      <div className="glass-strong relative overflow-hidden p-6 sm:p-9">
        {/* gilded inner frame */}
        <div className="pointer-events-none absolute inset-2 rounded-[1.4rem] border border-gold-300/40" />
        <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-rose-200/40" />

        <div
          dir="rtl"
          className="relative font-quran text-2xl leading-[2.5] text-rose-900 sm:text-3xl sm:leading-[2.7]"
          style={{ textAlign: "justify", textAlignLast: "center" }}
        >
          {ayahs.map((a, i) => {
            const prev = ayahs[i - 1];
            const newSurah = !prev || prev.surah.number !== a.surah.number;
            const isSelected = selected?.number === a.number;
            return (
              <Fragment key={a.number}>
                {newSurah && <SurahHeader ayah={a} />}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => open(a)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open(a)}
                  aria-label={`الآية ${a.numberInSurah} من ${a.surah.name}`}
                  className={`cursor-pointer rounded-lg px-1 transition-colors duration-200 hover:bg-rose-100/70 ${
                    isSelected ? "bg-rose-200/70" : ""
                  }`}
                >
                  {a.text}
                  <span className="ayah-marker">{toArabicDigits(a.numberInSurah)}</span>
                </span>{" "}
              </Fragment>
            );
          })}
        </div>
      </div>

      <VerseSheet ayah={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function SurahHeader({ ayah }: { ayah: Ayah }) {
  return (
    <span className="my-4 flex flex-col items-center gap-1 py-2 select-none">
      <span className="flex items-center gap-3 text-rose-500">
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300" />
        <span className="font-display text-xl font-bold text-rose-700">{ayah.surah.name}</span>
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300" />
      </span>
      <span className="text-xs font-sans text-rose-400">
        {ayah.surah.revelationType === "Meccan" ? "مكية" : "مدنية"} ·{" "}
        {toArabicDigits(ayah.surah.numberOfAyahs)} آيات
      </span>
    </span>
  );
}
