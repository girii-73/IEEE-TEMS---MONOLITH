"use client";

import { ArrowUpRight } from "lucide-react";
import { EVENT, PASSES_DATA } from "@/data/event";
import FadeContent from "@/components/FadeContent";
import SpotlightCard from "@/components/SpotlightCard";
import GlareHover from "@/components/GlareHover";
import Magnet from "@/components/Magnet";
import SplitText from "@/components/SplitText";

export function PassesSection() {
  return (
    <section
      id="passes"
      aria-labelledby="passes-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <FadeContent blur duration={0.7} className="max-w-2xl">
        <p className="section-label">Register 05</p>
        <SplitText
          text="Ready to join?"
          tag="h2"
          splitType="words"
          effect="rise"
          trigger="view"
          delay={50}
          duration={0.5}
          className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
        />
        <p id="passes-heading" className="sr-only">
          Ready to join?
        </p>
        <p className="mt-3 text-sm sm:text-base text-dusk">
          Choose a pass and complete registration. Fees are per person. Refreshments
          and lunch included.
        </p>
      </FadeContent>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PASSES_DATA.map((pass, idx) => {
          const url = EVENT.REG_URLS[pass.urlKey].trim();
          const hasUrl = url.length > 0;

          if (pass.featured) {
            return (
              <FadeContent
                key={pass.id}
                blur
                duration={0.6}
                delay={0.1 * idx}
                className="h-full"
              >
                <GlareHover
                  width="100%"
                  height="100%"
                  background="#f4f4f5"
                  borderColor="transparent"
                  borderRadius="0px"
                  glareColor="#ffffff"
                  glareOpacity={0.35}
                  glareSize={280}
                  transitionDuration={650}
                  className="!block h-full w-full !place-items-stretch"
                >
                  <article className="flex h-full flex-col justify-between bg-mist p-6 sm:p-7 text-void">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-void">
                          {pass.name}
                        </h3>
                        {pass.badge && (
                          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-void/60">
                            Best value
                          </span>
                        )}
                      </div>
                      <p className="mt-6 font-display text-4xl font-bold tabular-nums tracking-tight text-void">
                        {pass.price}
                      </p>
                      <p className="mt-2 text-sm font-medium text-void/70">
                        {pass.subtitle}
                      </p>
                      <p className="mt-1 text-sm text-void/55">{pass.detail}</p>
                    </div>
                    <div className="mt-8">
                      {hasUrl ? (
                        <Magnet padding={28} magnetStrength={1.5}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex w-full items-center justify-between gap-2 border border-void/20 bg-void px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-mist transition-colors hover:bg-transparent hover:text-void"
                          >
                            <span>{pass.buttonLabel}</span>
                            <ArrowUpRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        </Magnet>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full cursor-not-allowed border border-void/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-void/40"
                        >
                          Opens soon
                        </button>
                      )}
                    </div>
                  </article>
                </GlareHover>
              </FadeContent>
            );
          }

          return (
            <FadeContent
              key={pass.id}
              blur
              duration={0.6}
              delay={0.1 * idx}
              className="h-full"
            >
              <SpotlightCard
                className="h-full !rounded-none !p-0"
                spotlightColor="rgba(184, 146, 255, 0.22)"
                theme="dark"
              >
                <article className="flex h-full flex-col justify-between border border-hairline p-6 sm:p-7">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-mist">
                      {pass.name}
                    </h3>
                    <p className="mt-6 font-display text-4xl font-bold tabular-nums tracking-tight text-mist">
                      {pass.price}
                    </p>
                    <p className="mt-2 text-sm font-medium text-lilac">
                      {pass.subtitle}
                    </p>
                    <p className="mt-1 text-sm text-dusk">{pass.detail}</p>
                  </div>
                  <div className="mt-8">
                    {hasUrl ? (
                      <Magnet padding={28} magnetStrength={1.5}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex w-full items-center justify-between gap-2 border border-edge px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-mist transition-colors hover:bg-mist hover:text-void"
                        >
                          <span>{pass.buttonLabel}</span>
                          <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      </Magnet>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full cursor-not-allowed border border-hairline px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-mute"
                      >
                        Opens soon
                      </button>
                    )}
                  </div>
                </article>
              </SpotlightCard>
            </FadeContent>
          );
        })}
      </div>
    </section>
  );
}
