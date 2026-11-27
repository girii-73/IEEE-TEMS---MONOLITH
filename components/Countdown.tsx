"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/data/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ZERO: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(now: number, target: number): TimeLeft {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Countdown() {
  const target = new Date(EVENT.EVENT_START_ISO).getTime();
  const [time, setTime] = useState<TimeLeft>(ZERO);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft(Date.now(), target));
    tick();
    setReady(true);
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div
      className="grid w-full grid-cols-4 gap-1.5 sm:flex sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-3"
      aria-label="Countdown to event"
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="countdown-cell flex min-w-0 flex-col items-center justify-center rounded-md px-1.5 py-2.5 sm:px-4 sm:py-3.5"
        >
          <span className="font-display text-xl font-semibold tracking-tight text-mist tabular-nums leading-none sm:text-3xl">
            {ready ? pad(cell.value) : "––"}
          </span>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-mute sm:mt-1.5 sm:text-[10px] sm:tracking-[0.18em]">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}
