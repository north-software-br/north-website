"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { NORTH_N_LOGO } from "../../../public";
import { cn } from "@/lib/utils";
import Container from "../container/container";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Highlighter } from "@/components/ui/highlighter";
import { Terminal } from "@/components/ui/terminal";
import { MacosWindow } from "@/components/ui/macos-window";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { NumberTicker } from "@/components/ui/number-ticker";
import { IconCloud } from "@/components/ui/icon-cloud";
import {
  IconSearch,
  IconBrandFigma,
  IconCode,
  IconShieldCheck,
  IconCloudUpload,
  IconTrendingUp,
  IconCheck,
  IconChevronsRight,
  IconRocket,
  IconUser,
  IconFileDescription,
  IconTarget,
  IconRoute,
  IconBolt,
  IconBug,
} from "@tabler/icons-react";

// ── Etapas do processo ────────────────────────────────────────────

type StepMediaKind =
  | "discovery"
  | "design"
  | "dev"
  | "quality"
  | "deploy"
  | "evolution";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  Icon: React.ElementType;
  media: StepMediaKind;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Descoberta e Planejamento",
    description:
      "Mergulhamos no seu negócio para entender objetivos, mapear requisitos e definir a arquitetura ideal antes de qualquer linha de código.",
    deliverables: [
      "Levantamento de requisitos",
      "Entendimento do negócio",
      "Definição de escopo",
      "Arquitetura inicial",
    ],
    Icon: IconSearch,
    media: "discovery",
  },
  {
    number: "02",
    title: "Design e Prototipação",
    description:
      "Você visualiza e aprova o produto antes do desenvolvimento começar — sem surpresas, sem retrabalho.",
    deliverables: [
      "Wireframes",
      "UX/UI",
      "Validação antes do desenvolvimento",
      "Aprovação visual",
    ],
    Icon: IconBrandFigma,
    media: "design",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construímos seu sistema em ciclos curtos, com entregas frequentes para você acompanhar a evolução de perto.",
    deliverables: [
      "Frontend e Backend",
      "Integrações",
      "APIs",
      "Banco de dados",
    ],
    Icon: IconCode,
    media: "dev",
  },
  {
    number: "04",
    title: "Testes e Qualidade",
    description:
      "Cada funcionalidade passa por testes rigorosos de funcionamento, performance e segurança antes de chegar até você.",
    deliverables: [
      "Testes funcionais",
      "Correção de bugs",
      "Performance",
      "Segurança",
    ],
    Icon: IconShieldCheck,
    media: "quality",
  },
  {
    number: "05",
    title: "Implantação",
    description:
      "Colocamos seu sistema no ar com infraestrutura configurada, monitoramento ativo e backups automatizados.",
    deliverables: [
      "Deploy em produção",
      "Configuração de servidores",
      "Monitoramento",
      "Backup",
    ],
    Icon: IconCloudUpload,
    media: "deploy",
  },
  {
    number: "06",
    title: "Evolução Contínua",
    description:
      "O lançamento é só o começo: seguimos ao seu lado evoluindo o produto conforme seu negócio cresce.",
    deliverables: [
      "Novas funcionalidades",
      "Melhorias",
      "Suporte",
      "Crescimento do produto",
    ],
    Icon: IconTrendingUp,
    media: "evolution",
  },
];

// ── Cabeçalho ─────────────────────────────────────────────────────

function SectionHeader({ className }: { className?: string }) {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={cn("relative z-10 mx-auto max-w-2xl text-center", className)}
    >
      <h2 className="mt-5 text-3xl font-normal leading-tight text-cumaru-100 lg:text-5xl">
        Como transformamos sua{" "}
        <Highlighter
          action="underline"
          color="#3DAFA6"
          strokeWidth={2}
          animationDuration={800}
          iterations={2}
          padding={4}
          isView
          delay={700}
        >
          <span className="text-accent">ideia em software</span>
        </Highlighter>
      </h2>
      <p className="mt-5 text-md text-cumaru-400 lg:[@media(max-height:50rem)]:hidden">
        Um processo validado para entregar sistemas escaláveis, seguros e
        alinhados ao seu negócio.
      </p>
    </motion.div>
  );
}

