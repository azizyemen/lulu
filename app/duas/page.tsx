import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import ShareButtons from "@/components/ShareButtons";
import { adiya } from "@/data/daily";

export const metadata: Metadata = {
  title: "مكتبة الأدعية · لولو",
  description: "مجموعة من الأدعية المأثورة الجامعة، مرتّبة لتختاري منها ما يناسب حالكِ — مع إمكانية النسخ والمشاركة.",
};

const categories = ["الصباح والمساء", "الهمّ والكرب", "الرزق", "التوبة والاستغفار", "الأهل والأبناء", "السفر"];

export default function DuasPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        icon="hand-heart"
        title="مكتبة الأدعية"
        subtitle="أدعية مأثورة جامعة — اختاري منها ما يناسب حالكِ"
      />

      {/* Categories (placeholder for richer filtering soon) */}
      <Reveal>
        <div className="flex flex-wrap gap-2" role="list" aria-label="تصنيفات الأدعية">
          {categories.map((c, i) => (
            <span
              key={c}
              role="listitem"
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                i === 0 ? "bg-rose-500 text-white shadow-glow-sm" : "glass text-rose-600"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Starter du'a list */}
      <section aria-labelledby="duas-list">
        <h2 id="duas-list" className="sr-only">
          قائمة الأدعية
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {adiya.map((d, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <article className="glass glass-hover flex h-full flex-col p-6">
                <p className="flex-1 font-quran text-lg leading-loose text-rose-900">{d.text}</p>
                <div className="mt-4 border-t border-rose-100/70 pt-3">
                  <ShareButtons text={d.text} source={d.source} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <p className="text-center text-sm text-rose-500/80">
          نُضيف المزيد من الأدعية المصنّفة حسب المناسبات تباعًا — بإذن الله. 🌷
        </p>
      </Reveal>
    </div>
  );
}
