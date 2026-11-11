"use client";

// Atalho do WhatsApp que acompanha a página depois do hero (como na SA Kaizen): barra no rodapé da tela no celular
// (não cobre o conteúdo no canto) e bola Tarumã no canto inferior direito no desktop, com o pulso do "Pulsating Button" do Magic UI; some sobre o Contato, onde o WhatsApp já está em destaque.
import { useEffect, useState } from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { whatsappHref } from "@/constants";
import { cn } from "@/lib/utils";

export default function WhatsAppFloat() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const contato = document.getElementById("contact");
    const atualizar = () => {
      const passouHero = window.scrollY > window.innerHeight * 0.8;
      const r = contato?.getBoundingClientRect();
      const noContato = !!r && r.top < window.innerHeight * 0.6; // do Contato até o fim (rodapé incluso)
      setVisivel(passouHero && !noContato);
    };
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  return (
    <PulsatingButton
      href={whatsappHref()}
      target="_blank"
      rel="noopener"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel || undefined}
      variant="ripple"
      pulseColor="#3DAFA6"
      duration="2.4s"
      distance="14px"
      className={cn(
        "fixed inset-x-4 bottom-4 z-40 h-14 rounded-full bg-taruma-400 p-0 font-semibold text-negro-900 shadow-[0_12px_40px_-10px_rgba(61,175,166,.9)] transition-[transform,opacity,background-color] duration-300 hover:bg-taruma-300 lg:inset-x-auto lg:right-6 lg:bottom-6 lg:size-16",
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <span className="flex items-center gap-2">
        <IconBrandWhatsapp className="size-6 lg:size-8" aria-hidden />
        <span className="lg:sr-only">Conversar no WhatsApp</span>
      </span>
    </PulsatingButton>
  );
}
