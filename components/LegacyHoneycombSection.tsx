"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface LegacyEvent {
  id: string;
  title: string;
  year: string;
  tag: string;
  stat: string;
  highlight?: boolean;
}

const LEGACY_EVENTS: LegacyEvent[] = [
  {
    id: "conclave",
    title: "IEEE TEMS Conclave",
    year: "2023",
    tag: "Annual Summit",
    stat: "500+ Attendees",
  },
  {
    id: "hackforge",
    title: "HackForge",
    year: "2024",
    tag: "24H Hackathon",
    stat: "200+ Teams",
  },
  {
    id: "circuit",
    title: "Circuit Breaker",
    year: "2024",
    tag: "Tech Quiz",
    stat: "150+ Participants",
  },
  {
    id: "monolith",
    title: "MONOLITH",
    year: "2026",
    tag: "Flagship Fest",
    stat: "Day 1 + Day 2",
    highlight: true,
  },
  {
    id: "ideathon",
    title: "Ideathon",
    year: "2024",
    tag: "Pitch Challenge",
    stat: "80+ Ideas",
  },
  {
    id: "connect",
    title: "TEMS Connect",
    year: "2025",
    tag: "Networking",
    stat: "Industry Mentors",
  },
  {
    id: "protobuild",
    title: "ProtoBuild",
    year: "2025",
    tag: "Prototyping",
    stat: "60+ Prototypes",
  },
];

export function LegacyHoneycombSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>("monolith");
  const activeEvent =
    LEGACY_EVENTS.find((ev) => ev.id === activeId) ?? LEGACY_EVENTS[3];

  const topRow = LEGACY_EVENTS.slice(0, 3);
  const bottomRow = LEGACY_EVENTS.slice(3, 7);

  return (
    <section
      id="legacy"
      aria-labelledby="legacy-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="section-label">Glimpse 07</p>
          <h2
            id="legacy-heading"
            className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            Our legacy
          </h2>
          <p className="mt-3 max-w-md text-sm text-dusk">
            Milestones from IEEE TEMS SEC SBC — leading up to MONOLITH.
          </p>
        </div>
        <p className="text-xs text-mute">
          <span className="text-mist">{activeEvent.title}</span>
          {" · "}
          {activeEvent.year}
          {" · "}
          {activeEvent.stat}
        </p>
      </motion.div>

      <div className="mt-14 hidden md:flex flex-col items-center select-none">
        <div className="flex justify-center gap-3">
          {topRow.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onMouseEnter={() => setActiveId(ev.id)}
              onClick={() => setActiveId(ev.id)}
              className={`hex-cell flex items-center justify-center p-px text-center focus-visible:outline-none ${
                ev.id === activeId ? "bg-lilac/70" : "bg-edge"
              }`}
            >
              <div className="hex-cell-inner flex flex-col items-center justify-center bg-void px-4 hover:bg-raised">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                  {ev.year}
                </span>
                <span className="mt-1 font-display text-sm font-semibold text-mist leading-snug">
                  {ev.title}
                </span>
                <span className="mt-2 text-[11px] text-dusk">{ev.tag}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="-mt-11 flex justify-center gap-3">
          {bottomRow.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onMouseEnter={() => setActiveId(ev.id)}
              onClick={() => setActiveId(ev.id)}
              className={`hex-cell flex items-center justify-center p-px text-center focus-visible:outline-none ${
                ev.highlight || ev.id === activeId ? "bg-lilac" : "bg-edge"
              }`}
            >
              <div
                className={`hex-cell-inner flex flex-col items-center justify-center px-4 ${
                  ev.highlight
                    ? "bg-mist text-void"
                    : "bg-void hover:bg-raised"
                }`}
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    ev.highlight ? "text-void/60" : "text-mute"
                  }`}
                >
                  {ev.year}
                </span>
                <span
                  className={`mt-1 font-display text-sm font-semibold leading-snug ${
                    ev.highlight ? "text-void" : "text-mist"
                  }`}
                >
                  {ev.title}
                </span>
                <span
                  className={`mt-2 text-[11px] ${
                    ev.highlight ? "text-void/65" : "text-dusk"
                  }`}
                >
                  {ev.stat}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:hidden">
        {LEGACY_EVENTS.map((ev) => (
          <div
            key={ev.id}
            className={`border px-5 py-5 ${
              ev.highlight ? "border-mist/40 bg-mist text-void" : "border-hairline"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                  ev.highlight ? "text-void/55" : "text-mute"
                }`}
              >
                {ev.year}
              </span>
              <span
                className={`text-[11px] ${
                  ev.highlight ? "text-void/55" : "text-dusk"
                }`}
              >
                {ev.tag}
              </span>
            </div>
            <h3
              className={`mt-2 font-display text-base font-semibold ${
                ev.highlight ? "text-void" : "text-mist"
              }`}
            >
              {ev.title}
            </h3>
            <p
              className={`mt-1 text-xs ${
                ev.highlight ? "text-void/60" : "text-dusk"
              }`}
            >
              {ev.stat}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
