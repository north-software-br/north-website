"use client";

// "Animated Testimonials" da Aceternity UI (ui.aceternity.com/components/animated-testimonials).
// Ajustes North: rotações fixas por item (o original sorteia no render e quebra a hidratação), next/image com
// alt real e proporção 16:9 centralizada no topo (as imagens são telas de projetos, não retratos), logo do cliente ao lado do nome,
// botões de 44px com nome acessível, contador, troca automática que pausa no hover/foco e respeita movimento
// reduzido (MotionConfig), cores por tema (claro/escuro).
import { useEffect, useState } from "react";
import Image from "next/image";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  alt: string;
  logo?: string;
};

const GIROS = [-6, 4, -3, 7, -5, 3];
const dois = (n: number) => String(n).padStart(2, "0");

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  claro = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  /** seção clara (Cumaru) */
  claro?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [pausado, setPausado] = useState(false);
  const reduzido = useReducedMotion();

  const handleNext = () => setActive((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay || pausado || reduzido) return;
    const interval = setInterval(() => setActive((prev) => (prev + 1) % testimonials.length), 7000);
    return () => clearInterval(interval);
  }, [autoplay, pausado, reduzido, testimonials.length]);

  const atual = testimonials[active];
  const botao = cn(
    "group/button flex size-11 cursor-pointer items-center justify-center rounded-full transition-colors",
    claro ? "bg-negro-700/5 text-negro-700 hover:bg-negro-700/10" : "bg-white/5 text-cumaru-200 hover:bg-white/10",
  );

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="relative grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16"
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocusCapture={() => setPausado(true)}
        onBlurCapture={() => setPausado(false)}
      >
        {/* pilha de telas */}
        <div className="relative aspect-video w-full self-start [perspective:1200px]">
          <AnimatePresence>
            {testimonials.map((t, index) => (
              <motion.div
                key={t.src}
                initial={{ opacity: 0, scale: 0.9, z: -100, rotate: GIROS[index % GIROS.length] }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.6,
                  scale: isActive(index) ? 1 : 0.94,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index) ? 0 : GIROS[index % GIROS.length],
                  zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -40, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, z: 100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 origin-bottom"
                aria-hidden={!isActive(index)}
              >
                <div className={cn("relative size-full overflow-hidden rounded-3xl shadow-[0_30px_60px_-30px_rgba(8,23,42,.6)] ring-1", claro ? "ring-negro-700/10" : "ring-white/10")}>
                  <Image src={t.src} alt={t.alt} fill sizes="(min-width: 768px) 560px, 92vw" draggable={false} className="object-cover object-top" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* relato */}
        <div className="flex min-w-0 flex-col justify-between gap-10 py-2">
          <motion.div key={active} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}>
            <div className="flex items-center gap-4">
              {atual.logo && (
                <span className="flex h-11 w-20 shrink-0 items-center justify-center">
                  <Image src={atual.logo} alt="" width={80} height={44} unoptimized className={cn("max-h-full w-full object-contain", claro && "brightness-0 opacity-70")} />
                </span>
              )}
              <div className="flex min-w-0 flex-col">
                <h3 className={cn("text-xl font-bold tracking-tight", claro ? "text-negro-700" : "text-cumaru-100")}>{atual.name}</h3>
                <p className={cn("text-sm", claro ? "text-negro-400" : "text-cumaru-500")}>{atual.designation}</p>
              </div>
            </div>
            <blockquote className={cn("mt-8 text-[clamp(1.25rem,1rem+.9vw,1.75rem)] leading-snug font-medium tracking-tight", claro ? "text-negro-700" : "text-cumaru-100")}>
              <span className="sr-only">{atual.quote}</span>
              <span aria-hidden>
                {atual.quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </span>
            </blockquote>
          </motion.div>

          <div className="flex items-center gap-3">
            <button type="button" onClick={handlePrev} aria-label="Depoimento anterior" className={botao}>
              <IconArrowLeft className="size-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button type="button" onClick={handleNext} aria-label="Próximo depoimento" className={botao}>
              <IconArrowRight className="size-5 transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
            <span className={cn("ml-2 font-mono text-xs tabular-nums", claro ? "text-negro-400" : "text-cumaru-500")}>
              <span className={claro ? "text-negro-700" : "text-cumaru-100"}>{dois(active + 1)}</span> / {dois(testimonials.length)}
            </span>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};
