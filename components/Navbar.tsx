"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import SquishSwitch from "@/components/SquishSwitch.jsx";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#days", label: "Days" },
  { href: "#prizes", label: "Prizes" },
  { href: "#passes", label: "Passes" },
  { href: "#speakers", label: "Speakers" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="nav-safe-top pointer-events-none fixed inset-x-0 top-0 z-[200] px-3 sm:px-5">
      <a
        href="#main-content"
        className="pointer-events-auto sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-mist focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
      >
        Skip to main content
      </a>

      <div
        className={`nav-gradient-pill pointer-events-auto mx-auto flex w-full max-w-6xl items-center gap-2 rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-start gap-0.5 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[13px] font-medium tracking-tight text-[#2a1848]/90 transition-colors hover:bg-white/35 hover:text-[#120e18]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          <SquishSwitch
            id="theme-toggle"
            checked={theme === "light"}
            onChange={(next: boolean) => {
              if ((next && theme !== "light") || (!next && theme !== "dark")) {
                toggleTheme();
              }
            }}
            ariaLabel={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            themeIcons
            width={52}
            height={28}
            radius={14}
            speed={58}
            stretch={28}
            hoverScale={1.04}
            colorDuration={280}
            trackColor={theme === "light" ? "#3b2660" : "#2a1a45"}
            trackOnColor={theme === "light" ? "#ddd6fe" : "#f4ecff"}
            thumbColor={theme === "light" ? "#5b21b6" : "#9867e1"}
            thumbOnColor={theme === "light" ? "#2e1065" : "#4b0082"}
          />

          <a
            href="#passes"
            className="hidden items-center gap-1.5 rounded-full bg-[#121212] px-4 py-2.5 text-[13px] font-medium tracking-tight text-[#f8f8ff] transition-colors hover:bg-[#2a2a2a] sm:inline-flex"
          >
            Register
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#2a1848] transition-colors hover:bg-white/35 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-sheet"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="nav-gradient-pill pointer-events-auto mx-auto mt-2 max-h-[min(80svh,calc(100svh-5rem))] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-[24px] px-4 py-3 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[#2a1848]/10 py-3.5 text-base font-medium tracking-tight text-[#2a1848] transition-opacity hover:opacity-70 last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#passes"
                onClick={() => setOpen(false)}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-[#121212] px-5 py-3 text-sm font-medium text-[#f8f8ff] transition-colors hover:bg-[#2a2a2a]"
              >
                Register
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
