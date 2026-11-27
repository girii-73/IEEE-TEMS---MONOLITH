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
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
      >
        <div>
          <h2
            id="legacy-heading"
            className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
          >
            Our Legacy
          </h2>
          <p className="mt-3 text-sm sm:text-base text-dusk">
            Interactive honeycomb of IEEE TEMS SEC SBC milestones leading up to MONOLITH.
          </p>
        </div>

        {/* Active Hexagon Telemetry Readout */}
        <div className="glass-surface-lite rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-mist inline-flex items-center gap-2 self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-lilac animate-pulse" />
          <span>{activeEvent.title}</span>
          <span className="text-lilac">· {activeEvent.year}</span>
          <span className="text-dusk">({activeEvent.stat})</span>
        </div>
      </motion.div>

      {/* Desktop / Tablet Staggered Honeycomb Lattice */}
      <div className="mt-14 hidden md:flex flex-col items-center select-none">
        <div className="flex justify-center gap-4">
          {topRow.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onMouseEnter={() => setActiveId(ev.id)}
              onClick={() => setActiveId(ev.id)}
              className={`hex-cell flex items-center justify-center p-[1px] text-center focus-visible:outline-none ${
                ev.id === activeId
                  ? "bg-lilac/80 shadow-[0_0_32px_rgba(139,92,246,0.55)]"
                  : "bg-lilac/25"
              }`}
            >
              <div className="hex-cell-inner flex flex-col items-center justify-center bg-deep/95 px-4 transition-colors duration-300 hover:bg-purple/50">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-lilac">
                  {ev.year}
                </span>
                <span className="mt-1 font-display text-base font-semibold text-mist leading-snug">
                  {ev.title}
                </span>
                <span className="mt-2 text-xs text-dusk">{ev.tag}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="-mt-12 flex justify-center gap-4">
          {bottomRow.map((ev) => (
            <button
              key={ev.id}
              type="button"
              onMouseEnter={() => setActiveId(ev.id)}
              onClick={() => setActiveId(ev.id)}
              className={`hex-cell flex items-center justify-center p-[1px] text-center focus-visible:outline-none ${
                ev.highlight || ev.id === activeId
                  ? "bg-lilac shadow-[0_0_36px_rgba(139,92,246,0.6)]"
                  : "bg-lilac/25"
              }`}
            >
              <div
                className={`hex-cell-inner flex flex-col items-center justify-center px-4 transition-colors duration-300 ${
                  ev.highlight
                    ? "bg-violet text-mist"
                    : "bg-deep/95 hover:bg-purple/50"
                }`}
              >
                <span
                  className={`text-[11px] font-semibold uppercase tracking-widest ${
                    ev.highlight ? "text-mist/90" : "text-lilac"
                  }`}
                >
                  {ev.year}
                </span>
                <span className="mt-1 font-display text-base font-semibold text-mist leading-snug">
                  {ev.title}
                </span>
                <span
                  className={`mt-2 text-xs ${
                    ev.highlight ? "text-mist/85" : "text-dusk"
                  }`}
                >
                  {ev.stat}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Responsive Card Fallback */}
      <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:hidden">
        {LEGACY_EVENTS.map((ev) => (
          <div
            key={ev.id}
            className={`glass-panel rounded-[12px] p-5 ${
              ev.highlight ? "ring-1 ring-amethyst/70" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-lilac">
                {ev.year}
              </span>
              <span className="text-xs text-dusk">{ev.tag}</span>
            </div>
            <h3 className="mt-2 font-display text-lg font-semibold text-mist">
              {ev.title}
            </h3>
            <p className="mt-1 text-xs text-dusk">{ev.stat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
