"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Bolt, Calendar, MapPin, Sparkles } from "lucide-react";
import { EVENT, getDisplayVenue } from "@/data/event";
import { WebGLNebula } from "@/components/WebGLNebula";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const venue = getDisplayVenue();

  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="top"
      aria-label="MONOLITH festival overview"
      className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col items-center justify-between overflow-hidden px-5 pt-4 pb-10 sm:px-8 sm:pt-6 sm:pb-12"
    >
      {/* Background Layer 0: WebGL Cosmic Nebula Shader (visible above body bg) */}
      <WebGLNebula />

      {/* Background Layer 1: Radial Plasma Blooms + Cyber Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 z-0 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amethyst/25 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="monolith-grid-layer pointer-events-none absolute inset-0 z-0"
      />

      {/* Telemetry Ambient Edge Lines (Left & Right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 opacity-45 xl:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-lilac [writing-mode:vertical-rl]">
          SEC SBC // GRID-LAT 12.9602 N
        </span>
        <div className="h-28 w-px bg-gradient-to-b from-transparent via-lilac to-transparent" />
        <span className="text-[10px] font-medium text-dusk">SYS.ONLINE</span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-4 opacity-45 xl:flex"
      >
        <span className="text-[10px] font-medium uppercase text-dusk">
          CH-01 // NODE:2026
        </span>
        <div className="h-28 w-px bg-gradient-to-b from-transparent via-amethyst to-transparent" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-lilac [writing-mode:vertical-rl]">
          MONOLITH PROTOCOL
        </span>
      </div>

      {/* Institutional Strip */}
      <motion.div
        {...fadeUp(0)}
        className="glass-surface-lite relative z-10 mb-6 flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium text-dusk"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-lilac animate-pulse" />
          <span className="font-semibold uppercase tracking-wider text-lilac">
            Sri Sai Ram Engineering College
          </span>
          <span className="hidden sm:inline text-dusk/50">•</span>
          <span className="hidden sm:inline">Autonomous | NBA &amp; NAAC A+</span>
        </div>
        <div className="flex items-center gap-2">
          <span>IEEE TEMS SEC SBC</span>
          <span className="text-dusk/50">•</span>
          <span>IEEE Madras Section</span>
        </div>
      </motion.div>

      {/* Central Stitch-designed Hero Content */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Presentation & Date Pills */}
        <motion.div
          {...fadeUp(0.05)}
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="glass-surface-lite inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-[0_0_20px_rgba(109,63,224,0.35)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amethyst opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lilac" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lilac">
              IEEE TEMS SEC SBC PRESENTS
            </span>
          </div>

          <div className="glass-surface-lite inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <Calendar className="h-3.5 w-3.5 text-lilac" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-mist tabular-nums">
              {EVENT.EVENT_DATES.shortRange}
            </span>
            <span className="text-dusk/60">•</span>
            <MapPin className="h-3.5 w-3.5 text-lilac" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-dusk">
              {venue}
            </span>
          </div>
        </motion.div>

        {/* Monumental MONOLITH Title */}
        <motion.div {...fadeUp(0.12)} className="flex flex-col items-center">
          <h1
            className="font-display text-[clamp(3.2rem,11vw,8.75rem)] font-bold uppercase leading-none tracking-tight select-none bg-gradient-to-b from-mist via-lilac to-violet bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 42px rgba(184, 146, 255, 0.55))",
            }}
          >
            MONOLITH
          </h1>

          {/* Light Edge Accent Bar */}
          <div className="mt-1 mb-4 h-[2px] w-48 sm:w-80 bg-gradient-to-r from-transparent via-lilac to-transparent opacity-90 shadow-[0_0_16px_rgba(184,146,255,0.9)]" />

          <p className="font-display text-xs sm:text-base font-medium uppercase tracking-[0.35em] text-mist drop-shadow-[0_0_15px_rgba(248,248,255,0.35)]">
            BUILD BEYOND BOUNDARIES
          </p>

          <p className="mt-3 max-w-2xl text-sm sm:text-lg text-dusk leading-relaxed">
            A 2-Day National Tech &amp; Innovation Festival — where{" "}
            <span className="text-mist font-medium">Management</span> meets{" "}
            <span className="text-mist font-medium">Technology</span>.
          </p>
        </motion.div>

        {/* Dual Track Cards (Day 1 & Day 2) */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 text-left md:grid-cols-2"
        >
          <a
            href="#days"
            className="glass-panel group rounded-[12px] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lilac/50"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded bg-purple/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-lilac">
                DAY 01 // SUMMIT
              </span>
              <Sparkles
                className="h-4 w-4 text-lilac transition-transform duration-300 group-hover:rotate-12"
                aria-hidden="true"
              />
            </div>
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-mist">
              Management Summit
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-dusk leading-relaxed">
              Industry Speaker (Tiaga, CarrotLane) • Find Your Co-Founder • Team Pitch Challenge
            </p>
          </a>

          <a
            href="#days"
            className="glass-panel group rounded-[12px] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-lilac/50"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded bg-purple/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-lilac">
                DAY 02 // BUILDATHON
              </span>
              <Bolt
                className="h-4 w-4 text-lilac transition-transform duration-300 group-hover:rotate-12"
                aria-hidden="true"
              />
            </div>
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide text-mist">
              6-Hour Sprintathon
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-dusk leading-relaxed">
              On-the-spot Problem Statements • Rapid Prototyping • Live Jury Evaluation
            </p>
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.28)}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row"
        >
          <a
            href="#passes"
            className="cta-primary group inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold uppercase tracking-wider active:scale-[0.98] sm:w-auto"
          >
            <span>Register Now</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>

          <a
            href="#schedule"
            className="cta-secondary inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold uppercase tracking-wider active:scale-[0.98] sm:w-auto"
          >
            <span>Explore Events</span>
          </a>
        </motion.div>

        {/* Quick Metrics Strip */}
        <motion.div
          {...fadeUp(0.36)}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-dusk"
        >
          <span>
            <strong className="text-mist font-semibold">₹17,000+</strong> Prize Pool
          </span>
          <span aria-hidden="true" className="text-lilac/40">•</span>
          <span>
            <strong className="text-mist font-semibold">2 Days</strong> of Innovation
          </span>
          <span aria-hidden="true" className="text-lilac/40">•</span>
          <span>
            <strong className="text-mist font-semibold">Passes</strong> from ₹100
          </span>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to explore"
        {...fadeUp(0.42)}
        className="relative z-10 mt-6 inline-flex flex-col items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-dusk transition-colors hover:text-lilac"
      >
        <span>Scroll to explore</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-lilac" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
