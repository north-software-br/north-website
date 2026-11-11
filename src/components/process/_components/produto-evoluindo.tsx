"use client";

// Ilustração do Processo: um único produto que evolui a cada etapa (a mesma tela se transforma).
// Descoberta: notas com as necessidades ligadas à North por feixes (Animated Beam, Magic UI). Design: wireframe
// com o nome de cada área e o cursor aprovando. Desenvolvimento: as peças ganham forma com o nome do componente.
// Testes: cada peça recebe o "ok" e uma varredura passa pela tela. Implantação: a moldura de navegador (Safari,
// Magic UI) "veste" a tela, com endereço e "No ar". Evolução: um módulo novo chega na tela e no menu.
// A tela ocupa toda a área; só transform/opacity/cores mudam (sem deslocar o layout da página).
import { useRef } from "react";
import { IconCheck, IconPlus, IconPointerFilled } from "@tabler/icons-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Safari } from "@/components/ui/safari";
import { cn } from "@/lib/utils";

const NOTAS = [
  { texto: "Cadastro de clientes", classe: "left-[4%] top-[8%] -rotate-3" },
  { texto: "Aprovações em um só lugar", classe: "right-[4%] top-[6%] rotate-2" },
  { texto: "Relatórios sem planilha", classe: "left-[2%] top-[62%] rotate-2" },
  { texto: "Acesso pelo celular", classe: "right-[6%] top-[60%] -rotate-2" },
  { texto: "Integração com o ERP", classe: "left-1/2 bottom-[4%] -translate-x-1/2 -rotate-1" },
];

// fração da moldura do Safari ocupada pela barra (52 de 753): a tela encolhe por baixo dela na implantação
const BARRA = 52 / 753;

