"use client";

import { cn } from "@/lib/utils";
import { ProcessStep } from "@/constants";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { StepCard } from "./step-card";
import { StepNode } from "./step-node";

// ── Etapa — layout horizontal alternado (desktop) ─────────────────
// Cards alternam acima/abaixo do trilho central; o nó fica sempre no
// centro vertical exato do item, alinhado ao trilho.

export function RoadmapItem({
  step,
  index,
  reached,
  current = false,
}: {
  step: ProcessStep;
  index: number;
  reached: boolean;
  current?: boolean;
}) {
  const { ref, isInView } = useScrollReveal({ amount: 0.4 });
  const isTop = index % 2 === 0;

  // Trilha neutra + preenchimento que cresce do trilho em direção ao
  // card quando a linha de progresso alcança o nó.
  const connector = (
    <div
      aria-hidden
      className="relative h-14 w-px flex-none [@media(max-height:56rem)]:h-7"
    >
      <div className="absolute inset-0 bg-white/10" />
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-out",
          isTop
            ? "origin-bottom bg-linear-to-t from-taruma-400/70 to-taruma-400/15"
            : "origin-top bg-linear-to-b from-taruma-400/70 to-taruma-400/15",
          reached ? "scale-y-100" : "scale-y-0",
        )}
      />
    </div>
  );

  const card = (
    <div className="w-full">
      <StepCard step={step} reached={reached} current={current} />
    </div>
  );

  return (
    <div
      ref={ref}
      data-step
      className="flex h-[min(49rem,100%)] w-184 shrink-0 flex-col items-center"
    >
      {/* Metade superior — card ancora na base (em direção ao trilho).
          min-h-0 impede que conteúdo alto empurre o nó para fora do centro */}
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-end">
        {isTop && (
          <>
            {card}
            {connector}
          </>
        )}
      </div>

      {/* Nó — sempre no centro exato do item, sobre o trilho */}
      <StepNode
        step={step}
        isInView={isInView}
        reached={reached}
        current={current}
        className="flex-none"
      />

      {/* Metade inferior — card ancora no topo (em direção ao trilho) */}
      <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-start">
        {!isTop && (
          <>
            {connector}
            {card}
          </>
        )}
      </div>
    </div>
  );
}
