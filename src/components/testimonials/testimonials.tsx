"use client";

// Clientes e depoimentos em fundo claro (Cumaru): faixa de logos (Marquee, Shadcn Space) e os relatos reais com a
// tela do projeto a que se referem (Animated Testimonials, Aceternity, adaptado em components/ui).
import Image from "next/image";
import { CLIENT_LOGOS } from "@/constants";
import { AnimatedTestimonials, type Testimonial } from "@/components/ui/animated-testimonials";
import { Marquee } from "@/components/ui/shadcn-space/radix/animations/marquee";
import Container from "../container/container";
import { Acento, SectionHead } from "../section/section";
import { cn } from "@/lib/utils";

// um relato por cliente (mais depoimentos virão); o da Equipe de Engenharia da Antonelly está no histórico do git
const relatos: Testimonial[] = [
  {
    src: "/projetos/sementes.webp",
    alt: "Site do Centro de Sementes Nativas da Amazônia",
    logo: "/logos/logos_clients/logo_sementes.svg",
    quote: "Amamos o site! Ele apresenta nossos projetos e a parceria com a UFAM com clareza e cuidado. Recomendamos muito o trabalho da North.",
    name: "Centro de Sementes Nativas da Amazônia",
    designation: "Projetos em parceria com a UFAM",
  },
  {
    src: "/illustrations/SIAN-PRINT.jpg",
    alt: "SIAN: tela de controle de entrada e saída de visitantes",
    logo: "/logos/logos_clients/logo_antonelly.svg",
    quote: "Reduzimos o processo de entrada e saída na empresa. Antes, algo manual e lento, agora passou a ser automático, ágil e seguro.",
    name: "Paula Pinheiro",
    designation: "Antonelly Construções · Recepcionista",
  },
  {
    src: "/projetos/adv-paiva.webp",
    alt: "Site do escritório Gabriela C.O. Paiva",
    logo: "/logos/logos_clients/logo_co_paiva.svg",
    logoEscala: 3.2,
    quote: "A North entregou exatamente o que eu precisava: um site que transmite seriedade e converte visitas em clientes.",
    name: "Gabriela Paiva",
    designation: "ADV Paiva · Advogada",
  },
  {
    src: "/depoimentos/amparo.webp",
    alt: "Site da AMPARO Cenografia e Eventos: seção com as apresentações da empresa",
    logo: "/logos/logos_clients/logo_amparo.png",
    quote: "Site excelente, rápido e atendendo às minhas necessidades, além de um pós-venda excelente.",
    name: "Thiago Oliveira",
    designation: "AMPARO Cenografia e Eventos",
  },
];

export default function Testimonials() {
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

        <div className="revelar mt-16 lg:mt-20">
          <AnimatedTestimonials testimonials={relatos} autoplay claro />
        </div>
      </Container>
    </section>
  );
}
