import { notFound } from "next/navigation";
import QuranView from "@/components/quran/QuranView";
import { PAGE_COUNT } from "@/lib/quran";

export function generateStaticParams() {
  return Array.from({ length: PAGE_COUNT }, (_, i) => ({ pageNumber: String(i + 1) }));
}

export default function QuranPageReader({ params }: { params: { pageNumber: string } }) {
  const n = parseInt(params.pageNumber, 10);
  if (!n || n < 1 || n > PAGE_COUNT) notFound();
  return <QuranView mode="page" num={n} />;
}
