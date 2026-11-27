"use client";

import { DAY1_PITCH_AREAS, DAY2_THEMES, DAYS_COPY } from "@/data/event";
import FadeContent from "@/components/FadeContent";
import SplitText from "@/components/SplitText";

export function DaysSection() {
  return (
    <section
      id="days"
      aria-labelledby="days-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <FadeContent blur duration={0.7}>
        <p className="section-label">Domains 02</p>
        <SplitText
          text="Two days. One festival."
          tag="h2"
          splitType="words"
          effect="rise"
          trigger="view"
          delay={50}
          duration={0.5}
          className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
        />
        <p id="days-heading" className="sr-only">
          Two days. One festival.
        </p>
        <p className="mt-3 max-w-2xl text-sm sm:text-base text-dusk">
          {DAYS_COPY.connector}
        </p>
      </FadeContent>

      <div className="mt-14 grid grid-cols-1 gap-0 border border-hairline lg:grid-cols-2">
        {/* Day 1 */}
        <article className="border-b border-hairline p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
              {DAYS_COPY.day1.label}
            </span>
            <span className="text-xs text-mute tabular-nums">
              {DAYS_COPY.day1.date} · {DAYS_COPY.day1.passPrice}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-mist tracking-tight">
            {DAYS_COPY.day1.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-lilac">
            {DAYS_COPY.day1.theme}
          </p>
          <p className="mt-1 text-sm text-dusk">{DAYS_COPY.day1.tagline}</p>

          <div className="mt-8 space-y-6">
            {DAYS_COPY.day1.parts.map((part, i) => (
              <div key={part.title} className="flex gap-4">
                <span className="font-display text-xs text-mute tabular-nums pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-mist">
                    {part.title}
                  </h4>
                  <p className="mt-1 text-sm text-dusk leading-relaxed">
                    {part.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Day 2 */}
        <article className="p-7 sm:p-10">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-lilac">
              {DAYS_COPY.day2.label}
            </span>
            <span className="text-xs text-mute tabular-nums">
              {DAYS_COPY.day2.date} · {DAYS_COPY.day2.passPrice}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-mist tracking-tight">
            {DAYS_COPY.day2.title}
          </h3>
          <p className="mt-3 text-sm text-dusk leading-relaxed max-w-[54ch]">
            {DAYS_COPY.day2.description}
          </p>

          <ul className="mt-8 space-y-3 border-t border-hairline pt-6">
            {DAYS_COPY.day2.rules.map((rule) => (
              <li
                key={rule}
                className="flex gap-3 text-sm text-dusk leading-snug"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lilac" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* Themes — numbered like PEC Domains */}
      <div className="mt-20 md:mt-24">
        <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-mist">
          Day 2 tracks
        </h3>
        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
          {DAY2_THEMES.map((theme, i) => (
            <div
              key={theme.id}
              className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr_1.2fr] sm:gap-8 sm:items-baseline"
            >
              <span className="font-display text-sm text-lilac tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="font-display text-base sm:text-lg font-semibold text-mist">
                {theme.title}
              </h4>
              <p className="col-span-2 text-sm text-dusk leading-relaxed sm:col-span-1">
                {theme.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mute">
            Day 1 pitch areas
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {DAY1_PITCH_AREAS.map((area) => (
              <li key={area} className="text-sm text-dusk">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
