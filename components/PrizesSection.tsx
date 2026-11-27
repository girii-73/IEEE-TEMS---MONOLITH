"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { PRIZES_DATA } from "@/data/event";

export function PrizesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="prizes"
      aria-labelledby="prizes-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      {/* Glowing Prize Pool Header Banner */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-[16px] p-7 sm:p-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-lilac/30 bg-purple/40 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lilac mb-3">
            <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
            Rewards &amp; Recognition
          </div>
          <h2
            id="prizes-heading"
            className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            Prize Pool
          </h2>
          <p className="mt-2 text-sm sm:text-base text-dusk max-w-xl">
            {PRIZES_DATA.certificateNote}
          </p>
        </div>

        <div className="flex flex-col md:items-end">
          <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-mist tabular-nums drop-shadow-[0_0_24px_rgba(184,146,255,0.4)]">
            {PRIZES_DATA.totalPool}
          </span>
          <span className="mt-1 text-xs sm:text-sm font-semibold uppercase tracking-widest text-lilac">
            {PRIZES_DATA.totalLabel}
          </span>
        </div>
      </motion.div>

      {/* Two-Column Glassmorphic Prize Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[14px] p-7 transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-mist">
              Day 1 — Management Summit
            </h3>
            <Award className="h-5 w-5 text-lilac" aria-hidden="true" />
          </div>
          <dl className="divide-y divide-lilac/15">
            {PRIZES_DATA.day1.map((row) => (
              <div
                key={row.place}
                className="flex items-baseline justify-between py-4 first:pt-1 last:pb-1"
              >
                <dt className="text-sm sm:text-base font-medium text-dusk">
                  {row.place}
                </dt>
                <dd className="font-display text-xl sm:text-2xl font-bold text-mist tabular-nums">
                  {row.amount}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel rounded-[14px] p-7 transition-transform duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-mist">
              Day 2 — Sprintathon
            </h3>
            <Trophy className="h-5 w-5 text-lilac" aria-hidden="true" />
          </div>
          <dl className="divide-y divide-lilac/15">
            {PRIZES_DATA.day2.map((row) => (
              <div
                key={row.place}
                className="flex items-baseline justify-between py-4 first:pt-1 last:pb-1"
              >
                <dt className="text-sm sm:text-base font-medium text-dusk">
                  {row.place}
                </dt>
                <dd className="font-display text-xl sm:text-2xl font-bold text-mist tabular-nums">
                  {row.amount}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
