"use client";

import { Suspense, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { EVENT, getDisplayVenue } from "@/data/event";
import { Countdown } from "@/components/Countdown";
import Magnet from "@/components/Magnet";
import DotGrid from "@/components/DotGrid";
import LaserFlow from "@/components/LaserFlow";

export function Hero() {
  const venue = getDisplayVenue();
  const monolithRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      aria-label="MONOLITH festival overview"
      className="relative w-full"
    >
      {/* Sticky reactive stage — stays active while scrolling the first section */}
      <div
        className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip"
        style={{ position: "sticky" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-45">
          <DotGrid
            dotSize={3}
            gap={30}
            baseColor="#2a1a45"
            activeColor="#b892ff"
            proximity={130}
            shockRadius={260}
            shockStrength={2.5}
            tension={0.45}
            returnDuration={1.2}
            className="h-full w-full"
          />
        </div>
        <div className="hero-atmosphere pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <LaserFlow
            surfaceRef={monolithRef}
            color="#b892ff"
            theme="dark"
            intensity={2.2}
            beamWidth={1.9}
            flare={1.7}
            spread={1.35}
            spill={1.15}
            fog={0.22}
            dust={1.5}
            streaks={1.7}
            pulse={1.35}
            speed={1.3}
            beamPosition={0.5}
            surfaceLevel={0.52}
            mouseInteraction
          />
        </div>
      </div>

      {/* Content scrolls over the sticky stage until the bottom line */}
      <div className="relative z-10 -mt-[100svh] flex min-h-[140svh] flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-20 pt-28 text-center sm:px-8 sm:pt-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
          >
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b892ff]/50 to-transparent" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-mute [writing-mode:vertical-rl]">
              Instagram · LinkedIn
            </span>
            <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#b892ff]/50 to-transparent" />
          </div>

          <p className="section-label mb-4">
            IEEE TEMS SEC SBC · Sri Sai Ram Engineering College
          </p>

          <div
            ref={monolithRef}
            className="relative mb-8 flex items-center justify-center py-6 sm:py-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[160px] w-[min(720px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6b13af]/28 blur-[90px]"
            />
            <h1 className="relative select-none font-sans text-5xl font-semibold uppercase leading-none tracking-tighter text-mist sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              MONOLITH
            </h1>
          </div>

          <div className="mt-2 flex flex-col items-center gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mist sm:text-base">
              {EVENT.EVENT_DATES.shortRange}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-dusk sm:text-base">
              A two-day festival for builders who stay{" "}
              <em className="font-accent text-lilac">obsessed</em>
              {" · "}
              {venue}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mute sm:text-sm">
              Management Summit · Sprintathon
            </p>
          </div>

          <div className="mt-10">
            <Suspense fallback={null}>
              <Countdown />
            </Suspense>
          </div>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Magnet padding={40} magnetStrength={2} className="w-full sm:w-auto">
              <a
                href="#passes"
                className="cta-primary inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-tight active:scale-[0.98] sm:w-auto"
              >
                Register Now
              </a>
            </Magnet>
            <Magnet padding={40} magnetStrength={2} className="w-full sm:w-auto">
              <a
                href="#about"
                className="cta-ghost inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-tight active:scale-[0.98] sm:w-auto"
              >
                Explore
              </a>
            </Magnet>
          </div>

          <a
            href="#hero-end"
            aria-label="Scroll to end of hero"
            className="mt-14 flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-mute transition-colors hover:text-lilac"
          >
            <span>Scroll</span>
            <ArrowDown
              className="h-3.5 w-3.5 animate-bounce text-lilac"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Bottom line — scroll effect ends here, then About begins */}
        <div id="hero-end" className="section-rule mt-auto w-full scroll-mt-24" />
      </div>
    </section>
  );
}
