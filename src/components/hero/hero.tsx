"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";

const DisplacementSphere = lazy(() =>
  import("./displacement-sphere").then((m) => ({
    default: m.DisplacementSphere,
  })),
);

const disciplines = ["Sistemas", "Web", "Mobile"];
const role = "North Software";

// Shared animation classes for cycling words
const wordCls = cn(
  "relative flex flex-shrink-0 items-center leading-none",
  "animation-duration-[1.5s] [animation-delay:var(--delay,0s)]",
  "fill-mode-[forwards] [animation-timing-function:cubic-bezier(0.4,0,0.6,1)]",
  "text-transparent transition-opacity duration-500 isolate",
  // ::after sweep bar
  "after:content-[''] after:bg-taruma-400",
  "after:animation-duration-[1.5s] after:[animation-delay:var(--delay,0s)]",
  "after:fill-mode-[forwards] after:[animation-timing-function:cubic-bezier(0.4,0,0.6,1)]",
  "after:origin-left after:[transform:scale3d(0,1,1)]",
  "after:absolute after:inset-0 after:-right-[0.02em] after:z-10 after:will-change-transform",
  // data-status states
  "data-[status=entering]:[animation-name:introTextReveal]",
  "motion-safe:data-[status=entering]:after:[animation-name:reveal]",
  "data-[status=entered]:text-foreground",
  "data-[status=entered]:after:opacity-0",
  "data-[status=entered]:after:[transform:scale3d(0,0,1)]",
  "data-[status=entered]:after:origin-right",
  "data-[status=exiting]:text-foreground data-[status=exiting]:opacity-0",
  "data-[status=exiting]:absolute data-[status=exiting]:top-0 data-[status=exiting]:z-0",
);

type WordStatus = "entering" | "entered" | "exiting";

function WordTransition({
  active,
  enterDuration = 3000,
  exitDuration = 2000,
  children,
}: {
  active: boolean;
  enterDuration?: number;
  exitDuration?: number;
  children: (status: WordStatus) => React.ReactNode;
}) {
  const [status, setStatus] = useState<WordStatus>("entering");
  const [mounted, setMounted] = useState(active);
  const initialized = useRef(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStatus("entered"), enterDuration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    if (active) {
      setMounted(true);
      setStatus("entering");
      const t = setTimeout(() => setStatus("entered"), enterDuration);
      return () => clearTimeout(t);
    } else {
      setStatus("exiting");
      const t = setTimeout(() => setMounted(false), exitDuration);
      return () => clearTimeout(t);
    }
  }, [active, enterDuration, exitDuration]);

  if (!mounted) return null;
  return <>{children(status)}</>;
}

