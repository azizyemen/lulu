import { notFound } from "next/navigation";
import AdhkarReader from "@/components/AdhkarReader";
import { morningAdhkar, eveningAdhkar } from "@/data/adhkar";

const config = {
  morning: {
    title: "أذكار الصباح",
    subtitle: "حصِّني نفسكِ بذكر الله في بداية يومكِ",
    items: morningAdhkar,
  },
  evening: {
    title: "أذكار المساء",
    subtitle: "اختمي يومكِ في معيّة الله وحفظه",
    items: eveningAdhkar,
  },
} as const;

export function generateStaticParams() {
  return [{ type: "morning" }, { type: "evening" }];
}

export default function AdhkarPage({ params }: { params: { type: string } }) {
  const data = config[params.type as keyof typeof config];
  if (!data) notFound();

  return (
    <AdhkarReader
      type={params.type as "morning" | "evening"}
      title={data.title}
      subtitle={data.subtitle}
      items={data.items}
    />
  );
}
