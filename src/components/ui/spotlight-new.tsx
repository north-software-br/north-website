"use client";
// Adaptado do "Spotlight New" da Aceternity UI (ui.aceternity.com/components/spotlight-new): feixes de luz
// suaves que oscilam devagar. Cores trocadas para o Tarumã e parado com movimento reduzido.
import { motion, useReducedMotion } from "motion/react";

const luz = (a: number, b: number) =>
  `radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(174, 48%, 70%, ${a}) 0, hsla(174, 48%, 45%, ${b}) 50%, hsla(174, 48%, 35%, 0) 80%)`;
const halo = (a: number) => `radial-gradient(50% 50% at 50% 50%, hsla(174, 48%, 70%, ${a}) 0, hsla(174, 48%, 45%, .02) 80%, transparent 100%)`;

export function SpotlightNew({ duracao = 7, deslocamento = 100 }: { duracao?: number; deslocamento?: number }) {
  const reduzido = useReducedMotion();
  const feixe = (lado: "esq" | "dir") => {
    const espelho = lado === "dir" ? -1 : 1;
    return (
      <motion.div
        animate={reduzido ? undefined : { x: [0, deslocamento * espelho, 0] }}
        transition={{ duration: duracao, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className={`pointer-events-none absolute top-0 ${lado === "esq" ? "left-0" : "right-0"} z-0 h-screen w-screen`}
      >
        <div className="absolute top-0" style={{ [lado === "esq" ? "left" : "right"]: 0, transform: `translateY(-350px) rotate(${-45 * espelho}deg)`, background: luz(0.09, 0.025), width: 560, height: 1380 }} />
        <div className="absolute top-0" style={{ [lado === "esq" ? "left" : "right"]: 0, transform: `rotate(${-45 * espelho}deg) translate(${5 * espelho}%, -50%)`, background: halo(0.06), width: 240, height: 1380, transformOrigin: "top left" }} />
        <div className="absolute top-0" style={{ [lado === "esq" ? "left" : "right"]: 0, transform: `rotate(${-45 * espelho}deg) translate(${-180 * espelho}%, -70%)`, background: halo(0.04), width: 240, height: 1380, transformOrigin: "top left" }} />
      </motion.div>
    );
  };
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {feixe("esq")}
    </div>
  );
}
