"use client";

import { forwardRef, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { NORTH_N_LOGO } from "../../../../public";
import { cn } from "@/lib/utils";
import { Terminal } from "@/components/ui/terminal";
import { MacosWindow } from "@/components/ui/macos-window";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { AnimatedList } from "@/components/ui/animated-list";
import { NumberTicker } from "@/components/ui/number-ticker";
import { IconCloud } from "@/components/ui/icon-cloud";
import {
  IconShieldCheck,
  IconCheck,
  IconRocket,
  IconUser,
  IconFileDescription,
  IconTarget,
  IconRoute,
  IconBolt,
  IconBug,
} from "@tabler/icons-react";
import { ProcessStep } from "@/constants";

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

      <BeamNode
        ref={hubRef}
        label="North"
        className="size-11 border-taruma-400/30 shadow-[0_0_20px_-6px_rgba(61,175,166,0.5)]"
      >
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

      <AnimatedBeam
        {...beam}
        fromRef={clientRef}
        toRef={hubRef}
        duration={4}
        delay={0}
      />
      <AnimatedBeam
        {...beam}
        fromRef={hubRef}
        toRef={reqRef}
        duration={4}
        delay={0.8}
      />
      <AnimatedBeam
        {...beam}
        fromRef={hubRef}
        toRef={scopeRef}
        duration={4}
        delay={1.6}
      />
      <AnimatedBeam
        {...beam}
        fromRef={hubRef}
        toRef={planRef}
        duration={4}
        delay={2.4}
      />
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
          imageSrc="/illustrations/LOGIN-SIAN-PRINT.jpg"
          secondImageSrc="/illustrations/SIAN-PRINT.jpg"
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
export function StepMedia({
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
