"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Compass, Cpu, Network, Sparkles, Users } from "lucide-react";
import { ABOUT_COPY } from "@/data/event";

const GOAL_ICONS = [Sparkles, Cpu, Users, Compass, Network];

const STATS = [
  { value: "2 Days", label: "Management + Buildathon" },
  { value: "1000+", label: "Innovators Expected" },
  { value: "₹17,000+", label: "Total Prize Pool" },
  { value: "20+", label: "Mentors & Speakers" },
];

export function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Badge, Title, Description, 2x2 Stats */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="glass-surface-lite inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-lilac">
            <span className="h-1.5 w-1.5 rounded-full bg-lilac animate-pulse" />
            About The Festival
          </div>

          <h2
            id="about-heading"
            className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            {ABOUT_COPY.title}
          </h2>

          <p className="mt-5 text-base sm:text-lg text-dusk leading-relaxed">
            {ABOUT_COPY.description}
          </p>

          {/* 2x2 Stat Boxes */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="glass-panel rounded-[12px] p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="font-display text-2xl sm:text-3xl font-bold text-mist tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-lilac">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Goals List + Organisers Strip */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-panel rounded-[14px] p-6 sm:p-8">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-lilac mb-4">
              Core Objectives
            </h3>
            <ul className="divide-y divide-lilac/15">
              {ABOUT_COPY.goals.map((goal, index) => {
                const Icon = GOAL_ICONS[index % GOAL_ICONS.length];
                return (
                  <motion.li
                    key={goal}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-center gap-4 py-3.5 first:pt-1 last:pb-1"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-lilac/25 bg-deep/75 text-lilac shadow-[0_0_14px_rgba(139,92,246,0.2)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm sm:text-base font-medium text-mist leading-snug">
                      {goal}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Organiser Strip */}
          <div className="glass-surface-lite rounded-[12px] px-5 py-4 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wider text-dusk">
            <span className="text-lilac">Sri Sai Ram Engineering College</span>
            <span>•</span>
            <span>IEEE</span>
            <span>•</span>
            <span>IEEE TEMS</span>
            <span>•</span>
            <span>IEEE Madras Section</span>
          </div>
        </div>
      </div>
    </section>
  );
}