// ── Mídias das etapas ─────────────────────────────────────────────
// Cada etapa tem um elemento visual único que conta sua parte da
// história, mantendo a mesma identidade (negro + taruma + cumaru).

// Etapa 01 — Descoberta: Cliente → North → Requisitos/Escopo/Planejamento
const BeamNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string }
>(({ className, children, label }, ref) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-9 items-center justify-center rounded-full border border-white/10 bg-negro-700 p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
    {label && (
      <span className="text-[9px] text-cumaru-500 whitespace-nowrap">
        {label}
      </span>
    )}
  </div>
));
BeamNode.displayName = "BeamNode";

function DiscoveryMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const beam = {
    containerRef,
    gradientStartColor: "#3DAFA6",
    gradientStopColor: "#3DAFA6",
    pathColor: "transparent",
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-56 w-full items-center justify-between px-1"
    >
      <BeamNode ref={clientRef} label="Cliente" className="size-10">
        <IconUser className="size-full text-cumaru-300" />
      </BeamNode>

      <BeamNode ref={hubRef} label="North" className="size-11 border-taruma-400/30 shadow-[0_0_20px_-6px_rgba(61,175,166,0.5)]">
        <Image
          src={NORTH_N_LOGO}
          alt="North Software"
          className="size-5 object-contain"
        />
      </BeamNode>

      <div className="flex flex-col gap-3">
        <BeamNode ref={reqRef} label="Requisitos">
          <IconFileDescription className="size-full text-cumaru-300" />
        </BeamNode>
        <BeamNode ref={scopeRef} label="Escopo">
          <IconTarget className="size-full text-cumaru-300" />
        </BeamNode>
        <BeamNode ref={planRef} label="Planejamento">
          <IconRoute className="size-full text-cumaru-300" />
        </BeamNode>
      </div>

      <AnimatedBeam {...beam} fromRef={clientRef} toRef={hubRef} duration={4} delay={0} />
      <AnimatedBeam {...beam} fromRef={hubRef} toRef={reqRef} duration={4} delay={0.8} />
      <AnimatedBeam {...beam} fromRef={hubRef} toRef={scopeRef} duration={4} delay={1.6} />
      <AnimatedBeam {...beam} fromRef={hubRef} toRef={planRef} duration={4} delay={2.4} />
    </div>
  );
}

// Etapa 02 — Design: wireframe → UI final → aprovação
function DesignMedia({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative h-56 w-full">
      {/* Wireframe (rascunho) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
        className="absolute left-0 top-3 w-34 -rotate-3 rounded-xl border border-dashed border-white/15 bg-negro-800/90 p-3"
      >
        <span className="absolute -top-2 left-2 rounded-full border border-white/10 bg-negro-700 px-2 py-0.5 text-[8px] uppercase tracking-wider text-cumaru-500">
          Wireframe
        </span>
        <div className="h-1.5 w-10 rounded-full bg-white/15" />
        <div className="mt-2.5 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-white/8" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/8" />
        </div>
        <div className="mt-2.5 h-12 rounded-md border border-dashed border-white/12 bg-white/3" />
        <div className="mt-2.5 h-4 w-12 rounded-full border border-dashed border-white/15" />
      </motion.div>

      {/* UI final */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.65 }}
        className="absolute bottom-3 right-0 w-34 rotate-2 rounded-xl border border-taruma-400/25 bg-negro-800 p-3 shadow-[0_12px_40px_-12px_rgba(61,175,166,0.35)]"
      >
        <span className="absolute -top-2 left-2 rounded-full border border-taruma-400/25 bg-negro-700 px-2 py-0.5 text-[8px] uppercase tracking-wider text-taruma-300">
          UI Final
        </span>
        <div className="h-1.5 w-10 rounded-full bg-taruma-400/70" />
        <div className="mt-2.5 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-white/20" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/12" />
        </div>
        <div className="mt-2.5 h-12 rounded-md border border-taruma-400/20 bg-linear-to-br from-taruma-400/30 to-taruma-400/5" />
        <div className="mt-2.5 h-4 w-12 rounded-full bg-taruma-400" />
      </motion.div>

      {/* Selo de aprovação */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.1 }}
        className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-taruma-400/30 bg-negro-700 px-3 py-1.5 text-[10px] font-medium text-taruma-300 shadow-[0_0_20px_-6px_rgba(61,175,166,0.5)]"
      >
        <IconCheck className="size-3" />
        Design aprovado
      </motion.div>
    </div>
  );
}

