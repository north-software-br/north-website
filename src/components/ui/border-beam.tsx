"use client";

import { motion, MotionStyle, Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  /** Tamanho do feixe em px */
  size?: number;
  /** Duração de uma volta completa, em segundos */
  duration?: number;
  /** Atraso inicial, em segundos */
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  /** Inverte o sentido da animação */
  reverse?: boolean;
  /** Posição inicial no caminho (0–100) */
  initialOffset?: number;
  borderWidth?: number;
}

export const BorderBeam = ({
  className,
  size = 60,
  delay = 0,
  duration = 6,
  colorFrom = "#3DAFA6",
  colorTo = "#67C4B9",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth: `${borderWidth}px`, borderStyle: "solid" }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square bg-linear-to-l from-(--color-from) via-(--color-to) to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};
