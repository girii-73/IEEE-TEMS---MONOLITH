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
    id: "ascendra",
    title: "ASCENDRA 5.0",
    year: "2026",
    tag: "Team Legacy",
    stat: "IEEE TEMS SEC",
    src: "/legacy/ascendra-4.jpg",
    highlight: true,
  },
  {
    id: "ascendra-2025",
    title: "ASCENDRA 4.0",
    year: "2025",
    tag: "4th Anniversary",
    stat: "5 Nov 2025",
    src: "/legacy/ascendra-2025.jpg",
  },
  {
    id: "ascendra-3",
    title: "ASCENDRA 3.0",
    year: "2024",
    tag: "Flagship Meet",
    stat: "IEEE CS × TEMS",
    src: "/legacy/ascendra-3.jpg",
  },
  {
    id: "hcl-guvi",
    title: "HCL-GUVI Hackathon",
    year: "2025",
    tag: "Hackathon League",
    stat: "Winners · ₹50K",
    src: "/legacy/hcl-guvi-hackathon.jpg",
  },
  {
    id: "hcl-guvi-team",
    title: "HCL-GUVI Hackathon",
    year: "2025",
    tag: "Sairam League",
    stat: "Team Snapshot",
    src: "/legacy/hcl-guvi-hackathon-team.jpg",
  },
  {
    id: "quizaria-2",
    title: "QUIZARIA 2.0",
    year: "2026",
    tag: "Online Quiz",
    stat: "41+ Participants",
    src: "/legacy/quizaria-2.jpg",
  },
  {
    id: "sos-sairam",
    title: "SOS — Students of Sairam",
    year: "2025",
    tag: "Community",
    stat: "IEEE TEMS SEC",
    src: "/legacy/sos-students-of-sairam.jpg",
  },
  {
    id: "next-gen-coding",
    title: "Next Gen Coding",
    year: "2024",
    tag: "Prompt & Build",
    stat: "Workshop",
    src: "/legacy/next-gen-coding.jpg",
  },
  {
    id: "cyber-xplore",
    title: "Cyber Xplore",
    year: "2024",
    tag: "Tech Session",
    stat: "Hands-on Lab",
    src: "/legacy/cyber-xplore.jpg",
  },
  {
    id: "intemstellar",
    title: "Intemstellar",
    year: "2024",
    tag: "TEMS Events",
    stat: "IEEE TEMS Production",
    src: "/legacy/intemstellar.jpg",
  },
  {
    id: "intemstellar-ch1",
    title: "Intemstellar Chapter 1",
    year: "2025",
    tag: "Apple Hall",
    stat: "6 Nov 2025",
    src: "/legacy/intemstellar-chapter-1.jpg",
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
