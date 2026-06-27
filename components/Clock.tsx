"use client";

import { useEffect, useState } from "react";
import { arabicTime, hijriDate, gregorianDate } from "@/lib/date";
import { CalendarDays, Clock as ClockIcon } from "lucide-react";

export default function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass glass-hover flex flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="flex items-center gap-2 text-rose-500">
        <ClockIcon size={18} />
        <span className="font-display text-3xl font-bold tabular-nums tracking-wide text-rose-700">
          {now ? arabicTime(now) : "—"}
        </span>
      </div>
      <div className="h-px w-16 bg-gradient-to-l from-transparent via-rose-300 to-transparent" />
      <div className="space-y-1 text-sm text-rose-700/90">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <CalendarDays size={15} className="text-rose-400" />
          {now ? hijriDate(now) : ""}
        </p>
        <p className="text-rose-600/70">{now ? gregorianDate(now) : ""}</p>
      </div>
    </div>
  );
}
