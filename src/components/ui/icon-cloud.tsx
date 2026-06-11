"use client"

import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface IconPosition {
  x: number
  y: number
  z: number
  id: number
}

interface TargetRotation {
  x: number
  y: number
  startX: number
  startY: number
  startTime: number
  duration: number
}

interface IconCloudProps {
  images: string[]
  className?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Esfera de ícones em canvas. Todo o estado mutável vive em refs (sem
// re-render por frame/mousemove) e o loop de rAF só roda com o canvas
// visível na viewport e a aba ativa.
export function IconCloud({ images, className }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const inViewRef = useRef(false)
  const rotationRef = useRef({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 200, y: 200 })
  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0 })
  const targetRef = useRef<TargetRotation | null>(null)
  const positionsRef = useRef<IconPosition[]>([])
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  // Posições na esfera (Fibonacci) — recalculadas só quando as imagens mudam
  useEffect(() => {
    const numIcons = images.length
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    positionsRef.current = Array.from({ length: numIcons }, (_, i) => {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment
      return { x: Math.cos(phi) * r * 100, y: y * 100, z: Math.sin(phi) * r * 100, id: i }
    })
  }, [images])

  // Pré-renderiza cada imagem num canvas offscreen circular
  useEffect(() => {
    imagesLoadedRef.current = new Array(images.length).fill(false)

    iconCanvasesRef.current = images.map((src, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 40
      offscreen.height = 40
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = src
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
          offCtx.beginPath()
          offCtx.arc(20, 20, 20, 0, Math.PI * 2)
          offCtx.closePath()
          offCtx.clip()
          offCtx.drawImage(img, 0, 0, 40, 40)
          imagesLoadedRef.current[index] = true
        }
      }
      return offscreen
    })
  }, [images])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const rect = canvas?.getBoundingClientRect()
    if (!rect || !canvas) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    for (const icon of positionsRef.current) {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const screenX = canvas.width / 2 + rotatedX
      const screenY = canvas.height / 2 + rotatedY
      const scale = (rotatedZ + 200) / 300
      const radius = 20 * scale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z))
        const targetY = Math.atan2(icon.x, icon.z)
        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.hypot(targetX - currentX, targetY - currentY)

        targetRef.current = {
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          startTime: performance.now(),
          duration: Math.min(2000, Math.max(800, distance * 1000)),
        }
        return
      }
    }

    dragRef.current = { dragging: true, lastX: e.clientX, lastY: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    if (dragRef.current.dragging) {
      const deltaX = e.clientX - dragRef.current.lastX
      const deltaY = e.clientY - dragRef.current.lastY
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }
      dragRef.current.lastX = e.clientX
      dragRef.current.lastY = e.clientY
    }
  }

  const handleMouseUp = () => {
    dragRef.current.dragging = false
  }

  // Loop de animação — ligado/desligado por visibilidade
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxDistance = Math.hypot(centerX, centerY)
      const dx = mouseRef.current.x - centerX
      const dy = mouseRef.current.y - centerY
      const distance = Math.hypot(dx, dy)
      const speed = 0.003 + (distance / maxDistance) * 0.01

      const target = targetRef.current
      if (target) {
        const progress = Math.min(1, (performance.now() - target.startTime) / target.duration)
        const eased = easeOutCubic(progress)
        rotationRef.current = {
          x: target.startX + (target.x - target.startX) * eased,
          y: target.startY + (target.y - target.startY) * eased,
        }
        if (progress >= 1) targetRef.current = null
      } else if (!dragRef.current.dragging && !reduceMotion) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        }
      }

      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      positionsRef.current.forEach((icon, index) => {
        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX

        const scale = (rotatedZ + 200) / 300
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

        if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
          ctx.save()
          ctx.translate(centerX + rotatedX, centerY + rotatedY)
          ctx.scale(scale, scale)
          ctx.globalAlpha = opacity
          ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
          ctx.restore()
        }
      })
    }

    const animate = () => {
      drawFrame()
      rafRef.current = requestAnimationFrame(animate)
    }

    const start = () => {
      if (!rafRef.current && inViewRef.current && !document.hidden) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    const stop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.05 },
    )
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener("visibilitychange", onVisibility)

    // Primeiro frame imediato (mesmo fora da viewport), para nunca
    // exibir um canvas vazio ao rolar rápido
    const firstPaint = setTimeout(drawFrame, 150)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      clearTimeout(firstPaint)
    }
  }, [images])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn("rounded-lg", className)}
      aria-label="Nuvem de tecnologias utilizadas pela North"
      role="img"
    />
  )
}
