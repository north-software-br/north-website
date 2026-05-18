"use client";

import React, { forwardRef, useRef } from "react";
import { motion } from "motion/react";
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

// ── Decorative dot ────────────────────────────────────────────────

function Dot({ className }: { className?: string }) {
  return (
    <div className={cn("size-[5px] rounded-[1.5px] bg-white/[0.18]", className)} />
  );
}

// ── Sistemas ──────────────────────────────────────────────────────

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
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref} className="size-10">
            <IconUser className="size-full text-cumaru-300" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="size-12">
            <IconServer className="size-full text-taruma-400" />
          </Circle>
        </div>
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

      {[div1Ref, div2Ref, div3Ref, div4Ref, div5Ref].map((ref, i) => (
        <AnimatedBeam
          key={i}
          containerRef={containerRef}
          fromRef={ref}
          toRef={div6Ref}
          duration={4}
          gradientStartColor="#3DAFA6"
          gradientStopColor="#3DAFA6"
          pathColor="transparent"
        />
      ))}
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
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-6">
        <div className="size-48 rounded-full bg-taruma-400/8 blur-3xl" />
      </div>

      <div
        ref={centerRef}
        className="pointer-events-none absolute left-1/2 top-[44%] size-2 -translate-x-1/2 -translate-y-1/2 opacity-0 z-20"
      />

      <div className="absolute inset-0 flex items-center justify-between px-3 pb-16">
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

        <div className="relative w-35 shrink-0 translate-y-12 transition-transform duration-500 ease-out group-hover:translate-y-6">
          <Iphone src="/app-login.svg" />
        </div>

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

// ── Animation variants ────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// ── ServiceCard ───────────────────────────────────────────────────

interface ServiceCardProps {
  number: string;
  name: string;
  description: string;
  background: React.ReactNode;
  imageSrc?: string;
  icon?: React.ReactNode;
  href?: string;
  cta?: string;
  progressDelay?: number;
  className?: string;
}

function ServiceCard({
  number,
  name,
  description,
  background,
  imageSrc,
  icon,
  href = "#contact",
  cta = "Saiba mais",
  progressDelay = 0.4,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.018,
        y: -5,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl",
        "bg-negro-800 border border-white/[0.07]",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-taruma-400/[0.22]",
        "hover:shadow-[0_12px_56px_-12px_rgba(61,175,166,0.20)]",
        className,
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0">{background}</div>

      {/* Image reveal — desliza de cima para baixo no hover */}
      {imageSrc && (
        <div className="absolute inset-x-0 top-0 z-8 h-[62%] overflow-hidden">
          <img
            src={imageSrc}
            alt={name}
            className={cn(
              "h-full w-full object-cover",
              "-translate-y-full transition-transform duration-700",
              "ease-[cubic-bezier(0.22,1,0.36,1)]",
              "group-hover:translate-y-0",
            )}
          />
        </div>
      )}

      {/* Ícone central — visível no estado padrão, some ao revelar a imagem */}
      {icon && (
        <div
          className={cn(
            "absolute left-1/2 top-[30%] z-15",
            "-translate-x-1/2 -translate-y-1/2",
            "transition-all duration-500",
            imageSrc
              ? "opacity-100 group-hover:opacity-0 group-hover:translate-y-[-60%] group-hover:-translate-x-1/2"
              : "opacity-100",
          )}
        >
          <div className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-negro-700/70 backdrop-blur-sm">
            {icon}
          </div>
        </div>
      )}

      {/* Top corner dots */}
      <div className="absolute top-[22px] left-[22px] z-20">
        <Dot />
      </div>
      <div className="absolute top-[22px] right-[22px] z-20">
        <Dot />
      </div>

      {/* Hover radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_25%,rgba(61,175,166,0.06)_0%,transparent_100%)]" />
      </div>

      {/* Bottom gradient for text readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-11 h-2/3 bg-linear-to-t from-negro-800/95 to-transparent" />

      {/* Spacer */}
      <div className="flex-1 min-h-[200px]" />

      {/* Middle dot */}
      <div className="relative z-20 flex justify-center mb-5">
        <Dot />
      </div>

      {/* Text — slides up to reveal CTA */}
      <div
        className={cn(
          "relative z-20 px-8 pb-5 text-center",
          "transition-transform duration-300 group-hover:-translate-y-10",
        )}
      >
        <h3 className="text-[1.2rem] font-semibold tracking-tight text-cumaru-100 leading-snug">
          {name}
        </h3>
        <p className="mt-2 text-sm text-cumaru-500/90 leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>

      {/* Number */}
      <div className="relative z-20 pb-5 text-center transition-transform duration-300 group-hover:-translate-y-10">
        <span className="text-xs font-mono tracking-[0.18em] text-white/[0.14]">
          {number}
        </span>
      </div>

      {/* CTA — slides up from below on hover */}
      <div
        className={cn(
          "absolute bottom-12 left-0 right-0 z-20 flex justify-center",
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

      {/* Bottom progress bar */}
      <div className="relative z-20 mx-7 mb-7 h-px overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          className="h-full rounded-full bg-taruma-400/35"
          initial={{ width: "0%" }}
          whileInView={{ width: "33%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: progressDelay, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ── Services data ─────────────────────────────────────────────────

const services: (ServiceCardProps & { featured?: boolean })[] = [
  {
    number: "01",
    name: "Sistemas e Integrações",
    description:
      "Aplicações web robustas: painéis, APIs, integrações e fluxos de negócio complexos.",
    background: (
      <SystemsBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    icon: <IconServer className="size-5 text-cumaru-300" />,
    imageSrc: "/illustrations/01-studio.svg",
    progressDelay: 0.4,
  },
  {
    number: "02",
    name: "Mobile",
    description:
      "Apps nativos e cross-platform para iOS e Android com experiência premium.",
    background: (
      <MobileBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    icon: <IconDeviceMobile className="size-5 text-cumaru-300" />,
    imageSrc: "/illustrations/02-journey.svg",
    featured: true,
    progressDelay: 0.55,
  },
  {
    number: "03",
    name: "Criação de Sites",
    description:
      "Sites institucionais, landing pages e e-commerces otimizados para conversão.",
    background: (
      <SitesBackground className="mask-[linear-gradient(to_top,transparent_15%,#000_100%)]" />
    ),
    icon: <IconBrandReact className="size-5 text-cumaru-300" />,
    imageSrc: "/illustrations/04-stack.svg",
    progressDelay: 0.7,
  },
];

// ── Section ───────────────────────────────────────────────────────

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-42 bg-negro-900"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0 bg-linear-to-b from-negro-800 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-0 bg-linear-to-b from-transparent to-negro-800"
      />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-14 text-center"
        >
          <span className="text-sm font-semibold text-taruma-400 uppercase tracking-widest">
            Serviços
          </span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-cumaru-100 leading-tight">
            Tecnologia com propósito,
            <br className="hidden lg:block" /> construída para escalar.
          </h2>
          <p className="mt-4 text-sm text-cumaru-500 max-w-md mx-auto leading-relaxed">
            Sistemas robustos, apps mobile e sites de alta conversão — do MVP
            ao produto final.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          {services.map(({ featured, ...service }, i) => (
            <ServiceCard
              key={i}
              {...service}
              className={featured ? "min-h-[580px]" : "min-h-[460px]"}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
