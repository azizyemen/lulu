import type { MetadataRoute } from "next";
import { sections } from "@/data/sections";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/adhkar/morning", "/adhkar/evening", "/tasbih", "/tasks"];
  const ready = sections.filter((s) => s.ready).map((s) => s.href);
  const all = Array.from(new Set([...staticRoutes, ...ready]));

  return all.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
