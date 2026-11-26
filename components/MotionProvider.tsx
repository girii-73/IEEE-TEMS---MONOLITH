"use client";

import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

function PageBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const topGlowY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const bottomGlowY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* Top-center violet radial glow */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: topGlowY }}
        className="absolute -top-44 left-1/2 h-[640px] w-[min(1100px,135vw)] -translate-x-1/2 rounded-full opacity-95"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 42%, rgba(109, 63, 224, 0.28) 0%, rgba(46, 26, 107, 0.16) 44%, rgba(5, 8, 22, 0) 74%)",
          }}
        />
      </motion.div>

      {/* Bottom-left deep midnight radial glow */}
      <motion.div
        style={shouldReduceMotion ? undefined : { y: bottomGlowY }}
        className="absolute -bottom-56 -left-44 h-[620px] w-[min(860px,110vw)] rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 42% 55%, rgba(19, 29, 82, 0.68) 0%, rgba(46, 26, 107, 0.22) 45%, rgba(5, 8, 22, 0) 76%)",
          }}
        />
      </motion.div>

      {/* Masked 1px lilac grid at ~5% opacity */}
      <div className="monolith-grid-layer absolute inset-0" />

      {/* Subtle tiled SVG grain at 4% opacity */}
      <div className="monolith-grain-layer absolute inset-0" />
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
