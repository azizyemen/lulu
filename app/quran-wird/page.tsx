import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "ورد القرآن · لولو",
  description: "حدّدي وردكِ اليومي من القرآن — صفحة، صفحتان، حزب أو جزء — مع متابعة إنجازكِ يومًا بيوم.",
};

const options = [
  { id: "page", label: "صفحة", desc: "وردٌ لطيف يناسب الأيام المزدحمة", icon: "book-open" },
  { id: "two", label: "صفحتان", desc: "خطوة متوازنة نحو الختمة", icon: "book-open" },
  { id: "hizb", label: "حزب", desc: "نصف جزء يوميًا", icon: "book-marked" },
  { id: "juz", label: "جزء", desc: "ختمة في ثلاثين يومًا", icon: "book-marked" },
];

export default function QuranWirdPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        icon="book-open"
        title="ورد القرآن"
        subtitle="اختاري وردكِ اليومي وتابعي تقدّمكِ نحو الختمة"
      />

      <Reveal>
        <section aria-labelledby="wird-options">
          <h2 id="wird-options" className="mb-4 font-display text-xl font-bold text-rose-700">
            اختاري مقدار وردكِ
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {options.map((o) => (
              <div key={o.id} className="glass glass-hover shine flex flex-col items-center gap-2 p-5 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-sm">
                  <Icon name={o.icon} size={22} />
                </span>
                <h3 className="font-display text-lg font-bold text-rose-800">{o.label}</h3>
                <p className="text-xs leading-relaxed text-rose-600/80">{o.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="glass p-7 text-center">
          <span className="chip mx-auto mb-3">قيد الإعداد</span>
          <h2 className="font-display text-xl font-bold text-rose-700">متابعة الإنجاز وسجلّ الحفظ</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-rose-600/80">
            نُجهّز لكِ شريط تقدّم يومي، نسبة الإنجاز، تذكيرًا لطيفًا، وسجلًّا لحفظكِ —
            ليصبح وردكِ عادةً ثابتة ومُحبَّبة. ترقّبي التحديث القادم بإذن الله. 🌷
          </p>
        </section>
      </Reveal>
    </div>
  );
}
