"use client";

// Sobre a North: a marca N animada (as duas margens Cumaru e a fita Tarumã entre elas) com os compromissos
// da marca, e os quatro diferenciais numa lista editorial (sem números de impacto: ainda não foram medidos).
// Os depoimentos que ficavam aqui foram para a seção própria (components/testimonials).
import { IconEye, IconHeartHandshake, IconRocket, IconShieldCheck } from "@tabler/icons-react";
import Container from "../container/container";
import { Acento, SectionHead } from "../section/section";
import { LogoNorth } from "../hero/logo-north";

const diferenciais = [
  { tagline: "Infraestrutura", title: "Sistemas que duram", description: "Código que resiste ao tempo e escala com o negócio." },
  { tagline: "Produto", title: "Tecnologia sem ruído", description: "Sem relatórios que ninguém lê. Só o que fecha o caixa." },
  { tagline: "Integrações", title: "Integrações que facilitam a vida", description: "O ERP fala com a planilha. Sem digitar duas vezes, sem surpresas." },
  { tagline: "Suporte", title: "Suporte que responde", description: "Você fala com quem construiu. Resposta antes de virar crise." },
];

// compromissos em cada projeto (do próprio processo da North; sem números)
const compromissos = [
  { Icone: IconShieldCheck, nome: "Qualidade", texto: "testado antes de chegar até você" },
  { Icone: IconRocket, nome: "Entrega", texto: "ciclos curtos, você acompanha de perto" },
  { Icone: IconEye, nome: "Transparência", texto: "você aprova antes do desenvolvimento" },
  { Icone: IconHeartHandshake, nome: "Pós-venda", texto: "seguimos evoluindo o produto com você" },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="sobre-titulo" className="relative overflow-hidden bg-negro-900 py-24 lg:py-36">
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          {/* a marca e os compromissos */}
          <figure className="revelar flex flex-col items-center gap-12 lg:items-start">
            <div className="w-[min(62vw,300px)] lg:w-[min(30vw,380px)]">
              <LogoNorth seguirMouse semLinhas />
            </div>
            <figcaption className="flex w-full max-w-sm flex-col gap-4">
              <p className="font-mono text-[11px] tracking-[0.16em] text-cumaru-500 uppercase">Em cada projeto</p>
              <ul className="flex flex-col divide-y divide-white/8 border-y border-white/8">
                {compromissos.map(({ Icone, nome, texto }) => (
                  <li key={nome} className="flex items-center gap-3 py-3 text-sm">
                    <Icone className="size-4 shrink-0 text-taruma-300" aria-hidden />
                    <span className="font-semibold whitespace-nowrap text-cumaru-100">{nome}</span>
                    <span className="text-cumaru-500">{texto}</span>
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>

          {/* mensagem e diferenciais */}
          <div className="flex min-w-0 flex-col gap-14">
            <SectionHead
              id="sobre-titulo"
              indice="03"
              rotulo="Sobre a North"
              titulo={
                <>
                  Migre para o que <Acento>realmente funciona.</Acento>
                </>
              }
              lead="É mais simples do que parece. Construímos sistemas, aplicativos e sites sob medida, e seguimos ao seu lado depois da entrega."
            />
            <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {diferenciais.map((d, i) => (
                <div key={d.title} className="revelar group relative flex flex-col gap-3 border-t border-white/10 pt-6">
                  <span aria-hidden className="absolute -top-px left-0 h-px w-10 bg-taruma-400 transition-[width] duration-500 group-hover:w-full" />
                  <span className="font-mono text-[11px] tracking-[0.16em] text-taruma-300 uppercase">
                    0{i + 1} · {d.tagline}
                  </span>
                  <dt className="text-xl font-semibold tracking-tight text-cumaru-100">{d.title}</dt>
                  <dd className="leading-relaxed text-cumaru-400">{d.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
