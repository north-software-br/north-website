"use client";

import { ProcessStep } from "@/constants";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { StepCard } from "./step-card";
import { StepNode } from "./step-node";

// ── Etapa — layout vertical (mobile) ──────────────────────────────

export function VerticalStep({
  step,
  reached,
  current = false,
}: {
  step: ProcessStep;
  reached: boolean;
  current?: boolean;
}) {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 });

  return (
    <div ref={ref} data-step className="relative pb-12 last:pb-0">
      <StepNode
        step={step}
        isInView={isInView}
        reached={reached}
        current={current}
        className="absolute left-5 top-0 -translate-x-1/2"
      />
      <div className="ml-13">
        <StepCard step={step} reached={reached} current={current} />
      </div>
    </div>
  );
}
