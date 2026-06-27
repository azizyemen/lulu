"use client";

import { ayat, ahadith, adiya, hikam, quotes, pickForToday } from "@/data/daily";
import ShareButtons from "@/components/ShareButtons";
import { BookOpen, MessageSquareQuote, HandHeart, Lightbulb, Quote } from "lucide-react";

export default function DailyContent() {
  const ayah = pickForToday(ayat);
  const hadith = pickForToday(ahadith);
  const dua = pickForToday(adiya);
  const hikmah = pickForToday(hikam);
  const quote = pickForToday(quotes);

  return (
    <div className="space-y-4">
      {/* Featured — رسالتي من القرآن */}
      <article className="glass-strong relative overflow-hidden p-7 sm:p-9 animate-fade-up">
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-rose-300/30 blur-3xl" />
        <div className="relative">
          <span className="chip mb-4">
            <BookOpen size={13} /> رسالتي من القرآن
          </span>
          <p className="font-quran text-2xl leading-loose text-rose-900 sm:text-3xl">
            ﴿ {ayah.text} ﴾
          </p>
          <p className="mt-3 text-sm font-medium text-rose-500">سورة {ayah.surah}</p>
          <div className="mt-4 rounded-2xl bg-white/40 p-4">
            <p className="text-sm leading-relaxed text-rose-700/90">
              <span className="font-bold text-rose-600">تأمّل: </span>
              {ayah.tafsir}
            </p>
          </div>
          <div className="mt-4">
            <ShareButtons text={ayah.text} source={`سورة ${ayah.surah}`} />
          </div>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2">
        <SmallCard
          icon={<MessageSquareQuote size={15} />}
          label="حديث اليوم"
          body={hadith.text}
          meta={hadith.source}
        />
        <SmallCard
          icon={<HandHeart size={15} />}
          label="دعاء اليوم"
          body={dua.text}
        />
        <SmallCard
          icon={<Lightbulb size={15} />}
          label="حكمة اليوم"
          body={hikmah.text}
        />
        <SmallCard
          icon={<Quote size={15} />}
          label="اقتباس ملهم"
          body={quote.text}
        />
      </div>
    </div>
  );
}

function SmallCard({
  icon,
  label,
  body,
  meta,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
  meta?: string;
}) {
  return (
    <article className="glass glass-hover flex flex-col p-5">
      <span className="chip mb-3 self-start">
        {icon} {label}
      </span>
      <p className="flex-1 leading-relaxed text-rose-800">{body}</p>
      <div className="mt-3 flex items-center justify-between">
        <ShareButtons text={body} source={meta} />
        {meta && <p className="text-xs font-medium text-rose-400">{meta}</p>}
      </div>
    </article>
  );
}
