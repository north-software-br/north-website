"use client"

import {
  motion,
  useScroll,
  type MotionProps,
  type MotionValue,
} from "motion/react"

import { cn } from "@/lib/utils"

interface ScrollProgressProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  keyof MotionProps
> {
  ref?: React.Ref<HTMLDivElement>
  /** Progresso externo (ex.: de uma seção pinada). Default: scroll da página. */
  progress?: MotionValue<number>
}

export function ScrollProgress({
  className,
  ref,
  progress,
  ...props
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-linear-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
        className
      )}
      style={{
        scaleX: progress ?? scrollYProgress,
      }}
      {...props}
    />
  )
}
