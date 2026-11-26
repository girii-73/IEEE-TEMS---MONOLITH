"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/data/event";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <h2
        id="faq-heading"
        className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
      >
        Questions
      </h2>

      <div className="mt-10 max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div
              key={item.question}
              className="rounded-[12px] border border-lilac/20 bg-deep/65 transition-colors hover:border-amethyst/45"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-[12px] px-5 py-4 sm:px-6 sm:py-5 text-left"
                >
                  <span className="text-base font-semibold text-mist">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-lilac/25 text-lilac"
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, height: "auto" }
                        : { opacity: 0, height: 0 }
                    }
                    animate={{ opacity: 1, height: "auto" }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-dusk leading-relaxed max-w-[65ch]">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
