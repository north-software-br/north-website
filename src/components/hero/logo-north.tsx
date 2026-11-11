"use client";

// Marca North em destaque no hero (variante "logo"). O "N" já é um encontro das águas: duas margens (Cumaru)
// e a fita Tarumã correndo entre elas. Entrada em CSS (margens sobem, a fita escorre na diagonal), um brilho
// que percorre a fita de tempos em tempos, a diagonal da fita continua como uma linha fina pelo hero e a marca
// desce mais devagar ao rolar (motion, só transform). Movimento reduzido: tudo parado, no estado final.
import { useEffect, useId, useRef } from "react";
import { LazyMotion, domAnimation, m, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

// caminhos do public/logos/NORTH_N.svg (sem a palavra "software")
const HASTE_ESQ = "M129.02,51.05h6.89s-6.76,0-6.76,0c-3.22,0-5.83,1.8-5.83,5.02v117.8h18.6c2.62,0,4.75-2.12,4.75-4.75v-97.8l-4.09-8.62c-3.28-5.92-5.8-11.65-13.55-11.65Z";
const HASTE_DIR = "M216.58,50.23c-3.22,0-5.83,2.61-5.83,5.83v90.92s6.28,13.37,6.28,13.37c3.29,6.79,4.48,13.33,12.1,13.42h.23c2.62,0,4.75-2.12,4.75-4.74V50.23h-17.51Z";
const FITA = "M217.02,160.35l-6.26-13.37-38.91-83.05c-3.28-6.22-6.28-12.9-14.03-12.9l-21.91.02h-6.89c7.75,0,10.26,5.73,13.55,11.65l4.09,8.62,42.42,89.34c3.31,6.53,6.28,12.9,14.03,12.9l26.16.21s-.1,0-.15,0c-7.61-.08-8.8-6.63-12.1-13.42Z";

type Props = {
  /** sombra Negro atrás da marca, para destacá-la sobre a esfera */
  sobreEsfera?: boolean;
  /** sem as linhas diagonais decorativas */
  semLinhas?: boolean;
  /** a marca acompanha de leve o mouse, como a esfera (só com mouse e sem movimento reduzido) */
  seguirMouse?: boolean;
};

export function LogoNorth({ sobreEsfera = false, semLinhas = false, seguirMouse = false }: Props) {
  // ids únicos: pode haver mais de uma marca na página (celular e desktop) e um id repetido some com a fita
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const marca = useTransform(p, [0, 1], [0, reduzido ? 0 : 90]);
  const linha = useTransform(p, [0, 1], [0, reduzido ? 0 : 30]);
  // a entrada (CSS) espera a marca aparecer na tela
  const vista = useInView(ref, { once: true, amount: 0.35 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 16 });
  const sy = useSpring(my, { stiffness: 50, damping: 16 });
  const giro = useTransform(sx, (v) => v * 0.12);

  useEffect(() => {
    if (!seguirMouse || reduzido || !matchMedia("(pointer: fine)").matches) return;
    const mover = (e: MouseEvent) => {
      mx.set((e.clientX / innerWidth - 0.5) * 18);
      my.set((e.clientY / innerHeight - 0.5) * 14);
    };
    addEventListener("mousemove", mover, { passive: true });
    return () => removeEventListener("mousemove", mover);
  }, [seguirMouse, reduzido, mx, my]);

  return (
    <LazyMotion features={domAnimation}>
      <div ref={ref} data-espera={!vista || undefined} className={sobreEsfera ? "relative aspect-square w-full" : "relative mx-auto aspect-square w-full max-w-[220px] sm:max-w-[320px] lg:max-w-[460px]"} aria-hidden>
        {/* brilho e a diagonal da fita atravessando a área; sobre a esfera, uma sombra Negro destaca a marca */}
        {sobreEsfera && <div className="absolute inset-[-30%] -z-10 bg-[radial-gradient(closest-side,rgba(8,23,42,.78),rgba(8,23,42,.4)_55%,transparent_80%)]" />}
        <div className="absolute inset-[-25%] -z-10 bg-[radial-gradient(closest-side,rgba(61,175,166,.20),transparent_70%)]" />
        {!semLinhas && (
        <m.svg style={{ y: linha }} viewBox="0 0 400 400" className="absolute inset-[-40%] -z-10 size-[180%] overflow-visible">
          <line x1="-60" y1="-90" x2="460" y2="490" stroke="#3DAFA6" strokeOpacity=".28" strokeWidth=".8" className="n-divisa" />
          <line x1="-40" y1="-110" x2="480" y2="470" stroke="#3DAFA6" strokeOpacity=".1" strokeWidth=".6" />
        </m.svg>
        )}

        <m.div style={{ x: sx, y: sy, rotate: giro }} className="size-full">
        <m.svg style={{ y: marca }} viewBox="116 44 124 136" className="size-full overflow-visible">
          <defs>
            <linearGradient id={`n-fita-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#67C4B9" />
              <stop offset=".55" stopColor="#3DAFA6" />
              <stop offset="1" stopColor="#237D75" />
            </linearGradient>
            <linearGradient id={`n-luz-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset=".35" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
              <stop offset=".65" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id={`n-fita-clip-${uid}`}>
              <path d={FITA} />
            </clipPath>
          </defs>
          <path d={HASTE_ESQ} fill="#F0EDE3" className="n-haste" />
          <path d={HASTE_DIR} fill="#F0EDE3" className="n-haste n-haste-dir" />
          <g className="n-fita">
            <path d={FITA} fill={`url(#n-fita-${uid})`} className="drop-shadow-[0_0_14px_rgba(61,175,166,.45)]" />
            <g clipPath={`url(#n-fita-clip-${uid})`}>
              <rect x="60" y="-40" width="90" height="300" fill={`url(#n-luz-${uid})`} className="n-luz" />
            </g>
          </g>
        </m.svg>
        </m.div>
      </div>
    </LazyMotion>
  );
}
