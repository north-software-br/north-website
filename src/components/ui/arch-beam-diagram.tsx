"use client";

import { useRef } from "react";
import { AnimatedBeam } from "./animated-beam";
import { cn } from "@/lib/utils";

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 4C2 2.9 2.9 2 4 2H9L11 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V4Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M2 7H22V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Node({
  nodeRef,
  label,
  accent = false,
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        ref={nodeRef}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          accent
            ? "text-taruma-400"
            : "text-negro-200",
        )}
      >
        <FolderIcon className="w-8 h-8 drop-shadow-sm" />
      </div>
      <span
        className={cn(
          "text-[9px] font-mono leading-tight text-center w-16 truncate",
          accent ? "text-taruma-300" : "text-negro-200/70",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function ArchBeamDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const rootRef    = useRef<HTMLDivElement>(null);
  const srcRef     = useRef<HTMLDivElement>(null);
  const appRef     = useRef<HTMLDivElement>(null);
  const libRef     = useRef<HTMLDivElement>(null);
  const apiRef     = useRef<HTMLDivElement>(null);
  const uiRef      = useRef<HTMLDivElement>(null);
  const assetsRef  = useRef<HTMLDivElement>(null);

  const beamProps = {
    gradientStartColor: "#3DAFA6",
    gradientStopColor:  "#14304A",
    pathColor: "#9DAEC0",
    pathOpacity: 0.15,
    pathWidth: 1.5,
    duration: 3,
    repeatDelay: 1,
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center gap-3", className)}
    >
      {/* root */}
      <Node nodeRef={rootRef} label="projeto/" accent />

      {/* level 1 */}
      <div className="flex gap-6">
        <Node nodeRef={srcRef}    label="src/" accent />
        <Node nodeRef={assetsRef} label="assets/" />
      </div>

      {/* level 2 */}
      <div className="flex gap-4">
        <Node nodeRef={appRef} label="app/" />
        <Node nodeRef={libRef} label="lib/" />
        <Node nodeRef={apiRef} label="api/" />
      </div>

      {/* level 3 */}
      <Node nodeRef={uiRef} label="ui/" />

      {/* beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={rootRef}   toRef={srcRef}    {...beamProps} delay={0}   />
      <AnimatedBeam containerRef={containerRef} fromRef={rootRef}   toRef={assetsRef} {...beamProps} delay={0.3} />
      <AnimatedBeam containerRef={containerRef} fromRef={srcRef}    toRef={appRef}    {...beamProps} delay={0.6} />
      <AnimatedBeam containerRef={containerRef} fromRef={srcRef}    toRef={libRef}    {...beamProps} delay={0.8} />
      <AnimatedBeam containerRef={containerRef} fromRef={srcRef}    toRef={apiRef}    {...beamProps} delay={1.0} />
      <AnimatedBeam containerRef={containerRef} fromRef={appRef}    toRef={uiRef}     {...beamProps} delay={1.3} />
    </div>
  );
}
