"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import Container from "../container/container";
import { AnimatedBeam } from "../ui/animated-beam";
import {
  IconUsers,
  IconStack2,
  IconBrandWhatsapp,
  IconTable,
  IconApi,
  IconLayoutDashboard,
  IconArrowUpRight,
  IconBrandKotlin,
  IconComponents,
  IconDeviceMobile,
  IconBrandApple,
  IconBrandGooglePlay,
  IconBrandTypescript,
  IconBell,
  IconX,
  IconCheck,
  IconWorldWww,
  IconServer,
  IconRobot,
  IconMail,
  IconFileText,
  IconBolt,
  IconScale,
  IconBuildingSkyscraper,
  IconLeaf,
  IconCopyright,
  IconBuilding,
} from "@tabler/icons-react";
import { BentoGrid, BentoCard } from "../ui/bento-grid";
import { Iphone } from "../ui/iphone";
import { Marquee } from "../ui/shadcn-space/radix/animations/marquee";
import { BorderBeam } from "../ui/border-beam";
import { OrbitingCircles } from "../ui/orbiting-circles";
import { Highlighter } from "../ui/highlighter";

// ── Nó com label (compartilhado pelos diagramas de beam) ──────────

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-9 items-center justify-center rounded-full border border-white/10 bg-negro-700 p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      className,
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

function NodeLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[9px] font-medium uppercase tracking-wide text-cumaru-500">
      {children}
    </span>
  );
}

// ── Sistemas para Operações Internas ──────────────────────────────
// Ferramentas da empresa convergindo na API central (layout Magic UI)

