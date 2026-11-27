"use client";

import type { ReactNode } from "react";
import ClickSpark from "@/components/ClickSpark";

export function ReactiveShell({ children }: { children: ReactNode }) {
  return (
    <ClickSpark
      sparkColor={["#9867e1", "#7a45c4", "#5f279e"]}
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
