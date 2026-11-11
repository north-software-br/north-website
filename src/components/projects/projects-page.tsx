// Página /projects: todos os projetos, com o mesmo cartão da home (capa + vídeo sob demanda).
import { portfolioData } from "@/constants";
import Container from "../container/container";
import { Acento } from "../section/section";
import { ProjetoCard } from "./projeto-card";

const ProjectsPage = () => (
  <section className="min-h-screen w-full bg-background pt-40 pb-24 md:pt-48 md:pb-32">
    <Container>
      <header className="subir flex flex-col gap-6 border-b border-white/8 pb-14 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-5">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-taruma-300 uppercase">
            Portfólio <span className="h-px w-8 bg-current opacity-50" aria-hidden /> {portfolioData.length} projetos
          </p>
          <h1 className="text-[clamp(2.4rem,1.5rem+3.4vw,4.4rem)] leading-[1.02] font-bold tracking-[-0.035em] text-cumaru-100">
            Nossos <Acento>projetos</Acento>
          </h1>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-cumaru-400">
          Do briefing ao deploy, uma seleção de trabalhos que entregamos para nossos clientes. Estratégia, design e desenvolvimento em cada detalhe.
        </p>
      </header>

      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
        {portfolioData.map((p) => (
          <ProjetoCard key={p.portfolio_title} item={p} className="revelar" />
        ))}
      </div>
    </Container>
  </section>
);

export default ProjectsPage;
