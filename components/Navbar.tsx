"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/logo.png";
import SearchModal from "@/components/SearchModal";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/adhkar/morning", label: "أذكار الصباح" },
  { href: "/adhkar/evening", label: "أذكار المساء" },
  { href: "/tasbih", label: "المسبحة" },
  { href: "/tasks", label: "مهامي" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto w-full max-w-6xl px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? "mt-1.5" : "mt-3"
        }`}
      >
        <nav
          className={`glass-strong flex items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-6 ${
            scrolled ? "py-1.5 shadow-glow-sm" : "py-2.5"
          }`}
        >
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)} aria-label="لولو — الرئيسية">
            <Image
              src={logo}
              alt="لولو"
              priority
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-8 sm:h-9" : "h-9 sm:h-11"
              }`}
            />
          </Link>

          <div className="flex items-center gap-1.5">
            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        active
                          ? "bg-rose-500 text-white shadow-glow-sm"
                          : "text-rose-800 hover:bg-rose-100/70"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <button
              className="rounded-full p-2 text-rose-700 transition-colors hover:bg-rose-100/70"
              onClick={() => setSearchOpen(true)}
              aria-label="بحث"
            >
              <Search size={20} />
            </button>

            <button
              className="rounded-full p-2 text-rose-700 hover:bg-rose-100/70 md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="القائمة"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-strong mt-2 rounded-3xl p-2 md:hidden animate-fade-up">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                    active ? "bg-rose-500 text-white" : "text-rose-800 hover:bg-rose-100/70"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
