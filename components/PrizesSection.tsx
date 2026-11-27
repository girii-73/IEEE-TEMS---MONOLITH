"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import { PRIZES_DATA } from "@/data/event";

const DAY2_PODIUM = [
  {
    ...PRIZES_DATA.day2[0],
    label: "Champion",
    subtitle: "Grand Winner",
    Icon: Crown,
    accent: "gold",
  },
  {
    ...PRIZES_DATA.day2[1],
    label: "Runner Up",
    subtitle: "2nd Place",
    Icon: Medal,
    accent: "silver",
  },
  {
    ...PRIZES_DATA.day2[2],
    label: "2nd Runner Up",
    subtitle: "3rd Place",
    Icon: Trophy,
    accent: "bronze",
  },
] as const;

const DAY1_AWARDS = [
  {
    ...PRIZES_DATA.day1[0],
    label: "First Place",
    accent: "lilac",
  },
  {
    ...PRIZES_DATA.day1[1],
    label: "First Runner-Up",
    accent: "mist",
  },
  {
    ...PRIZES_DATA.day1[2],
    label: "Second Runner-Up",
    accent: "amber",
  },
] as const;

const ACCENT = {
  gold: {
    border: "border-[#e8c547]/55",
    glow: "shadow-[0_0_0_1px_rgba(232,197,71,0.25),0_0_48px_-12px_rgba(232,197,71,0.55)]",
    icon: "text-[#e8c547]",
    wash: "from-[#e8c547]/18 via-transparent to-transparent",
  },
  silver: {
    border: "border-white/25",
    glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_0_40px_-16px_rgba(248,248,255,0.35)]",
    icon: "text-[#d4d4d8]",
    wash: "from-white/10 via-transparent to-transparent",
  },
  bronze: {
    border: "border-[#c47a4a]/45",
    glow: "shadow-[0_0_0_1px_rgba(196,122,74,0.2),0_0_40px_-16px_rgba(196,122,74,0.45)]",
    icon: "text-[#d49264]",
    wash: "from-[#c47a4a]/16 via-transparent to-transparent",
  },
  lilac: {
    border: "border-lilac/45",
    glow: "shadow-[0_0_0_1px_rgba(152,103,225,0.28),0_0_40px_-14px_rgba(152,103,225,0.48)]",
    icon: "text-lilac",
    wash: "from-lilac/18 via-transparent to-transparent",
  },
  mist: {
    border: "border-white/20",
    glow: "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_36px_-16px_rgba(248,248,255,0.28)]",
    icon: "text-mist",
    wash: "from-white/8 via-transparent to-transparent",
  },
  amber: {
    border: "border-[#5f279e]/50",
    glow: "shadow-[0_0_0_1px_rgba(95,39,158,0.25),0_0_36px_-14px_rgba(95,39,158,0.45)]",
    icon: "text-amethyst",
    wash: "from-[#5f279e]/20 via-transparent to-transparent",
  },
} as const;

export function PrizesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="prizes"
      aria-labelledby="prizes-heading"
      className="relative overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-24 h-64 w-[min(90vw,42rem)] -translate-x-1/2 rounded-full bg-[#e8c547]/[0.07] blur-[90px]" />
        <div className="absolute bottom-24 left-[10%] h-48 w-48 rounded-full bg-lilac/10 blur-[80px]" />
        <div className="absolute right-[8%] top-1/3 h-40 w-40 rounded-full bg-[#5f279e]/14 blur-[70px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 md:py-32">
        <div className="section-rule mb-10 sm:mb-16 md:mb-20" />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="section-label">Prizes 04</p>
          <h2
            id="prizes-heading"
            className="mt-4 font-display text-4xl font-semibold tracking-tight text-mist sm:text-5xl md:text-6xl"
          >
            Prize pool
          </h2>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight text-mist tabular-nums sm:text-4xl">
            {PRIZES_DATA.totalPool}
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.22em] text-mute">
            Win big · {PRIZES_DATA.totalLabel}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-dusk">
            {PRIZES_DATA.certificateNote}
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
            Day 2 — Sprintathon
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">
            {DAY2_PODIUM.map((prize, index) => {
              const style = ACCENT[prize.accent];
              const Icon = prize.Icon;
              return (
                <motion.li
                  key={prize.label}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                  }}
                  className={`relative overflow-hidden rounded-2xl border bg-raised/60 px-5 py-8 text-center backdrop-blur-sm sm:px-6 sm:py-10 ${style.border} ${style.glow}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${style.wash}`}
                  />
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
                    {prize.label}
                  </p>
                  <p className="relative mt-5 font-display text-4xl font-bold tracking-tight text-mist tabular-nums sm:text-[2.75rem]">
                    {prize.amount}
                  </p>
                  <p className="relative mt-2 text-sm text-dusk">
                    {prize.subtitle}
                  </p>
                  <Icon
                    aria-hidden="true"
                    className={`relative mx-auto mt-8 h-8 w-8 ${style.icon}`}
                    strokeWidth={1.5}
                  />
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-14 sm:mt-20">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
            Day 1 — Management Summit
          </p>

          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {DAY1_AWARDS.map((prize, index) => {
              const style = ACCENT[prize.accent];
              return (
                <motion.li
                  key={prize.label}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 16 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : 0.05 + index * 0.06,
                  }}
                  className={`relative overflow-hidden rounded-2xl border bg-raised/50 px-5 py-7 text-center backdrop-blur-sm ${style.border} ${style.glow}`}
                >
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${style.wash}`}
                  />
                  <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-mute">
                    {prize.label}
                  </p>
                  <p className="relative mt-4 font-display text-3xl font-bold tracking-tight text-mist tabular-nums">
                    {prize.amount}
                  </p>
                  <p className="relative mt-1.5 text-xs text-dusk">
                    {prize.place}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
