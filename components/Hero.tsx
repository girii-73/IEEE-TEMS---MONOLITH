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
  const laserSurfaceRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="top"
      aria-label="MONOLITH festival overview"
      className="relative w-full"
    >
      <div
        className="sticky top-0 z-0 h-[100svh] w-full overflow-x-clip"
        style={{ position: "sticky" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-40">
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
      </div>

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

          <p className="section-label mb-6">
            IEEE TEMS SEC SBC · Sri Sai Ram Engineering College
          </p>

          {/* Thin strike line on the letter tops — full text bounds make LaserFlow paint a fake box */}
          <div
            className="relative mb-2 w-full max-w-4xl"
            style={{ height: "min(72vw, 480px)" }}
          >
            <div className="absolute bottom-0 left-1/2 z-[1] inline-flex -translate-x-1/2 flex-col items-stretch">
              <div
                ref={laserSurfaceRef}
                aria-hidden="true"
                className="laser-strike-line h-px w-full shrink-0"
              />
              <h1 className="title-laser-text -mt-px select-none text-center font-sans text-5xl font-black uppercase leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
                MONOLITH
              </h1>
            </div>

            <div className="laser-drip-layer pointer-events-none absolute inset-0 z-[2]">
              <LaserFlow
                surfaceRef={laserSurfaceRef}
                color="#f0e8ff"
                theme="dark"
                intensity={4.4}
                beamWidth={2.0}
                flare={3.0}
                spread={1.3}
                spill={1.85}
                fog={0.2}
                dust={2.2}
                streaks={2.6}
                dots={1.45}
                pulse={1.65}
                speed={1.15}
                beamPosition={0.5}
                surfaceLevel={0.88}
                mouseInteraction
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center gap-2">
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

        <div id="hero-end" className="section-rule mt-auto w-full scroll-mt-24" />
      </div>
    </section>
  );
}
