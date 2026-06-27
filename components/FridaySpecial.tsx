"use client";

import { useEffect, useState } from "react";
import { isFriday } from "@/lib/date";
import { BookOpen, Heart, Clock3, Sparkles } from "lucide-react";

// "زاد الجمعة" — appears only on Fridays as a special, warm banner.
export default function FridaySpecial() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isFriday());
  }, []);

  if (!show) return null;

  return (
    <section className="glass-strong relative overflow-hidden p-7 animate-fade-up">
      <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-gold-300/30 blur-3xl" />
      <div className="relative">
        <span className="chip mb-3">
          <Sparkles size={13} /> زاد الجمعة
        </span>
        <h2 className="font-display text-2xl font-bold text-rose-800">
          جمعةٌ مباركة 🌷
        </h2>
        <p className="mt-1 text-rose-700/80">اغتنمي بركات هذا اليوم العظيم</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <FridayItem icon={<BookOpen size={16} />} title="سورة الكهف" desc="نورٌ ما بين الجمعتين" />
          <FridayItem icon={<Heart size={16} />} title="الصلاة على النبي ﷺ" desc="أكثري منها اليوم" />
          <FridayItem icon={<Clock3 size={16} />} title="ساعة الإجابة" desc="آخر ساعة بعد العصر" />
        </div>
      </div>
    </section>
  );
}

function FridayItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/40 p-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 text-white">
        {icon}
      </span>
      <div>
        <p className="font-bold text-rose-800">{title}</p>
        <p className="text-xs text-rose-600/80">{desc}</p>
      </div>
    </div>
  );
}
