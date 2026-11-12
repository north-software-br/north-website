"use client";

// Menu "faixa": barra de largura total, transparente no topo e de vidro ("liquid glass") ao rolar: a marca "North software", os links com a
// seção atual sublinhada em Tarumã, o atalho do WhatsApp e o "Fale conosco" do navbar-01 (Shadcn Space, a seta
// corre para o outro lado no hover). No celular, o menu abre em tela cheia com as seções, o WhatsApp e o e-mail.
// Escolhido entre três propostas (navbar-01 da Shadcn Space, faixa e Floating Navbar da Aceternity).
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IconArrowUpRight, IconBrandWhatsapp, IconMenu2, IconX } from "@tabler/icons-react";
import NORTH_WORDMARK from "../../../public/logos/NORTH_WORDMARK.svg";
import { CONTATO, whatsappHref } from "@/constants";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Serviços", link: "/#services" },
  { name: "Processo", link: "/#process" },
  { name: "Sobre", link: "/#about" },
  { name: "Projetos", link: "/#projects" },
  { name: "Clientes", link: "/#clientes" },
];

// seção em foco na home (faixa central da tela), para marcar o item do menu
function useSecaoAtiva() {
  const [ativa, setAtiva] = useState<number | null>(null);
  useEffect(() => {
    const els = navLinks.map((l) => document.getElementById(l.link.split("#")[1]));
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setAtiva(els.indexOf(e.target as HTMLElement)); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    const hero = document.getElementById("inicio");
    const ioHero = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAtiva(null); }, { rootMargin: "-45% 0px -50% 0px" });
    if (hero) ioHero.observe(hero);
    return () => { io.disconnect(); ioHero.disconnect(); };
  }, []);
  return ativa;
}

function useRolou() {
  const [rolou, setRolou] = useState(false);
  useEffect(() => {
    const f = () => setRolou(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return rolou;
}

function irPara(href: string) {
  const id = href.split("#")[1];
  if (!id) return;
  const el = document.getElementById(id);
  // Fora da home a seção não existe: navega para ela
  if (el) el.scrollIntoView({ behavior: "smooth" });
  else window.location.assign(`/#${id}`);
}

const aoClicar = (href: string, antes?: () => void) => (e: React.MouseEvent) => {
  e.preventDefault();
  antes?.();
  irPara(href);
};

// marca: "North" do SVG oficial + "software" em Tarumã na linha de base, como na logo
function Marca() {
  return (
    <Link href="/" aria-label="North Software, início" className="flex shrink-0 items-end gap-1.5 py-2">
      <Image src={NORTH_WORDMARK} alt="" className="h-6 w-auto" priority />
      <span aria-hidden className="text-[17px] leading-[0.8] font-medium tracking-tight text-taruma-400">
        software
      </span>
    </Link>
  );
}

export default function NorthNavbar() {
  const ativa = useSecaoAtiva();
  const rolou = useRolou();
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  // menu do celular aberto: trava a rolagem e fecha com Esc
  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [aberto]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
          // no topo some no hero (sem fundo nem linha); ao rolar vira vidro
          rolou || aberto
            ? "border-white/10 bg-negro-900/60 shadow-[0_8px_40px_rgba(3,11,23,.5)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        {/* fundo de vidro ("liquid glass") só depois de rolar */}
        <nav aria-label="Principal" className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
          <Marca />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l, i) => (
              <li key={l.link}>
                <a
                  href={l.link}
                  onClick={aoClicar(l.link)}
                  aria-current={ativa === i ? "true" : undefined}
                  className={cn("relative block px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-cumaru-100", ativa === i ? "text-cumaru-100" : "text-cumaru-300")}
                >
                  {l.name}
                  <span aria-hidden className={cn("absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-taruma-400 transition-transform duration-500", ativa === i ? "scale-x-100" : "scale-x-0")} />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={whatsappHref()} target="_blank" rel="noopener" aria-label="WhatsApp da North" className="flex size-11 items-center justify-center rounded-full text-cumaru-300 ring-1 ring-white/10 transition-colors hover:text-taruma-300">
              <IconBrandWhatsapp className="size-5" aria-hidden />
            </a>
            <Link
              href="/#contact"
              onClick={aoClicar("/#contact")}
              className="group relative flex h-11 w-fit shrink-0 items-center overflow-hidden rounded-full bg-taruma-400 ps-5 pe-13 text-sm font-semibold text-negro-900 transition-all duration-500 hover:bg-taruma-300 hover:ps-13 hover:pe-5"
            >
              <span className="relative z-10">Fale conosco</span>
              <span className="absolute right-1.5 flex size-8 items-center justify-center rounded-full bg-negro-900 text-taruma-300 transition-all duration-500 group-hover:right-[calc(100%-38px)] group-hover:rotate-45">
                <IconArrowUpRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>

          <button type="button" onClick={() => setAberto((v) => !v)} aria-label={aberto ? "Fechar menu" : "Abrir menu"} aria-expanded={aberto} aria-controls="menu-celular" className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/5 text-cumaru-100 ring-1 ring-white/10 lg:hidden">
            {aberto ? <IconX className="size-5" aria-hidden /> : <IconMenu2 className="size-5" aria-hidden />}
          </button>
        </nav>
      </header>

      {/* celular: tela cheia (fora do header, que tem backdrop-filter e prenderia o fixed) */}
      <div id="menu-celular" inert={!aberto} className={cn("fixed inset-0 z-[45] flex flex-col bg-negro-900/97 px-6 pt-28 pb-8 backdrop-blur-xl transition-[opacity,visibility] duration-300 lg:hidden", aberto ? "visible opacity-100" : "invisible opacity-0")}>
        <ul className="flex flex-col border-t border-white/8">
          {navLinks.map((l, i) => (
            <li key={l.link} className="border-b border-white/8">
              <a
                href={l.link}
                onClick={aoClicar(l.link, fechar)}
                style={{ transitionDelay: aberto ? `${80 + i * 50}ms` : "0ms" }}
                className={cn("block py-4 text-3xl font-bold tracking-tight text-cumaru-100 transition-[opacity,translate] duration-500", aberto ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3">
          <a href={whatsappHref()} target="_blank" rel="noopener" className="flex h-13 items-center justify-center gap-2 rounded-full bg-taruma-400 font-semibold text-negro-900">
            <IconBrandWhatsapp className="size-5" aria-hidden /> Conversar no WhatsApp
          </a>
          <a href={`mailto:${CONTATO.email}`} className="py-2 text-center text-sm text-cumaru-400">
            {CONTATO.email}
          </a>
        </div>
      </div>
    </>
  );
}
