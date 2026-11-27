"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PRIZES_DATA } from "@/data/event";

export function PrizesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="prizes"
      aria-labelledby="prizes-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="section-label">Prizes 04</p>
          <h2
            id="prizes-heading"
            className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            Prize pool
          </h2>
          <p className="mt-3 max-w-md text-sm text-dusk">
            {PRIZES_DATA.certificateNote}
          </p>
        </div>
        <div className="md:text-right">
          <p className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-mist tabular-nums leading-none">
            {PRIZES_DATA.totalPool}
          </p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-mute">
            {PRIZES_DATA.totalLabel}
          </p>
        </div>
      </motion.div>

      {/* Podium-style first places + runners */}
      <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">
            Day 1 — Management Summit
          </h3>
          <ol className="mt-5 divide-y divide-white/8 border-y border-hairline">
            {PRIZES_DATA.day1.map((row, i) => (
              <li
                key={row.place}
                className="flex items-baseline justify-between gap-4 py-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xs text-lilac tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base text-dusk">{row.place}</span>
                </div>
                <span className="font-display text-xl sm:text-2xl font-semibold text-mist tabular-nums">
                  {row.amount}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">
            Day 2 — Sprintathon
          </h3>
          <ol className="mt-5 divide-y divide-white/8 border-y border-hairline">
            {PRIZES_DATA.day2.map((row, i) => (
              <li
                key={row.place}
                className="flex items-baseline justify-between gap-4 py-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xs text-lilac tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm sm:text-base text-dusk">{row.place}</span>
                </div>
                <span className="font-display text-xl sm:text-2xl font-semibold text-mist tabular-nums">
                  {row.amount}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
