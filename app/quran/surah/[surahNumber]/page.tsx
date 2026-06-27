import { notFound } from "next/navigation";
import QuranView from "@/components/quran/QuranView";
import { SURAH_COUNT } from "@/lib/quran";

export function generateStaticParams() {
  return Array.from({ length: SURAH_COUNT }, (_, i) => ({ surahNumber: String(i + 1) }));
}

export default function SurahPage({ params }: { params: { surahNumber: string } }) {
  const n = parseInt(params.surahNumber, 10);
  if (!n || n < 1 || n > SURAH_COUNT) notFound();
  return <QuranView mode="surah" num={n} />;
}
