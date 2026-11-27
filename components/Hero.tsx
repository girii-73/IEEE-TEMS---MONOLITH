"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { EVENT, getDisplayVenue } from "@/data/event";
import { Countdown } from "@/components/Countdown";
import Magnet from "@/components/Magnet";
import DotGrid from "@/components/DotGrid";
import LaserFlow from "@/components/LaserFlow";
import PixelTrail from "@/components/PixelTrail.jsx";

function useIsCompact() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px), (pointer: coarse)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return compact;
}

export function Hero() {
  const venue = getDisplayVenue();
  const laserSurfaceRef = useRef<HTMLDivElement>(null);
  const compact = useIsCompact();

  return (
    <section
      id="top"
      aria-label="MONOLITH festival overview"
      className="relative w-full overflow-x-clip"
    >
      {/* Sticky stage: DotGrid + laser + pixel trail reverse cleanly on scroll-up */}
      <div
        className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden"
        style={{ position: "sticky" }}
        aria-hidden="true"
      >
        <div className={`absolute inset-0 ${compact ? "opacity-30" : "opacity-40"}`}>
          <DotGrid
            dotSize={compact ? 2 : 3}
            gap={compact ? 36 : 30}
            baseColor="#2a1a45"
            activeColor="#b892ff"
            proximity={compact ? 90 : 130}
            shockRadius={compact ? 180 : 260}
            shockStrength={compact ? 1.6 : 2.5}
            tension={0.45}
            returnDuration={1.2}
            className="h-full w-full"
          />
        </div>
        <div className="hero-atmosphere pointer-events-none absolute inset-0" />

        {!compact && (
          <div className="pointer-events-none absolute inset-0 z-[1]">
            <PixelTrail
              gridSize={42}
              trailSize={0.09}
              maxAge={420}
              interpolate={5}
              color="#b892ff"
              trailColor="#6b13af"
              gooeyFilter={{ strength: 2 }}
              glow={0.45}
              shine={0.55}
              sparkle={0.15}
            />
          </div>
        )}

        <div className="laser-drip-layer pointer-events-none absolute inset-0 z-[2]">
          <LaserFlow
            surfaceRef={laserSurfaceRef}
            color="#d4bbff"
            theme="dark"
            intensity={compact ? 1.25 : 1.65}
            beamWidth={compact ? 1.25 : 1.55}
            flare={compact ? 0.9 : 1.15}
            spread={compact ? 0.8 : 0.95}
            spill={1.0}
            fog={compact ? 0.06 : 0.1}
            dust={compact ? 0.7 : 1.15}
            streaks={compact ? 1.0 : 1.45}
            dots={compact ? 0.45 : 0.75}
            pulse={1.15}
            speed={compact ? 0.95 : 1.1}
            beamPosition={0.5}
            surfaceLevel={0.62}
            mouseInteraction={!compact}
          />
        </div>
      </div>

      <div className="relative z-10 -mt-[100svh] flex min-h-[100svh] flex-col sm:min-h-[130svh] md:min-h-[140svh]">
        <div className="relative z-[1] mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 pb-12 pt-20 text-center sm:px-8 sm:pb-20 sm:pt-32">
          <div className="relative mb-2 inline-flex w-full max-w-[min(100%,22rem)] flex-col items-stretch sm:max-w-none sm:w-auto">
            <div
              ref={laserSurfaceRef}
              aria-hidden="true"
              className="laser-strike-line h-px w-full shrink-0"
            />
            <h1 className="title-laser-text -mt-px select-none text-center font-sans text-[clamp(2.35rem,12vw,9rem)] font-black uppercase leading-none tracking-tighter">
              MONOLITH
            </h1>
          </div>

          <div className="mt-3 flex flex-col items-center gap-2 sm:mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mist sm:text-sm sm:tracking-[0.2em] sm:text-base">
              {EVENT.EVENT_DATES.shortRange}
            </p>
            <p className="max-w-xl px-1 text-sm leading-relaxed text-dusk sm:text-base">
              A two-day festival for builders who stay{" "}
              <em className="font-accent text-lilac">obsessed</em>
              {" · "}
              {venue}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-mute sm:text-xs sm:tracking-[0.16em] sm:text-sm">
              Management Summit · Sprintathon
            </p>
          </div>

          <div className="mt-6 w-full max-w-md sm:mt-10 sm:max-w-none">
            <Suspense fallback={null}>
              <Countdown />
            </Suspense>
          </div>

          <div className="mt-6 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:mt-10 sm:max-w-none sm:w-auto sm:flex-row">
            <Magnet
              padding={40}
              magnetStrength={2}
              disabled={compact}
              className="w-full sm:w-auto"
            >
              <a
                href="#passes"
                className="cta-primary inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-tight active:scale-[0.98] sm:w-auto"
              >
                Register Now
              </a>
            </Magnet>
            <Magnet
              padding={40}
              magnetStrength={2}
              disabled={compact}
              className="w-full sm:w-auto"
            >
              <a
                href="#about"
                className="cta-ghost inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold tracking-tight active:scale-[0.98] sm:w-auto"
              >
                Explore
              </a>
            </Magnet>
          </div>

          <a
            href="#hero-end"
            aria-label="Scroll to end of hero"
            className="mt-8 flex flex-col items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-mute transition-colors hover:text-lilac sm:mt-14"
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
