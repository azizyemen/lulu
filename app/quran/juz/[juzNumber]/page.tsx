import { notFound } from "next/navigation";
import QuranView from "@/components/quran/QuranView";
import { JUZ_COUNT } from "@/lib/quran";

export function generateStaticParams() {
  return Array.from({ length: JUZ_COUNT }, (_, i) => ({ juzNumber: String(i + 1) }));
}

export default function JuzPage({ params }: { params: { juzNumber: string } }) {
  const n = parseInt(params.juzNumber, 10);
  if (!n || n < 1 || n > JUZ_COUNT) notFound();
  return <QuranView mode="juz" num={n} />;
}
