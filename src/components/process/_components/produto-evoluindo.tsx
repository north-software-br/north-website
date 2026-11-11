"use client";

// Opção 1 de ilustração do Processo: um único produto que evolui a cada etapa (a mesma tela se transforma,
// em vez de trocar de imagem). Descoberta: notas com as necessidades. Design: as peças da tela em wireframe.
// Desenvolvimento: as peças ganham forma, uma a uma, com o nome do componente. Testes: cada peça recebe o "ok"
// e uma varredura passa pela tela. Implantação: a tela entra no navegador, com endereço e "no ar". Evolução:
// um módulo novo chega na tela e no menu. Só transform/opacity/cores (espaços reservados, sem deslocar o layout).
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const NOTAS = [
  { texto: "Cadastro de clientes", x: "6%", y: "10%", r: -4 },
  { texto: "Aprovações em um só lugar", x: "52%", y: "6%", r: 3 },
  { texto: "Relatórios sem planilha", x: "14%", y: "44%", r: 2 },
  { texto: "Acesso pelo celular", x: "58%", y: "40%", r: -3 },
  { texto: "Integração com o ERP", x: "30%", y: "72%", r: -2 },
];

// cada peça da tela: aparência por etapa e o atraso para entrar em sequência
// className: tamanho e borda da peça; interno: layout do conteúdo (flex etc.)
function Peca({ e, ordem, nome, className, interno, children }: { e: number; ordem: number; nome: string; className?: string; interno?: string; children?: React.ReactNode }) {
  const atraso = { transitionDelay: e === 2 || e === 3 ? `${ordem * 140}ms` : "0ms" };
  return (
    <div
      style={atraso}
      className={cn(
        "relative rounded-lg border transition-[background-color,border-color,opacity,transform] duration-500 motion-reduce:transition-none",
        e <= 1 ? "border-dashed border-white/25 bg-transparent" : "border-white/10 bg-negro-700/80",
        className,
      )}
    >
      <div className={cn("size-full transition-opacity duration-500", e >= 2 ? "opacity-100" : "opacity-0", interno)} style={atraso}>
        {children}
      </div>
      {/* nome do componente, só no desenvolvimento */}
      <span
        style={atraso}
        className={cn(
          "absolute -top-2 left-2 rounded bg-taruma-400 px-1.5 py-px font-mono text-[9px] text-negro-900 transition-opacity duration-300",
          e === 2 ? "opacity-100" : "opacity-0",
        )}
      >
        {`<${nome} />`}
      </span>
      {/* ok dos testes */}
      <span
        style={{ transitionDelay: e === 3 ? `${ordem * 160 + 200}ms` : "0ms" }}
        className={cn(
          "absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-taruma-400 text-negro-900 transition-[opacity,transform] duration-300",
          e === 3 ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      >
        <IconCheck className="size-3" />
      </span>
    </div>
  );
}

export function ProdutoEvoluindo({ etapa: e }: { etapa: number }) {
  return (
    <div className="relative size-full">
      {/* descoberta: as necessidades em notas */}
      {NOTAS.map((n, i) => (
        <div
          key={n.texto}
          style={{ left: n.x, top: n.y, rotate: `${n.r}deg`, transitionDelay: e === 0 ? `${i * 90}ms` : "0ms" }}
          className={cn(
            "absolute rounded-md bg-cumaru-200 px-3 py-2 text-[12px] font-medium text-negro-700 shadow-[0_10px_24px_-12px_rgba(0,0,0,.8)] transition-[opacity,transform] duration-500",
            e === 0 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          {n.texto}
        </div>
      ))}

      {/* a tela do produto */}
      <div className={cn("absolute inset-0 flex flex-col transition-[opacity,transform] duration-700", e === 0 ? "scale-95 opacity-0" : "scale-100 opacity-100")}>
        {/* navegador: chega na implantação */}
        <div className={cn("flex h-8 items-center gap-2 overflow-hidden rounded-t-lg bg-negro-700/70 px-3 transition-[opacity,transform] duration-500", e >= 4 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0")}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/20" />
          ))}
          <span className="ml-2 flex-1 truncate rounded bg-negro-900/70 px-2 py-0.5 font-mono text-[10px] text-cumaru-400">seuprojeto.com.br</span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> No ar
          </span>
        </div>

        <div className={cn("relative flex flex-1 gap-2.5 rounded-lg p-2.5 transition-colors duration-500", e >= 4 ? "rounded-t-none bg-negro-900/60 ring-1 ring-taruma-400/25" : "bg-transparent")}>
          {/* menu lateral */}
          <Peca e={e} ordem={0} nome="Menu" className="w-[22%] p-2" interno="flex flex-col gap-1.5">
            <span className="mb-1 h-3 w-10 rounded bg-taruma-400/70" />
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
            <Peca e={e} ordem={1} nome="Cabeçalho" className="h-9 px-3" interno="flex items-center justify-between">
              <span className="h-2 w-24 rounded bg-cumaru-200/70" />
              <span className="size-5 rounded-full bg-taruma-400/60" />
            </Peca>
            <div className="grid grid-cols-3 gap-2.5">
              {["Pedidos", "Aprovações", "Pendências"].map((c, i) => (
                <Peca key={c} e={e} ordem={2 + i} nome="Card" className="h-16 px-2.5" interno="flex flex-col justify-center gap-1.5">
                  <span className="text-[9px] text-cumaru-500">{c}</span>
                  <span className="h-2.5 w-3/5 rounded bg-cumaru-200/80" />
                </Peca>
              ))}
            </div>
            <Peca e={e} ordem={5} nome="Grafico" className="flex-1 overflow-hidden p-2.5">
              <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="size-full">
                <path d="M0 50 C 30 44, 45 28, 70 32 S 120 14, 150 20 S 185 6, 200 8" fill="none" stroke="#3DAFA6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <path d="M0 50 C 30 44, 45 28, 70 32 S 120 14, 150 20 S 185 6, 200 8 L200 60 L0 60 Z" fill="#3DAFA6" fillOpacity=".12" />
              </svg>
            </Peca>
            {/* evolução: o módulo novo */}
            <div className={cn("h-12 transition-[opacity,transform] duration-700", e >= 5 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}>
              <div className="flex h-12 items-center gap-2 rounded-lg border border-taruma-400/40 bg-taruma-400/10 px-3">
                <span className="rounded bg-taruma-400 px-1.5 py-px font-mono text-[9px] text-negro-900">v1.3</span>
                <span className="text-[11px] font-medium text-cumaru-100">Novo módulo entregue</span>
              </div>
            </div>
          </div>

          {/* testes: varredura passando pela tela */}
          {e === 3 && <span aria-hidden className="varredura pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-transparent via-taruma-400/20 to-transparent" />}
        </div>
      </div>
    </div>
  );
}
