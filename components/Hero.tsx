"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, Sparkles, Sunrise } from "lucide-react";
import logo from "@/assets/logo.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex flex-col items-center pt-2 text-center sm:pt-4">
      {/* Floating, glowing logo */}
      <motion.div
        className="relative mb-2"
        initial={reduce ? false : { opacity: 0, scale: 0.85, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        {/* glow halo */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(211,132,151,0.55) 0%, rgba(231,201,160,0.35) 45%, transparent 70%)",
          }}
          aria-hidden
        />
        <motion.div
          animate={reduce ? {} : { y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={logo}
            alt="لولو"
            priority
            className="h-auto w-[clamp(230px,44vw,440px)] drop-shadow-[0_18px_40px_rgba(171,96,121,0.35)]"
          />
        </motion.div>
        {/* twinkles */}
        {!reduce &&
          [
            { c: "left-2 top-6", d: 0 },
            { c: "right-4 top-10", d: 1.2 },
            { c: "right-10 bottom-6", d: 2.1 },
          ].map((s, i) => (
            <motion.span
              key={i}
              className={`absolute ${s.c} text-gold-400`}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: s.d, ease: "easeInOut" }}
              aria-hidden
            >
              <Sparkles size={16} />
            </motion.span>
          ))}
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center">
        <motion.p
          variants={item}
          className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-rose-200/70 bg-rose-100/60 px-4 py-1.5 text-sm font-medium text-rose-600 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-gold-500" />
          إلهامكِ .. جمالكِ .. نجاحكِ
        </motion.p>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-tight text-rose-800 sm:text-6xl"
        >
          ابدئي يومكِ <span className="gradient-text-shimmer">مع الله</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-rose-700/80 sm:text-lg"
        >
          رفيقتكِ اليومية للتقرّب إلى الله، والمحافظة على أذكاركِ وعباداتكِ،
          وتنظيم وقتكِ، والاعتناء بروحكِ ونفسكِ — بسكينةٍ وجمال.
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="#sections" className="btn-rose group">
            ابدئي رحلتكِ
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
          <Link href="/adhkar/morning" className="btn-ghost">
            <Sunrise size={17} />
            أذكار الصباح
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
