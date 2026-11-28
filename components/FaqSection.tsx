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
      className="section-y mx-auto max-w-6xl px-4 sm:px-8"
    >
      <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="section-label">FAQ 09</p>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
          >
            Got questions?
          </h2>
          <p className="mt-3 text-sm text-dusk max-w-xs">
            Everything you need to know before you register.
          </p>
        </div>

        <div className="lg:col-span-8 divide-y divide-hairline border-y border-hairline">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-button-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex min-h-12 w-full items-center justify-between gap-3 py-4 text-left sm:gap-4 sm:py-5"
                  >
                    <span className="text-sm sm:text-base font-medium text-mist pr-4">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.2 }
                      }
                      className="flex h-7 w-7 shrink-0 items-center justify-center text-mute"
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
                          : { duration: 0.22 }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-dusk leading-relaxed max-w-[60ch] whitespace-pre-line">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