// cada peça da tela: aparência por etapa e o atraso para entrar em sequência
// className: tamanho e borda da peça; interno: layout do conteúdo (flex etc.)
function Peca({ e, ordem, nome, className, interno, children }: { e: number; ordem: number; nome: string; className?: string; interno?: string; children?: React.ReactNode }) {
  const atraso = { transitionDelay: e === 2 || e === 3 ? `${ordem * 140}ms` : "0ms" };
  return (
    <div
      style={atraso}
      className={cn(
        "relative rounded-lg border transition-[background-color,border-color] duration-500",
        e <= 1 ? "border-dashed border-white/25 bg-transparent" : "border-white/10 bg-negro-700/80",
        className,
      )}
    >
      <div className={cn("size-full overflow-hidden transition-opacity duration-500", e >= 2 ? "opacity-100" : "opacity-0", interno)} style={atraso}>
        {children}
      </div>
      {/* design: o nome da área no wireframe */}
      <span className={cn("absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-wide text-cumaru-500 transition-opacity duration-300", e === 1 ? "opacity-100" : "opacity-0")}>
        {nome}
      </span>
      {/* desenvolvimento: o nome do componente (dentro da peça, sem cortar na borda) */}
      <span style={atraso} className={cn("absolute top-1 left-1 rounded bg-taruma-400 px-1.5 py-px font-mono text-[9px] text-negro-900 transition-opacity duration-300", e === 2 ? "opacity-100" : "opacity-0")}>
        {`<${nome.replace(/\s/g, "")} />`}
      </span>
      {/* testes: o ok */}
      <span
        style={{ transitionDelay: e === 3 ? `${ordem * 160 + 200}ms` : "0ms" }}
        className={cn(
          "absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-taruma-400 text-negro-900 transition-[opacity,transform] duration-300",
          e === 3 ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      >
        <IconCheck className="size-3" />
      </span>
    </div>
  );
}

function Nota({ indice, ativa, ref }: { indice: number; ativa: boolean; ref: React.Ref<HTMLDivElement> }) {
  const n = NOTAS[indice];
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${indice * 0.09}s` }}
      className={cn("absolute z-10 rounded-md bg-cumaru-200 px-3 py-2 text-[12px] font-medium whitespace-nowrap text-negro-700 shadow-[0_10px_24px_-12px_rgba(0,0,0,.8)]", ativa && "checar", n.classe)}
    >
      {n.texto}
    </div>
  );
}

const feixe = { duration: 4, pathColor: "#F0EDE3", pathOpacity: 0.12, gradientStartColor: "#3DAFA6", gradientStopColor: "#95D7CF" };

function Descoberta({ ativa }: { ativa: boolean }) {
  const area = useRef<HTMLDivElement>(null);
  const centro = useRef<HTMLDivElement>(null);
  const n0 = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const n4 = useRef<HTMLDivElement>(null);

  return (
    <div ref={area} className={cn("absolute inset-0 transition-opacity duration-500", ativa ? "opacity-100" : "pointer-events-none opacity-0")}>
      {ativa && (
        <>
          <AnimatedBeam containerRef={area} fromRef={n0} toRef={centro} curvature={30} delay={0} {...feixe} />
          <AnimatedBeam containerRef={area} fromRef={n1} toRef={centro} curvature={-30} delay={0.3} reverse {...feixe} />
          <AnimatedBeam containerRef={area} fromRef={n2} toRef={centro} curvature={-30} delay={0.6} {...feixe} />
          <AnimatedBeam containerRef={area} fromRef={n3} toRef={centro} curvature={30} delay={0.9} reverse {...feixe} />
          <AnimatedBeam containerRef={area} fromRef={n4} toRef={centro} curvature={0} delay={1.2} {...feixe} />
        </>
      )}
      <div ref={centro} className="absolute top-1/2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-negro-700 font-bold text-taruma-300 shadow-[0_0_40px_-6px_rgba(61,175,166,.6)] ring-1 ring-taruma-400/40">
        N
      </div>
      <Nota indice={0} ativa={ativa} ref={n0} />
      <Nota indice={1} ativa={ativa} ref={n1} />
      <Nota indice={2} ativa={ativa} ref={n2} />
      <Nota indice={3} ativa={ativa} ref={n3} />
      <Nota indice={4} ativa={ativa} ref={n4} />
    </div>
  );
}

export function ProdutoEvoluindo({ etapa: e }: { etapa: number }) {
  const noAr = e >= 4;
  return (
    <div className="relative size-full">
      <Descoberta ativa={e === 0} />

      {/* a tela do produto, na proporção da moldura do Safari */}
      <div className={cn("absolute inset-0 grid place-items-center transition-[opacity,transform] duration-700", e === 0 ? "scale-95 opacity-0" : "scale-100 opacity-100")}>
        <div className="relative aspect-[1203/753] w-full">
          {/* a tela: ocupa tudo e, na implantação, encolhe por baixo da barra do navegador */}
          <div
            className="absolute inset-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ transform: noAr ? `scale(${1 - BARRA})` : "none" }}
          >
            <div className="relative flex size-full gap-2.5 p-2.5">
              {/* menu lateral */}
              <Peca e={e} ordem={0} nome="Menu" className="w-[22%] p-2" interno="flex flex-col gap-1.5">
                <span className="mb-1 h-3 w-10 shrink-0 rounded bg-taruma-400/70" />
                {["Início", "Clientes", "Aprovações", "Relatórios"].map((m, i) => (
                  <span key={m} className={cn("rounded px-1.5 py-1 text-[9px] text-cumaru-400", i === 0 && "bg-white/5 text-cumaru-100")}>
                    {m}
                  </span>
                ))}
                <span className={cn("flex items-center gap-1 rounded px-1.5 py-1 text-[9px] transition-[opacity,transform] duration-500", e >= 5 ? "translate-x-0 bg-taruma-400/15 text-taruma-300 opacity-100" : "-translate-x-2 opacity-0")}>
                  <IconPlus className="size-2.5" /> Novo módulo
                </span>
              </Peca>

              <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <Peca e={e} ordem={1} nome="Cabeçalho" className="h-9 shrink-0 px-3" interno="flex items-center justify-between">
                  <span className="h-2 w-24 rounded bg-cumaru-200/70" />
                  <span className="size-5 rounded-full bg-taruma-400/60" />
                </Peca>
                <div className="grid shrink-0 grid-cols-3 gap-2.5">
                  {["Pedidos", "Aprovações", "Pendências"].map((c, i) => (
                    <Peca key={c} e={e} ordem={2 + i} nome="Indicador" className="h-16 px-2.5" interno="flex flex-col justify-end gap-1.5 pb-2.5">
                      <span className="text-[9px] text-cumaru-500">{c}</span>
                      <span className="h-2.5 w-3/5 rounded bg-cumaru-200/80" />
                    </Peca>
                  ))}
                </div>
                <Peca e={e} ordem={5} nome="Gráfico" className="min-h-0 flex-1 p-2.5" interno="pt-4">
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="size-full">
                    <path d="M0 50 C 30 44, 45 28, 70 32 S 120 14, 150 20 S 185 6, 200 8" fill="none" stroke="#3DAFA6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d="M0 50 C 30 44, 45 28, 70 32 S 120 14, 150 20 S 185 6, 200 8 L200 60 L0 60 Z" fill="#3DAFA6" fillOpacity=".12" />
                  </svg>
                </Peca>
              </div>

              {/* evolução: o módulo novo sobre a tela (sem empurrar as peças) */}
              <div className={cn("absolute right-2.5 bottom-2.5 left-[calc(22%+1.25rem)] transition-[opacity,transform] duration-700", e >= 5 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
                <div className="flex h-11 items-center gap-2 rounded-lg border border-taruma-400/50 bg-negro-800/95 px-3 shadow-[0_-10px_30px_-10px_rgba(3,11,23,.9)] backdrop-blur">
                  <span className="rounded bg-taruma-400 px-1.5 py-px font-mono text-[9px] text-negro-900">v1.3</span>
                  <span className="text-[11px] font-medium text-cumaru-100">Novo módulo entregue</span>
                </div>
              </div>

              {/* design: o cursor aprovando o protótipo */}
              {e === 1 && (
                <span className="checar absolute top-[44%] left-[64%] flex items-center gap-1.5" style={{ animationDelay: ".5s" }}>
                  <IconPointerFilled className="size-5 -rotate-12 text-cumaru-100 drop-shadow" />
                  <span className="rounded-full bg-cumaru-100 px-2 py-0.5 text-[10px] font-medium text-negro-700">Aprovado</span>
                </span>
              )}

              {/* testes: varredura passando pela tela */}
              {e === 3 && <span aria-hidden className="varredura pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-transparent via-taruma-400/20 to-transparent" />}
            </div>
          </div>

          {/* implantação: a moldura de navegador veste a tela */}
          <div className={cn("pointer-events-none absolute inset-0 transition-opacity duration-500", noAr ? "opacity-100" : "opacity-0")}>
            <Safari vazado url="seuprojeto.com.br" mode="simple" className="size-full" />
            <span className="absolute top-[1.4%] right-[2%] z-20 flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> No ar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
