"use client";

import { EVENT } from "@/data/event";
import ProfileCard from "@/components/ProfileCard";

function toHandle(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 16);
}

export function CoordinatorsSection() {
  return (
    <section
      id="coordinators"
      aria-labelledby="coordinators-heading"
      className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24 md:py-32"
    >
      <div className="section-rule mb-10 sm:mb-16 md:mb-20" />

      <p className="section-label">Team 09</p>
      <h2
        id="coordinators-heading"
        className="mt-4 font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
      >
        The people behind it
      </h2>
      <p className="mt-3 text-sm text-dusk">
        Student coordinators · IEEE TEMS SEC SBC
      </p>

      <ul className="mt-8 grid grid-cols-2 justify-items-center gap-3 sm:mt-12 sm:gap-8 lg:grid-cols-3">
        {EVENT.COORDINATORS.map((name) => (
          <li key={name} className="w-full max-w-[280px]">
            <ProfileCard
              name={name}
              title="Student Coordinator"
              handle={toHandle(name)}
              status="IEEE TEMS"
              statusColor="#9867e1"
              contactText="Hello"
              showUserInfo
              theme="dark"
              backdropColor="#1a1228"
              holo={0.75}
              glare={0.45}
              tiltStrength={10}
              parallax={6}
              radius={14}
              enableTilt
              enableMobileTilt={false}
              intro
              onContactClick={() => {
                window.location.href = `mailto:${EVENT.CONTACT.email}`;
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
