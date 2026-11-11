"use client";

// Cartão de projeto: a tela real numa janela de navegador, com a capa (webp leve) e o vídeo do projeto,
// que só baixa e toca quando faz sentido: com mouse, ao passar por cima (ou ao focar); no toque, quando o
// cartão está bem visível na tela. Pausa ao sair. Movimento reduzido: só a capa.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import type { PortfolioData } from "@/constants";
import { cn } from "@/lib/utils";

export function ProjetoCard({ item, destaque = false, className }: { item: PortfolioData; destaque?: boolean; className?: string }) {
  const card = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  const tocar = (sim: boolean) => {
    const v = video.current;
    if (!v) return;
    if (sim) {
      if (!v.getAttribute("src") && item.portfolio_video) v.src = item.portfolio_video;
      v.play().catch(() => {});
    } else v.pause();
  };

  // toque (sem mouse) ou destaque: toca quando o cartão está bem visível
  useEffect(() => {
    const el = card.current;
    if (!el || !item.portfolio_video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!destaque && matchMedia("(pointer: fine)").matches) return;
    const io = new IntersectionObserver(([e]) => tocar(e.intersectionRatio > 0.6), { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tocar só lê refs
  }, [destaque, item.portfolio_video]);

  const comMouse = (sim: boolean) => {
    if (destaque || !matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    tocar(sim);
  };

  return (
    <article
      ref={card}
      onMouseEnter={() => comMouse(true)}
      onMouseLeave={() => comMouse(false)}
      onFocus={() => comMouse(true)}
      onBlur={() => comMouse(false)}
      className={cn("group flex min-w-0 flex-col gap-6", destaque && "lg:grid lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-14", className)}
    >
      {/* janela */}
      <div className="relative min-w-0">
        <div aria-hidden className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,rgba(61,175,166,.14),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="overflow-hidden rounded-2xl bg-negro-800 shadow-[0_40px_80px_-40px_rgba(3,11,23,.95)] ring-1 ring-white/10 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5">
          <div className="flex items-center gap-1.5 border-b border-white/6 bg-negro-700/70 px-4 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-white/15" aria-hidden />
            ))}
            <span className="ml-3 truncate font-mono text-[11px] tracking-wide text-cumaru-500">{item.portfolio_name}</span>
          </div>
          <div className="relative aspect-[16/9] overflow-hidden bg-negro-900">
            <Image
              src={item.portfolio_poster}
              alt={`Tela do projeto ${item.portfolio_name}`}
              fill
              sizes={destaque ? "(min-width: 1024px) 760px, 92vw" : "(min-width: 1024px) 600px, 92vw"}
              className={cn("object-cover object-top transition-opacity duration-500", tocando && "opacity-0")}
            />
            {item.portfolio_video && (
              <video
                ref={video}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                onPlaying={() => setTocando(true)}
                onPause={() => setTocando(false)}
                className={cn("absolute inset-0 size-full object-cover object-top transition-opacity duration-500", tocando ? "opacity-100" : "opacity-0")}
              />
            )}
            {item.portfolio_video && !destaque && (
              <span className={cn("absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-negro-900/75 px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-cumaru-200 uppercase ring-1 ring-white/10 backdrop-blur transition-opacity [@media(pointer:coarse)]:hidden", tocando && "opacity-0")}>
                <IconPlayerPlayFilled className="size-3 text-taruma-300" aria-hidden />
                Passe o mouse
              </span>
            )}
          </div>
        </div>
      </div>

      {/* texto */}
      <div className="flex min-w-0 flex-col gap-3">
        <p className="font-mono text-[11px] tracking-[0.16em] text-taruma-300 uppercase">{item.portfolio_type}</p>
        <h3 className={cn("font-bold tracking-tight text-cumaru-100", destaque ? "text-3xl sm:text-4xl" : "text-2xl")}>{item.portfolio_name}</h3>
        <p className={cn("leading-relaxed text-cumaru-400", destaque ? "text-lg" : "line-clamp-3")}>{item.portfolio_description}</p>
      </div>
    </article>
  );
}
