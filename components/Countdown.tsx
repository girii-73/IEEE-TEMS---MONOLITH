"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/data/event";
import Counter from "@/components/Counter.jsx";

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

export function Countdown() {
  const target = new Date(EVENT.EVENT_START_ISO).getTime();
  const [time, setTime] = useState<TimeLeft>(ZERO);
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft(Date.now(), target));
    tick();
    setReady(true);
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
          <div className="font-display text-mist leading-none">
            {ready ? (
              <Counter
                value={cell.value}
                minDigits={2}
                fontSize={compact ? 22 : 32}
                fontWeight={600}
                textColor="inherit"
                duration={compact ? 0.35 : 0.55}
                bounce={compact ? 0 : 0.12}
                stagger={compact ? 0 : 0.03}
                motionBlur={!compact}
                intro={false}
                fade={0.2}
                gap={0}
              />
            ) : (
              <span className="text-xl sm:text-3xl">––</span>
            )}
          </div>
          <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-mute sm:mt-1.5 sm:text-[10px] sm:tracking-[0.18em]">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  );
}
