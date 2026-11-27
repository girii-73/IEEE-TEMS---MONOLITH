"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock } from "lucide-react";
import { SCHEDULE_DATA } from "@/data/event";

type DayKey = "day1" | "day2";

const TABS: { key: DayKey; label: string; subtitle: string; date: string }[] = [
  { key: "day1", label: "Day 01", subtitle: "Management Summit", date: "21 Dec" },
  { key: "day2", label: "Day 02", subtitle: "Sprintathon", date: "22 Dec" },
];

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<DayKey>("day1");
  const shouldReduceMotion = useReducedMotion();
  const items = activeDay === "day1" ? SCHEDULE_DATA.day1 : SCHEDULE_DATA.day2;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const nextIndex = (index + 1) % TABS.length;
      const nextTab = TABS[nextIndex];
      setActiveDay(nextTab.key);
      document.getElementById(`schedule-tab-${nextTab.key}`)?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveDay("day1");
      document.getElementById("schedule-tab-day1")?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveDay("day2");
      document.getElementById("schedule-tab-day2")?.focus();
    }
  };

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <div className="glass-surface-lite inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lilac mb-3">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            HUD Timeline
          </div>
          <h2
            id="schedule-heading"
            className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            Event Schedule
          </h2>
          <p className="mt-2 text-sm sm:text-base text-dusk">
            {SCHEDULE_DATA.note}
          </p>
        </div>

        {/* Accessible sliding-indicator tabs */}
        <div
          role="tablist"
          aria-label="Festival days"
          className="glass-surface-lite inline-flex self-start rounded-full p-1"
        >
          {TABS.map((tab, idx) => {
            const isSelected = activeDay === tab.key;
            return (
              <button
                key={tab.key}
                id={`schedule-tab-${tab.key}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls={`schedule-panel-${tab.key}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveDay(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="relative rounded-full px-5 py-2.5 text-left transition-colors"
              >
                {isSelected && (
                  <motion.span
                    layoutId="schedule-tab-indicator"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-violet border border-lilac/40 shadow-[0_0_20px_rgba(139,92,246,0.45)]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex items-baseline gap-2">
                  <span
                    className={`font-display text-sm font-semibold ${
                      isSelected ? "text-mist" : "text-dusk hover:text-mist"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`text-xs tabular-nums ${
                      isSelected ? "text-mist/85" : "text-dusk/80"
                    }`}
                  >
                    {tab.date}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* HUD Glassmorphic Vertical Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          role="tabpanel"
          id={`schedule-panel-${activeDay}`}
          aria-labelledby={`schedule-tab-${activeDay}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10 pl-6 sm:pl-10"
        >
          {/* Glowing vertical spine */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-2 sm:left-3 w-[2px] bg-gradient-to-b from-lilac via-amethyst/60 to-transparent"
          />

          <ol className="space-y-4">
            {items.map((item, idx) => (
              <motion.li
                key={`${activeDay}-${item.time}-${item.title}`}
                initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Glowing Timeline Node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[22px] sm:-left-[34px] top-5 h-3 w-3 rounded-full border-2 border-lilac bg-void shadow-[0_0_12px_rgba(184,146,255,0.85)]"
                />

                <div className="glass-panel rounded-[12px] px-5 py-4 sm:px-6 sm:py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lilac/45">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-display text-base sm:text-lg font-medium text-mist">
                      {item.title}
                    </h3>
                    <span className="inline-flex w-fit items-center rounded-full border border-lilac/25 bg-deep/75 px-3 py-0.5 text-xs font-semibold text-lilac tabular-nums">
                      {item.time}
                    </span>
                  </div>

                  {item.nested && item.nested.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 gap-2 border-t border-lilac/15 pt-3 sm:grid-cols-2">
                      {item.nested.map((sub) => (
                        <div
                          key={`${sub.time}-${sub.title}`}
                          className="flex items-center justify-between rounded-[8px] bg-deep/50 px-3 py-1.5 text-xs text-dusk"
                        >
                          <span>{sub.title}</span>
                          <span className="font-semibold text-lilac tabular-nums">
                            {sub.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
