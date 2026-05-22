"use client";

import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import React from "react";
import { MacosWindow } from "./macos-window";
import { TextGenerateEffect } from "./text-generate-effect";
import { Terminal } from "./terminal";
import { ArchBeamDiagram } from "./arch-beam-diagram";

export const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "grid w-full grid-cols-1 md:grid-cols-3 gap-4",
      className,
    )}
  >
    {children}
  </div>
);

export const BentoCard = ({
  id,
  name,
  className,
  background,
  Icon,
  description,
  cta = "Saiba mais",
  isActive,
  onLearnMore,
}: {
  id: string;
  name: string;
  className?: string;
  background: React.ReactNode;
  Icon: React.ElementType;
  description: string;
  cta?: string;
  isActive?: boolean;
  onLearnMore?: () => void;
}) => (
  <motion.div
    layoutId={`service-card-${id}`}
    style={{
      opacity: isActive ? 0 : 1,
      pointerEvents: isActive ? "none" : "auto",
    }}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-negro-800 border border-white/8",
      "[box-shadow:0_-20px_80px_-20px_rgba(61,175,166,0.06)_inset]",
      "transform-gpu transition-colors duration-300",
      "hover:border-taruma-400/30",
      className,
    )}
  >
    {/* Background */}
    <div className="absolute inset-0">{background}</div>

    {/* Static bottom gradient */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-negro-800/90 to-transparent" />

    {/* Text area — slides up on hover to reveal CTA (desktop only) */}
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-1 p-6 pb-16 md:pb-6 transition-all duration-300 md:group-hover:-translate-y-10">
      <Icon className="mb-2 size-7 origin-left transform-gpu text-taruma-400 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-bold text-cumaru-100">{name}</h3>
      <p className="max-w-xs text-sm text-cumaru-400">{description}</p>
    </div>

    {/* CTA — always visible on mobile, slides up from below on hover on desktop */}
    <div className="pointer-events-auto absolute bottom-0 left-0 right-0 z-20 flex items-center p-4 transition-all duration-300 md:translate-y-10 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
      <button
        onClick={onLearnMore}
        className="group/btn relative flex h-10 w-fit cursor-pointer items-center overflow-hidden rounded-full border border-white/10 bg-negro-700 ps-5 pe-12 text-sm font-medium text-cumaru-200 transition-all duration-500 hover:ps-12 hover:pe-5"
      >
        <span className="relative z-10 whitespace-nowrap transition-all duration-500">
          {cta}
        </span>
        <div className="absolute right-1 flex size-8 items-center justify-center rounded-full bg-taruma-400 text-negro-900 transition-all duration-500 group-hover/btn:right-[calc(100%-36px)]">
          <IconArrowUpRight className="size-3.5" />
        </div>
      </button>
    </div>

    {/* Subtle hover overlay */}
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/2" />
  </motion.div>
);

// ── BentoGridItem (features) ──────────────────────────────────────

export const BentoGridItem = ({
  className,
  title,
  description,
  type = "small",
  img,
  secondImg,
  imgWidth,
  imgClassName,
  terminalCommands,
  terminalOutputs,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  type?: "large" | "small" | "terminal" | "beam";
  img?: string;
  secondImg?: string;
  imgWidth?: number;
  imgClassName?: string;
  terminalCommands?: string[];
  terminalOutputs?: Record<number, string[]>;
}) => {
  if (type === "beam") {
    return (
      <div className={cn("relative overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col", className)}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="flex-1 flex items-center justify-center p-6 pt-10 overflow-hidden">
          <ArchBeamDiagram className="w-full h-full" />
        </div>
        <div className="p-6 pt-2 flex flex-col gap-1">
          <p className="text-lg font-normal tracking-wide">{description}</p>
          <h3 className="text-xs lg:text-[1.1rem] font-normal text-cumaru-400">{title}</h3>
        </div>
      </div>
    );
  }

  if (type === "terminal") {
    return (
      <div className={cn("relative overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col", className)}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          <Terminal
            commands={terminalCommands ?? []}
            outputs={terminalOutputs ?? {}}
            username="north-dev"
            typingSpeed={40}
            delayBetweenCommands={900}
            enableSound={false}
            className="w-full max-w-none px-0 text-[10px]"
            contentClassName="h-60"
          />
        </div>
        <div className="p-6 pt-2 flex flex-col gap-1">
          <p className="text-lg font-normal tracking-wide">{description}</p>
          <h3 className="text-xs lg:text-[1.1rem] font-normal text-cumaru-400">{title}</h3>
        </div>
      </div>
    );
  }

  if (type === "large") {
    return (
      <div className={cn("relative overflow-hidden rounded-4xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col", className)}>
        <div className="absolute right-0 top-1/6 -translate-y-1/2 w-505 h-205 rounded-full bg-taruma-500/20 blur-3xl pointer-events-none" />
        <div className="flex flex-col items-center text-center px-6 pt-8 gap-1">
          <TextGenerateEffect words={typeof title === "string" ? title : ""} />
        </div>
        {img && (
          <div className="flex-1 px-6 overflow-hidden">
            <div
              className="relative mx-auto w-[80%] -bottom-15 border-4 border-[#6C6C6C] p-2 md:p-4 bg-[#222222] rounded-[30px] shadow-2xl"
              style={{ boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003" }}
            >
              <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
                <MacosWindow
                  imageSrc={img}
                  secondImageSrc={secondImg}
                  imageClassName={cn("w-full object-cover object-top", imgClassName)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col", className)}>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        {img && (
          <img
            src={img}
            alt=""
            width={imgWidth}
            className={cn("transition duration-200 group-hover/bento:scale-105 max-h-60 object-contain", imgClassName)}
          />
        )}
      </div>
      <div className="p-6 pt-2 flex flex-col gap-1">
        <p className="text-lg font-normal tracking-wide">{description}</p>
        <h3 className="text-xs lg:text-[1.1rem] font-normal text-cumaru-400">{title}</h3>
      </div>
    </div>
  );
};
