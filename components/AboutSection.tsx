"use client";

import { ABOUT_COPY } from "@/data/event";
import FadeContent from "@/components/FadeContent";
import CountUp from "@/components/CountUp";
import SplitText from "@/components/SplitText";

const STATS = [
  { value: 2, label: "Days", suffix: "" },
  { value: 1000, label: "Innovators", suffix: "+" },
  { value: 17, label: "Prize Pool", prefix: "₹", suffix: "K+" },
  { value: 20, label: "Mentors", suffix: "+" },
];

export function AboutSection({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="about-heading"
      className={`relative mx-auto w-full max-w-6xl px-4 pb-16 pt-2 sm:px-8 sm:pb-24 sm:pt-4 md:pb-32 ${className}`.trim()}
    >
      <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-12 lg:gap-16">
        <FadeContent
          blur
          duration={0.8}
          ease="power2.out"
          className="lg:col-span-7"
        >
          <p className="section-label">About 01</p>
          <SplitText
            text="Where innovation meets impact."
            tag="h2"
            splitType="words"
            effect="rise"
            trigger="view"
            delay={60}
            duration={0.55}
            className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-mist leading-[1.1]"
          />
          <p
            id="about-heading"
            className="sr-only"
          >
            Where innovation meets impact.
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg text-dusk leading-relaxed">
            {ABOUT_COPY.description}
          </p>
          <p className="mt-5 max-w-xl text-sm sm:text-base text-mute leading-relaxed">
            Lead on Day 1. Build on Day 2. Join for one day or both — and leave
            with a team, a prototype, and a story.
          </p>
        </FadeContent>

        <FadeContent
          blur
          duration={0.8}
          delay={0.15}
          ease="power2.out"
          className="lg:col-span-5"
        >
          <p className="section-label mb-6">By the Numbers</p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-hairline bg-hairline">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-void px-4 py-5 sm:px-6 sm:py-7"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-mist tabular-nums tracking-tight">
                  <CountUp
                    to={stat.value}
                    from={0}
                    duration={1.4}
                    delay={0.1}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="font-display"
                  />
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 space-y-3 border-t border-hairline pt-6">
            {ABOUT_COPY.goals.slice(0, 4).map((goal, i) => (
              <li
                key={goal}
                className="flex gap-3 text-sm text-dusk leading-snug"
              >
                <span className="font-display text-xs text-lilac tabular-nums shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </FadeContent>
      </div>
    </section>
  );
}
