"use client";

import { motion, useReducedMotion } from "framer-motion";
import { JUDGING_DATA } from "@/data/event";

export function JudgingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="judging"
      aria-labelledby="judging-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 md:py-32"
    >
      <div className="section-rule mb-10 sm:mb-16 md:mb-20" />

      <p className="section-label">Judging</p>
      <h2
        id="judging-heading"
        className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
      >
        How you&apos;ll be judged
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-12 sm:gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">
            Day 1 — Weighted criteria
          </h3>
          <div className="mt-6 space-y-5">
            {JUDGING_DATA.day1.map((item) => (
              <div key={item.criterion}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm font-medium text-mist">
                    {item.criterion}
                  </span>
                  <span className="text-sm font-semibold text-lilac tabular-nums">
                    {item.weight}%
                  </span>
                </div>
                <div
                  role="progressbar"
                  aria-label={item.criterion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={item.weight}
                  className="mt-2 h-1 w-full overflow-hidden bg-raised"
                >
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { width: `${item.weight}%` }
                        : { width: "0%" }
                    }
                    whileInView={{ width: `${item.weight}%` }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="h-full bg-lilac"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">
            Day 2 — Evaluation lens
          </h3>
          <ul className="mt-6 divide-y divide-white/8 border-y border-hairline">
            {JUDGING_DATA.day2.map((criterion, i) => (
              <li
                key={criterion}
                className="flex items-center gap-4 py-3.5 text-sm text-dusk"
              >
                <span className="font-display text-xs text-mute tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
