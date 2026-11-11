"use client";

// Contato: o caminho mais curto primeiro (WhatsApp e e-mail como ações grandes) e o formulário ao lado, que
// monta a mensagem e abre o WhatsApp. Ao fundo, a diagonal da fita do N atravessando a seção.
import { IconArrowUpRight, IconBrandWhatsapp, IconMail, IconMapPin } from "@tabler/icons-react";
import Container from "../container/container";
import { Acento, SectionHead } from "../section/section";
import ContactForm from "./contact-form";
import { CONTATO, whatsappHref } from "@/constants";

const acoes = [
  { Icone: IconBrandWhatsapp, rotulo: "WhatsApp", valor: CONTATO.telefone, href: whatsappHref(), externo: true, destaque: true },
  { Icone: IconMail, rotulo: "E-mail", valor: CONTATO.email, href: `mailto:${CONTATO.email}`, externo: false, destaque: false },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contato-titulo" className="relative w-full overflow-hidden bg-negro-900 py-24 lg:py-36">
      <svg aria-hidden viewBox="0 0 1440 800" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
        <line x1="760" y1="-40" x2="1500" y2="840" stroke="#3DAFA6" strokeOpacity=".16" />
        <line x1="700" y1="-40" x2="1440" y2="840" stroke="#3DAFA6" strokeOpacity=".07" />
      </svg>
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(61,175,166,0.1),transparent)]" />

      <Container>
        <div className="relative grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <div className="flex min-w-0 flex-col gap-12">
            <SectionHead
              id="contato-titulo"
              indice="06"
              rotulo="Contato"
              titulo={
                <>
                  Vamos tirar o seu projeto <Acento>do papel?</Acento>
                </>
              }
              lead="Conte o que você precisa. A conversa começa pelo WhatsApp ou por e-mail, com quem vai construir."
            />

            <ul className="revelar flex flex-col gap-3">
              {acoes.map(({ Icone, rotulo, valor, href, externo, destaque }) => (
                <li key={rotulo}>
                  <a
                    href={href}
                    {...(externo ? { target: "_blank", rel: "noopener" } : {})}
                    className={
                      destaque
                        ? "group flex items-center gap-5 rounded-2xl bg-taruma-400 p-5 text-negro-900 transition-colors hover:bg-taruma-300 sm:p-6"
                        : "group flex items-center gap-5 rounded-2xl p-5 text-cumaru-100 ring-1 ring-white/10 transition-colors hover:bg-white/5 sm:p-6"
                    }
                  >
                    <span className={destaque ? "flex size-12 shrink-0 items-center justify-center rounded-full bg-negro-900/10" : "flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5"}>
                      <Icone className="size-6" aria-hidden />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className={destaque ? "font-mono text-[11px] tracking-[0.16em] text-negro-800/70 uppercase" : "font-mono text-[11px] tracking-[0.16em] text-cumaru-500 uppercase"}>{rotulo}</span>
                      <span className="text-[15px] font-semibold min-[400px]:text-lg sm:text-xl">{valor.replace("@", "@\u200b") /* quebra depois do @ em telas estreitas */}</span>
                    </span>
                    <IconArrowUpRight className="size-5 shrink-0 transition-transform group-hover:rotate-45" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>

            <p className="revelar flex items-center gap-2 text-cumaru-400">
              <IconMapPin className="size-4 text-taruma-300" aria-hidden />
              Manaus, Amazonas · Brasil
            </p>
          </div>

          <div className="revelar min-w-0">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
