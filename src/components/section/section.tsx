// Peças compartilhadas pelas seções da home: cabeçalho de seção e a "divisa" do encontro das águas
// (a passagem entre uma seção escura Negro e uma clara Cumaru, marcada por uma linha Tarumã).
import { cn } from "@/lib/utils";

export function SectionHead({
  indice,
  rotulo,
  titulo,
  lead,
  claro = false,
  centro = false,
  className,
  id,
}: {
  indice: string;
  rotulo: string;
  titulo: React.ReactNode;
  lead?: React.ReactNode;
  /** seção clara (Cumaru): textos em Negro */
  claro?: boolean;
  centro?: boolean;
  className?: string;
  /** id do h2, para aria-labelledby da seção */
  id?: string;
}) {
  return (
    <header className={cn("revelar flex flex-col gap-5", centro && "items-center text-center", className)}>
      <p className={cn("flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase", claro ? "text-taruma-700" : "text-taruma-300")}>
        <span>{indice}</span>
        <span className="h-px w-8 bg-current opacity-50" aria-hidden />
        {rotulo}
      </p>
      <h2
        id={id}
        className={cn(
          "max-w-[22ch] text-[clamp(2.1rem,1.3rem+2.8vw,3.75rem)] leading-[1.04] font-bold tracking-[-0.035em] text-balance",
          claro ? "text-negro-700" : "text-cumaru-100",
        )}
      >
        {titulo}
      </h2>
      {lead && <p className={cn("max-w-[56ch] text-lg leading-relaxed", claro ? "text-negro-400" : "text-cumaru-400")}>{lead}</p>}
    </header>
  );
}

/** Destaque dentro de um título (a "outra água"): Tarumã no escuro, Tarumã escuro no claro (contraste). */
export function Acento({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return <span className={claro ? "text-taruma-600" : "text-taruma-300"}>{children}</span>;
}

const CORES = { negro: "var(--background)", fundo: "var(--color-negro-900)", cumaru: "var(--color-cumaru-100)" } as const;
type Agua = keyof typeof CORES;

/**
 * Divisa entre duas seções: a cor de cima encontra a de baixo numa curva suave, com a linha Tarumã
 * correndo pela margem (um brilho percorre a linha, como a correnteza). Decorativa.
 */
export function Divisa({ de, para, inverter = false }: { de: Agua; para: Agua; inverter?: boolean }) {
  const curva = inverter ? "M0 58 C 260 18, 520 18, 760 44 S 1220 86, 1440 30" : "M0 30 C 220 86, 600 86, 760 44 S 1180 18, 1440 58";
  return (
    <div aria-hidden className="relative -my-px h-[clamp(48px,7vw,110px)]" style={{ background: CORES[de] }}>
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path d={`${curva} L1440 100 L0 100 Z`} fill={CORES[para]} />
        <path d={curva} fill="none" stroke="#3DAFA6" strokeOpacity=".55" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
        <path d={curva} fill="none" stroke="#95D7CF" strokeWidth="2" vectorEffect="non-scaling-stroke" className="divisa-correnteza" />
      </svg>
    </div>
  );
}
