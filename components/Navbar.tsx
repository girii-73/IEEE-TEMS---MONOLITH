"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#days", label: "Days" },
  { href: "#schedule", label: "Timeline" },
  { href: "#prizes", label: "Prizes" },
  { href: "#passes", label: "Passes" },
  { href: "#speakers", label: "Speakers" },
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
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main-content"
        className="pointer-events-auto sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-mist focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
      >
        Skip to main content
      </a>

      <div
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center gap-2 rounded-full border border-white/60 bg-[#f5f5f3]/95 px-3 py-2 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-4 ${
          scrolled ? "bg-[#f8f8f6]/97 shadow-[0_14px_44px_-16px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium tracking-tight text-[#1a1a1a] transition-opacity hover:opacity-70"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a] text-[10px] font-semibold tracking-tighter text-[#f8f8ff]"
          >
            M
          </span>
          <span className="font-sans">
            monolith
            <span className="text-[#6b13af]">.fest</span>
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="ml-1 hidden flex-1 items-center justify-center gap-0.5 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-[13px] font-medium tracking-tight text-[#3a3a3a] transition-colors hover:bg-black/5 hover:text-[#111]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#1a1a1a] transition-colors hover:bg-black/5"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1a1a1a] transition-colors hover:bg-black/5 lg:hidden"
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
            className="pointer-events-auto mx-auto mt-2 max-w-6xl overflow-hidden rounded-[28px] border border-white/60 bg-[#f5f5f3]/95 px-4 py-3 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.55)] backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/5 py-3.5 text-sm font-medium tracking-tight text-[#1a1a1a] transition-opacity hover:opacity-70 last:border-b-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#passes"
                onClick={() => setOpen(false)}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#121212] px-5 py-3 text-sm font-medium text-[#f8f8ff] transition-colors hover:bg-[#2a2a2a]"
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
