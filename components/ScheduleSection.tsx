"use client";

import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { SCHEDULE_DATA } from "@/data/event";

type DayKey = "day1" | "day2";

const TABS: { key: DayKey; label: string; date: string }[] = [
  { key: "day1", label: "Day 1", date: "21 December" },
  { key: "day2", label: "Day 2", date: "22 December" },
];

export function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<DayKey>("day1");
  const items = activeDay === "day1" ? SCHEDULE_DATA.day1 : SCHEDULE_DATA.day2;

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const nextIndex = (index + 1) % TABS.length;
      const nextTab = TABS[nextIndex];
      setActiveDay(nextTab.key);
      const nextButton = document.getElementById(`schedule-tab-${nextTab.key}`);
      nextButton?.focus();
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
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="schedule-heading"
            className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
          >
            Schedule
          </h2>
          <p className="mt-3 text-sm sm:text-base text-dusk">
            {SCHEDULE_DATA.note}
          </p>
        </div>

        {/* Accessible sliding-indicator tabs */}
        <div
          role="tablist"
          aria-label="Festival days"
          className="inline-flex self-start rounded-full border border-lilac/22 bg-deep/80 p-1"
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
                className="relative rounded-full px-5 py-2 text-left transition-colors"
              >
                {isSelected && (
                  <motion.span
                    layoutId="schedule-tab-indicator"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-violet border border-lilac/35"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 flex items-baseline gap-2">
                  <span
                    className={`text-sm font-semibold ${
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
      </div>

      {/* Open vertical timeline */}
      <div
        role="tabpanel"
        id={`schedule-panel-${activeDay}`}
        aria-labelledby={`schedule-tab-${activeDay}`}
        className="mt-10 border-l border-lilac/22 pl-5 sm:pl-8"
      >
        <ol className="divide-y divide-lilac/12">
          {items.map((item) => (
            <li key={`${activeDay}-${item.time}-${item.title}`} className="relative py-4 sm:py-5">
              {/* Spine node */}
              <span
                aria-hidden="true"
                className="absolute -left-[25px] sm:-left-[37px] top-6 h-2.5 w-2.5 rounded-full border border-lilac/70 bg-void"
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8">
                <span className="w-28 shrink-0 text-sm font-medium text-lilac tabular-nums">
                  {item.time}
                </span>
                <span className="text-base font-medium text-mist">
                  {item.title}
                </span>
              </div>

              {item.nested && item.nested.length > 0 && (
                <ol className="mt-4 ml-2 sm:ml-36 space-y-2.5 border-l border-lilac/20 pl-4">
                  {item.nested.map((sub) => (
                    <li
                      key={`${sub.time}-${sub.title}`}
                      className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="w-24 shrink-0 text-xs sm:text-sm font-medium text-dusk tabular-nums">
                        {sub.time}
                      </span>
                      <span className="text-sm text-dusk">{sub.title}</span>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
