"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Zap } from "lucide-react";
import { EVENT, PASSES_DATA } from "@/data/event";

export function PassesSection() {
  const shouldReduceMotion = useReducedMotion();
  const fullPassUrl = EVENT.REG_URLS.full.trim();

  return (
    <section
      id="passes"
      aria-labelledby="passes-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="glass-surface-lite inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lilac mb-3">
          <Zap className="h-3.5 w-3.5" aria-hidden="true" />
          Festival Passes
        </div>
        <h2
          id="passes-heading"
          className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
        >
          Register for MONOLITH
        </h2>
        <p className="mt-3 text-sm sm:text-base text-dusk">
          Choose your pass and complete registration via Google Form. Fees are per person.
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
        {PASSES_DATA.map((pass, idx) => {
          const url = EVENT.REG_URLS[pass.urlKey].trim();
          const hasUrl = url.length > 0;

          return (
            <motion.article
              key={pass.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`glass-panel flex flex-col justify-between rounded-[14px] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 ${
                pass.featured
                  ? "ring-2 ring-amethyst/70 shadow-[0_0_40px_rgba(139,92,246,0.28)] md:-my-2"
                  : ""
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 min-h-[28px]">
                  <h3 className="font-display text-lg font-semibold text-mist">
                    {pass.name}
                  </h3>
                  {pass.badge && (
                    <span className="rounded-full border border-lilac/45 bg-purple/65 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-lilac tabular-nums">
                      {pass.badge}
                    </span>
                  )}
                </div>

                <p className="mt-5 font-display text-4xl sm:text-5xl font-bold text-mist tabular-nums">
                  {pass.price}
                </p>

                <p className="mt-3 text-sm font-semibold text-lilac">
                  {pass.subtitle}
                </p>
                <p className="mt-1.5 text-sm text-dusk leading-relaxed">
                  {pass.detail}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-lilac/15 pt-5 text-xs sm:text-sm text-dusk">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-lilac shrink-0" aria-hidden="true" />
                    <span>Refreshments &amp; Lunch Included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-lilac shrink-0" aria-hidden="true" />
                    <span>Official Participation Certificate</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                {hasUrl ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wider active:scale-[0.98] ${
                      pass.featured ? "cta-primary" : "cta-secondary"
                    }`}
                  >
                    <span>{pass.buttonLabel}</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-lilac/15 bg-deep/50 px-5 py-3 text-sm font-semibold text-dusk/60"
                  >
                    Opens soon
                  </button>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Centered GForm Redirect CTA (No on-site form) */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 flex flex-col items-center text-center"
      >
        <a
          href={fullPassUrl || "#passes"}
          target={fullPassUrl ? "_blank" : undefined}
          rel={fullPassUrl ? "noopener noreferrer" : undefined}
          className="cta-primary group inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-sm sm:text-base font-semibold uppercase tracking-wider active:scale-[0.98]"
        >
          <span>Register Now via Google Form</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
        <p className="mt-3 text-xs sm:text-sm text-dusk">
          Secure your spot · Redirects to official Google Form
        </p>
      </motion.div>
    </section>
  );
}
