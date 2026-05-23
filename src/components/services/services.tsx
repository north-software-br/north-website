"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import Container from "../container/container";
import { AnimatedBeam } from "../ui/animated-beam";
import {
  IconUser,
  IconServer,
  IconApi,
  IconDatabase,
  IconLock,
  IconCreditCard,
  IconClock,
  IconArrowUpRight,
  IconBrandReact,
  IconDeviceMobile,
  IconRocket,
  IconBrandApple,
  IconBrandGooglePlay,
  IconCloudUpload,
  IconBrandTypescript,
  IconBell,
  IconX,
  IconCheck,
  IconWorldWww,
} from "@tabler/icons-react";
import { BentoGrid, BentoCard } from "../ui/bento-grid";
import { Iphone } from "../ui/iphone";
import { Safari } from "../ui/safari";
import { Marquee } from "../ui/shadcn-space/radix/animations/marquee";

// ── Sistemas ─────────────────────────────────────────────────────

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

function SystemsBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden p-6 pb-25",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex w-full max-w-[14rem] sm:max-w-xs flex-row items-stretch justify-between gap-4 sm:gap-6">
        {/* Left: output — the client/user */}
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="size-10">
            <IconUser className="size-full text-cumaru-300" />
          </Circle>
        </div>

        {/* Center: hub — the system/server */}
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-12">
            <IconServer className="size-full text-taruma-400" />
          </Circle>
        </div>

        {/* Right: inputs — services that feed the system */}
        <div className="flex flex-col justify-center gap-1.5">
          <Circle ref={div1Ref}>
            <IconApi className="size-full text-cumaru-300" />
          </Circle>
          <Circle ref={div2Ref}>
            <IconDatabase className="size-full text-cumaru-300" />
          </Circle>
          <Circle ref={div3Ref}>
            <IconLock className="size-full text-cumaru-300" />
          </Circle>
          <Circle ref={div4Ref}>
            <IconCreditCard className="size-full text-cumaru-300" />
          </Circle>
          <Circle ref={div5Ref}>
            <IconClock className="size-full text-cumaru-300" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={4}
        delay={0}
        repeatDelay={0}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={1}
        delay={0.8}
        repeatDelay={0}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={4}
        delay={1.6}
        repeatDelay={0}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={4}
        delay={2.4}
        repeatDelay={0}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={4}
        delay={3.2}
        repeatDelay={0}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={4}
        delay={0}
        repeatDelay={0}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
    </div>
  );
}

// ── Mobile ────────────────────────────────────────────────────────

const leftItems = [
  { icon: IconBrandReact, label: "React Native" },
  { icon: IconDeviceMobile, label: "iOS & Android" },
  { icon: IconRocket, label: "Expo" },
  { icon: IconBrandTypescript, label: "TypeScript" },
];

const rightItems = [
  { icon: IconBrandApple, label: "App Store" },
  { icon: IconBrandGooglePlay, label: "Play Store" },
  { icon: IconCloudUpload, label: "OTA Updates" },
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
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-6">
        <div className="size-48 rounded-full bg-taruma-400/8 blur-3xl" />
      </div>

      {/* Beam origin */}
      <div
        ref={centerRef}
        className="pointer-events-none absolute left-1/2 top-[44%] size-2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-20"
      />

      {/* Layout: left column | iPhone | right column */}
      <div className="absolute inset-0 flex items-center justify-between px-3 pb-16">
        {/* Left column */}
        <div className="relative z-10 flex flex-col items-start">
          <div
            ref={leftAnchorRef}
            className="pointer-events-none absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 opacity-0"
          />
          <Marquee
            vertical
            pauseOnHover
            repeat={4}
            className="h-32 [--duration:8s] [--gap:0.375rem] mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          >
            {leftItems.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5",
                  "border-taruma-400/25 bg-taruma-400/8",
                  "text-[10px] font-medium text-taruma-300 whitespace-nowrap",
                )}
              >
                <Icon className="size-3 shrink-0" />
                <span>{label}</span>
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
          <Iphone src="/app-login.svg" />
        </div>

        {/* Right column */}
        <div className="relative z-10 flex flex-col items-end">
          <div
            ref={rightAnchorRef}
            className="pointer-events-none absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 opacity-0"
          />
          <Marquee
            vertical
            reverse
            pauseOnHover
            repeat={4}
            className="h-32 [--duration:8s] [--gap:0.375rem] mask-[linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
          >
            {rightItems.map(({ icon: Icon, label }, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5",
                  "border-cumaru-400/20 bg-cumaru-400/5",
                  "text-[10px] font-medium text-cumaru-300 whitespace-nowrap",
                )}
              >
                <Icon className="size-3 shrink-0" />
                <span>{label}</span>
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

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-linear-to-b from-negro-800" />
    </div>
  );
}

// ── Criação de Sites ──────────────────────────────────────────────

const sitesRow1 = [
  { label: "Next.js" },
  { label: "React" },
  { label: "TypeScript" },
  { label: "TailwindCSS" },
  { label: "Framer Motion" },
  { label: "Vercel" },
];

const sitesRow2 = [
  { label: "Landing Page" },
  { label: "E-commerce" },
  { label: "Blog" },
  { label: "SEO" },
  { label: "Responsivo" },
  { label: "Acessível" },
];

