import Clock from "@/components/Clock";
import PrayerTimesCard from "@/components/PrayerTimesCard";
import DailyContent from "@/components/DailyContent";
import AchievementsRing from "@/components/AchievementsRing";
import SectionsExplorer from "@/components/SectionsExplorer";
import FridaySpecial from "@/components/FridaySpecial";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative pt-4 text-center">
        <p className="mb-3 inline-block rounded-full bg-rose-100/70 px-4 py-1.5 text-sm font-medium text-rose-600 animate-fade-up">
          إلهامكِ .. جمالكِ .. نجاحكِ
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-rose-800 sm:text-6xl animate-fade-up">
          ابدئي يومكِ <span className="gradient-text">مع الله</span>
        </h1>
        <p
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rose-700/80 sm:text-lg animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          رفيقتكِ اليومية للتقرّب إلى الله، والمحافظة على أذكاركِ وعباداتكِ،
          وتنظيم وقتكِ، والاعتناء بروحكِ ونفسكِ — بسكينةٍ وجمال.
        </p>
      </section>

      <FridaySpecial />

      {/* Daily snapshot */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Clock />
        <AchievementsRing />
        <PrayerTimesCard />
      </section>

      {/* Daily content */}
      <section>
        <DailyContent />
      </section>

      {/* Explore everything */}
      <section>
        <h2 className="mb-2 text-center font-display text-2xl font-bold text-rose-800">
          كل ما تحتاجينه في مكان واحد
        </h2>
        <p className="mb-8 text-center text-rose-600/70">اختاري ركنكِ وابدئي رحلتكِ</p>
        <SectionsExplorer />
      </section>
    </div>
  );
}
