"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"
import { cn } from "@/lib/utils"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  delay?: number
  className?: string
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  delay = 0,
  className,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let delayTimer: ReturnType<typeof setTimeout> | null = null

    if (shouldShow && element) {
      const run = () => {
        const ann = annotate(element, {
          type: action,
          color,
          strokeWidth,
          animationDuration,
          iterations,
          padding,
          multiline,
        })
        annotation = ann
        ann.show()

        resizeObserver = new ResizeObserver(() => {
          ann.hide()
          ann.show()
        })
        resizeObserver.observe(element)
      }

      if (delay > 0) {
        delayTimer = setTimeout(run, delay)
      } else {
        run()
      }
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer)
      annotation?.remove()
      resizeObserver?.disconnect()
    }
  }, [shouldShow, delay, action, color, strokeWidth, animationDuration, iterations, padding, multiline])

  return (
    <span ref={elementRef} className={cn("relative bg-transparent", className)}>
      {children}
    </span>
  )
}
