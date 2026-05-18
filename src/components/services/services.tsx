"use client";

import React, { forwardRef, useRef } from "react";
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
} from "@tabler/icons-react";
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
      <div className="flex size-full max-w-xs flex-row items-stretch justify-between gap-6">
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
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={4}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={4}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={4}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={4}
        gradientStartColor="#3DAFA6"
        gradientStopColor="#3DAFA6"
        pathColor="transparent"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={4}
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

function MobileBackground({ className }: { className?: string }) {
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
        <div className="relative w-35 shrink-0 translate-y-12 transition-transform duration-500 ease-out group-hover:translate-y-6">
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

// ── ServiceCard ───────────────────────────────────────────────────

interface ServiceCardProps {
  name: string;
  description: string;
  background: React.ReactNode;
  href?: string;
  cta?: string;
  className?: string;
}

function ServiceCard({
  name,
  description,
  background,
  href = "#contact",
  cta = "Saiba mais",
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "group relative col-span-3 lg:col-span-1 flex flex-col overflow-hidden rounded-3xl",
        "bg-negro-800 border border-white/8",
        "[box-shadow:0_-20px_80px_-20px_rgba(61,175,166,0.06)_inset]",
        "transition-colors duration-300",
        "hover:border-taruma-400/30",
        className,
      )}
    >
      <div className="absolute inset-0">{background}</div>

      {/* Static gradient — stays fixed at bottom, never moves */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-negro-800/90 to-transparent" />

      {/* Text — slides up to make room for the CTA */}
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-1 p-6",
          "transition-transform duration-300 group-hover:-translate-y-10",
        )}
      >
        <h3 className="text-xl font-bold text-cumaru-100">{name}</h3>
        <p className="text-sm text-cumaru-400 max-w-xs">{description}</p>
      </div>

      {/* CTA — slides up from below on hover */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-20 flex items-center p-4",
          "translate-y-10 opacity-0 transition-all duration-300",
          "group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <a
          href={href}
          className="group/btn relative flex h-10 w-fit cursor-pointer items-center overflow-hidden rounded-full border border-white/10 bg-negro-700 ps-5 pe-12 text-sm font-medium text-cumaru-200 transition-all duration-500 hover:ps-12 hover:pe-5"
        >
          <span className="relative z-10 whitespace-nowrap transition-all duration-500">
            {cta}
          </span>
          <div className="absolute right-1 flex size-8 items-center justify-center rounded-full bg-taruma-400 text-negro-900 transition-all duration-500 group-hover/btn:right-[calc(100%-36px)]">
            <IconArrowUpRight className="size-3.5" />
          </div>
        </a>
      </div>
    </div>
  );
}

// ── Services section ──────────────────────────────────────────────

const services: ServiceCardProps[] = [
  {
    name: "Sistemas e Integrações",
    description:
      "Aplicações web robustas: painéis, APIs, integrações e fluxos de negócio complexos.",
    background: (
      <SystemsBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
  },
  {
    name: "Mobile",
    description:
      "Apps nativos e cross-platform para iOS e Android com experiência premium.",
    background: (
      <MobileBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
  },
  {
    name: "Criação de Sites",
    description:
      "Sites institucionais, landing pages e e-commerces otimizados para conversão.",
    background: (
      <SitesBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-42 bg-negro-900"
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
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-taruma-400 uppercase tracking-widest">
              Serviços
            </span>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-cumaru-100 leading-tight">
              Tecnologia com propósito,
              <br className="hidden lg:block" /> construída para escalar.
            </h2>
          </div>
          <p className="text-sm text-cumaru-400 max-w-sm lg:text-right">
            Desenvolvemos sistemas robustos, apps mobile e sites de alta
            conversão que conectam sua ideia ao mercado e crescem com o seu
            negócio.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 auto-rows-[22rem]">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
