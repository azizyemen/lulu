import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import QuranIndex from "@/components/quran/QuranIndex";

export const metadata: Metadata = {
  title: "المصحف الشريف · لولو",
  description:
    "اقرئي القرآن الكريم بالرسم العثماني صفحة بصفحة، تنقّلي بين السور والأجزاء، واطّلعي على التفاسير والتلاوات الصوتية — بتصميم لولو الهادئ.",
};

export default function QuranIndexPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        icon="book-open-text"
        title="المصحف الشريف"
        subtitle="اقرئي، تدبّري، واستمعي — صفحة بصفحة بالرسم العثماني"
      />
      <QuranIndex />
    </div>
  );
}
