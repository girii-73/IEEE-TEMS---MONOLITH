"use client";

import { motion, useReducedMotion } from "framer-motion";
import { JUDGING_DATA } from "@/data/event";

export function JudgingSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="judging"
      aria-labelledby="judging-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <h2
        id="judging-heading"
        className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
      >
        How you&apos;ll be judged
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Day 1 animated weighted bars */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-mist">
            Day 1 — Management Summit
          </h3>
          <div className="mt-6 space-y-5">
            {JUDGING_DATA.day1.map((item) => (
              <div key={item.criterion}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-sm sm:text-base font-medium text-mist">
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
                  className="mt-2 h-2 w-full overflow-hidden rounded-full bg-midnight/85 border border-lilac/15"
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
                        : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent-violet), var(--accent-lilac))",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day 2 plain criteria list (no weights) */}
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-mist">
            Day 2 — Sprintathon
          </h3>
          <ul className="mt-6 divide-y divide-lilac/15 border-y border-lilac/15">
            {JUDGING_DATA.day2.map((criterion) => (
              <li
                key={criterion}
                className="flex items-center gap-3.5 py-3.5 text-sm sm:text-base font-medium text-dusk"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-lilac"
                />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
