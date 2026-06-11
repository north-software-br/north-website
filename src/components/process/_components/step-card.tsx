"use client";

import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ProcessStep } from "@/constants";
import { StepMedia } from "./step-media";

// ── Card da etapa (compartilhado entre layouts) ───────────────────

export function StepCard({ step }: { step: ProcessStep }) {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className="h-full w-full"
    >
      <div
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-negro-700/50 p-6 sm:p-7",
          "transition-all duration-300 hover:-translate-y-1 hover:border-taruma-400/30 hover:bg-negro-700/60",
          "hover:shadow-[0_24px_60px_-32px_rgba(61,175,166,0.4)]",
        )}
      >
        {/* Hairline superior no hover */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-taruma-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Glow interno no hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 size-40 rounded-full bg-taruma-400/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="md:grid md:grid-cols-[1fr_18rem] md:items-center md:gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-taruma-400">
                {step.number}
              </span>
              <span className="h-px w-10 bg-white/6" />
            </div>

            <h3 className="mt-3 text-xl font-semibold leading-tight text-cumaru-100 lg:text-2xl">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-cumaru-400">
              {step.description}
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {step.deliverables.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.3 + i * 0.07,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-taruma-400/15 text-taruma-400">
                    <IconCheck className="size-3" />
                  </span>
                  <span className="text-xs text-cumaru-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
            className="mt-6 md:mt-0"
          >
            <StepMedia step={step} isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
