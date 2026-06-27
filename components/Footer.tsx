"use client";

import Link from "next/link";
import Image from "next/image";
import { sections, groupLabels, Section } from "@/data/sections";
import { useSettings, toggleSetting } from "@/lib/useSettings";
import {
  Instagram,
  Facebook,
  Send,
  Mail,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Vibrate,
  Heart,
} from "lucide-react";
import logo from "@/assets/logo.png";

const groups: Section["group"][] = ["worship", "organize", "growth", "inspire"];
const socials = [
  { icon: Instagram, label: "إنستغرام", href: "#" },
  { icon: Facebook, label: "فيسبوك", href: "#" },
  { icon: Send, label: "تيليجرام", href: "#" },
  { icon: Mail, label: "البريد", href: "#" },
];

export default function Footer() {
  const { night, sound, haptic } = useSettings();
  const year = 1447; // عام هجري تقريبي — يُحدَّث مع المحتوى

  return (
    <footer className="mt-8 border-t border-rose-100/70 bg-white/30 backdrop-blur-md" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        تذييل الموقع
      </h2>
      <div className="mx-auto w-full max-w-6xl px-4 pb-32 pt-12 sm:px-6 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div>
            <Image src={logo} alt="لولو" className="mb-4 h-12 w-auto" />
            <p className="max-w-sm text-sm leading-relaxed text-rose-700/80">
              رفيقتكِ اليومية للتقرّب إلى الله، والاعتناء بروحكِ ونفسكِ — بسكينةٍ وجمال.
            </p>
            <nav aria-label="وسائل التواصل" className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-rose-600 transition-all hover:-translate-y-0.5 hover:bg-rose-500 hover:text-white"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </nav>
          </div>

          {/* Quick links */}
          <nav aria-label="روابط سريعة" className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {groups.map((g) => (
              <div key={g}>
                <h3 className="mb-3 font-display text-sm font-bold text-rose-700">{groupLabels[g]}</h3>
                <ul className="space-y-2">
                  {sections
                    .filter((s) => s.group === g)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.href}>
                        {s.ready ? (
                          <Link href={s.href} className="text-xs text-rose-600/80 transition-colors hover:text-rose-700">
                            {s.title}
                          </Link>
                        ) : (
                          <span className="text-xs text-rose-400/70">{s.title}</span>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Settings + copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-rose-100/70 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-rose-600/80">
            © {year} هـ · منصّة لولو · صُنع بـ
            <Heart size={12} className="fill-rose-400 text-rose-400" />
            لكل مسلمة
          </p>

          <div className="flex items-center gap-2" role="group" aria-label="الإعدادات">
            <ToggleChip
              on={night}
              onClick={() => toggleSetting("night")}
              onIcon={<Moon size={15} />}
              offIcon={<Sun size={15} />}
              label={night ? "الوضع النهاري" : "الوضع الليلي"}
            />
            <ToggleChip
              on={sound}
              onClick={() => toggleSetting("sound")}
              onIcon={<Volume2 size={15} />}
              offIcon={<VolumeX size={15} />}
              label={sound ? "الصوت مفعّل" : "الصوت مكتوم"}
            />
            <ToggleChip
              on={haptic}
              onClick={() => toggleSetting("haptic")}
              onIcon={<Vibrate size={15} />}
              offIcon={<Vibrate size={15} />}
              label={haptic ? "الاهتزاز مفعّل" : "الاهتزاز متوقف"}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ToggleChip({
  on,
  onClick,
  onIcon,
  offIcon,
  label,
}: {
  on: boolean;
  onClick: () => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={on}
      title={label}
      aria-label={label}
      className={`flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all ${
        on ? "bg-rose-500 text-white shadow-glow-sm" : "bg-white/60 text-rose-500"
      }`}
    >
      {on ? onIcon : offIcon}
    </button>
  );
}
