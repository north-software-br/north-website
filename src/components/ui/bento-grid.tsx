"use client";

import { cn } from "@/lib/utils";
import { IconArrowUpRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import React from "react";

export const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn("grid w-full grid-cols-1 md:grid-cols-3 gap-4", className)}
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
  tagline,
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
  tagline?: string;
  cta?: string;
  isActive?: boolean;
  onLearnMore?: () => void;
}) => (
  <motion.div
    layoutId={`service-card-${id}`}
    whileHover={{ scale: 1.015 }}
    style={{
      opacity: isActive ? 0 : 1,
      pointerEvents: isActive ? "none" : "auto",
    }}
    className={cn(
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-negro-800 border border-white/8",
      "[box-shadow:0_-20px_80px_-20px_rgba(61,175,166,0.06)_inset]",
      "transform-gpu transition-[border-color,box-shadow] duration-300",
      "hover:border-taruma-400/30",
      "hover:shadow-[0_0_60px_-15px_rgba(61,175,166,0.25)]",
      className,
    )}
  >
    {/* Background */}
    <div className="absolute inset-0 transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.03]">
      {background}
    </div>

    {/* Static bottom gradient */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-negro-800/90 to-transparent" />

    {/* Text area — slides up on hover to reveal CTA (desktop only) */}
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex flex-col gap-1 p-6 pb-16 md:pb-6 transition-all duration-300 md:group-hover:-translate-y-10">
      <div className="mb-2.5 flex size-11 origin-left transform-gpu items-center justify-center rounded-xl border border-taruma-400/20 bg-taruma-400/10 backdrop-blur-sm transition-all duration-300 ease-in-out group-hover:scale-90 group-hover:border-taruma-400/35">
        <Icon className="size-5.5 text-taruma-400" />
      </div>
      {tagline && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-taruma-400/90">
          {tagline}
        </span>
      )}
      <h3 className="text-xl font-bold text-cumaru-100 transition-colors duration-300 group-hover:text-taruma-300">
        {name}
      </h3>
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
