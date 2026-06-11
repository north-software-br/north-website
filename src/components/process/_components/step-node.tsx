"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ProcessStep } from "@/constants";

// ── Nó da timeline ────────────────────────────────────────────────

export function StepNode({
  step,
  isInView,
  reached,
  className,
}: {
  step: ProcessStep;
  isInView: boolean;
  reached: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className={cn("z-10", className)}
    >
      <div
        className={cn(
          "relative flex size-10 items-center justify-center rounded-full border bg-linear-to-b from-negro-600 to-negro-800 transition-all duration-500 ease-out lg:size-12",
          reached
            ? "border-taruma-400/35 shadow-[0_0_28px_-4px_rgba(61,175,166,0.5)]"
            : "border-white/10 shadow-none",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute -inset-1.5 rounded-full border transition-colors duration-500",
            reached ? "border-taruma-400/12" : "border-transparent",
          )}
        />
        <step.Icon
          className={cn(
            "size-5 transition-colors duration-500 lg:size-5.5",
            reached ? "text-taruma-300" : "text-cumaru-600",
          )}
        />
      </div>
    </motion.div>
  );
}
