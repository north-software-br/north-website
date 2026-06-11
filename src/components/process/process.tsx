"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { IconChevronsRight } from "@tabler/icons-react";
import { PROCESS_STEPS } from "@/constants";
import Container from "../container/container";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Inset do trilho: alinha as pontas ao centro do primeiro/último nó
// (padding do track = 8vw; itens têm w-184, metade = 23rem)
const RAIL_INSET = "calc(8vw + 23rem)";

// Quantos nós a linha já alcançou para um progresso v (0–1)
const countReached = (v: number, thresholds: number[]) => {
  let n = 0;
  while (n < thresholds.length && v >= thresholds[n] - 0.001) n++;
  return n;
};
import { SectionHeader } from "./_components/section-header";
import { RoadmapItem } from "./_components/roadmap-item";
import { VerticalStep } from "./_components/vertical-step";

export default function Process() {
  // Scroll horizontal pinado (desktop): o scroll vertical é convertido em
  // deslocamento horizontal 1:1 em pixels — a altura do wrapper é exatamente
  // 100vh + distância horizontal percorrida.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Thresholds de progresso (0–1) em que a linha alcança cada nó (mobile)
  const mobileThresholds = useRef<number[]>([]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) {
        setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      }

      // Trilha vertical: nós a 20px do topo de cada etapa, linha a partir de top-5
      const mobile = mobileTimelineRef.current;
      if (mobile && mobile.offsetHeight > 0) {
        const steps = mobile.querySelectorAll<HTMLElement>("[data-step]");
        mobileThresholds.current = Array.from(steps).map(
          (el) => el.offsetTop / mobile.offsetHeight,
        );
      }
    };
    measure();

    let tid: ReturnType<typeof setTimeout> | null = null;
    const debounced = () => {
      if (tid) clearTimeout(tid);
      tid = setTimeout(measure, 120);
    };

    // Reobserva mudanças de conteúdo (fontes, imagens, terminal montando)
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(debounced)
        : null;
    if (ro && trackRef.current) ro.observe(trackRef.current);
    if (ro && mobileTimelineRef.current) ro.observe(mobileTimelineRef.current);
    window.addEventListener("resize", debounced);

    return () => {
      if (tid) clearTimeout(tid);
      ro?.disconnect();
      window.removeEventListener("resize", debounced);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const reducedMotion = useReducedMotion();

  // Os nós acendem exatamente quando o preenchimento alcança o centro de
  // cada um. Itens têm largura/gap idênticos → centros equidistantes, e o
  // trilho vai do 1º ao último nó, então os thresholds são i/(N-1).
  const [reachedDesktop, setReachedDesktop] = useState(1);
  const desktopThresholds = useRef<number[]>(
    PROCESS_STEPS.map((_, i) =>
      PROCESS_STEPS.length > 1 ? i / (PROCESS_STEPS.length - 1) : 0,
    ),
  );

  // Nós alcançados — direto do progresso do scroll (sem spring), para a
  // linha e os marcos responderem 1:1 à rolagem.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const v = Math.max(0, Math.min(1, latest));
    setReachedDesktop(Math.max(1, countReached(v, desktopThresholds.current)));
  });

  // Linha de progresso da timeline vertical (mobile)
  const [reachedMobile, setReachedMobile] = useState(0);
  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const mobileLine = useSpring(mobileProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });
  const mobileLineHeight = useTransform(mobileLine, [0, 1], ["0%", "100%"]);

  // Acompanha o spring (a linha visível), para o nó acender junto com ela
  useMotionValueEvent(mobileLine, "change", (v) => {
    setReachedMobile(countReached(v, mobileThresholds.current));
  });

  return (
    <section id="process" className="relative w-full">
      {/* ── Desktop: roadmap horizontal pinado ── */}
      <div
        ref={wrapperRef}
        className="relative hidden lg:block"
        style={{ height: distance ? `calc(100vh + ${distance}px)` : "350vh" }}
      >
        <SectionHeader className="mb-10 shrink-0 px-4 [@media(max-height:50rem)]:mb-6" />
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-background pt-[clamp(1.5rem,5vh,3.5rem)]">
          {/* Grade sutil em taruma */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(61,175,166,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(61,175,166,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />

          {/* Glow ambiente */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/4 top-1/4 size-130 -translate-x-1/2 rounded-full bg-taruma-400/5 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 size-130 rounded-full bg-taruma-400/4 blur-3xl"
          />

          {/* Trilha do roadmap */}
          <div className="relative flex min-h-0 flex-1 items-center">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="relative flex h-full w-max items-center gap-10 pl-[8vw] pr-[8vw] will-change-transform"
            >
              {/* Trilho central — do centro do 1º nó ao centro do último */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-1/2 h-px -translate-y-1/2 bg-white/8"
                style={{ left: RAIL_INSET, right: RAIL_INSET }}
              />
              {/* Preenchimento — ScrollProgress dirigido pelo progresso da
                  jornada pinada, sobreposto ao trilho (insets idênticos) */}
              <ScrollProgress
                aria-hidden
                progress={scrollYProgress}
                className="pointer-events-none absolute left-[calc(8vw+23rem)] right-[calc(8vw+23rem)] top-1/2 z-0 -mt-px h-0.5 origin-left bg-linear-to-r from-taruma-400/80 via-taruma-400 to-taruma-300 shadow-[0_0_12px_rgba(61,175,166,0.5)]"
              />

              {PROCESS_STEPS.map((step, i) => (
                <RoadmapItem
                  key={step.number}
                  step={step}
                  index={i}
                  reached={i < reachedDesktop}
                  current={i === reachedDesktop - 1}
                />
              ))}
            </motion.div>
          </div>

          {/* Contador de progresso — onde o visitante está na jornada */}
          <div className="pointer-events-none absolute bottom-8 left-8 z-10 flex items-center gap-3">
            <span className="text-xs font-semibold tabular-nums text-taruma-400">
              {String(reachedDesktop).padStart(2, "0")}
              <span className="text-cumaru-600">
                {" / "}
                {String(PROCESS_STEPS.length).padStart(2, "0")}
              </span>
            </span>
            <span aria-hidden className="h-px w-8 bg-white/10" />
            <AnimatePresence mode="wait">
              <motion.span
                key={reachedDesktop}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="text-xs text-cumaru-400"
              >
                {PROCESS_STEPS[reachedDesktop - 1].title}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dica de navegação — some assim que a jornada começa */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-xs text-cumaru-500"
          >
            <span>Role para explorar as etapas</span>
            <motion.span
              animate={reducedMotion ? undefined : { x: [0, 6, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex"
            >
              <IconChevronsRight className="size-4 text-taruma-400" />
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: timeline vertical ── */}
      <div className="relative overflow-hidden py-20 lg:hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-24 size-100 -translate-x-1/2 rounded-full bg-taruma-400/5 blur-3xl"
        />
        <Container>
          <SectionHeader className="mb-16" />

          <div ref={mobileTimelineRef} className="relative">
            {/* Trilha */}
            <div
              aria-hidden
              className="absolute bottom-5 left-5 top-5 w-px -translate-x-1/2 bg-white/8"
            />
            {/* Progresso */}
            <motion.div
              aria-hidden
              style={{ height: mobileLineHeight }}
              className="absolute left-5 top-5 w-px -translate-x-1/2 bg-linear-to-b from-taruma-400 via-taruma-400 to-taruma-400/20 shadow-[0_0_12px_rgba(61,175,166,0.5)]"
            />

            {PROCESS_STEPS.map((step, i) => (
              <VerticalStep
                key={step.number}
                step={step}
                reached={i < reachedMobile}
                current={i === reachedMobile - 1}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
