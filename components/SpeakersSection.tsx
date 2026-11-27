"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Mic, Sparkles } from "lucide-react";

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
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2
          id="speakers-heading"
          className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
        >
          Keynote Speakers
        </h2>
        <p className="mt-3 text-sm sm:text-base text-dusk">
          Industry leaders bridging engineering, product, and management.
        </p>
      </motion.div>

      {/* Featured Speaker Card */}
      <motion.article
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel mt-10 rounded-[14px] p-7 sm:p-10 transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-lilac/50 bg-purple/30 shadow-[0_0_28px_rgba(139,92,246,0.3)]">
              <Mic className="h-9 w-9 text-lilac" aria-hidden="true" />
              <span className="absolute -bottom-1 right-0 inline-flex items-center gap-1 rounded-full border border-lilac/40 bg-deep px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-lilac">
                <span className="h-1.5 w-1.5 rounded-full bg-lilac animate-pulse" />
                Day 1
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-lilac/35 bg-purple/45 px-3 py-0.5 text-xs font-medium text-lilac">
                  Featured Speaker
                </span>
                <span className="text-xs font-medium text-dusk">
                  40–45 min keynote + 15–20 min Q&amp;A
                </span>
              </div>

              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-mist">
                Tiaga Sir
              </h3>
              <p className="mt-1 text-sm sm:text-base font-medium text-lilac">
                CarrotLane · Details &amp; LinkedIn to be updated
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {TALK_TOPICS.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-lilac/20 bg-deep/65 px-3 py-1 text-xs font-medium text-dusk"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-lilac/25 bg-deep/70 px-4 py-2 text-xs font-semibold text-dusk">
              <ExternalLink className="h-4 w-4 text-lilac" aria-hidden="true" />
              LinkedIn Coming Soon
            </span>
          </div>
        </div>
      </motion.article>

      {/* Upcoming Speakers */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[1, 2].map((slot) => (
          <motion.div
            key={slot}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              delay: 0.12 * slot,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="glass-surface-lite flex items-center justify-between rounded-[12px] border border-dashed border-lilac/30 p-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-lilac">
                Guest Speaker 0{slot + 1}
              </p>
              <p className="mt-1 font-display text-lg font-medium text-mist">
                To Be Announced
              </p>
              <p className="mt-1 text-xs text-dusk">
                Stay tuned for more industry mentors &amp; jury members.
              </p>
            </div>
            <Sparkles className="h-5 w-5 text-lilac/70 shrink-0" aria-hidden="true" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
