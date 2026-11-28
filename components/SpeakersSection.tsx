"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-44 w-32 animate-pulse rounded-2xl border border-hairline bg-raised/60" />
    </div>
  ),
});

type SpeakerCard = {
  id: string;
  name: string;
  role: string;
  badge: string;
  frontImage: string;
  backImage?: string;
  imageFit?: "cover" | "contain";
  finish?: "glossy" | "matte" | "holographic" | "metallic";
  topics?: string[];
  featured?: boolean;
};

const SPEAKERS: SpeakerCard[] = [
  {
    id: "thiaga",
    name: "Thiaga Sir",
    role: "Leadership & Product Mentor · CaratLane (A TATA Product)",
    badge: "Featured · Day 1 · 40–45 min + Q&A",
    frontImage: "/speakers/thiaga-front.png",
    backImage: "/speakers/thiaga-back.svg",
    imageFit: "cover",
    finish: "glossy",
    topics: [
      "Leadership & Decision-Making",
      "From Student Projects to Startups",
      "Engineers in Management",
    ],
    featured: true,
  },
  {
    id: "tba-1",
    name: "To be added",
    role: "Speaker slot · Details coming soon",
    badge: "Speaker 02",
    frontImage: "/speakers/tba-1.svg",
    finish: "matte",
  },
  {
    id: "tba-2",
    name: "To be added",
    role: "Speaker slot · Details coming soon",
    badge: "Speaker 03",
    frontImage: "/speakers/tba-2.svg",
    finish: "matte",
  },
];

function SpeakerLanyard({
  speaker,
  enableIntro,
}: {
  speaker: SpeakerCard;
  enableIntro: boolean;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
      <div
        ref={stageRef}
        className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-hairline bg-deep/40 sm:h-[400px]"
      >
        {active ? (
          <Lanyard
            frontImage={speaker.frontImage}
            backImage={speaker.backImage ?? speaker.frontImage}
            strapImage="/speakers/strap.svg"
            imageFit={speaker.imageFit ?? "cover"}
            cardColor="#12081c"
            orientation="portrait"
            finish={speaker.finish ?? "glossy"}
            cornerRadius={0.35}
            size={0.62}
            anchor="center"
            strapLength={0.38}
            strapColor="#5f279e"
            strapWidth={0.7}
            metal="silver"
            gravity={1}
            damping={0.55}
            elasticity={0.5}
            breeze={0.35}
            interactive
            intro={enableIntro}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-44 w-32 animate-pulse rounded-2xl border border-hairline bg-raised/60" />
          </div>
        )}
        <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.18em] text-mute">
          Drag · click to flip
        </p>
      </div>

      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-lilac sm:tracking-[0.18em]">
          {speaker.badge}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-mist sm:text-3xl">
          {speaker.name}
        </h3>
        <p className="mt-1 text-sm text-dusk">{speaker.role}</p>
        {speaker.topics ? (
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {speaker.topics.map((topic) => (
              <li key={topic} className="text-sm text-mute">
                {topic}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export function SpeakersSection() {
  const shouldReduceMotion = useReducedMotion();
  const featuredSpeakers = SPEAKERS.filter((s) => s.featured);
  const upcomingSpeakers = SPEAKERS.filter((s) => !s.featured);

  return (
    <section
      id="speakers"
      aria-labelledby="speakers-heading"
      className="section-y mx-auto max-w-6xl px-4 sm:px-8"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-label">Speakers 06</p>
        <h2
          id="speakers-heading"
          className="mt-4 font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
        >
          Meet Our Speakers
        </h2>
        <p className="mt-3 max-w-lg text-sm text-dusk">
          Industry leaders bridging engineering, product, and management. Pull the
          badge, stretch the strap, click to flip.
        </p>
      </motion.div>

      <div className="heading-gap flex flex-col gap-8">
        {featuredSpeakers.map((speaker) => (
          <motion.div
            key={speaker.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
          >
            <SpeakerLanyard
              speaker={speaker}
              enableIntro={!shouldReduceMotion}
            />
          </motion.div>
        ))}

        {upcomingSpeakers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {upcomingSpeakers.map((speaker) => (
              <div
                key={speaker.id}
                className="rounded-xl border border-dashed border-edge bg-deep/30 px-5 py-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lilac">
                  {speaker.badge}
                </p>
                <p className="mt-2 font-display text-lg font-medium text-mist">
                  {speaker.name}
                </p>
                <p className="mt-1 text-xs text-dusk">{speaker.role}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
