export type DefaultTask = { id: string; label: string; icon: string };

// Default daily worship/wellbeing checklist. Users can extend/edit at runtime.
export const defaultTasks: DefaultTask[] = [
  { id: "fajr", label: "صلاة الفجر", icon: "sunrise" },
  { id: "morning-adhkar", label: "أذكار الصباح", icon: "sun" },
  { id: "quran", label: "ورد القرآن", icon: "book-open" },
  { id: "water", label: "شرب الماء", icon: "droplet" },
  { id: "walk", label: "المشي", icon: "footprints" },
  { id: "parents", label: "بر الوالدين", icon: "heart-handshake" },
  { id: "sadaqah", label: "الصدقة", icon: "hand-coins" },
  { id: "learn", label: "تعلّم شيء جديد", icon: "graduation-cap" },
  { id: "evening-adhkar", label: "أذكار المساء", icon: "moon" },
  { id: "witr", label: "صلاة الوتر", icon: "stars" },
];

export const tasbihItems = [
  { id: "subhanallah", text: "سُبْحَانَ اللَّهِ", target: 33 },
  { id: "alhamdulillah", text: "الْحَمْدُ لِلَّهِ", target: 33 },
  { id: "allahuakbar", text: "اللَّهُ أَكْبَرُ", target: 34 },
  { id: "tahlil", text: "لَا إِلَهَ إِلَّا اللَّهُ", target: 100 },
  { id: "hawqala", text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", target: 100 },
  { id: "salat", text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ", target: 100 },
];
