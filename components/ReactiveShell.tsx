"use client";

import type { ReactNode } from "react";
import ClickSpark from "@/components/ClickSpark";

export function ReactiveShell({ children }: { children: ReactNode }) {
  return (
    <ClickSpark
      sparkColor={["#b892ff", "#9b72cf", "#f8f8ff"]}
      sparkSize={8}
      sparkRadius={28}
      sparkCount={10}
      duration={520}
      easing="ease-out"
      extraScale={1}
      className="min-h-screen"
    >
      {children}
    </ClickSpark>
  );
}
