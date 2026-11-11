import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconBrandWhatsapp } from "@tabler/icons-react";
import { whatsappHref } from "@/constants";

export const metadata: Metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-background pt-32 pb-24">
      <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-6">
        <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-taruma-300 uppercase">
          Erro 404 <span className="h-px w-8 bg-current opacity-50" aria-hidden />
        </p>
        <h1 className="text-[clamp(2.4rem,1.5rem+3.4vw,4rem)] leading-[1.04] font-bold tracking-[-0.035em] text-cumaru-100">
          Esta página não existe <span className="text-taruma-300">(ainda).</span>
        </h1>
        <p className="max-w-[48ch] text-lg leading-relaxed text-cumaru-400">O endereço pode ter mudado ou sido digitado errado. Volte ao início ou fale com a gente.</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-taruma-400 px-6 text-[15px] font-semibold text-negro-900 transition-colors hover:bg-taruma-300">
            <IconArrowLeft className="size-4" aria-hidden /> Voltar ao início
          </Link>
          <a href={whatsappHref()} target="_blank" rel="noopener" className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium text-cumaru-200 ring-1 ring-white/15 transition-colors hover:bg-white/5">
            <IconBrandWhatsapp className="size-4" aria-hidden /> Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
