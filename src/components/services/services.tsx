"use client";

import { useDesktop } from "@/hooks/use-desktop";
import React, { forwardRef, useRef, useState, useEffect } from "react";
import Image from "next/image";
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
  IconDeviceMobile,
  IconBell,
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
import { OrbitingCircles } from "../ui/orbiting-circles";
import { SectionHead, Acento } from "../section/section";
import { whatsappHref } from "@/constants";

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
    <span className="text-[11px] font-medium uppercase tracking-wide text-cumaru-500">
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
          {/* Hub - o sistema que integra tudo */}
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
// Telas reais de um app entregue pela North (Medição IP4: atividades, local de trabalho e módulos)

function AppVisual() {
  return (
    <div className="relative h-full w-full overflow-clip">
      <Image
        src="/projetos/app-sian.webp"
        alt="Telas de um aplicativo desenvolvido pela North: atividades do dia, escolha do local de trabalho e módulos"
        fill
        sizes="(min-width: 1024px) 560px, 92vw"
        className="object-cover object-[50%_8%] px-6 pt-6"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-negro-800" />
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

                <p className="mt-2 truncate text-xs font-semibold text-cumaru-100 max-[420px]:whitespace-normal max-[420px]:text-[11px] max-[420px]:leading-tight">
                  {name}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-cumaru-500 max-[420px]:hidden">
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
        {/* Hub - IA no centro */}
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
    background: <AppVisual />,
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

// Serviços: lista à esquerda e um "palco" à direita com o diagrama do serviço, o que entregamos e as
// tecnologias (antes era uma grade de cartões com um modal). Clique, toque ou foco troca o serviço; o palco
// tem altura estável (os textos ficam empilhados na mesma célula) e só o diagrama ativo é renderizado.
// No celular cada serviço abre o próprio painel logo abaixo.
function Tecnologias({ service, className }: { service: ServiceCardProps; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tecnologias">
      {[...new Set(service.detail.stack)].map((t) => (
        <li key={t} className="rounded-full border border-white/10 bg-negro-900/70 px-2.5 py-0.5 font-mono text-[11px] tracking-wide text-cumaru-300 backdrop-blur">
          {t}
        </li>
      ))}
    </ul>
  );
}

// comTecnologias: no palco do desktop as tecnologias vão sobre a imagem (economiza uma linha)
function Detalhes({ service, comTecnologias = true }: { service: ServiceCardProps; comTecnologias?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        {service.detail.features.map((f) => (
          <li key={f.label} className="flex gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-taruma-400/15 text-taruma-300">
              <IconCheck className="size-3" aria-hidden />
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-sm font-medium text-cumaru-100">{f.label}</span>
              <span className="text-[13px] leading-relaxed text-cumaru-500">{f.description}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
        {comTecnologias ? <Tecnologias service={service} /> : <span aria-hidden />}
        <a
          href={whatsappHref(`Olá! Vim pelo site da North e quero conversar sobre ${service.name.toLowerCase()}.`)}
          target="_blank"
          rel="noopener"
          className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-taruma-400 px-4 text-[13px] font-semibold text-negro-900 transition-colors hover:bg-taruma-300"
        >
          Conversar sobre este serviço
          <IconArrowUpRight className="size-4 transition-transform group-hover:rotate-45" aria-hidden />
        </a>
      </div>
    </div>
  );
}

// Container cuja altura segue a do conteúdo (ResizeObserver) com transição suave
function AlturaAnimada({ children }: { children: React.ReactNode }) {
  const interno = useRef<HTMLDivElement>(null);
  const [altura, setAltura] = useState<number | "auto">("auto");
  useEffect(() => {
    const el = interno.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setAltura(e.borderBoxSize[0].blockSize));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <motion.div animate={{ height: altura }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
      <div ref={interno}>{children}</div>
    </motion.div>
  );
}

function Visual({ service }: { service: ServiceCardProps }) {
  return (
    <motion.div key={service.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-0">
      {service.modalBackground ?? service.background}
    </motion.div>
  );
}

export default function Services() {
  const [ativo, setAtivo] = useState(0);
  const desktop = useDesktop();
  const ref = useRef<HTMLElement>(null);
  const naTela = useInView(ref, { once: true, margin: "200px 0px" });
  const atual = services[ativo];

  return (
    <section ref={ref} id="services" aria-labelledby="servicos-titulo" className="relative pt-16 pb-24 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(61,175,166,0.07),transparent)]" />
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            id="servicos-titulo"
            indice="01"
            rotulo="Serviços"
            titulo={
              <>
                Do sistema interno ao <Acento>app do seu cliente.</Acento>
              </>
            }
          />
          <p className="revelar max-w-md text-lg leading-relaxed text-cumaru-400 lg:text-right">
            Soluções que aumentam produtividade, reduzem custos e dão controle da operação, construídas sob medida para o seu negócio.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* lista */}
          <ol className="revelar flex min-w-0 flex-col border-t border-white/8">
            {services.map((s, i) => {
              const aberto = i === ativo;
              const Icone = s.Icon;
              return (
                <li key={s.id} className="border-b border-white/8">
                  <button
                    type="button"
                    onClick={() => setAtivo(i)}
                    onMouseEnter={() => desktop && setAtivo(i)}
                    onFocus={() => desktop && setAtivo(i)}
                    aria-expanded={aberto}
                    aria-controls={desktop ? "servico-palco" : `servico-${s.id}`}
                    className="group relative flex w-full cursor-pointer items-start gap-5 py-6 text-left lg:py-7"
                  >
                    <span aria-hidden className={cn("absolute -top-px left-0 h-px w-full origin-left bg-taruma-400 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]", aberto ? "scale-x-100" : "scale-x-0")} />
                    <span className={cn("pt-0.5 font-mono text-xs tabular-nums transition-colors", aberto ? "text-taruma-300" : "text-cumaru-600")}>0{i + 1}</span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <span className={cn("font-mono text-[11px] tracking-[0.16em] uppercase transition-colors", aberto ? "text-taruma-300" : "text-cumaru-600")}>{s.detail.tagline}</span>
                      <span className={cn("text-xl font-semibold tracking-tight transition-colors sm:text-2xl", aberto ? "text-cumaru-100" : "text-cumaru-400 group-hover:text-cumaru-200")}>{s.name}</span>
                      {/* resumo abre sob o serviço ativo (altura animada por grid-rows, sem medir) */}
                      <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]", aberto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <span className="overflow-hidden">
                          <span className="block max-w-[42ch] pt-2 text-[15px] leading-relaxed text-cumaru-400">{s.description}</span>
                        </span>
                      </span>
                    </span>
                    <Icone className={cn("mt-0.5 size-5 shrink-0 transition-colors", aberto ? "text-taruma-300" : "text-cumaru-600")} aria-hidden />
                  </button>

                  {/* celular e tablet: o painel abre no próprio item */}
                  {!desktop && aberto && (
                    <div id={`servico-${s.id}`} className="flex flex-col gap-6 pb-8">
                      <div className="relative h-64 overflow-hidden rounded-2xl border border-white/8 bg-negro-800 *:*:mask-none!">{naTela && <Visual service={s} />}</div>
                      <Detalhes service={s} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* palco (desktop) */}
          <div className="hidden min-w-0 lg:block">
          <div id="servico-palco" className="revelar sticky top-28 flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/8 bg-negro-900/60">
            <div className="relative h-48 overflow-hidden border-b border-white/8 bg-negro-800">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(61,175,166,.12),transparent_70%)]" />
              <AnimatePresence mode="wait">{naTela && desktop && <Visual service={atual} />}</AnimatePresence>
              <Tecnologias key={atual.id} service={atual} className="subir absolute inset-x-5 bottom-4" />
            </div>
            {/* a altura acompanha o conteúdo do serviço ativo (animada), sem sobrar espaço vazio nos mais curtos */}
            <AlturaAnimada>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={atual.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 xl:p-7"
                >
                  <Detalhes service={atual} comTecnologias={false} />
                </motion.div>
              </AnimatePresence>
            </AlturaAnimada>
          </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