function SystemsBackground({
  className,
  modal,
}: {
  className?: string;
  modal?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const erpRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const whatsRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const sheetsRef = useRef<HTMLDivElement>(null);
  const docsRef = useRef<HTMLDivElement>(null);

  const beams = [
    // Esquerda → API
    { ref: erpRef, curvature: -75, endYOffset: -10, reverse: false },
    { ref: crmRef, curvature: 0, endYOffset: 0, reverse: false },
    { ref: whatsRef, curvature: 75, endYOffset: 10, reverse: false },
    // API → Direita
    { ref: dashRef, curvature: -75, endYOffset: -10, reverse: true },
    { ref: sheetsRef, curvature: 0, endYOffset: 0, reverse: true },
    { ref: docsRef, curvature: 75, endYOffset: 10, reverse: true },
  ];

  return (
    <div
      className={cn(
        "relative flex h-full w-full justify-center overflow-clip",
        // No card mobile o texto é sempre visível: diagrama ancora no topo
        modal
          ? "items-center p-8 pb-6"
          : "items-start p-6 pt-10 pb-28 md:items-center md:p-8 md:pb-28",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full max-h-44 w-full max-w-xs flex-col items-stretch justify-between gap-6">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <Circle ref={erpRef}>
              <IconStack2 className="size-full text-cumaru-300" />
            </Circle>
            <NodeLabel>ERP</NodeLabel>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Circle ref={dashRef}>
              <IconLayoutDashboard className="size-full text-cumaru-300" />
            </Circle>
            <NodeLabel>Dashboard</NodeLabel>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <Circle ref={crmRef}>
              <IconUsers className="size-full text-cumaru-300" />
            </Circle>
            <NodeLabel>CRM</NodeLabel>
          </div>
          {/* Hub — o sistema que integra tudo */}
          <div className="flex flex-col items-center gap-1">
            <Circle ref={apiRef} className="size-13 border-taruma-400/35">
              <IconApi className="size-full text-taruma-400" />
            </Circle>
            <NodeLabel>API</NodeLabel>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Circle ref={sheetsRef}>
              <IconTable className="size-full text-cumaru-300" />
            </Circle>
            <NodeLabel>Planilhas</NodeLabel>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-center gap-1">
            <Circle ref={whatsRef}>
              <IconBrandWhatsapp className="size-full text-cumaru-300" />
            </Circle>
            <NodeLabel>WhatsApp</NodeLabel>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Circle ref={docsRef}>
              <IconFileText className="size-full text-cumaru-300" />
            </Circle>
            <NodeLabel>Documentos</NodeLabel>
          </div>
        </div>
      </div>

      {beams.map(({ ref, curvature, endYOffset, reverse }, i) => (
        <AnimatedBeam
          key={i}
          containerRef={containerRef}
          fromRef={ref}
          toRef={apiRef}
          curvature={curvature}
          endYOffset={endYOffset}
          reverse={reverse}
          duration={4}
          delay={i * 0.5}
          repeatDelay={0}
          gradientStartColor="#3DAFA6"
          gradientStopColor="#3DAFA6"
          pathColor="transparent"
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
    </div>
  );
}

// ── Aplicativos para Clientes e Equipes ───────────────────────────

const leftItems = [
  { icon: IconBrandKotlin, label: "Kotlin" },
  { icon: IconComponents, label: "Jetpack Compose" },
  { icon: IconDeviceMobile, label: "iOS & Android" },
  { icon: IconBrandTypescript, label: "TypeScript" },
];

const rightItems = [
  { icon: IconBrandApple, label: "App Store" },
  { icon: IconBrandGooglePlay, label: "Play Store" },
  { icon: IconBell, label: "Notificações" },
];

function MobileBackground({
  className,
  modal,
}: {
  className?: string;
  modal?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftAnchorRef = useRef<HTMLDivElement>(null);
  const rightAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-clip", className)}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-6">
        <div className="size-48 rounded-full bg-[radial-gradient(closest-side,rgba(61,175,166,0.13),transparent)]" />
      </div>

      {/* Beam origin */}
      <div
        ref={centerRef}
        className="pointer-events-none absolute left-1/2 top-[44%] size-2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-20"
      />

      {/* Layout: left column | iPhone | right column */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-between px-3",
          modal ? "pb-16" : "pb-40 sm:pb-16",
        )}
      >
        {/* Left column */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col items-start">
          <div
            ref={leftAnchorRef}
            className="pointer-events-none absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 opacity-0"
          />
          <Marquee
            vertical
            pauseOnHover
            repeat={4}
            className="h-32 w-full [--duration:8s] [--gap:0.375rem] mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          >
            {leftItems.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-fit max-w-full items-center gap-1 self-start rounded-lg border px-2 py-1.5 max-[420px]:p-2 sm:gap-1.5 sm:px-2.5",
                  "border-taruma-400/25 bg-taruma-400/8",
                  "text-[9px] font-medium text-taruma-300 whitespace-nowrap sm:text-[10px]",
                )}
              >
                <Icon className="size-3 shrink-0 max-[420px]:size-4" />
                <span className="min-w-0 truncate max-[420px]:sr-only">{label}</span>
              </div>
            ))}
          </Marquee>
        </div>

        {/* iPhone — center hub */}
        <div
          className={cn(
            "relative w-20 sm:w-35 shrink-0 transition-transform duration-500 ease-out group-hover:translate-y-6",
            modal ? "translate-y-0" : "translate-y-0 sm:translate-y-12",
          )}
        >
          <Iphone src="/illustrations/login-dark.png" />
        </div>

        {/* Right column */}
        <div className="relative z-10 flex min-w-0 flex-1 flex-col items-end">
          <div
            ref={rightAnchorRef}
            className="pointer-events-none absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 opacity-0"
          />
          <Marquee
            vertical
            reverse
            pauseOnHover
            repeat={4}
            className="h-32 w-full [--duration:8s] [--gap:0.375rem] mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          >
            {rightItems.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-fit max-w-full items-center gap-1 self-end rounded-lg border px-2 py-1.5 max-[420px]:p-2 sm:gap-1.5 sm:px-2.5",
                  "border-cumaru-400/20 bg-cumaru-400/5",
                  "text-[9px] font-medium text-cumaru-300 whitespace-nowrap sm:text-[10px]",
                )}
              >
                <Icon className="size-3 shrink-0 max-[420px]:size-4" />
                <span className="min-w-0 truncate max-[420px]:sr-only">{label}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Beams: phone → column anchors */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={leftAnchorRef}
        reverse
        duration={3.5}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={rightAnchorRef}
        duration={4}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />

      {/* Feixe percorrendo a borda do card */}
      <div className="pointer-events-none absolute inset-0 overflow-clip rounded-3xl">
        <BorderBeam size={90} duration={8} borderWidth={1.5} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-linear-to-b from-negro-800" />
    </div>
  );
}

// ── Sites que Representam o seu Negócio ───────────────────────────
// Mini bento com os segmentos dos sites que a North já entregou

const siteProjects = [
  { Icon: IconScale, name: "Gabriela Paiva", segment: "Advocacia", wide: true },
  {
    Icon: IconBuildingSkyscraper,
    name: "Antonelly",
    segment: "Construção civil e naval",
    wide: true,
  },
  { Icon: IconLeaf, name: "Grupo Matupi", segment: "Alimentos da Amazônia" },
  { Icon: IconCopyright, name: "MIMP", segment: "Propriedade intelectual" },
  { Icon: IconBuilding, name: "Office 145", segment: "Empresarial" },
];

function SitesBackground({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-clip", className)}>
      <div className="absolute inset-x-0 top-5 px-5">
        <div className="grid grid-cols-6 gap-2">
          {siteProjects.map(({ Icon, name, segment, wide }, i) => (
            <div
              key={name}
              className={cn(
                "min-w-0 overflow-clip rounded-xl border transition-colors duration-300",
                wide ? "col-span-3" : "col-span-2",
                i === 1
                  ? "border-taruma-400/20 bg-taruma-400/5 group-hover:border-taruma-400/35 group-hover:bg-taruma-400/10"
                  : "border-white/8 bg-negro-700/40 group-hover:border-taruma-400/20 group-hover:bg-negro-700/60",
              )}
            >
              {/* Barra de navegador */}
              <div className="flex items-center gap-1 border-b border-white/8 px-2 py-1.5 max-[420px]:hidden sm:px-3">
                <span className="size-1 rounded-full bg-white/20" />
                <span className="size-1 rounded-full bg-white/15" />
                <span className="size-1 rounded-full bg-white/10" />
              </div>

              <div className="p-2.5 sm:px-3 sm:pb-2.5 sm:pt-3">
                {/* Esboço do site */}
                <div className="flex h-8 items-center justify-center rounded-lg bg-linear-to-br from-taruma-400/25 to-taruma-400/5 sm:h-8">
                  <Icon className="size-4 text-taruma-300 sm:size-5" />
                </div>

                <p className="mt-2 truncate text-xs font-semibold text-cumaru-100 max-[420px]:whitespace-normal max-[420px]:text-[10px] max-[420px]:leading-tight">
                  {name}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-cumaru-500 max-[420px]:hidden">
                  {segment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[12%] bg-linear-to-b from-negro-800" />
    </div>
  );
}

// ── Automação e Inteligência Operacional ──────────────────────────
// Fluxo automático no centro orquestrando e-mail, ERP, WhatsApp, planilhas e alertas

const outerOrbit = [
  { Icon: IconMail, label: "E-mail" },
  { Icon: IconStack2, label: "ERP" },
  { Icon: IconLayoutDashboard, label: "Dashboard" },
  { Icon: IconBrandWhatsapp, label: "WhatsApp" },
];

const innerOrbit = [
  { Icon: IconTable, label: "Planilhas" },
  { Icon: IconBell, label: "Alertas" },
];

function AutomationBackground({
  className,
  modal,
}: {
  className?: string;
  modal?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full justify-center overflow-clip",
        // No card mobile o texto é sempre visível: órbita ancora no topo
        modal
          ? "items-center pb-25"
          : "items-start pt-6 pb-25 md:items-center md:pt-0",
        className,
      )}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-6">
        <div className="size-40 rounded-full bg-[radial-gradient(closest-side,rgba(61,175,166,0.13),transparent)]" />
      </div>

      <div
        className={cn(
          "relative flex size-65 items-center justify-center",
          !modal && "origin-top scale-90 md:origin-center md:scale-100",
        )}
      >
        {/* Hub — IA no centro */}
        <div className="relative z-10">
          <span className="absolute -inset-1.5 animate-pulse rounded-full border border-taruma-400/30" />
          <div className="flex size-12 items-center justify-center rounded-full border border-taruma-400/35 bg-negro-700 p-2.5 shadow-[0_0_28px_-6px_rgba(61,175,166,0.55)]">
            <IconBolt className="size-full text-taruma-400" />
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <NodeLabel>Fluxo</NodeLabel>
          </span>
        </div>

        <OrbitingCircles radius={108} duration={24} iconSize={38}>
          {outerOrbit.map(({ Icon, label }) => (
            <div
              key={label}
              title={label}
              className="flex size-full items-center justify-center rounded-full border border-white/10 bg-negro-700 p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]"
            >
              <Icon className="size-full text-cumaru-300" />
            </div>
          ))}
        </OrbitingCircles>

        <OrbitingCircles radius={58} duration={16} reverse iconSize={30}>
          {innerOrbit.map(({ Icon, label }) => (
            <div
              key={label}
              title={label}
              className="flex size-full items-center justify-center rounded-full border border-taruma-400/20 bg-negro-700 p-1.5"
            >
              <Icon className="size-full text-taruma-300" />
            </div>
          ))}
        </OrbitingCircles>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
    </div>
  );
}

// ── Service types ─────────────────────────────────────────────────

interface ServiceFeature {
  label: string;
  description: string;
}

interface ServiceDetail {
  tagline: string;
  features: ServiceFeature[];
  stack: string[];
}

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  background: React.ReactNode;
  modalBackground?: React.ReactNode;
  Icon: React.ElementType;
  detail: ServiceDetail;
  cta?: string;
  className?: string;
}

// ── ServiceModal ──────────────────────────────────────────────────

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceCardProps;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={service.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop — independent fade, not part of card layout animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-negro-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card expands from grid position via layoutId */}
      <motion.div
        layoutId={`service-card-${service.id}`}
        className={cn(
          "relative z-10 w-full max-w-xl max-h-[88vh] overflow-y-auto overflow-x-hidden",
          "rounded-3xl bg-negro-800 border border-white/10",
          "[box-shadow:0_0_80px_-20px_rgba(61,175,166,0.15)]",
        )}
      >
        {/* Visual header — reuses the card background */}
        <div className="relative h-52 overflow-clip rounded-t-3xl">
          {service.modalBackground ?? service.background}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-negro-800 via-negro-800/20 to-transparent" />

          {/* Close */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            onClick={onClose}
            aria-label="Fechar"
            className={cn(
              "absolute top-4 right-4 z-30",
              "flex size-8 items-center justify-center rounded-full",
              "border border-white/10 bg-negro-700/80 backdrop-blur-sm",
              "text-cumaru-400 transition-colors hover:text-cumaru-100 cursor-pointer",
            )}
          >
            <IconX className="size-4" />
          </motion.button>
        </div>

        {/* Content fades in after the card finishes expanding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="px-5 pb-8 pt-2 sm:px-6 wrap-break-word"
        >
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-taruma-400">
            {service.detail.tagline}
          </p>
          <h3 className="mb-1 text-2xl font-bold text-cumaru-100">
            {service.name}
          </h3>
          <p className="mb-6 text-sm text-cumaru-400">{service.description}</p>

          {/* Features */}
          <div className="mb-6 space-y-3">
            {service.detail.features.map((f, i) => (
              <div key={i} className="flex gap-3">
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-taruma-400/15 text-taruma-400">
                  <IconCheck className="size-3" />
                </div>
                <div>
                  <p className="text-sm font-medium text-cumaru-200">
                    {f.label}
                  </p>
                  <p className="text-xs text-cumaru-500">{f.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stack */}
          {service.detail.stack.length > 0 && (
            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cumaru-500">
                Tecnologias
              </p>
              <div className="flex flex-wrap gap-2">
                {service.detail.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-taruma-400/20 bg-taruma-400/8 px-3 py-1 text-xs text-taruma-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <a
            href="#contact"
            onClick={onClose}
            className="group/btn relative flex h-11 w-fit cursor-pointer items-center overflow-hidden rounded-full border border-white/10 bg-negro-700 ps-5 pe-12 text-sm font-medium text-cumaru-200 transition-all duration-500 hover:ps-12 hover:pe-5"
          >
            <span className="relative z-10 whitespace-nowrap transition-all duration-500">
              Falar com a equipe
            </span>
            <div className="absolute right-1 flex size-9 items-center justify-center rounded-full bg-taruma-400 text-negro-900 transition-all duration-500 group-hover/btn:right-[calc(100%-40px)]">
              <IconArrowUpRight className="size-3.5" />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Services section ──────────────────────────────────────────────

const services: ServiceCardProps[] = [
  {
    id: "sistemas",
    Icon: IconServer,
    name: "Sistemas para Operações Internas",
    description:
      "Controle de processos, equipes, documentos e indicadores em tempo real.",
    background: (
      <SystemsBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    modalBackground: (
      <SystemsBackground
        modal
        className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]"
      />
    ),
    detail: {
      tagline: "Operações & Gestão",
      features: [
        {
          label: "Painéis e indicadores em tempo real",
          description:
            "Dashboards com os números que importam para a decisão: produção, equipes e financeiro.",
        },
        {
          label: "Controle de processos e equipes",
          description:
            "Fluxos de trabalho, aprovações e responsabilidades organizados em um só lugar.",
        },
        {
          label: "Gestão de documentos e registros",
          description:
            "Documentos, contratos e registros centralizados, com histórico e busca rápida.",
        },
        {
          label: "Integrações com ERP, CRM e planilhas",
          description:
            "Seu sistema conversa com as ferramentas que a empresa já usa, sem retrabalho.",
        },
      ],
      stack: [
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS",
        "Prisma",
        "Python",
      ],
    },
  },
  {
    id: "mobile",
    Icon: IconDeviceMobile,
    name: "Aplicativos para Clientes e Equipes",
    description:
      "Apps Android e iOS conectados ao seu negócio, para vender, atender e operar.",
    background: (
      <MobileBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    modalBackground: (
      <MobileBackground
        modal
        className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]"
      />
    ),
    detail: {
      tagline: "iOS & Android",
      features: [
        {
          label: "Seu negócio no bolso do cliente",
          description:
            "Pedidos, agendamentos e acompanhamento em tempo real, na palma da mão de quem compra de você.",
        },
        {
          label: "Equipe produtiva, até sem internet",
          description:
            "Checklists, coletas e registros direto do celular, que funcionam offline e sincronizam sozinhos.",
        },
        {
          label: "Do código à Play Store",
          description:
            "Cuidamos de toda a publicação e das atualizações, para você só se preocupar em atender seus clientes.",
        },
      ],
      stack: [
        "Kotlin",
        "Jetpack Compose",
        "TypeScript",
      ],
    },
  },
  {
    id: "sites",
    Icon: IconWorldWww,
    name: "Sites que Representam o seu Negócio",
    description:
      "Sites institucionais sob medida que transmitem credibilidade e transformam visitas em contatos.",
    background: (
      <SitesBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    modalBackground: (
      <SitesBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    detail: {
      tagline: "Web & Presença Digital",
      features: [
        {
          label: "Credibilidade desde o primeiro clique",
          description:
            "Design profissional que traduz a identidade e a solidez da sua empresa, como já fizemos para escritórios de advocacia, construtoras e marcas locais.",
        },
        {
          label: "Seus serviços explicados com clareza",
          description:
            "Estrutura pensada para o visitante entender o que você faz e falar com você em poucos cliques, por WhatsApp, e-mail ou formulário.",
        },
        {
          label: "Rápido e bem posicionado no Google",
          description:
            "SEO técnico, carregamento veloz e funcionamento perfeito no celular, com Next.js.",
        },
        {
          label: "Pronto para crescer com você",
          description:
            "Novas páginas, blog, área de clientes ou integrações quando o negócio pedir, sem refazer o site.",
        },
      ],
      stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    },
  },
  {
    id: "automacao",
    Icon: IconRobot,
    name: "Automação de Processos",
    description:
      "Sistemas que executam regras de negócio, integram serviços e reagem a eventos, sem trabalho manual.",
    background: (
      <AutomationBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    modalBackground: (
      <AutomationBackground
        modal
        className="pb-6 mask-[linear-gradient(to_top,transparent_15%,#000_100%)]"
      />
    ),
    detail: {
      tagline: "Automação & Integrações",
      features: [
        {
          label: "Menos tarefas manuais",
          description:
            "Relatórios, conferências e lançamentos passam a rodar sozinhos, sem retrabalho e sem erro humano.",
        },
        {
          label: "Regras de negócio no piloto automático",
          description:
            "Seu processo vira software: o sistema valida, calcula e decide conforme as regras da sua operação.",
        },
        {
          label: "Serviços conectados",
          description:
            "Integramos e-mail, planilhas, ERP, WhatsApp e APIs para a informação fluir entre eles sem digitação.",
        },
        {
          label: "Reação automática a eventos",
          description:
            "Um pedido novo, um prazo vencendo ou um valor fora do padrão disparam as ações certas, na hora.",
        },
      ],
      stack: ["Python", "Node.js", "IA / LLMs", "Webhooks", "APIs"],
    },
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<ServiceCardProps | null>(
    null,
  );
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const stripRef = useRef<HTMLDivElement>(null);
  const stripInView = useInView(stripRef, { once: true, amount: 0.3 });

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-20 lg:py-42 bg-negro-900"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-negro-800 to-transparent pointer-events-none z-0"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-negro-800 pointer-events-none z-0"
      />

      {/* Glow ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 size-130 rounded-full bg-[radial-gradient(closest-side,rgba(61,175,166,0.06),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 size-130 rounded-full bg-[radial-gradient(closest-side,rgba(61,175,166,0.08),transparent)]"
      />
      <Container>
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h2 className="mt-4 text-3xl lg:text-5xl font-normal text-cumaru-100 leading-tight">
              Tecnologia com{" "}
              <Highlighter
                action="underline"
                color="#3DAFA6"
                strokeWidth={2}
                animationDuration={800}
                iterations={2}
                padding={2}
                isView
                delay={700}
              >
                <span className="text-accent">propósito.</span>
              </Highlighter>
            </h2>
          </div>
          <p className="text-md text-cumaru-400 max-w-lg lg:text-right">
            Soluções que aumentam produtividade, reduzem custos e dão controle
            da operação — construídas sob medida para o seu negócio.
          </p>
        </motion.div>

        <div ref={gridRef}>
        <BentoGrid className="auto-rows-[30rem] sm:auto-rows-[28rem] sm:grid-cols-2 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                delay: i * 0.1,
              }}
              className="h-full"
            >
              <BentoCard
                id={service.id}
                name={service.name}
                description={service.description}
                tagline={service.detail.tagline}
                background={gridInView ? service.background : null}
                Icon={service.Icon}
                isActive={activeService?.id === service.id}
                onLearnMore={() => setActiveService(service)}
                className="h-full"
              />
            </motion.div>
          ))}
        </BentoGrid>
        </div>

      </Container>

      <AnimatePresence>
        {activeService && (
          <ServiceModal
            key={activeService.id}
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