// Etapa 03 — Desenvolvimento: terminal com fluxo real de build
const DEV_COMMANDS = [
  "git clone north/seu-projeto",
  "npm run build",
  "git push origin production",
];

const DEV_OUTPUTS: Record<number, string[]> = {
  0: ["✔ Repositório clonado com sucesso."],
  1: ["▲ Next.js — compilando 42 rotas…", "✔ Build otimizado em 12.4s"],
  2: ["✔ Pipeline CI/CD disparado", "🚀 Projeto no ar!"],
};

function DevMedia({ isInView }: { isInView: boolean }) {
  if (!isInView) return <div className="h-54" />;
  return (
    <Terminal
      commands={DEV_COMMANDS}
      outputs={DEV_OUTPUTS}
      username="north-dev"
      typingSpeed={26}
      delayBetweenCommands={600}
      enableSound={false}
      className="w-full max-w-none px-0 text-[10px]"
      contentClassName="h-44"
    />
  );
}

// Etapa 04 — Qualidade: métricas + checklist animado
const QUALITY_CHECKS = [
  { Icon: IconCheck, label: "Testes funcionais aprovados" },
  { Icon: IconBolt, label: "Performance validada" },
  { Icon: IconShieldCheck, label: "Segurança revisada" },
  { Icon: IconBug, label: "0 bugs críticos em aberto" },
];

function QualityMedia({ isInView }: { isInView: boolean }) {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/8 bg-negro-800/70 p-3 text-center">
          <p className="text-xl font-bold text-taruma-300">
            <NumberTicker value={100} className="text-taruma-300" />%
          </p>
          <p className="mt-0.5 text-[9px] uppercase tracking-wider text-cumaru-500">
            Testes aprovados
          </p>
        </div>
        <div className="rounded-xl border border-white/8 bg-negro-800/70 p-3 text-center">
          <p className="text-xl font-bold text-taruma-300">
            <NumberTicker value={98} className="text-taruma-300" />
            <span className="text-sm font-medium text-cumaru-500">/100</span>
          </p>
          <p className="mt-0.5 text-[9px] uppercase tracking-wider text-cumaru-500">
            Score performance
          </p>
        </div>
      </div>

      <div className="h-41">
        {isInView && (
          <AnimatedList delay={800} className="gap-2">
            {QUALITY_CHECKS.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex w-full items-center gap-2.5 rounded-xl border border-white/8 bg-negro-800/70 px-3 py-2"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-taruma-400/15 text-taruma-400">
                  <Icon className="size-3.5" />
                </span>
                <span className="text-[11px] text-cumaru-300">{label}</span>
              </div>
            ))}
          </AnimatedList>
        )}
      </div>
    </div>
  );
}

