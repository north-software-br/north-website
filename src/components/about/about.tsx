"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "../container/container";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const features = [
  {
    title: "Sistemas que duram",
    description:
      "No centro de uma das maiores reservas de complexidade do planeta, aprendemos que sistema bom é o que dura.",
  },
  {
    title: "Tecnologia sem ruído",
    description:
      "Fazemos o caixa fechar, a nota sair e o cliente ser atendido — sem dashboards que ninguém abre.",
  },
  {
    title: "Integrações que funcionam",
    description:
      "Ocupamos o vazio entre o discurso da transformação digital e a realidade de quem precisa que o ERP fale com a planilha.",
  },
];

export default function About() {
  const heading = useScrollReveal();
  const featuresList = useScrollReveal({ amount: 0.1 });
  const imageCol = useScrollReveal({ amount: 0.1 });

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

            <div ref={featuresList.ref} className="flex flex-col gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={featuresList.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.1 + i * 0.12,
                  }}
                  className="flex flex-col gap-2"
                >
                  <h3 className="text-cumaru-200 font-semibold text-xl">
                    {f.title}
                  </h3>
                  <p className="text-cumaru-400 text-lg leading-relaxed">
                    {f.description}
                  </p>
                </motion.div>
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
                &ldquo;Reduzimos o tempo de fechamento mensal de 3 dias para
                menos de 4 horas com a integração que a North entregou.&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-white/90 text-xs font-semibold">
                  Carlos Mendonça
                </p>
                <p className="text-white/60 text-xs">
                  Diretor Financeiro, Grupo Araújo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
