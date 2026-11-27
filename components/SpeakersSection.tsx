"use client";

import { motion, useReducedMotion } from "framer-motion";

const TALK_TOPICS = [
  "Leadership & Decision-Making",
  "From Student Projects to Startups",
  "Engineers in Management",
];

export function SpeakersSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <p className="section-label">Speakers 06</p>
        <h2
          id="speakers-heading"
          className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
        >
          Keynote
        </h2>
        <p className="mt-3 max-w-lg text-sm text-dusk">
          Industry leaders bridging engineering, product, and management.
        </p>
      </motion.div>

      <motion.article
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mt-12 grid grid-cols-1 gap-8 border border-hairline p-7 sm:p-10 lg:grid-cols-[10rem_1fr] lg:gap-12"
      >
        <div className="flex h-36 w-36 items-center justify-center border border-hairline bg-raised sm:h-40 sm:w-40">
          <span className="font-display text-3xl font-semibold text-mute">TS</span>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lilac">
            Featured · Day 1 · 40–45 min + Q&amp;A
          </p>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-mist tracking-tight">
            Tiaga Sir
          </h3>
          <p className="mt-1 text-sm text-dusk">CarrotLane · Details to be updated</p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {TALK_TOPICS.map((topic) => (
              <li key={topic} className="text-sm text-mute">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2].map((slot) => (
          <div
            key={slot}
            className="border border-dashed border-edge px-6 py-7"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
              Guest {String(slot + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-display text-lg font-medium text-mist">
              To be announced
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
