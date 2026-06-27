"use client";

import { icons, LucideProps } from "lucide-react";

// Renders a lucide icon by its kebab/Pascal name; falls back to Sparkles.
const toPascal = (name: string) =>
  name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[toPascal(name)] ?? icons.Sparkles;
  return <Cmp {...props} />;
}
