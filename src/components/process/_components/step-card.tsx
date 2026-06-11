"use client";

import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ProcessStep } from "@/constants";
import { StepMedia } from "./step-media";

// ── Card da etapa (compartilhado entre layouts) ───────────────────
// Três estados visuais: futura (esmaecida), atual (destaque taruma)
// e concluída (neutra) — o visitante sabe sempre onde está.

export function StepCard({
  step,
  reached = true,
  current = false,
}: {
  step: ProcessStep;
  reached?: boolean;
  current?: boolean;
}) {
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
          "group relative h-full overflow-hidden rounded-2xl border bg-negro-700/50 p-6 sm:p-7",
          "transition-all duration-500 hover:-translate-y-1 hover:border-taruma-400/30 hover:bg-negro-700/60",
          "hover:shadow-[0_24px_60px_-32px_rgba(61,175,166,0.4)]",
          current
            ? "border-taruma-400/25 bg-negro-700/60 shadow-[0_24px_70px_-36px_rgba(61,175,166,0.45)]"
            : "border-white/8",
          !reached && "opacity-60 saturate-[0.85]",
        )}
      >
        {/* Hairline superior — fixa na etapa atual, no hover nas demais */}
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-taruma-400/50 to-transparent transition-opacity duration-500",
            current ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        />
        {/* Glow interno — idem */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-16 right-0 size-40 rounded-full bg-taruma-400/8 blur-3xl transition-opacity duration-500",
            current ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
        />

        <div className="md:grid md:grid-cols-[1fr_18rem] md:items-center md:gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-500",
                  reached
                    ? "border-taruma-400/30 bg-taruma-400/10 text-taruma-300"
                    : "border-white/10 bg-white/3 text-cumaru-500",
                )}
              >
                Etapa {step.number}
              </span>
              <span className="h-px flex-1 max-w-16 bg-linear-to-r from-white/10 to-transparent" />
            </div>

            <h3 className="mt-4 text-xl font-semibold leading-tight text-cumaru-100 lg:text-2xl">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-cumaru-400">
              {step.description}
            </p>

            <div
              aria-hidden
              className="mt-5 h-px w-full bg-linear-to-r from-white/8 to-transparent"
            />
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-cumaru-600">
              Entregas desta etapa
            </p>

            <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
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
