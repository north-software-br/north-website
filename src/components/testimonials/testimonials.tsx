"use client";

// Clientes e depoimentos em fundo claro (Cumaru): logos dos clientes e os relatos reais, cada um ao lado da tela
// do projeto a que se refere. Troca sozinha a cada 7s (pausa com mouse ou foco; sem troca automática com movimento
// reduzido) e pelos nomes abaixo. Altura estável: todos os relatos ficam empilhados na mesma célula.
import { useEffect, useState } from "react";
import Image from "next/image";
import { IconQuote } from "@tabler/icons-react";
import { CLIENT_LOGOS } from "@/constants";
import { Marquee } from "@/components/ui/shadcn-space/radix/animations/marquee";
import Container from "../container/container";
import { Acento, SectionHead } from "../section/section";
import { cn } from "@/lib/utils";

const relatos = [
  {
    src: "/illustrations/SIAN-PRINT.jpg",
    alt: "SIAN: tela de controle de entrada e saída de visitantes",
    quote: "Reduzimos o processo de entrada e saída na empresa. Antes, algo manual e lento, agora passou a ser automático, ágil e seguro.",
    name: "Paula Pinheiro",
    designation: "Antonelly Construções · Recepcionista",
  },
  {
    src: "/illustrations/adv-paiva.jpg",
    alt: "Site do escritório Gabriela C.O. Paiva",
    quote: "A North entregou exatamente o que eu precisava: um site que transmite seriedade e converte visitas em clientes.",
    name: "Gabriela Paiva",
    designation: "ADV Paiva · Advogada",
  },
  {
    src: "/illustrations/medicao.png",
    alt: "SIAN: matriz de medição por produto e lote",
    quote: "A matriz de medição mostra, em uma única tela, o que já foi entregue por produto e lote. Acabou a planilha espalhada e a conferência manual.",
    name: "Equipe de Engenharia",
    designation: "Antonelly Construções · Medição IP4",
  },
  {
    src: "/illustrations/report.png",
    alt: "SIAN: painel de relatórios com fotos e legendas por local",
    quote: "Gerar o relatório ficou simples: cada local mostra as fotos e as legendas pendentes, e o documento sai pronto, sem retrabalho.",
    name: "Equipe de Medição",
    designation: "Antonelly Construções · Relatórios",
  },
];
const INTERVALO = 7000;

export default function Testimonials() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (pausado || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setAtual((i) => (i + 1) % relatos.length), INTERVALO);
    return () => clearTimeout(t);
  }, [atual, pausado]);

  return (
    <section id="clientes" aria-labelledby="clientes-titulo" className="relative bg-cumaru-100 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <SectionHead
            claro
            id="clientes-titulo"
            indice="05"
            rotulo="Clientes"
            titulo={
              <>
                Quem já constrói <Acento claro>com a North.</Acento>
              </>
            }
          />
          {/* logos em faixa contínua: Marquee do Shadcn Space (pausa no hover, parado com movimento reduzido) */}
          <div className="revelar w-full [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] lg:w-[46%] lg:shrink-0">
            <Marquee pauseOnHover repeat={3} aria-label="Clientes" role="list" className="p-0 [--duration:28s] [--gap:3.5rem]">
              {CLIENT_LOGOS.map((l) => (
                <div key={l.name} role="listitem" className="flex h-14 w-32 items-center justify-center overflow-hidden">
                  <Image
                    src={l.image}
                    alt={l.name}
                    width={128}
                    height={56}
                    unoptimized
                    className={cn("h-full w-full object-contain transition-opacity hover:opacity-100", "solido" in l ? "opacity-80 grayscale" : "opacity-70 brightness-0")}
                    style={{ transform: `scale(${l.scale})` }}
                  />
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        <div
          className="revelar mt-16 overflow-hidden rounded-[2rem] bg-cumaru-50 ring-1 ring-negro-700/8 lg:mt-20"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onFocusCapture={() => setPausado(true)}
          onBlurCapture={() => setPausado(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
            {/* relato */}
            <div className="grid p-8 sm:p-12 lg:p-14">
              {relatos.map((r, i) => (
                <figure
                  key={r.name}
                  aria-hidden={i !== atual}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col gap-8 transition-[opacity,visibility,transform] ease-[cubic-bezier(.22,1,.36,1)]",
                    i === atual ? "visible translate-y-0 opacity-100 delay-150 duration-700" : "invisible translate-y-2 opacity-0 duration-200",
                  )}
                >
                  <IconQuote className="size-10 text-taruma-500" aria-hidden />
                  <blockquote className="text-[clamp(1.35rem,1rem+1.2vw,2rem)] leading-snug font-medium tracking-tight text-balance text-negro-700">
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-auto flex flex-col gap-1">
                    <span className="font-semibold text-negro-700">{r.name}</span>
                    <span className="text-sm text-negro-400">{r.designation}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* tela do projeto: a "outra água", escura dentro da seção clara */}
            <div className="relative min-h-72 bg-negro-800 lg:min-h-0">
              {relatos.map((r, i) => (
                <Image
                  key={r.src}
                  src={r.src}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className={cn("object-cover object-left-top transition-opacity duration-700", i === atual ? "opacity-100" : "opacity-0")}
                />
              ))}
              <div aria-hidden className="absolute inset-0 bg-linear-to-r from-negro-900/30 to-transparent" />
            </div>
          </div>

          {/* nomes */}
          <div role="group" aria-label="Escolher depoimento" className="grid grid-cols-2 border-t border-negro-700/8 sm:grid-cols-4">
            {relatos.map((r, i) => (
              <button
                key={r.name}
                type="button"
                aria-pressed={i === atual}
                onClick={() => setAtual(i)}
                className={cn(
                  "relative flex min-w-0 cursor-pointer flex-col gap-0.5 border-negro-700/8 px-6 py-5 text-left transition-colors",
                  i % 2 === 1 && "border-l",
                  i >= 2 && "border-t sm:border-t-0",
                  i === 2 && "sm:border-l",
                  i === atual ? "bg-cumaru-100" : "hover:bg-cumaru-100/60",
                )}
              >
                {i === atual && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left bg-taruma-500"
                    style={{ animation: pausado ? "none" : `progresso ${INTERVALO}ms linear both` }}
                  />
                )}
                <span className={cn("text-sm font-semibold", i === atual ? "text-negro-700" : "text-negro-400")}>{r.name}</span>
                <span className="truncate text-xs text-negro-400">{r.designation}</span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
