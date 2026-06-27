// AlQuran.cloud service — no API key, CORS-enabled. Fetched client-side with
// in-memory + localStorage caching to minimise requests on a static site.
// (No "use client": pure helpers/constants are imported by server route files
// for generateStaticParams; the fetch/localStorage calls only run client-side.)

const API = "https://api.alquran.cloud/v1";

export const PAGE_COUNT = 604;
export const JUZ_COUNT = 30;
export const SURAH_COUNT = 114;

export type SurahMeta = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
};

export type Ayah = {
  number: number; // global 1..6236
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
  sajda: boolean | object;
  surah: {
    number: number;
    name: string;
    englishName: string;
    revelationType: string;
    numberOfAyahs: number;
  };
};

const mem = new Map<string, unknown>();

async function cached<T>(path: string, lsKey: string): Promise<T> {
  if (mem.has(path)) return mem.get(path) as T;
  try {
    const ls = localStorage.getItem(lsKey);
    if (ls) {
      const v = JSON.parse(ls) as T;
      mem.set(path, v);
      return v;
    }
  } catch {
    /* ignore */
  }
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`فشل الجلب (${res.status})`);
  const json = await res.json();
  const data = json.data as T;
  mem.set(path, data);
  try {
    localStorage.setItem(lsKey, JSON.stringify(data));
  } catch {
    /* quota — skip caching */
  }
  return data;
}

export function getSurahs(): Promise<SurahMeta[]> {
  return cached<SurahMeta[]>("/surah", "lulu:quran:surahs");
}

export async function getByPage(n: number): Promise<Ayah[]> {
  const d = await cached<{ ayahs: Ayah[] }>(`/page/${n}/quran-uthmani`, `lulu:q:page:${n}`);
  return d.ayahs;
}

export async function getBySurah(n: number): Promise<Ayah[]> {
  const d = await cached<{ ayahs: Ayah[] }>(`/surah/${n}/quran-uthmani`, `lulu:q:surah:${n}`);
  return d.ayahs;
}

export async function getByJuz(n: number): Promise<Ayah[]> {
  const d = await cached<{ ayahs: Ayah[] }>(`/juz/${n}/quran-uthmani`, `lulu:q:juz:${n}`);
  return d.ayahs;
}

export async function getTafsir(globalNumber: number, edition = "ar.muyassar"): Promise<string> {
  const d = await cached<{ text: string }>(
    `/ayah/${globalNumber}/${edition}`,
    `lulu:q:tafsir:${edition}:${globalNumber}`
  );
  return d.text;
}

// Direct CDN audio URL (Mishary Alafasy, 128kbps) — no fetch needed.
export function audioUrl(globalNumber: number): string {
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNumber}.mp3`;
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
export function toArabicDigits(n: number): string {
  return String(n)
    .split("")
    .map((c) => (/\d/.test(c) ? AR_DIGITS[+c] : c))
    .join("");
}

export const TAFSIR_EDITIONS = [
  { id: "ar.muyassar", label: "الميسّر" },
  { id: "ar.jalalayn", label: "الجلالين" },
  { id: "ar.qurtubi", label: "القرطبي" },
];
