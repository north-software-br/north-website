"use client";

// Processo em fundo claro (Cumaru): as 6 etapas em cartões compactos ao longo de um trilho Tarumã que se
// preenche ao rolar (ideia do "Tracing Beam" da Aceternity; espaçamento como a trajetória do portfólio da Becca)
// e, no desktop, um painel escuro fixo à esquerda (como a foto na trajetória da Becca) com uma tela de sistema que se
// constrói etapa a etapa (a "outra água" dentro da seção
// clara). A etapa em foco segue a rolagem; passar o mouse ou focar uma etapa também a seleciona.
// Celular e tablet: sem painel, e cada etapa mostra só o título; tocar abre a descrição e as entregas (uma por vez).
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { useDesktop } from "@/hooks/use-desktop";
import { PROCESS_STEPS } from "@/constants";
import Container from "../container/container";
import { Acento, SectionHead } from "../section/section";
import { ProdutoEvoluindo } from "./_components/produto-evoluindo";
import { cn } from "@/lib/utils";

export default function Process() {
  const [ativa, setAtiva] = useState(0);
  const [aberta, setAberta] = useState(0);
  const desktop = useDesktop();
  const lista = useRef<HTMLOListElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: lista, offset: ["start 60%", "end 60%"] });
  const trilho = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // etapa em foco: a que cruza a faixa central da tela
  useEffect(() => {
    const itens = lista.current?.querySelectorAll<HTMLElement>("[data-etapa]");
    if (!itens) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAtiva(Number((e.target as HTMLElement).dataset.etapa))),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    itens.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const etapa = PROCESS_STEPS[ativa];

  return (
    <section id="process" aria-labelledby="processo-titulo" className="relative bg-cumaru-100 py-24 text-negro-700 lg:py-32">
      <Container>
        <SectionHead
          claro
          id="processo-titulo"
          indice="02"
          rotulo="Processo"
          titulo={
            <>
              Como transformamos sua <Acento claro>ideia em software.</Acento>
            </>
          }
          lead="Um processo validado para entregar sistemas escaláveis, seguros e alinhados ao seu negócio. Você acompanha cada etapa."
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <ol ref={lista} className="relative flex min-w-0 flex-col gap-4 lg:order-2">
            {/* trilho: base fina e o preenchimento Tarumã acompanhando a rolagem */}
            <span aria-hidden className="absolute top-8 bottom-8 left-[19px] w-px bg-negro-700/12" />
            <motion.span aria-hidden style={{ scaleY: reduzido ? 1 : trilho }} className="absolute top-8 bottom-8 left-[19px] w-px origin-top bg-taruma-500" />

            {PROCESS_STEPS.map((s, i) => {
              const foco = desktop ? i === ativa : i === aberta;
              const passou = desktop && i < ativa;
              return (
                <li key={s.number} data-etapa={i} onMouseEnter={() => desktop && setAtiva(i)} className="relative grid grid-cols-[40px_1fr] gap-x-4 sm:gap-x-5">
                  <span
                    className={cn(
                      "relative z-10 mt-6 flex size-10 items-center justify-center rounded-full border font-mono text-xs tabular-nums transition-colors duration-500",
                      foco ? "border-taruma-500 bg-taruma-500 text-cumaru-50" : passou ? "border-taruma-500 bg-cumaru-100 text-taruma-700" : "border-negro-700/15 bg-cumaru-100 text-negro-400",
                    )}
                  >
                    {s.number}
                  </span>
                  <article tabIndex={desktop ? 0 : undefined} onFocus={() => desktop && setAtiva(i)} className={cn("flex min-w-0 flex-col rounded-3xl border p-6 outline-none transition-[background-color,border-color,box-shadow] duration-500 focus-visible:ring-2 focus-visible:ring-taruma-500 sm:p-7", foco ? "border-taruma-500/40 bg-cumaru-50 shadow-[0_20px_40px_-28px_rgba(8,23,42,.35)]" : "border-negro-700/8 bg-cumaru-50/50")}>
                    <h3 className={cn("text-xl font-bold tracking-tight transition-colors duration-500 sm:text-2xl", foco ? "text-negro-700" : "text-negro-500")}>
                      {/* celular: o título abre e fecha a etapa (no desktop tudo fica visível) */}
                      <button
                        type="button"
                        onClick={() => setAberta(i)}
                        tabIndex={desktop ? -1 : undefined}
                        aria-expanded={desktop ? undefined : i === aberta}
                        aria-controls={`etapa-${s.number}`}
                        className="-my-2 flex w-full cursor-pointer items-center justify-between gap-3 py-2 text-left outline-none focus-visible:underline lg:pointer-events-none lg:cursor-default"
                      >
                        {s.title}
                        <IconChevronDown aria-hidden className={cn("size-5 shrink-0 text-negro-400 transition-transform duration-300 lg:hidden", i === aberta && "rotate-180")} />
                      </button>
                    </h3>
                    <div id={`etapa-${s.number}`} inert={!desktop && i !== aberta} className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:grid-rows-[1fr] lg:opacity-100", i === aberta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <div className="flex flex-col gap-3 overflow-hidden">
                        <p className="max-w-[52ch] pt-3 leading-relaxed text-negro-400">{s.description}</p>
                        <ul className="flex flex-wrap gap-1.5 pt-1" aria-label="Entregas desta etapa">
                          {s.deliverables.map((d) => (
                            <li key={d} className="flex items-center gap-1.5 rounded-full bg-cumaru-200 px-3 py-1 text-xs font-medium text-negro-600">
                              <IconCheck className="size-3.5 text-taruma-600" aria-hidden />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>

          {/* painel escuro fixo com a ilustração da etapa em foco */}
          <div className="hidden lg:order-1 lg:block">
            <div className="sticky top-28 overflow-hidden rounded-3xl bg-negro-800 shadow-[0_40px_80px_-40px_rgba(8,23,42,.6)] ring-1 ring-negro-700/20">
              {/* uma linha só: etapa e progresso (o título já está no cartão ativo ao lado) */}
              <div className="relative flex items-center gap-4 border-b border-white/8 px-6 py-3.5 font-mono text-[11px] tracking-[0.16em] text-cumaru-500 uppercase">
                <span>
                  Etapa <span className="text-taruma-300">{etapa.number}</span> / 0{PROCESS_STEPS.length}
                </span>
                <span aria-hidden className="absolute bottom-0 left-0 h-px bg-taruma-400 transition-[width] duration-500" style={{ width: `${((ativa + 1) / PROCESS_STEPS.length) * 100}%` }} />
              </div>
              <div className="relative h-[24rem] overflow-hidden">
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(61,175,166,.14),transparent_70%)]" />
                {/* a mesma tela de sistema se constrói ao longo das etapas (ideia, wireframe, componentes, testes, no ar, evolução) */}
                <div className="absolute inset-0 p-5">
                  <ProdutoEvoluindo etapa={ativa} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
