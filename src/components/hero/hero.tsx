"use client";

// Hero: a composição tipográfica do hero original (frase de abertura com sublinhado à mão, "North Software"
// grande com a linha que se estende e "+ Sistemas / Web / Mobile" trocando com a varredura Tarumã), refinada com
// uma frase de apoio e os dois botões; a esfera atual ao fundo (sem mudanças) e um feixe de luz suave
// (Spotlight New, Aceternity) vindo do alto à esquerda. A marca N animada ficou de fora por enquanto.
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { IconArrowDown, IconBrandWhatsapp } from "@tabler/icons-react";
import { Highlighter } from "@/components/ui/highlighter";
import { SpotlightNew } from "@/components/ui/spotlight-new";
import { whatsappHref } from "@/constants";
import { cn } from "@/lib/utils";

const DisplacementSphere = lazy(() => import("./displacement-sphere").then((m) => ({ default: m.DisplacementSphere })));
const frentes = ["Sistemas", "Web", "Mobile"];
const atraso = (s: number) => ({ animationDelay: `${s}s` });

// Shared animation classes for cycling words
export const wordCls = cn(
  "relative flex flex-shrink-0 items-center leading-none",
  "animation-duration-[1.5s] [animation-delay:var(--delay,0s)]",
  "fill-mode-[forwards] [animation-timing-function:cubic-bezier(0.4,0,0.6,1)]",
  "text-transparent transition-opacity duration-500 isolate",
  // ::after sweep bar
  "after:content-[''] after:bg-taruma-400",
  "after:animation-duration-[1.5s] after:[animation-delay:var(--delay,0s)]",
  "after:fill-mode-[forwards] after:[animation-timing-function:cubic-bezier(0.4,0,0.6,1)]",
  "after:origin-left after:[transform:scale3d(0,1,1)]",
  "after:absolute after:inset-0 after:-right-[0.02em] after:z-10 after:will-change-transform",
  // data-status states
  "data-[status=entering]:[animation-name:introTextReveal]",
  "motion-safe:data-[status=entering]:after:[animation-name:reveal]",
  "data-[status=entered]:text-foreground",
  "data-[status=entered]:after:opacity-0",
  "data-[status=entered]:after:[transform:scale3d(0,0,1)]",
  "data-[status=entered]:after:origin-right",
  "data-[status=exiting]:text-foreground data-[status=exiting]:opacity-0",
  "data-[status=exiting]:absolute data-[status=exiting]:top-0 data-[status=exiting]:z-0",
);

type WordStatus = "entering" | "entered" | "exiting";

export function WordTransition({
  active,
  enterDuration = 3000,
  exitDuration = 2000,
  children,
}: {
  active: boolean;
  enterDuration?: number;
  exitDuration?: number;
  children: (status: WordStatus) => React.ReactNode;
}) {
  const [status, setStatus] = useState<WordStatus>("entering");
  const [mounted, setMounted] = useState(active);
  const initialized = useRef(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStatus("entered"), enterDuration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    if (active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hero atual, será substituído na reformulação
      setMounted(true);
      setStatus("entering");
      const t = setTimeout(() => setStatus("entered"), enterDuration);
      return () => clearTimeout(t);
    } else {
      setStatus("exiting");
      const t = setTimeout(() => setMounted(false), exitDuration);
      return () => clearTimeout(t);
    }
  }, [active, enterDuration, exitDuration]);

  if (!mounted) return null;
  return <>{children(status)}</>;
}

export function useInterval(fn: () => void, delay: number) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  }, [fn]);
  useEffect(() => {
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default function Hero() {
  const [noNavegador, setNoNavegador] = useState(false);
  const [status, setStatus] = useState<"entering" | "entered">("entering");
  const [indice, setIndice] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- a esfera só monta no navegador
    setNoNavegador(true);
    const t = setTimeout(() => setStatus("entered"), 3000);
    return () => clearTimeout(t);
  }, []);
  useInterval(() => setIndice((i) => (i + 1) % frentes.length), 5000);

  return (
    <section id="inicio" className="relative isolate flex min-h-svh items-end overflow-hidden lg:items-center" aria-labelledby="hero-titulo">
      {noNavegador && (
        <div aria-hidden className="absolute inset-0 -z-20">
          <Suspense>
            <DisplacementSphere />
          </Suspense>
        </div>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_srgb,var(--background)_72%,transparent)_40%,transparent_64%)] max-lg:bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--background)_80%,transparent)_42%,var(--background)_70%)]" />
      {/* a esfera se dissolve na base do hero (sem o corte reto quando ela passa da borda) */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-linear-to-t from-background to-transparent" />
      <div className="absolute inset-0 -z-10">
        <SpotlightNew />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-14 lg:px-8 lg:pb-12">
        <div className="flex min-w-0 flex-col items-start">
          <p className="subir mb-6 text-[clamp(1.125rem,1.8vw,1.6rem)] leading-none font-bold" style={atraso(0.1)}>
            Construímos o que o seu negócio{" "}
            <Highlighter action="underline" color="#3DAFA6" strokeWidth={2} animationDuration={700} iterations={2} padding={2} delay={1600}>
              precisa.
            </Highlighter>
          </p>

          <h1 id="hero-titulo" className="m-0 w-full max-w-4xl text-[clamp(2.6rem,6vw,5.6rem)] leading-none font-extrabold tracking-[-0.03em]">
            <span className="sr-only">North Software: sistemas, web e mobile</span>
            <span aria-hidden className="relative flex flex-row items-center overflow-hidden">
              <span className={wordCls} data-status={status} style={{ "--delay": "0.1s" } as React.CSSProperties}>
                North Software
              </span>
              <span
                aria-hidden
                className={cn(
                  "relative top-[0.05em] ml-5 h-0.5 min-w-0 flex-1 bg-[color-mix(in_srgb,var(--foreground)_30%,transparent)]",
                  "origin-left scale-x-0 opacity-0 fill-mode-[forwards] animation-duration-[0.8s] [animation-delay:1s] [animation-timing-function:cubic-bezier(0.4,0,0.6,1)]",
                  status === "entering" && "[animation-name:introLine]",
                  status === "entered" && "scale-x-100 opacity-100",
                )}
              />
            </span>
            <span aria-hidden className="relative flex flex-row items-center text-[clamp(2.2rem,5vw,5.2rem)]">
              {frentes.map((f, i) => (
                <WordTransition key={f} active={i === indice}>
                  {(ws) => (
                    <span className={cn(wordCls, "before:mr-[10px] before:text-taruma-400 before:opacity-80 before:content-['+']")} data-status={ws} style={{ "--delay": "0.6s" } as React.CSSProperties}>
                      {f}
                    </span>
                  )}
                </WordTransition>
              ))}
            </span>
          </h1>

          <p className="subir mt-8 max-w-[46ch] text-lg leading-relaxed text-cumaru-400" style={atraso(1.2)}>
            Sistemas, aplicativos, sites e automações com IA. Construído no Norte, feito para o mundo.
          </p>

          <div className="subir mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" style={atraso(1.35)}>
            <a href={whatsappHref()} target="_blank" rel="noopener" className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-taruma-400 px-7 text-[15px] font-semibold text-negro-900 shadow-[0_12px_40px_-12px_rgba(61,175,166,.8)] transition-colors hover:bg-taruma-300">
              <IconBrandWhatsapp className="size-5" aria-hidden />
              Conversar sobre um projeto
            </a>
            <a href="#projects" className="inline-flex h-13 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium text-cumaru-200 ring-1 ring-white/15 transition-colors hover:bg-white/5">
              Ver projetos
              <IconArrowDown className="size-4" aria-hidden />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