function SitesBackground({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {/* Safari mockup positioned in upper area, slightly clipped at bottom */}
      <div className="absolute inset-x-0 top-4 px-3">
        <Safari url="north.dev" mode="simple">
          <div className="flex h-full w-full flex-col justify-center gap-3 bg-negro-900 py-3">
            <Marquee pauseOnHover className="[--duration:22s]">
              {sitesRow1.map((f, i) => (
                <figure
                  key={i}
                  className={cn(
                    "relative w-24 overflow-hidden rounded-xl border p-3 cursor-pointer",
                    "border-white/8 bg-negro-700/40",
                    "blur-[0.5px] hover:blur-none transition-all duration-300 hover:bg-negro-700/70",
                  )}
                >
                  <figcaption className="text-xs font-medium text-cumaru-300">
                    {f.label}
                  </figcaption>
                </figure>
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:22s]">
              {sitesRow2.map((f, i) => (
                <figure
                  key={i}
                  className={cn(
                    "relative w-24 overflow-hidden rounded-xl border p-3 cursor-pointer",
                    "border-taruma-400/20 bg-taruma-400/5",
                    "blur-[0.5px] hover:blur-none transition-all duration-300 hover:bg-taruma-400/10",
                  )}
                >
                  <figcaption className="text-xs font-medium text-taruma-300">
                    {f.label}
                  </figcaption>
                </figure>
              ))}
            </Marquee>
          </div>
        </Safari>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-negro-800" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-linear-to-b from-negro-800" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
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
          "relative z-10 w-full max-w-xl max-h-[88vh] overflow-y-auto",
          "rounded-3xl bg-negro-800 border border-white/10",
          "[box-shadow:0_0_80px_-20px_rgba(61,175,166,0.15)]",
        )}
      >
        {/* Visual header — reuses the card background */}
        <div className="relative h-52 overflow-hidden rounded-t-3xl">
          {service.modalBackground ?? service.background}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-linear-to-t from-negro-800 via-negro-800/20 to-transparent" />

          {/* Close */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            onClick={onClose}
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
          className="px-6 pb-8 pt-2"
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
    name: "Sistemas e Integrações",
    description:
      "Aplicações web robustas: painéis, APIs, integrações e fluxos de negócio complexos.",
    background: (
      <SystemsBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    modalBackground: (
      <SystemsBackground className="pb-6 mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    detail: {
      tagline: "Back-end & Integrações",
      features: [
        {
          label: "APIs RESTful e GraphQL",
          description:
            "Arquitetura de APIs escaláveis com documentação automática e controle de versão.",
        },
        {
          label: "Integrações com terceiros",
          description:
            "Conectamos seu sistema a ERPs, CRMs, gateways de pagamento e qualquer serviço externo.",
        },
        {
          label: "Painéis e dashboards",
          description:
            "Interfaces de gestão com relatórios em tempo real e controle granular de permissões.",
        },
        {
          label: "Automação de processos",
          description:
            "Workflows automatizados que eliminam trabalho manual e reduzem erros operacionais.",
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
    name: "Mobile",
    description:
      "Apps nativos e cross-platform para iOS e Android com experiência premium.",
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
          label: "React Native & Expo",
          description:
            "Um único código-fonte para iOS e Android, com performance nativa e atualizações OTA.",
        },
        {
          label: "Design de alta fidelidade",
          description:
            "Interfaces polidas com animações fluidas que respeitam as guidelines de cada plataforma.",
        },
        {
          label: "Publicação nas lojas",
          description:
            "Configuramos o pipeline de CI/CD e publicamos seu app na App Store e Google Play.",
        },
        {
          label: "Notificações e offline",
          description:
            "Push notifications, suporte offline e sincronização transparente com o back-end.",
        },
      ],
      stack: [
        "React Native",
        "Expo",
        "TypeScript",
        "Reanimated",
        "Zustand",
        "Supabase",
      ],
    },
  },
  {
    id: "sites",
    Icon: IconWorldWww,
    name: "Criação de Sites",
    description:
      "Sites institucionais, landing pages e e-commerces otimizados para conversão.",
    background: (
      <SitesBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    modalBackground: (
      <SitesBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    detail: {
      tagline: "Web & Performance",
      features: [
        {
          label: "Landing pages de alta conversão",
          description:
            "Páginas focadas em resultados com copywriting, CTA estratégico e testes A/B.",
        },
        {
          label: "SEO técnico e performance",
          description:
            "Core Web Vitals no verde, SSR/SSG com Next.js e estrutura de dados para melhor indexação.",
        },
        {
          label: "E-commerce completo",
          description:
            "Lojas virtuais com checkout, gestão de estoque e integração com meios de pagamento.",
        },
        {
          label: "Sites institucionais",
          description:
            "Presença digital profissional com CMS headless para edição fácil pelo seu time.",
        },
      ],
      stack: [
        "Next.js",
        "TailwindCSS",
        "Framer Motion",
        "Sanity",
        "Vercel",
        "Stripe",
      ],
    },
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState<ServiceCardProps | null>(
    null,
  );
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

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
      <Container>
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            {/* <span className="text-sm font-semibold text-taruma-400 uppercase tracking-widest">
              Serviços
            </span> */}
            <h2 className="mt-2 text-3xl lg:text-5xl font-normal text-cumaru-100 leading-tight">
              Tecnologia com propósito.
            </h2>
          </div>
          <p className="text-md text-cumaru-400 max-w-lg lg:text-right">
            Desenvolvemos sistemas robustos, apps mobile e sites de alta
            conversão que conectam sua ideia ao mercado e crescem com o seu
            negócio.
          </p>
        </motion.div>

        <BentoGrid className="auto-rows-[28rem] sm:grid-cols-3">
          {services.map((service) => (
            <BentoCard
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              background={service.background}
              Icon={service.Icon}
              isActive={activeService?.id === service.id}
              onLearnMore={() => setActiveService(service)}
            />
          ))}
        </BentoGrid>
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