// Etapa 05 — Implantação: SIAN em produção num container premium
function DeployMedia() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-taruma-400/6 blur-2xl"
      />
      <div className="relative rounded-2xl border border-taruma-400/20 bg-negro-800/80 p-3 shadow-[0_0_40px_-12px_rgba(61,175,166,0.35)]">
        {/* Barra de status */}
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="flex items-center gap-1.5 text-[10px] text-cumaru-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Em produção
          </span>
          <span className="flex items-center gap-1 text-[10px] text-taruma-300">
            <IconRocket className="size-3" />
            Deploy concluído
          </span>
        </div>

        <MacosWindow
          imageSrc="/illustrations/LOGIN-SIAN-PRINT.png"
          secondImageSrc="/illustrations/SIAN-PRINT.png"
          compareSlideMode="hover"
        />

        {/* Rodapé */}
        <div className="mt-2.5 flex items-center justify-between px-1 text-[10px] text-cumaru-500">
          <span>SIAN · Antonelly Construções</span>
          <span className="text-taruma-300">
            <NumberTicker
              value={99.9}
              decimalPlaces={1}
              className="text-taruma-300"
            />
            % uptime
          </span>
        </div>
      </div>
    </div>
  );
}

// Etapa 06 — Evolução: ecossistema tecnológico em movimento
const TECH_STACK = [
  "react",
  "nextdotjs",
  "nestjs",
  "typescript",
  "postgresql",
  "docker",
  "amazonwebservices",
  "redis",
  "socketdotio",
  "nodedotjs",
  "prisma",
  "tailwindcss",
  "graphql",
  "git",
  "github",
  "vercel",
  "figma",
  "stripe",
];

const TECH_IMAGES = TECH_STACK.map(
  (slug) => `https://cdn.simpleicons.org/${slug}/3DAFA6`,
);

function EvolutionMedia() {
  return (
    <div className="relative flex h-56 w-full items-center justify-center">
      <div
        aria-hidden
        className="pointer-events-none absolute size-40 rounded-full bg-taruma-400/8 blur-3xl"
      />
      <IconCloud images={TECH_IMAGES} className="size-56" />
    </div>
  );
}

// Seletor de mídia por etapa
function StepMedia({
  step,
  isInView,
}: {
  step: ProcessStep;
  isInView: boolean;
}) {
  switch (step.media) {
    case "discovery":
      return <DiscoveryMedia />;
    case "design":
      return <DesignMedia isInView={isInView} />;
    case "dev":
      return <DevMedia isInView={isInView} />;
    case "quality":
      return <QualityMedia isInView={isInView} />;
    case "deploy":
      return <DeployMedia />;
    case "evolution":
      return <EvolutionMedia />;
  }
}

// ── Card da etapa (compartilhado entre layouts) ───────────────────