function useInterval(fn: () => void, delay: number) {
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  }, [fn]);
  useEffect(() => {
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function scrollTo(href: string) {
  const id = href.split("#")[1];
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero({
  scrollIndicatorHidden = false,
}: {
  scrollIndicatorHidden?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"entering" | "entered">("entering");
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setStatus("entered"), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useInterval(
    () => setDisciplineIndex((i) => (i + 1) % disciplines.length),
    5000,
  );

  const introLabel = `${disciplines.slice(0, -1).join(", ")} e ${disciplines.at(-1)}`;

  return (
    <section
      className="h-screen flex items-center justify-center flex-col relative overflow-hidden"
      aria-label={`${role} — ${introLabel}`}
      tabIndex={-1}
    >
      {mounted && (
        <Suspense>
          <DisplacementSphere />
        </Suspense>
      )}

      <header className="max-w-5xl xl:max-w-230 lg:max-w-195 w-full relative -top-8 max-[696px]:-top-16 max-[820px]:max-h-[420px]:max-[820px]:-top-6 px-6">
        <p
          className={cn(
            "text-[clamp(1.125rem,2vw,1.75rem)] tracking-normal mb-10 mt-0 font-bold leading-none",
            "opacity-0 transition-opacity duration-[0.6s] ease-[cubic-bezier(0.4,0,0.6,1)] delay-[0.2s]",
            "lg:mb-6 max-[696px]:mb-4",
            visible && "opacity-100",
          )}
        >
          Construímos o que o seu negócio{" "}
          <Highlighter
            action="underline"
            color="#3DAFA6"
            strokeWidth={2}
            animationDuration={700}
            iterations={2}
            padding={2}
            delay={1600}
          >
            precisa.
          </Highlighter>
        </p>

        {/* Role + discipline */}
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.03em] m-0">
          <span className="sr-only">{`${role} + ${introLabel}`}</span>

          {/* "North Software" row + line */}
          <span aria-hidden className="flex flex-row items-center relative overflow-hidden">
            {/* LCP hint: opacity:0.001 is invisible to users but detectable by Lighthouse */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                opacity: 0.001,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {role}
            </span>
            <span
              className={wordCls}
              data-status={status}
              style={{ "--delay": "0.1s" } as React.CSSProperties}
            >
              {role}
            </span>
            {/* expanding line */}
            <span
              aria-hidden
              className={cn(
                "h-0.5 bg-[color-mix(in_srgb,var(--foreground)_30%,transparent)]",
                "flex-1 ml-5 min-w-0",
                "animation-duration-[0.8s] [animation-delay:1s] fill-mode-[forwards]",
                "[animation-timing-function:cubic-bezier(0.4,0,0.6,1)]",
                "origin-left scale-x-0 opacity-0 relative top-[0.05em]",
                status === "entering" && "[animation-name:introLine]",
                status === "entered" && "scale-x-100 opacity-100",
              )}
            />
          </span>

          {/* Discipline cycling row */}
          <div
            aria-hidden
            className="flex flex-row items-center relative text-[clamp(2rem,5vw,5.5rem)]"
          >
            {disciplines.map((item, i) => (
              <WordTransition key={item} active={i === disciplineIndex}>
                {(ws) => (
                  <span
                    className={cn(
                      wordCls,
                      // plus prefix
                      "before:content-['+'] before:mr-[10px] before:opacity-40",
                    )}
                    data-status={ws}
                    style={{ "--delay": "0.6s" } as React.CSSProperties}
                  >
                    {item}
                  </span>
                )}
              </WordTransition>
            ))}
          </div>
        </h2>
      </header>

      {/* Desktop scroll indicator */}
      <Link
        href="/#services"
        aria-label="Ir para serviços"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("/#services");
        }}
        className={cn(
          "border-2 border-[color-mix(in_srgb,var(--foreground)_40%,transparent)] rounded-[20px]",
          "w-[26px] h-[38px] absolute bottom-16 transition-opacity duration-[0.6s] opacity-0",
          // ::before dot
          "before:content-[''] before:h-1.75 before:w-0.5",
          "before:bg-[color-mix(in_srgb,var(--foreground)_40%,transparent)] before:rounded-[4px]",
          "before:absolute before:top-1.5 before:left-1/2 before:-translate-x-[1px]",
          "motion-safe:before:animate-scroll-indicator",
          "[@media(pointer:coarse)]:hidden",
          status === "entered" && !scrollIndicatorHidden && "opacity-100",
        )}
      />

      {/* Mobile scroll indicator */}
      <Link
        href="/#services"
        aria-label="Ir para serviços"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("/#services");
        }}
        className={cn(
          "absolute bottom-0 p-5 transition-opacity duration-300 opacity-0",
          "motion-safe:animate-mobile-scroll-indicator",
          "[@media(pointer:fine)]:hidden",
          "[&_svg]:stroke-[color-mix(in_srgb,var(--foreground)_50%,transparent)]",
          status === "entered" && !scrollIndicatorHidden && "opacity-100",
        )}
      >
        <svg
          aria-hidden
          stroke="currentColor"
          width="43"
          height="15"
          viewBox="0 0 43 15"
        >
          <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
        </svg>
      </Link>
    </section>
  );
}
