import { morningAdhkar, eveningAdhkar } from "@/data/adhkar";
import { adiya, hikam } from "@/data/daily";

export type SearchEntry = {
  id: string;
  text: string;
  category: string;
  href: string;
};

// Flat client-side search index over adhkar, du'as and hikam.
export const searchIndex: SearchEntry[] = [
  ...morningAdhkar.map((d) => ({
    id: `s-${d.id}`,
    text: d.text,
    category: "أذكار الصباح",
    href: "/adhkar/morning",
  })),
  ...eveningAdhkar.map((d) => ({
    id: `s-${d.id}`,
    text: d.text,
    category: "أذكار المساء",
    href: "/adhkar/evening",
  })),
  ...adiya.map((d, i) => ({
    id: `s-dua-${i}`,
    text: d.text,
    category: "أدعية",
    href: "/duas",
  })),
  ...hikam.map((d, i) => ({
    id: `s-hik-${i}`,
    text: d.text,
    category: "حِكَم",
    href: "/",
  })),
];

// Normalize Arabic for forgiving matching: strip tashkeel, unify alef/ya/ta.
export function normalizeAr(s: string): string {
  return s
    .replace(/[ً-ْٰـ]/g, "")
    .replace(/[آأإ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();
}

export function searchAll(query: string, limit = 12): SearchEntry[] {
  const q = normalizeAr(query);
  if (q.length < 2) return [];
  return searchIndex
    .filter((e) => normalizeAr(e.text).includes(q) || normalizeAr(e.category).includes(q))
    .slice(0, limit);
}
