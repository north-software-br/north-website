"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "../container/container";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Highlighter } from "@/components/ui/highlighter";

const ROTATIONS = [-4, 5];

const textSlides = [
  {
    tagline: "Infraestrutura",
    title: "Sistemas que duram",
    description: "Código que resiste ao tempo e escala com o negócio.",
    stat: "99.9%",
    statLabel: "de uptime nos últimos 12 meses",
  },
  {
    tagline: "Produto",
    title: "Tecnologia sem ruído",
    description: "Sem relatórios que ninguém lê. Só o que fecha o caixa.",
    stat: "3×",
    statLabel: "mais rápido que a solução anterior",
  },
  {
    tagline: "Integrações",
    title: "Integrações que funcionam",
    description: "O ERP fala com a planilha. Sem intermediários, sem surpresas.",
    stat: "+40",
    statLabel: "integrações entregues em produção",
  },
  {
    tagline: "Suporte",
    title: "Suporte que responde",
    description: "Você fala com quem construiu. Resposta antes de virar crise.",
    stat: "<1h",
    statLabel: "tempo médio de resposta",
  },
];

const imageSlides = [
  {
    src: "/illustrations/SIAN-PRINT.png",
    quote:
      "Reduzimos o processo de entrada e saída na empresa. Antes, algo manual e lento, agora passou a ser automático, ágil e seguro.",
    name: "Paula Pinheiro",
    designation: "Antonelly Construções — Recepcionista",
  },
  {
    src: "/illustrations/adv-paiva.jpeg",
    quote:
      "A North entregou exatamente o que eu precisava: um site que transmite seriedade e converte visitas em clientes.",
    name: "Gabriela Paiva",
    designation: "ADV Paiva — Advogada",
  },
];

const INTERVAL = 4500;

export default function About() {
  const heading = useScrollReveal();
  const slideArea = useScrollReveal({ amount: 0.1 });
  const imageCol = useScrollReveal({ amount: 0.1 });

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const textSlide = textSlides[current % textSlides.length];
  const activeImageIndex = current % imageSlides.length;
  const imgSlide = imageSlides[activeImageIndex];

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % textSlides.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section id="about" className="relative w-full py-20 lg:py-42 bg-negro-900">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-negro-800 to-transparent pointer-events-none z-0"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-negro-800 pointer-events-none z-0"
      />

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div className="flex flex-col gap-10">
            <motion.h2
              ref={heading.ref}
              initial={{ opacity: 0, y: 32 }}
              animate={heading.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="text-3xl lg:text-4xl font-normal leading-tight tracking-tight text-cumaru-200"
            >
              Migre para o que{" "}
              <Highlighter
                action="circle"
                color="#3DAFA6"
                strokeWidth={1.5}
                animationDuration={800}
                iterations={2}
                padding={6}
                isView
                delay={850}
              >
                <span className="text-accent">realmente funciona.</span>
              </Highlighter>
              <br />É mais simples do que parece.
            </motion.h2>

            {/* Carousel slide */}
            <motion.div
              ref={slideArea.ref}
              initial={{ opacity: 0, y: 24 }}
              animate={slideArea.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="relative min-h-40"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col gap-5"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-taruma-400">
                    {textSlide.tagline}
                  </span>
                  <div>
                    <h3 className="text-cumaru-100 font-semibold text-2xl lg:text-3xl leading-tight">
                      {textSlide.title}
                    </h3>
                    <p className="mt-2 text-sm text-cumaru-400">
                      {textSlide.description}
                    </p>
                  </div>
                  <div className="w-8 h-px bg-cumaru-700" />
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-accent">
                      {textSlide.stat}
                    </span>
                    <span className="text-xs text-cumaru-500">
                      {textSlide.statLabel}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Dots + progress */}
            <div className="flex items-center gap-3">
              {textSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setPaused(true); }}
                  className="relative h-1 rounded-full overflow-hidden transition-all duration-300 cursor-pointer"
                  style={{ width: i === current ? 32 : 16 }}
                  aria-label={`Slide ${i + 1}`}
                >
                  <span className="absolute inset-0 bg-cumaru-700 rounded-full" />
                  {i === current && (
                    <motion.span
                      className="absolute inset-y-0 left-0 bg-accent rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={
                        paused
                          ? { duration: 0 }
                          : { duration: INTERVAL / 1000, ease: "linear" }
                      }
                      key={`${current}-${paused}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: stacked images + floating testimonial card */}
          <motion.div
            ref={imageCol.ref}
            initial={{ opacity: 0, x: 40 }}
            animate={imageCol.isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            className="relative pb-16"
          >
            {/* Stacked images */}
            <div className="relative h-80 w-full perspective-[1000px]">
              <AnimatePresence>
                {imageSlides.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, rotate: ROTATIONS[index] }}
                      animate={{
                        opacity: index === activeImageIndex ? 1 : 0.6,
                        scale: index === activeImageIndex ? 1 : 0.95,
                        rotate: index === activeImageIndex ? 0 : ROTATIONS[index],
                        zIndex: index === activeImageIndex ? 40 : imageSlides.length + 2 - index,
                        y: index === activeImageIndex ? [0, -10, 0] : 0,
                      }}
                      exit={{ opacity: 0, scale: 0.9, rotate: ROTATIONS[index] }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <Image
                        src={img.src}
                        alt={img.name}
                        width={700}
                        height={420}
                        draggable={false}
                        className="h-full w-full rounded-2xl object-cover object-center"
                      />
                    </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Floating testimonial card — liquid glass, rectangular, bottom-right */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current}`}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-0 right-0 left-[28%] z-50 rounded-2xl border border-white/10 px-6 py-5"
                style={{
                  backgroundColor: "rgba(3,11,23,0.45)",
                  boxShadow:
                    "0 8px 40px rgba(3,11,23,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
                  backdropFilter: "blur(16px) saturate(160%)",
                }}
              >
                <p className="text-cumaru-200 text-sm leading-relaxed">
                  &ldquo;{imgSlide.quote}&rdquo;
                </p>
                <div className="mt-4">
                  <p className="text-cumaru-100 text-xs font-semibold">
                    {imgSlide.name}
                  </p>
                  <p className="text-taruma-400 text-xs mt-0.5">
                    {imgSlide.designation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
