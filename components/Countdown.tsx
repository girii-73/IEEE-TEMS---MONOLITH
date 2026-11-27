"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { EVENT } from "@/data/event";
import Counter from "@/components/Counter.jsx";

const TARGET_TIMESTAMP_ISO = EVENT.EVENT_START_ISO || "2026-12-21T09:00:00+05:30";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const ZERO: TimeLeft = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  completed: false,
};

function getTimeLeft(now: number, target: number): TimeLeft {
  const diff = target - now;
  if (Number.isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  const totalSeconds = Math.ceil(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    completed: false,
  };
}

const emptySubscribe = () => () => {};

function subscribeCompact(callback: () => void) {
  const mq = window.matchMedia("(max-width: 639px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getCompactSnapshot() {
  return window.matchMedia("(max-width: 639px)").matches;
}

export function Countdown() {
  const target = new Date(TARGET_TIMESTAMP_ISO).getTime();
  const ready = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const compact = useSyncExternalStore(
    subscribeCompact,
    getCompactSnapshot,
    () => false
  );
  const [time, setTime] = useState<TimeLeft>(ZERO);

  useEffect(() => {
    let timeoutId = 0;

    const scheduleTick = (delay: number) => {
      timeoutId = window.setTimeout(() => {
        const now = Date.now();
        const next = getTimeLeft(now, target);
        setTime(next);
        if (!next.completed) {
          const remainder = (target - now) % 1000;
          const nextDelay = remainder > 0 ? remainder + 15 : 1015;
          scheduleTick(nextDelay);
        }
      }, delay);
    };

    scheduleTick(0);
    return () => window.clearTimeout(timeoutId);
  }, [target]);

  if (ready && time.completed) {
    return (
      <div
        className="countdown-cell mx-auto flex max-w-md flex-col items-center justify-center rounded-md px-5 py-3.5 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-base font-semibold tracking-tight text-mist sm:text-xl">
          MONOLITH is live
        </p>
        <p className="mt-1 text-[11px] font-medium text-lilac sm:text-xs">
          21–22 December 2026 · Started 9:00 AM IST
        </p>
      </div>
    );
  }

  const cells = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div
      className="grid w-full grid-cols-4 gap-1.5 sm:flex sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-3"
      aria-label="Countdown to MONOLITH on 21 December 2026 at 9:00 AM IST"
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
                fontWeight="600"
                textColor="inherit"
                duration={compact ? 0.35 : 0.55}
                bounce={compact ? 0 : 0.12}
                stagger={compact ? 0 : 0.03}
                motionBlur
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
