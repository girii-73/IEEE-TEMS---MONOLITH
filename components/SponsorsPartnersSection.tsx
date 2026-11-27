"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import {
  COMMUNITY_PARTNERS,
  SPONSORS,
  type PartnerSlot,
} from "@/data/event";

const TIER_LABEL: Record<PartnerSlot["tier"], string> = {
  title: "Title",
  gold: "Gold",
  silver: "Silver",
  partner: "Partner",
};

function PartnerCard({
  slot,
  large,
}: {
  slot: PartnerSlot;
  large?: boolean;
}) {
  const inner = (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-hairline bg-raised/40 text-center transition-colors hover:border-lilac/40 ${
        large
          ? "min-h-[140px] px-6 py-8 sm:min-h-[160px]"
          : "min-h-[110px] px-4 py-6 sm:min-h-[120px]"
      }`}
    >
      {slot.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slot.logo}
          alt={slot.name}
          className={`object-contain opacity-90 ${large ? "h-14 sm:h-16" : "h-10 sm:h-12"}`}
        />
      ) : (
        <span
          className={`font-display font-semibold tracking-tight text-mist ${
            large ? "text-lg sm:text-xl" : "text-sm sm:text-base"
          }`}
        >
          {slot.name}
        </span>
      )}
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lilac">
        {TIER_LABEL[slot.tier]}
      </span>
    </div>
  );

  if (slot.href) {
    return (
      <a
        href={slot.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac/50"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

function communityLogoItem(slot: PartnerSlot): LogoItem {
  if (slot.logo) {
    return {
      src: slot.logo,
      alt: slot.name,
      title: slot.name,
      href: slot.href,
      height: 36,
    };
  }

  return {
    title: slot.name,
    href: slot.href,
    ariaLabel: slot.name,
    node: (
      <span className="inline-flex items-center rounded-full border border-hairline bg-raised/50 px-4 py-2 font-display text-sm font-semibold tracking-tight text-mist whitespace-nowrap">
        {slot.name}
      </span>
    ),
  };
}

export function SponsorsPartnersSection() {
  const shouldReduceMotion = useReducedMotion();
  const title = SPONSORS.filter((s) => s.tier === "title");
  const gold = SPONSORS.filter((s) => s.tier === "gold");
  const silver = SPONSORS.filter((s) => s.tier === "silver");

  const communityLogos = useMemo(
    () => COMMUNITY_PARTNERS.map(communityLogoItem),
    [],
  );

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-heading"
      className="py-16 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="section-rule mb-10 sm:mb-16 md:mb-20" />

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Sponsors 08</p>
          <h2
            id="sponsors-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
          >
            Our sponsors &amp; partners
          </h2>
          <p className="mt-3 max-w-lg text-sm text-dusk">
            Brands and communities backing MONOLITH — more announcements soon.
          </p>
        </motion.div>

        <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
          {title.length > 0 ? (
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                Title sponsor
              </p>
              <div className="grid max-w-xl grid-cols-1 gap-4">
                {title.map((slot) => (
                  <PartnerCard key={slot.id} slot={slot} large />
                ))}
              </div>
            </div>
          ) : null}

          {gold.length > 0 ? (
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                Gold
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {gold.map((slot) => (
                  <PartnerCard key={slot.id} slot={slot} large />
                ))}
              </div>
            </div>
          ) : null}

          {silver.length > 0 ? (
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                Silver
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {silver.map((slot) => (
                  <PartnerCard key={slot.id} slot={slot} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
            Community partners
          </p>
          <h3 className="font-display text-xl font-semibold tracking-tight text-mist sm:text-2xl">
            Built with our community
          </h3>
        </div>

        <div className="mt-8 sm:mt-10">
          <LogoLoop
            logos={communityLogos}
            speed={shouldReduceMotion ? 0 : 90}
            direction="left"
            logoHeight={36}
            gap={40}
            pauseOnHover
            fadeOut
            fadeOutWidth={0.14}
            scaleOnHover
            muted={0.35}
            labels="hover"
            ariaLabel="Community partner logos"
            className="text-mist"
          />
        </div>
      </div>
    </section>
  );
}
