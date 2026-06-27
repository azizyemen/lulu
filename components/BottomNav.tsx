"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sunrise, Moon, Infinity as InfinityIcon, ListChecks } from "lucide-react";

const tabs = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/adhkar/morning", label: "الصباح", icon: Sunrise },
  { href: "/adhkar/evening", label: "المساء", icon: Moon },
  { href: "/tasbih", label: "المسبحة", icon: InfinityIcon },
  { href: "/tasks", label: "مهامي", icon: ListChecks },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="التنقّل السريع"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
    >
      <div className="glass-strong mx-auto flex max-w-md items-center justify-around rounded-3xl px-2 py-1.5">
        {tabs.map((t) => {
          const active = pathname === t.href;
          const Ic = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-medium transition-colors"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-sm"
                    : "text-rose-400"
                }`}
              >
                <Ic size={19} />
              </span>
              <span className={active ? "text-rose-700" : "text-rose-400"}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
