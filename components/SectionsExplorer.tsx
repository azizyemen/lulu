import Link from "next/link";
import { sections, groupLabels, Section } from "@/data/sections";
import Icon from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

const groups: Section["group"][] = ["worship", "organize", "growth", "inspire"];

export default function SectionsExplorer() {
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <Reveal key={g}>
          <section>
            <h3 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-rose-700">
              <span className="h-5 w-1 rounded-full bg-gradient-to-b from-rose-400 to-gold-400" />
              {groupLabels[g]}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {sections
                .filter((s) => s.group === g)
                .map((s) => (
                  <SectionTile key={s.href} section={s} />
                ))}
            </div>
          </section>
        </Reveal>
      ))}
    </div>
  );
}

function SectionTile({ section }: { section: Section }) {
  const inner = (
    <div
      className={`group relative flex h-full flex-col gap-2 overflow-hidden rounded-3xl border p-4 transition-all duration-500 ${
        section.ready
          ? "glass glass-hover shine border-white/60"
          : "border-rose-100/60 bg-white/30"
      }`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
          section.ready
            ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-sm"
            : "bg-rose-100 text-rose-400"
        }`}
      >
        <Icon name={section.icon} size={20} />
      </span>
      <h4 className="font-display text-base font-bold text-rose-800">{section.title}</h4>
      <p className="text-xs leading-relaxed text-rose-600/80">{section.desc}</p>
      {!section.ready && (
        <span className="absolute left-3 top-3 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-medium text-rose-500">
          قريبًا
        </span>
      )}
    </div>
  );

  if (section.ready) {
    return (
      <Link href={section.href} className="h-full">
        {inner}
      </Link>
    );
  }
  return <div className="h-full cursor-default">{inner}</div>;
}
