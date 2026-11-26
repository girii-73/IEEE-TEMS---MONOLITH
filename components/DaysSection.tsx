"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Bot, HeartPulse, Landmark, ShieldCheck } from "lucide-react";
import { DAY1_PITCH_AREAS, DAY2_THEMES, DAYS_COPY, type DayTheme } from "@/data/event";

function DaySlabTilt({ children, className }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 24, mass: 0.6 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 24, mass: 0.6 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse" || !cardRef.current) {
      return;
    }
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(relX * 5);
    rawRotateX.set(-relY * 5);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

const THEME_ICONS: Record<DayTheme["id"], typeof HeartPulse> = {
  healthcare: HeartPulse,
  robotics: Bot,
  cybersecurity: ShieldCheck,
  fintech: Landmark,
};

export function DaysSection() {
  return (
    <section
      id="days"
      aria-labelledby="days-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <h2
        id="days-heading"
        className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
      >
        {DAYS_COPY.title}
      </h2>

      {/* Two tall glass slabs with connector */}
      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-5">
        {/* Day 1 Slab */}
        <DaySlabTilt className="glass-panel flex flex-col justify-between rounded-[8px] p-7 sm:p-9">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-semibold text-lilac">
                  {DAYS_COPY.day1.label}
                </span>
                <span className="text-sm text-dusk tabular-nums">
                  {DAYS_COPY.day1.date}
                </span>
              </div>
              <span className="rounded-full border border-lilac/30 bg-purple/45 px-3.5 py-1 text-xs font-semibold text-mist tabular-nums">
                Pass {DAYS_COPY.day1.passPrice}
              </span>
            </div>

            <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-mist">
              {DAYS_COPY.day1.title}
            </h3>

            <p className="mt-3 text-base font-medium text-lilac">
              {DAYS_COPY.day1.theme}
            </p>
            <p className="mt-1 text-sm sm:text-base text-dusk">
              {DAYS_COPY.day1.tagline}
            </p>

            <div className="mt-7 space-y-5">
              {DAYS_COPY.day1.parts.map((part) => (
                <div
                  key={part.title}
                  className="border-l border-lilac/30 pl-4"
                >
                  <h4 className="text-sm sm:text-base font-semibold text-mist">
                    {part.title}
                  </h4>
                  <p className="mt-1 text-sm text-dusk leading-relaxed max-w-[54ch]">
                    {part.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </DaySlabTilt>

        {/* Thin connector between Day 1 and Day 2 */}
        <div className="flex flex-col items-center justify-center py-2 lg:w-36 lg:py-0">
          <div className="h-6 w-px bg-gradient-to-b from-lilac/15 via-lilac/45 to-lilac/15 lg:hidden" />
          <div className="hidden lg:flex w-full items-center">
            <div className="h-px flex-1 bg-gradient-to-r from-lilac/40 to-lilac/15" />
          </div>
          <p className="my-2 rounded-full border border-lilac/20 bg-deep/80 px-4 py-2 text-center text-xs font-medium text-dusk leading-snug lg:my-3">
            {DAYS_COPY.connector}
          </p>
          <div className="hidden lg:flex w-full items-center">
            <div className="h-px flex-1 bg-gradient-to-r from-lilac/15 to-lilac/40" />
          </div>
          <div className="h-6 w-px bg-gradient-to-b from-lilac/15 via-lilac/45 to-lilac/15 lg:hidden" />
        </div>

        {/* Day 2 Slab */}
        <DaySlabTilt className="glass-panel flex flex-col justify-between rounded-[8px] p-7 sm:p-9">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-semibold text-lilac">
                  {DAYS_COPY.day2.label}
                </span>
                <span className="text-sm text-dusk tabular-nums">
                  {DAYS_COPY.day2.date}
                </span>
              </div>
              <span className="rounded-full border border-lilac/30 bg-purple/45 px-3.5 py-1 text-xs font-semibold text-mist tabular-nums">
                Pass {DAYS_COPY.day2.passPrice}
              </span>
            </div>

            <h3 className="mt-5 font-display text-xl sm:text-2xl font-medium text-mist">
              {DAYS_COPY.day2.title}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-dusk leading-relaxed max-w-[54ch]">
              {DAYS_COPY.day2.description}
            </p>

            <div className="mt-7">
              <h4 className="text-sm font-semibold text-mist">Rules</h4>
              <ul className="mt-3 space-y-3 border-l border-lilac/30 pl-4">
                {DAYS_COPY.day2.rules.map((rule) => (
                  <li
                    key={rule}
                    className="text-sm text-dusk leading-relaxed"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DaySlabTilt>
      </div>

      {/* Day 2 themes: 4 tall narrow slabs + Day 1 pitch areas chips */}
      <div className="mt-20 md:mt-24">
        <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-mist">
          Day 2 themes
        </h3>

        <div className="no-scrollbar mt-7 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {DAY2_THEMES.map((theme) => {
            const Icon = THEME_ICONS[theme.id];
            return (
              <article
                key={theme.id}
                className="glass-surface-lite flex min-h-[240px] w-[72vw] shrink-0 snap-start flex-col justify-between rounded-[8px] p-6 sm:w-[44vw] md:min-h-[270px] md:w-auto"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-lilac/25 bg-deep/80 text-lilac">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="mt-10">
                  <h4 className="text-base sm:text-lg font-semibold text-mist">
                    {theme.title}
                  </h4>
                  <p className="mt-2 text-sm text-dusk leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10">
          <p className="text-sm font-medium text-dusk">Day 1 pitch areas</p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {DAY1_PITCH_AREAS.map((area) => (
              <li
                key={area}
                className="rounded-full border border-lilac/22 bg-deep/75 px-4 py-1.5 text-sm font-medium text-mist"
              >
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
