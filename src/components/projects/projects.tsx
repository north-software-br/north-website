// Projetos na home: o sistema interno (SIAN) em destaque e os sites em duas colunas, com as telas reais.
// A página /projects mostra todos.
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { portfolioData } from "@/constants";
import Container from "../container/container";
import { Acento, SectionHead } from "../section/section";
import { ProjetoCard } from "./projeto-card";

const destaque = portfolioData.find((p) => p.portfolio_type === "Sistema interno")!;
const demais = portfolioData.filter((p) => p !== destaque).slice(0, 4);

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projetos-titulo" className="relative bg-negro-900 pb-24 lg:pb-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 border-t border-white/8 pt-24 lg:flex-row lg:items-end lg:pt-32">
          <SectionHead
            id="projetos-titulo"
            indice="04"
            rotulo="Projetos"
            titulo={
              <>
                Projetos reais, <Acento>em produção.</Acento>
              </>
            }
          />
          <p className="revelar max-w-md text-lg leading-relaxed text-cumaru-400 lg:text-right">
            Uma seleção de sistemas e sites que entregamos para nossos clientes, do levantamento ao ar.
          </p>
        </div>

        <ProjetoCard item={destaque} destaque className="revelar mt-16 lg:mt-20" />

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-28">
          {demais.map((p, i) => (
            <ProjetoCard key={p.portfolio_title} item={p} className={i % 2 ? "revelar md:mt-24" : "revelar"} />
          ))}
        </div>

        <div className="mt-16 flex justify-center lg:mt-20">
          <Link href="/projects" className="group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-cumaru-200 ring-1 ring-white/15 transition-colors hover:bg-white/5">
            Ver todos os projetos
            <IconArrowUpRight className="size-4 text-taruma-300 transition-transform group-hover:rotate-45" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
