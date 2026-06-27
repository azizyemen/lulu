// Single source of truth for every platform section. `ready` marks what is
// live in this phase; the rest render as elegant "coming soon" tiles so the
// full vision is visible and navigable from day one.

export type Section = {
  href: string;
  title: string;
  desc: string;
  icon: string; // lucide icon name
  group: "worship" | "organize" | "growth" | "inspire";
  ready?: boolean;
};

export const sections: Section[] = [
  // العبادات
  { href: "/quran", title: "المصحف الشريف", desc: "اقرئي القرآن صفحة بصفحة بالتفسير والتلاوة", icon: "book-open-text", group: "worship", ready: true },
  { href: "/adhkar/morning", title: "أذكار الصباح", desc: "وردكِ الصباحي بعدّاد ووضع قراءة", icon: "sunrise", group: "worship", ready: true },
  { href: "/adhkar/evening", title: "أذكار المساء", desc: "اختمي يومكِ بذكر الله", icon: "moon", group: "worship", ready: true },
  { href: "/tasbih", title: "المسبحة الإلكترونية", desc: "سبّحي واحمدي وكبّري بلمسة", icon: "infinity", group: "worship", ready: true },
  { href: "/ruqyah", title: "الرقية الشرعية", desc: "رقية كاملة مقسّمة بالموضوع", icon: "shield-plus", group: "worship" },
  { href: "/quran-wird", title: "ورد القرآن", desc: "صفحة، حزب، أو جزء مع متابعة", icon: "book-open", group: "worship", ready: true },
  { href: "/khatmah", title: "ختمة القرآن", desc: "خطة ختمة بشريط تقدّم", icon: "book-marked", group: "worship" },
  { href: "/duas", title: "مكتبة الأدعية", desc: "أدعية مرتبة حسب المناسبات", icon: "hand-heart", group: "worship", ready: true },

  // التنظيم
  { href: "/tasks", title: "مهام اليوم", desc: "قائمة عباداتكِ وعاداتكِ اليومية", icon: "list-checks", group: "organize", ready: true },
  { href: "/planner", title: "المنظّم اليومي", desc: "أهم ٣ مهام، جدولكِ، وملاحظاتكِ", icon: "calendar-range", group: "organize" },
  { href: "/gratitude", title: "مفكرة الامتنان", desc: "أنا ممتنة اليوم لـ…", icon: "sparkle", group: "organize" },
  { href: "/dua-journal", title: "دفتر الدعاء", desc: "سجّلي أدعيتكِ الشخصية وصنّفيها", icon: "notebook-pen", group: "organize" },
  { href: "/calendar", title: "تقويم الإنجازات", desc: "تقويم شهري لالتزامكِ", icon: "calendar-check", group: "organize" },

  // التطوير
  { href: "/challenges", title: "تحديات إيمانية", desc: "تحدي ٣٠ يوم أذكار، قيام، استغفار", icon: "flame", group: "growth" },
  { href: "/goals", title: "أهدافي الإيمانية", desc: "اكتبي أهدافكِ وتابعي إنجازها", icon: "target", group: "growth" },
  { href: "/self-development", title: "ركن تطوير الذات", desc: "عادات، وقت، وتوازن نفسي", icon: "trending-up", group: "growth" },
  { href: "/achievements", title: "لوحة الإنجازات", desc: "أيامكِ المتتالية وإحصائياتكِ", icon: "trophy", group: "growth" },

  // الإلهام
  { href: "/meditation", title: "ركن التأمل", desc: "أصوات طبيعة وآيات السكينة", icon: "wind", group: "inspire" },
  { href: "/stories", title: "قصص ملهمة", desc: "الصحابيات وأمهات المؤمنين", icon: "feather", group: "inspire" },
  { href: "/cards", title: "بطاقات يومية", desc: "بطاقات جميلة قابلة للمشاركة", icon: "image", group: "inspire" },
  { href: "/letters", title: "رسائل إلى نفسكِ", desc: "اكتبي رسالة لنفسكِ المستقبلية", icon: "mail", group: "inspire" },
  { href: "/tips", title: "نصائح نسائية", desc: "أمومة، وقت، وعناية بالنفس", icon: "heart", group: "inspire" },
  { href: "/ask", title: "اسألي واستفيدي", desc: "أسئلة وأجوبة فقهية مبسطة", icon: "message-circle-question", group: "inspire" },
];

export const groupLabels: Record<Section["group"], string> = {
  worship: "العبادات",
  organize: "التنظيم والإنتاجية",
  growth: "النمو والتطوير",
  inspire: "الإلهام والسكينة",
};
