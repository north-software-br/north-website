"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface LaptopProps {
  imageSrc?: string
  videoSrc?: string
  className?: string
}

// Notebook em CSS puro: tampa com bisel e câmera, dobradiça e base com
// reentrância. O conteúdo surge com
// fade (esqueleto → mídia) e o vídeo carrega ao entrar na viewport e roda em loop.
export function Laptop({ imageSrc, videoSrc, className }: LaptopProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(!videoSrc && !imageSrc)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc) return
    // Carrega ao entrar na tela e segue em loop, sem pausar depois
    if (!visible) return
    if (!video.getAttribute("src")) video.src = videoSrc
    video.play().catch(() => {})
  }, [visible, videoSrc])

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      {/* Tampa */}
      <div className="relative rounded-t-xl bg-linear-to-b from-[#454951] via-[#202226] to-[#121316] p-[1.3%] pb-[1.7%] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-30px_rgba(0,0,0,0.9)] sm:rounded-t-2xl"
      >
        {/* Câmera */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[0.45%] size-1 -translate-x-1/2 rounded-full bg-[#0b1620] ring-1 ring-white/15 sm:size-1.5"
        />

        {/* Tela */}
        <div className="relative aspect-16/10 overflow-hidden rounded-[3px] bg-black ring-1 ring-black sm:rounded-md">
          {/* Esqueleto enquanto a mídia carrega */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 animate-pulse bg-linear-to-br from-negro-700 to-negro-900 transition-opacity duration-700",
              ready ? "opacity-0" : "opacity-100",
            )}
          />

          <div
            className={cn(
              "absolute inset-0 transition-[opacity,transform,filter] duration-[1200ms] ease-out",
              ready ? "scale-100 opacity-100 blur-0" : "scale-[1.04] opacity-0 blur-sm",
            )}
          >
            {videoSrc ? (
              <video
                ref={videoRef}
                className="block size-full object-cover object-top"
                loop
                muted
                playsInline
                preload="none"
                onLoadedData={() => setReady(true)}
              />
            ) : imageSrc ? (
              <Image
                src={imageSrc}
                alt=""
                fill
                unoptimized={imageSrc.endsWith(".svg")}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-top"
                onLoad={() => setReady(true)}
              />
            ) : null}
          </div>

          {/* Reflexo do vidro + vinheta */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.08] via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>

      {/* Base */}
      <div
        className="relative -mx-[3%] -mt-px bg-linear-to-b from-[#4a4e56] via-[#2b2d33] to-[#16171a] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]"
        style={{
          aspectRatio: "50 / 1",
          borderRadius: "0 0 1.4% 1.4% / 0 0 100% 100%",
        }}
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-[55%] w-[17%] -translate-x-1/2 rounded-b-full bg-linear-to-b from-black/50 to-black/10"
        />
      </div>

      {/* Sombra no chão */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[2%] -bottom-[2%] -z-10 h-[5%] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.7),transparent)]"
      />
    </div>
  )
}
