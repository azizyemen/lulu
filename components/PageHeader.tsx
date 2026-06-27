import Icon from "@/components/Icon";

// Consistent glass header for section pages.
export default function PageHeader({
  icon,
  title,
  subtitle,
  id = "page-title",
}: {
  icon: string;
  title: string;
  subtitle: string;
  id?: string;
}) {
  return (
    <header className="glass-strong relative overflow-hidden p-7 sm:p-8">
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-rose-300/30 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-glow-sm">
          <Icon name={icon} size={26} />
        </span>
        <div>
          <h1 id={id} className="font-display text-3xl font-bold text-rose-800 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-1 text-rose-600/80">{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