function StepCard({ step }: { step: ProcessStep }) {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className="h-full"
    >
      <div
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-negro-700/50 p-6 sm:p-7",
          "transition-all duration-300 hover:-translate-y-1 hover:border-taruma-400/30 hover:bg-negro-700/60",
          "hover:shadow-[0_24px_60px_-32px_rgba(61,175,166,0.4)]",
        )}
      >
        {/* Hairline superior no hover */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-taruma-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {/* Glow interno no hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 size-40 rounded-full bg-taruma-400/8 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="md:grid md:grid-cols-[1fr_18rem] md:items-center md:gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-taruma-400">
                Etapa {step.number}
              </span>
              <span className="h-px w-10 bg-white/6" />
            </div>

            <h3 className="mt-3 text-xl font-semibold leading-tight text-cumaru-100 lg:text-2xl">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-cumaru-400">
              {step.description}
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {step.deliverables.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.3 + i * 0.07,
                  }}
                  className="flex items-center gap-2.5"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-taruma-400/15 text-taruma-400">
                    <IconCheck className="size-3" />
                  </span>
                  <span className="text-xs text-cumaru-300">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
            className="mt-6 md:mt-0"
          >
            <StepMedia step={step} isInView={isInView} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Nó da timeline ────────────────────────────────────────────────

function StepNode({
  step,
  isInView,
  reached,
  className,
}: {
  step: ProcessStep;
  isInView: boolean;
  reached: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className={cn("z-10", className)}
    >
      <div
        className={cn(
          "relative flex size-10 items-center justify-center rounded-full border bg-linear-to-b from-negro-600 to-negro-800 transition-all duration-500 ease-out lg:size-12",
          reached
            ? "border-taruma-400/35 shadow-[0_0_28px_-4px_rgba(61,175,166,0.5)]"
            : "border-white/10 shadow-none",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute -inset-1.5 rounded-full border transition-colors duration-500",
            reached ? "border-taruma-400/12" : "border-transparent",
          )}
        />
        <step.Icon
          className={cn(
            "size-5 transition-colors duration-500 lg:size-5.5",
            reached ? "text-taruma-300" : "text-cumaru-600",
          )}
        />
      </div>
    </motion.div>
  );
}

// ── Etapa — layout horizontal (desktop) ───────────────────────────

const TRACK_GAP = "gap-8";

// Inset do trilho: alinha as pontas ao centro do primeiro/último nó
// (todos os cards têm w-184, metade = 23rem)
const RAIL_INSET =
  "calc(max(calc((100vw - 83.75rem)/2 + 1.5rem), 1.5rem) + 23rem)";

function HorizontalStep({
  step,
  reached,
}: {
  step: ProcessStep;
  reached: boolean;
}) {
  const { ref, isInView } = useScrollReveal({ amount: 0.4 });

  return (
    <div
      ref={ref}
      data-step
      className="relative flex w-184 shrink-0 flex-col pt-16"
    >
      <StepNode
        step={step}
        isInView={isInView}
        reached={reached}
        className="absolute left-1/2 top-0 -translate-x-1/2"
      />

      <div className="flex-1">
        <StepCard step={step} />
      </div>
    </div>
  );
}

// ── Etapa — layout vertical (mobile) ──────────────────────────────

function VerticalStep({
  step,
  reached,
}: {
  step: ProcessStep;
  reached: boolean;
}) {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 });

  return (
    <div ref={ref} data-step className="relative pb-12 last:pb-0">
      <StepNode
        step={step}
        isInView={isInView}
        reached={reached}
        className="absolute left-5 top-0 -translate-x-1/2"
      />
      <div className="ml-13">
        <StepCard step={step} />
      </div>
    </div>
  );
}

// ── Process section ───────────────────────────────────────────────

export default function Process() {
  // Scroll horizontal pinado (desktop): o scroll vertical é convertido em
  // deslocamento horizontal 1:1 em pixels — a altura do wrapper é exatamente
  // 100vh + distância horizontal percorrida.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Thresholds de progresso (0–1) em que a linha alcança o centro de cada nó
  const desktopThresholds = useRef<number[]>([]);
  const mobileThresholds = useRef<number[]>([]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) {
        setDistance(Math.max(track.scrollWidth - window.innerWidth, 0));

        // Trilho horizontal: vai do centro do 1º nó ao centro do último
        const cards = track.querySelectorAll<HTMLElement>("[data-step]");
        const centers = Array.from(cards).map(
          (c) => c.offsetLeft + c.offsetWidth / 2,
        );
        const first = centers[0] ?? 0;
        const last = centers[centers.length - 1] ?? 0;
        desktopThresholds.current =
          last > first ? centers.map((c) => (c - first) / (last - first)) : [];
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
    window.addEventListener("resize", measure);
    // Reobserva mudanças de conteúdo (fontes, imagens, terminal montando)
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (mobileTimelineRef.current) ro.observe(mobileTimelineRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  // Quantos nós a linha já alcançou, por layout
  const [reachedDesktop, setReachedDesktop] = useState(0);
  const [reachedMobile, setReachedMobile] = useState(0);

  const countReached = (v: number, thresholds: number[]) => {
    let n = 0;
    while (n < thresholds.length && v >= thresholds[n] - 0.001) n++;
    return n;
  };

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Etapa ativa — orientação durante a jornada pinada
  const [activeStep, setActiveStep] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      PROCESS_STEPS.length - 1,
      Math.max(0, Math.round(v * (PROCESS_STEPS.length - 1))),
    );
    setActiveStep(idx);
    setReachedDesktop(countReached(v, desktopThresholds.current));
  });

  // Salto preciso para uma etapa: como o pin mapeia scroll → x em 1:1 px,
  // o scrollY alvo é o topo do wrapper + deslocamento que centraliza o card
  const goToStep = (i: number) => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;
    const card = track.querySelectorAll<HTMLElement>("[data-step]")[i];
    if (!card) return;
    const targetX = Math.min(
      Math.max(card.offsetLeft + card.offsetWidth / 2 - window.innerWidth / 2, 0),
      distance,
    );
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: wrapperTop + targetX, behavior: "smooth" });
  };

  // Linha de progresso da timeline vertical (mobile)
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
      {/* ── Desktop: timeline horizontal pinada ── */}
      <div
        ref={wrapperRef}
        className="relative hidden lg:block"
        style={{ height: distance ? `calc(100vh + ${distance}px)` : "300vh" }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* Glow ambiente */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/4 top-1/4 size-130 -translate-x-1/2 rounded-full bg-taruma-400/5 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 size-130 rounded-full bg-taruma-400/4 blur-3xl"
          />

          <Container>
            <SectionHeader className="mb-12 [@media(max-height:50rem)]:mb-7" />
          </Container>

          <motion.div style={{ x }} className="will-change-transform">
            <div
              ref={trackRef}
              className={cn(
                "relative flex w-max items-stretch",
                TRACK_GAP,
                "pl-[max(calc((100vw-83.75rem)/2+1.5rem),1.5rem)]",
                "pr-[max(calc((100vw-83.75rem)/2+1.5rem),1.5rem)]",
              )}
            >
              {/* Trilho contínuo — do primeiro ao último nó */}
              <div
                aria-hidden
                className="absolute top-6 h-px bg-white/8"
                style={{ left: RAIL_INSET, right: RAIL_INSET }}
              />
              {/* Preenchimento — completa junto com o scroll da jornada */}
              <motion.div
                aria-hidden
                className="absolute top-6 h-px origin-left bg-linear-to-r from-taruma-400/80 via-taruma-400 to-taruma-300 shadow-[0_0_12px_rgba(61,175,166,0.5)]"
                style={{
                  left: RAIL_INSET,
                  right: RAIL_INSET,
                  scaleX: scrollYProgress,
                }}
              />

              {PROCESS_STEPS.map((step, i) => (
                <HorizontalStep
                  key={step.number}
                  step={step}
                  reached={i < reachedDesktop}
                />
              ))}
            </div>
          </motion.div>

          {/* Navegação — indicadores clicáveis + dica que some ao rolar */}
          <div className="mt-8 flex flex-col items-center gap-3 [@media(max-height:50rem)]:mt-5">
            <div className="flex items-center gap-2">
              {PROCESS_STEPS.map((step, i) => (
                <button
                  key={step.number}
                  onClick={() => goToStep(i)}
                  aria-label={`Ir para a etapa ${step.number} — ${step.title}`}
                  className="group/dot flex h-6 cursor-pointer items-center"
                >
                  <span
                    className={cn(
                      "h-1 rounded-full transition-all duration-300",
                      i === activeStep
                        ? "w-8 bg-taruma-400"
                        : "w-4 bg-white/15 group-hover/dot:bg-white/30",
                    )}
                  />
                </button>
              ))}
            </div>

            <motion.div
              style={{ opacity: hintOpacity }}
              className="flex items-center gap-2 text-xs text-cumaru-500"
            >
              <span>Continue rolando para percorrer as etapas</span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="flex"
              >
                <IconChevronsRight className="size-4 text-taruma-400" />
              </motion.span>
            </motion.div>
          </div>
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
              />
            ))}
          </div>
        </Container>
      </div>

    </section>
  );
}
