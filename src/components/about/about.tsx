"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "../container/container";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const slides = [
  {
    title: "Sistemas que duram",
    description:
      "No centro de uma das maiores reservas de complexidade do planeta, aprendemos que sistema bom é o que dura.",
    stat: "99.9%",
    statLabel: "de uptime nos últimos 12 meses",
  },
  {
    title: "Tecnologia sem ruído",
    description:
      "Fazemos o caixa fechar, a nota sair e o cliente ser atendido — sem dashboards que ninguém abre.",
    stat: "3×",
    statLabel: "mais rápido que a solução anterior",
  },
  {
    title: "Integrações que funcionam",
    description:
      "Ocupamos o vazio entre o discurso da transformação digital e a realidade de quem precisa que o ERP fale com a planilha.",
    stat: "+40",
    statLabel: "integrações entregues em produção",
  },
  {
    title: "Suporte que responde",
    description:
      "Nenhum ticket perdido em fila. Você fala com quem construiu o sistema — e a resposta vem antes do problema virar crise.",
    stat: "<1h",
    statLabel: "tempo médio de resposta",
  },
];

const INTERVAL = 4500;

export default function About() {
  const heading = useScrollReveal();
  const slideArea = useScrollReveal({ amount: 0.1 });
  const imageCol = useScrollReveal({ amount: 0.1 });

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
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
              <span className="text-accent">realmente funciona.</span>
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
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-accent">
                      {slides[current].stat}
                    </span>
                    <span className="text-cumaru-400 text-sm">
                      {slides[current].statLabel}
                    </span>
                  </div>
                  <h3 className="text-cumaru-200 font-semibold text-xl">
                    {slides[current].title}
                  </h3>
                  <p className="text-cumaru-400 text-lg leading-relaxed">
                    {slides[current].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Dots + progress */}
            <div className="flex items-center gap-3">
              {slides.map((_, i) => (
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
                      animate={{ width: paused ? "100%" : "100%" }}
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

          {/* Right: image + testimonial overlay */}
          <motion.div
            ref={imageCol.ref}
            initial={{ opacity: 0, x: 40 }}
            animate={imageCol.isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/illustrations/SIAN-PRINT.png"
                alt="Sistema SIAN em uso"
                width={700}
                height={420}
                className="w-full object-cover"
              />
            </div>

            {/* Testimonial card */}
            <div className="absolute -bottom-6 -right-6 max-w-xs rounded-2xl bg-taruma-600/20 backdrop-blur-lg p-6 shadow-2xl">
              <p className="text-white text-sm leading-relaxed font-medium">
&ldquo;Reduzimos o processo de entrada e saída na empresa. Antes, algo manual e lento para visitantes e funcionários, agora passou a ser automático, ágil e seguro.&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-white/90 text-xs font-semibold">
                  Paula Pinheiro
                </p>
                <p className="text-white/60 text-xs">
                  Antonelly Construções, Recepcionista
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
