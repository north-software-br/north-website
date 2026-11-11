"use client";

// Atalho do WhatsApp que acompanha a página depois do hero (como na SA Kaizen): bola Tarumã no canto inferior
// direito com o pulso do "Pulsating Button" do Magic UI; some sobre o Contato, onde o WhatsApp já está em destaque.
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
      const noContato = !!r && r.top < window.innerHeight * 0.6 && r.bottom > 0;
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
      aria-label="Conversar com a North pelo WhatsApp"
      tabIndex={visivel ? 0 : -1}
      aria-hidden={!visivel || undefined}
      variant="ripple"
      pulseColor="#3DAFA6"
      duration="2.4s"
      distance="14px"
      className={cn(
        "fixed right-4 bottom-4 z-40 size-14 rounded-full bg-taruma-400 p-0 text-negro-900 shadow-[0_12px_40px_-10px_rgba(61,175,166,.9)] transition-[transform,opacity,background-color] duration-300 hover:bg-taruma-300 sm:right-6 sm:bottom-6 sm:size-16",
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <IconBrandWhatsapp className="size-7 sm:size-8" aria-hidden />
    </PulsatingButton>
  );
}
