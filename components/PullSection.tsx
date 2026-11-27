import type { ReactNode } from "react";

type PullSectionProps = {
  children: ReactNode;
  /** Stacking order — later sections should be higher so they slide over earlier ones */
  zIndex?: number;
  /** Surface tone; alternating helps sell the page-pull edge */
  tone?: "void" | "deep";
  className?: string;
  id?: string;
};

/**
 * Pechacks-style “pull a new page” panel: opaque surface + higher z-index
 * so it slides up over the section beneath while scrolling.
 */
export function PullSection({
  children,
  zIndex = 20,
  tone = "void",
  className = "",
  id,
}: PullSectionProps) {
  const surface = tone === "deep" ? "bg-deep" : "bg-void";

  return (
    <section
      id={id}
      className={`pull-section relative ${surface} ${className}`.trim()}
      style={{ zIndex }}
    >
      {children}
    </section>
  );
}
