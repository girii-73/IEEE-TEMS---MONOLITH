"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#days", label: "Days" },
  { href: "#schedule", label: "Schedule" },
  { href: "#prizes", label: "Prizes" },
  { href: "#passes", label: "Passes" },
  { href: "#faq", label: "FAQ" },
  { href: "#coordinators", label: "Coordinators" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full nav-glass">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-mist"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-display text-sm sm:text-base font-semibold tracking-[0.14em] text-mist transition-colors hover:text-lilac rounded-sm"
        >
          MONOLITH
        </a>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dusk transition-colors hover:text-mist rounded-sm py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#passes"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold cta-primary active:scale-[0.98]"
          >
            Register
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav-sheet"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-lilac/25 bg-deep/75 text-mist transition-colors hover:border-amethyst/70 hover:bg-purple/40 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-sheet"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden px-4 pb-4 pt-1"
          >
            <nav
              aria-label="Mobile navigation"
              className="glass-panel rounded-[12px] p-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[8px] px-3 py-2.5 text-sm font-medium text-dusk transition-colors hover:bg-purple/35 hover:text-mist"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 pt-3 border-t border-lilac/15">
                <a
                  href="#passes"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold cta-primary active:scale-[0.98]"
                >
                  Register
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
