"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SCHEDULE_DATA } from "@/data/event";

type DayKey = "day1" | "day2";

const TABS: { key: DayKey; label: string; date: string }[] = [
  { key: "day1", label: "Day 01 — Summit", date: "21 Dec" },
  { key: "day2", label: "Day 02 — Sprint", date: "22 Dec" },
];

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<DayKey>("day1");
  const shouldReduceMotion = useReducedMotion();
  const items = activeDay === "day1" ? SCHEDULE_DATA.day1 : SCHEDULE_DATA.day2;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next = TABS[(index + 1) % TABS.length];
      setActiveDay(next.key);
      document.getElementById(`schedule-tab-${next.key}`)?.focus();
    }
  };

  return (
    <section
      id="schedule"
      aria-labelledby="schedule-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-label">Timeline 03</p>
          <h2
            id="schedule-heading"
            className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            Event timeline
          </h2>
          <p className="mt-3 max-w-lg text-sm text-dusk">{SCHEDULE_DATA.note}</p>
        </div>

        <div
          role="tablist"
          aria-label="Festival days"
          className="inline-flex self-start border border-hairline"
        >
          {TABS.map((tab, idx) => {
            const selected = activeDay === tab.key;
            return (
              <button
                key={tab.key}
                id={`schedule-tab-${tab.key}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`schedule-panel-${tab.key}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveDay(tab.key)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`px-4 py-2.5 text-left transition-colors ${
                  selected
                    ? "bg-mist text-void"
                    : "text-dusk hover:text-mist hover:bg-raised"
                }`}
              >
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em]">
                  {tab.label}
                </span>
                <span
                  className={`mt-0.5 block text-[10px] tabular-nums ${
                    selected ? "text-void/70" : "text-mute"
                  }`}
                >
                  {tab.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={activeDay}
          role="tabpanel"
          id={`schedule-panel-${activeDay}`}
          aria-labelledby={`schedule-tab-${activeDay}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="relative mt-12 border-l border-hairline pl-8 sm:pl-10"
        >
          {items.map((item, idx) => (
            <li key={`${activeDay}-${item.time}-${item.title}`} className="relative pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[2.05rem] sm:-left-[2.55rem] top-1.5 h-2.5 w-2.5 rounded-full border border-lilac bg-void"
              />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <span className="font-display text-[10px] text-mute tabular-nums">
                    Phase {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-display text-base sm:text-lg font-medium text-mist">
                    {item.title}
                  </h3>
                </div>
                <time className="text-xs font-semibold uppercase tracking-wider text-lilac tabular-nums shrink-0">
                  {item.time}
                </time>
              </div>
              {item.nested && item.nested.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-l border-hairline pl-4">
                  {item.nested.map((sub) => (
                    <li
                      key={`${sub.time}-${sub.title}`}
                      className="flex items-center justify-between gap-4 text-xs text-dusk"
                    >
                      <span>{sub.title}</span>
                      <span className="tabular-nums text-mute">{sub.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </section>
  );
}
