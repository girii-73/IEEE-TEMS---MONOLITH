"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import FlexCarousel, { type FlexCarouselItem } from "@/components/FlexCarousel";

interface LegacyEvent {
  id: string;
  title: string;
  year: string;
  tag: string;
  stat: string;
  src: string;
  highlight?: boolean;
}

const LEGACY_EVENTS: LegacyEvent[] = [
  {
    id: "conclave",
    title: "IEEE TEMS Conclave",
    year: "2023",
    tag: "Annual Summit",
    stat: "500+ Attendees",
    src: "/legacy/conclave.jpg",
  },
  {
    id: "hackforge",
    title: "HackForge",
    year: "2024",
    tag: "24H Hackathon",
    stat: "200+ Teams",
    src: "/legacy/hackforge.jpg",
  },
  {
    id: "circuit",
    title: "Circuit Breaker",
    year: "2024",
    tag: "Tech Quiz",
    stat: "150+ Participants",
    src: "/legacy/circuit.jpg",
  },
  {
    id: "monolith",
    title: "MONOLITH",
    year: "2026",
    tag: "Flagship Fest",
    stat: "Day 1 + Day 2",
    src: "/legacy/monolith.jpg",
    highlight: true,
  },
  {
    id: "ideathon",
    title: "Ideathon",
    year: "2024",
    tag: "Pitch Challenge",
    stat: "80+ Ideas",
    src: "/legacy/ideathon.jpg",
  },
  {
    id: "connect",
    title: "TEMS Connect",
    year: "2025",
    tag: "Networking",
    stat: "Industry Mentors",
    src: "/legacy/connect.jpg",
  },
  {
    id: "protobuild",
    title: "ProtoBuild",
    year: "2025",
    tag: "Prototyping",
    stat: "60+ Prototypes",
    src: "/legacy/protobuild.jpg",
  },
];

const MONOLITH_INDEX = Math.max(
  0,
  LEGACY_EVENTS.findIndex((ev) => ev.highlight),
);

function toCarouselItems(events: LegacyEvent[]): FlexCarouselItem[] {
  return events.map((ev) => ({
    src: ev.src,
    alt: `${ev.title} — ${ev.tag}`,
    title: ev.title,
    subtitle: `${ev.year} · ${ev.stat}`,
  }));
}

export function LegacyHoneycombSection() {
  const shouldReduceMotion = useReducedMotion();
  const [focusIndex, setFocusIndex] = useState(MONOLITH_INDEX);
  const [activeOffset, setActiveOffset] = useState(0);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const orderedEvents = useMemo(() => {
    if (focusIndex === 0) return LEGACY_EVENTS;
    return [
      ...LEGACY_EVENTS.slice(focusIndex),
      ...LEGACY_EVENTS.slice(0, focusIndex),
    ];
  }, [focusIndex]);

  const carouselItems = useMemo(
    () => toCarouselItems(orderedEvents),
    [orderedEvents],
  );

  const activeEvent =
    orderedEvents[activeOffset] ?? orderedEvents[0] ?? LEGACY_EVENTS[0];
  const absoluteActive = LEGACY_EVENTS.findIndex(
    (ev) => ev.id === activeEvent.id,
  );

  return (
    <section
      id="legacy"
      aria-labelledby="legacy-heading"
      className="section-y relative w-full overflow-x-clip"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="section-label">Glimpse 07</p>
            <h2
              id="legacy-heading"
              className="mt-4 font-sans text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
            >
              Our legacy
            </h2>
            <p className="mt-3 max-w-md text-sm text-dusk">
              Milestones from IEEE TEMS SEC SBC — swipe the filmstrip.
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
      </div>

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="heading-gap relative h-[240px] w-full sm:h-[310px] md:h-[340px]"
      >
        <FlexCarousel
          key={focusIndex}
          items={carouselItems}
          preset="liquid"
          intro={shouldReduceMotion ? "none" : "rise"}
          fit="landscape"
          cardHeight={compact ? 0.68 : 0.64}
          gap={compact ? 10 : 14}
          radius={compact ? 12 : 14}
          squeeze={0.18}
          autoplay={!shouldReduceMotion}
          interval={4.5}
          captions
          focusOnClick
          captureWheel={!compact}
          onChange={(index) => setActiveOffset(index)}
          className="h-full w-full"
        />
      </motion.div>

      <div className="mx-auto mt-6 max-w-6xl px-4 sm:mt-8 sm:px-8">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
          {LEGACY_EVENTS.map((ev, index) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => {
                setFocusIndex(index);
                setActiveOffset(0);
              }}
              aria-pressed={index === absoluteActive}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[11px] font-medium tracking-tight transition-colors ${
                index === absoluteActive
                  ? "bg-mist text-void"
                  : "border border-hairline text-dusk hover:border-edge hover:text-mist"
              }`}
            >
              {ev.year} · {ev.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
