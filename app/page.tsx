import Clock from "@/components/Clock";
import PrayerTimesCard from "@/components/PrayerTimesCard";
import DailyContent from "@/components/DailyContent";
import AchievementsRing from "@/components/AchievementsRing";
import SectionsExplorer from "@/components/SectionsExplorer";
import FridaySpecial from "@/components/FridaySpecial";
import Hero from "@/components/Hero";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />

      <Reveal>
        <FridaySpecial />
      </Reveal>

      {/* Daily snapshot */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Reveal delay={0}>
          <Clock />
        </Reveal>
        <Reveal delay={0.12}>
          <AchievementsRing />
        </Reveal>
        <Reveal delay={0.24}>
          <PrayerTimesCard />
        </Reveal>
      </section>

      {/* Daily content */}
      <Reveal>
        <DailyContent />
      </Reveal>

      {/* Explore everything */}
      <section id="sections" className="scroll-mt-28">
        <Reveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-rose-800 sm:text-3xl">
            كل ما تحتاجينه <span className="gradient-text-shimmer">في مكان واحد</span>
          </h2>
          <p className="mb-8 text-center text-rose-600/70">اختاري ركنكِ وابدئي رحلتكِ</p>
        </Reveal>
        <SectionsExplorer />
      </section>
    </div>
  );
}
