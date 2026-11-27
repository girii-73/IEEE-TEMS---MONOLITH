"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Fixed right-side control — appears after scrolling, returns to hero. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => {
    const top = document.getElementById("top");
    if (top) {
      top.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to start"
      tabIndex={visible ? 0 : -1}
      className={`fixed right-3 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[190] flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-raised/90 text-mist shadow-[0_12px_32px_-12px_rgba(0,0,0,0.65)] backdrop-blur-md transition-[opacity,transform,colors] duration-300 hover:border-lilac hover:text-lilac focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lilac/60 sm:right-5 sm:h-12 sm:w-12 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden="true" />
    </button>
  );
}
