"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

function PageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* Soft top wash — purple obsidian */}
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[min(900px,120vw)] -translate-x-1/2 rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(107, 19, 175, 0.16) 0%, rgba(184, 146, 255, 0.06) 45%, transparent 70%)",
        }}
      />
      {/* Fine grain */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <PageBackdrop />
      {children}
    </MotionConfig>
  );
}
