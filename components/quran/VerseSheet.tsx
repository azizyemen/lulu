"use client";

import { useEffect, useRef, useState } from "react";
import { Ayah, getTafsir, audioUrl, toArabicDigits, TAFSIR_EDITIONS } from "@/lib/quran";
import ShareButtons from "@/components/ShareButtons";
import { useFeedback } from "@/lib/useFeedback";
import { X, Play, Pause, BookText, Loader2 } from "lucide-react";

export default function VerseSheet({ ayah, onClose }: { ayah: Ayah | null; onClose: () => void }) {
  const [edition, setEdition] = useState(TAFSIR_EDITIONS[0].id);
  const [tafsir, setTafsir] = useState("");
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const feedback = useFeedback();

  useEffect(() => {
    if (!ayah) return;
    let active = true;
    setLoading(true);
    setTafsir("");
    getTafsir(ayah.number, edition)
      .then((t) => active && setTafsir(t))
      .catch(() => active && setTafsir("تعذّر تحميل التفسير حاليًا."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [ayah, edition]);

  // Stop audio when the sheet changes/closes.
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, [ayah]);

  if (!ayah) return null;

  const ref = `${ayah.surah.number}:${ayah.numberInSurah}`;

  const toggleAudio = () => {
    feedback();
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl(ayah.number));
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="تفاصيل الآية">
      <div className="absolute inset-0 bg-rose-900/30 backdrop-blur-sm" onClick={onClose} />

      <div className="glass-strong relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 animate-fade-up sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="chip">
            {ayah.surah.name} · الآية {toArabicDigits(ayah.numberInSurah)}
          </span>
          <button onClick={onClose} aria-label="إغلاق" className="rounded-full p-1.5 text-rose-400 hover:bg-rose-100/70 hover:text-rose-600">
            <X size={18} />
          </button>
        </div>

        <p className="font-quran text-2xl leading-loose text-rose-900">{ayah.text}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button onClick={toggleAudio} className="btn-rose !px-4 !py-2.5 text-sm">
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? "إيقاف" : "استماع"}
          </button>
          <ShareButtons text={ayah.text} source={ref} />
        </div>

        {/* Tafsir */}
        <div className="mt-5 rounded-2xl bg-white/40 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 font-display text-sm font-bold text-rose-700">
              <BookText size={15} /> التفسير
            </h3>
            <div className="flex gap-1">
              {TAFSIR_EDITIONS.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setEdition(e.id)}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                    edition === e.id ? "bg-rose-500 text-white" : "bg-white/60 text-rose-500"
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
          {loading ? (
            <p className="flex items-center gap-2 py-4 text-sm text-rose-500/80">
              <Loader2 size={15} className="animate-spin" /> جارٍ تحميل التفسير…
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-rose-800">{tafsir}</p>
          )}
        </div>
      </div>
    </div>
  );
}
