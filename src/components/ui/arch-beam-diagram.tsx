"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
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
        opacity="0.7"
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
  className,
}: {
  nodeRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        ref={nodeRef}
        className={cn(
          "flex h-7 w-7 items-center justify-center shrink-0",
          accent ? "text-taruma-400" : "text-negro-200",
        )}
      >
        <FolderIcon className="w-6 h-6 drop-shadow-sm" />
      </div>
      <span
        className={cn(
          "text-[9px] font-mono leading-none whitespace-nowrap",
          accent ? "text-taruma-300" : "text-negro-200/60",
        )}
      >
        {label}
      </span>
    </div>
  );
}

// Builds an orthogonal elbow path: down from src, then horizontal, then down to dst
function elbowPath(sx: number, sy: number, ex: number, ey: number): string {
  const midY = sy + (ey - sy) * 0.5;
  return `M ${sx},${sy} L ${sx},${midY} L ${ex},${midY} L ${ex},${ey}`;
}

interface EdgeDef {
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  delay: number;
}

function ElbowBeamSvg({
  containerRef,
  edges,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  edges: EdgeDef[];
}) {
  const baseId = useId();
  const [paths, setPaths] = useState<string[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const compute = () => {
      const cr = containerRef.current?.getBoundingClientRect();
      if (!cr) return;
      setDims({ w: cr.width, h: cr.height });
      setPaths(
        edges.map(({ fromRef, toRef }) => {
          const fa = fromRef.current?.getBoundingClientRect();
          const tb = toRef.current?.getBoundingClientRect();
          if (!fa || !tb) return "";
          const sx = fa.left - cr.left + fa.width / 2;
          const sy = fa.top - cr.top + fa.height / 2;
          const ex = tb.left - cr.left + tb.width / 2;
          const ey = tb.top - cr.top + tb.height / 2;
          return elbowPath(sx, sy, ex, ey);
        }),
      );
    };

    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    compute();
    return () => ro.disconnect();
  }, [containerRef, edges]);

  return (
    <svg
      fill="none"
      width={dims.w}
      height={dims.h}
      className="pointer-events-none absolute top-0 left-0"
      viewBox={`0 0 ${dims.w} ${dims.h}`}
    >
      <defs>
        {edges.map((_, i) => {
          const id = `${baseId}-grad-${i}`;
          return (
            <motion.linearGradient
              key={id}
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: ["0%", "0%"],
                x2: ["0%", "0%"],
                y1: ["0%", "110%"],
                y2: ["-10%", "100%"],
              }}
              transition={{
                delay: edges[i].delay,
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 0,
              }}
            >
              <stop stopColor="#3DAFA6" stopOpacity="0" />
              <stop stopColor="#3DAFA6" />
              <stop offset="32.5%" stopColor="#14304A" />
              <stop offset="100%" stopColor="#14304A" stopOpacity="0" />
            </motion.linearGradient>
          );
        })}
      </defs>

      {paths.map((d, i) => {
        const id = `${baseId}-grad-${i}`;
        return (
          <g key={i}>
            <path
              d={d}
              stroke="#9DAEC0"
              strokeWidth={3.5}
              strokeOpacity={0.12}
              strokeLinecap="square"
            />
            <path
              d={d}
              stroke={`url(#${id})`}
              strokeWidth={3}
              strokeOpacity={1}
              strokeLinecap="square"
            />
          </g>
        );
      })}
    </svg>
  );
}

export function ArchBeamDiagram({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const srcRef = useRef<HTMLDivElement>(null);
  const assetsRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const libRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  const edges: EdgeDef[] = [
    { fromRef: rootRef, toRef: srcRef, delay: 0 },
    { fromRef: rootRef, toRef: assetsRef, delay: 0.3 },
    { fromRef: srcRef, toRef: appRef, delay: 0.6 },
    { fromRef: srcRef, toRef: libRef, delay: 0.8 },
    { fromRef: assetsRef, toRef: apiRef, delay: 1.0 },
    { fromRef: assetsRef, toRef: uiRef, delay: 1.2 },
  ];

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: 280 }}
    >
      <ElbowBeamSvg containerRef={containerRef} edges={edges} />

      {/* root */}
      <div
        className="absolute"
        style={{ left: "50%", top: "2%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={rootRef} label="projeto/" accent />
      </div>

      {/* level 1 */}
      <div
        className="absolute"
        style={{ left: "28%", top: "36%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={srcRef} label="src/" accent />
      </div>
      <div
        className="absolute"
        style={{ left: "72%", top: "36%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={assetsRef} label="assets/" />
      </div>

      {/* level 2 */}
      <div
        className="absolute"
        style={{ left: "14%", top: "72%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={appRef} label="app/" />
      </div>
      <div
        className="absolute"
        style={{ left: "42%", top: "72%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={libRef} label="lib/" />
      </div>
      <div
        className="absolute"
        style={{ left: "58%", top: "72%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={apiRef} label="api/" />
      </div>
      <div
        className="absolute"
        style={{ left: "86%", top: "72%", transform: "translateX(-50%)" }}
      >
        <Node nodeRef={uiRef} label="ui/" />
      </div>
    </div>
  );
}
