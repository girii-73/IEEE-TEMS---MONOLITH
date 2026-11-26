"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { EVENT, HERO_COPY, getDisplayVenue } from "@/data/event";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  live: boolean;
}

function calculateRemaining(targetIso: string): CountdownState {
  const targetMs = Date.parse(targetIso);
  const diff = targetMs - Date.now();
  if (Number.isNaN(targetMs) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, live: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, live: false };
}

function padTwo(value: number): string {
  return String(value).padStart(2, "0");
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const venue = getDisplayVenue();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const slabParallaxY = useTransform(scrollYProgress, [0, 1], [0, 44]);

  useEffect(() => {
    const sync = () => setCountdown(calculateRemaining(EVENT.EVENT_START_ISO));
    sync();
    const timer = window.setInterval(sync, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const revealBase = shouldReduceMotion ? false : { opacity: 0, y: 12 };

  return (
    <section
      id="top"
      ref={heroRef}
      aria-label="MONOLITH festival overview"
      className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col items-center justify-center px-5 pt-6 pb-12 sm:px-8 sm:pt-10 sm:pb-16"
    >
      {/* Centerpiece: 4:9 sculpted monolith slab on back layer behind crisp wordmark */}
      <div className="relative flex w-full flex-col items-center">
        <div className="relative flex w-full items-center justify-center pt-2">
          {/* Concentrated violet backlight behind stone slab */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[min(640px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(109, 63, 224, 0.36) 0%, rgba(46, 26, 107, 0.22) 45%, rgba(5, 8, 22, 0) 74%)",
            }}
          />

          {/* Tall 4:9 sculpted obsidian-glass stone slab on the back layer (z-0) */}
          <motion.div
            aria-hidden="true"
            style={shouldReduceMotion ? undefined : { y: slabParallaxY }}
            className="relative z-0 flex items-center justify-center"
          >
            <motion.div
              initial={shouldReduceMotion ? false : { y: 44, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              className="hero-slab w-[124px] sm:w-[152px] md:w-[176px] lg:w-[196px] overflow-hidden"
            >
              {/* Chiseled left & right stone bevel planes */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(183, 157, 251, 0.2) 0%, rgba(139, 92, 246, 0.06) 8%, transparent 18%, transparent 80%, rgba(5, 8, 22, 0.45) 94%, rgba(183, 157, 251, 0.14) 100%)",
                }}
              />

              {/* Subtle diagonal stone-face light facet */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(125deg, rgba(183, 157, 251, 0.12) 0%, rgba(139, 92, 246, 0.04) 36%, transparent 52%)",
                }}
              />

              {/* Subtle mineral grain inside the stone face */}
              <div className="monolith-grain-layer absolute inset-0 opacity-75" />

              {/* Top edge lilac highlight fading out at both ends */}
              <div
                className="absolute top-0 left-[6%] right-[6%] h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(236, 235, 255, 0.9) 50%, transparent)",
                }}
              />

              {/* Single upward edge light sweep on initial load */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "-110%", opacity: [0, 0.85, 0] }}
                  transition={{
                    duration: 0.85,
                    delay: 0.34,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-x-0 h-24"
                  style={{
                    background:
                      "linear-gradient(to top, transparent, rgba(183, 157, 251, 0.28) 50%, transparent)",
                    borderTop: "1px solid rgba(183, 157, 251, 0.72)",
                  }}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Giant crisp MONOLITH wordmark on the front layer (z-10) over the stone */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center font-display text-[clamp(2.05rem,9.2vw,8.35rem)] font-bold leading-none tracking-[0.06em] text-mist select-none whitespace-nowrap"
            style={{
              textShadow:
                "0 10px 36px rgba(5, 8, 22, 0.9), 0 0 30px rgba(109, 63, 224, 0.32)",
            }}
          >
            MONOLITH
          </motion.h1>
        </div>

        {/* Floor line & downward soft reflection directly under the stone slab */}
        <motion.div
          aria-hidden="true"
          initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex w-full flex-col items-center"
        >
          <div className="hero-floor-line w-[260px] sm:w-[360px] md:w-[460px]" />
          <div className="hero-slab-reflection h-10 sm:h-12 w-[124px] sm:w-[152px] md:w-[176px] lg:w-[196px]" />
        </motion.div>
      </div>

      {/* Subline, chips, countdown and CTAs */}
      <motion.div
        initial={revealBase}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 flex flex-col items-center text-center"
      >
        <p className="max-w-[46ch] text-base sm:text-lg md:text-xl font-medium text-dusk leading-relaxed">
          {HERO_COPY.subline}
        </p>

        {/* Date and venue chips (separate pills, no middle dots) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-lilac/25 bg-deep/75 px-4 py-1.5 text-sm font-medium text-mist tabular-nums">
            <Calendar className="h-4 w-4 text-lilac" aria-hidden="true" />
            {EVENT.EVENT_DATES.shortRange}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-lilac/25 bg-deep/75 px-4 py-1.5 text-sm font-medium text-dusk">
            <MapPin className="h-4 w-4 text-lilac" aria-hidden="true" />
            {venue}
          </span>
        </div>

        {/* Countdown to Day 1 */}
        <div className="mt-7 min-h-[76px] flex items-center justify-center" aria-live="polite">
          {countdown?.live ? (
            <div className="inline-flex items-center gap-2.5 rounded-full border border-lilac/35 bg-purple/40 px-5 py-2 text-sm font-semibold text-mist">
              <span className="h-2 w-2 rounded-full bg-lilac" aria-hidden="true" />
              Happening now
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:gap-5">
              {[
                { label: "Days", value: countdown ? padTwo(countdown.days) : "--" },
                { label: "Hours", value: countdown ? padTwo(countdown.hours) : "--" },
                { label: "Minutes", value: countdown ? padTwo(countdown.minutes) : "--" },
                { label: "Seconds", value: countdown ? padTwo(countdown.seconds) : "--" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="flex min-w-[66px] sm:min-w-[82px] flex-col items-center rounded-[12px] border border-lilac/15 bg-deep/55 px-3 py-2.5"
                >
                  <span className="font-display text-xl sm:text-2xl font-semibold text-mist tabular-nums leading-tight">
                    {unit.value}
                  </span>
                  <span className="mt-1 text-xs font-medium text-dusk">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTAs without appended arrows */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#passes"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm sm:text-base font-semibold cta-primary active:scale-[0.98]"
          >
            {HERO_COPY.primaryCta}
          </a>
          <a
            href="#schedule"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm sm:text-base font-semibold cta-secondary active:scale-[0.98]"
          >
            {HERO_COPY.secondaryCta}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
