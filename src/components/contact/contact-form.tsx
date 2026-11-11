"use client";

// Formulário do Contato: monta a mensagem e abre o WhatsApp da North. Enxuto: nome, Instagram (opcional),
// tipo de projeto e mensagem, com rótulos visíveis e campos de 44px. Componentes shadcn (Input, Select,
// Textarea, Label) e o AnimatedButton do projeto.
import React, { useState } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IconWorld, IconDeviceMobile, IconAdjustments, IconPlugConnected, IconBriefcase, IconBrandWhatsapp } from "@tabler/icons-react";
import { whatsappHref } from "@/constants";

type ButtonState = "idle" | "loading" | "success";

const projectTypes = [
  { value: "Desenvolvimento Web", label: "Desenvolvimento Web", icon: IconWorld },
  { value: "Aplicativo Mobile", label: "Aplicativo Mobile", icon: IconDeviceMobile },
  { value: "Sistema Personalizado", label: "Sistema Personalizado", icon: IconAdjustments },
  { value: "Integração de Sistemas", label: "Integração de Sistemas", icon: IconPlugConnected },
  { value: "Consultoria", label: "Consultoria", icon: IconBriefcase },
];

const campo = "h-11 text-[15px] shadow-xs";
const rotulo = "text-sm font-medium text-cumaru-200";

const ContactForm = () => {
  const [form, setForm] = useState({ nome: "", instagram: "", tipo: "", mensagem: "" });
  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const selecionado = projectTypes.find((p) => p.value === form.tipo);

  const mudar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const enviar = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("loading");
    const dados = [`*Nome:* ${form.nome}`];
    if (form.instagram.trim()) dados.push(`*Instagram:* @${form.instagram.trim().replace(/^@/, "")}`);
    if (form.tipo) dados.push(`*Tipo de projeto:* ${form.tipo}`);
    dados.push(`*Mensagem:* ${form.mensagem}`);
    const mensagem = ["Olá! Vim pelo site da North e gostaria de falar sobre um projeto.", "", ...dados].join("\n");
    window.open(whatsappHref(mensagem), "_blank", "noopener,noreferrer");
    setButtonState("success");
    setTimeout(() => setButtonState("idle"), 3000);
  };

  return (
    <Card className="gap-0 rounded-3xl border p-6 ring-0 sm:p-8">
      <CardContent className="p-0">
        <form onSubmit={enviar} className="flex flex-col gap-5">
          <p className="font-mono text-[11px] tracking-[0.16em] text-cumaru-500 uppercase">Ou deixe a mensagem pronta</p>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nome" className={rotulo}>
                Nome
              </Label>
              <Input id="nome" name="nome" autoComplete="name" placeholder="Como podemos te chamar?" value={form.nome} onChange={mudar} className={campo} required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="instagram" className={rotulo}>
                Instagram <span className="font-normal text-cumaru-500">(opcional)</span>
              </Label>
              <Input id="instagram" name="instagram" placeholder="@suaempresa" value={form.instagram} onChange={mudar} className={campo} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tipo" className={rotulo}>
              Tipo de projeto
            </Label>
            <Select value={form.tipo} onValueChange={(v) => setForm((f) => ({ ...f, tipo: v ?? "" }))}>
              <SelectTrigger id="tipo" className="h-11! w-full text-[15px] shadow-xs">
                {selecionado ? (
                  <span className="flex items-center gap-2">
                    <selecionado.icon size={16} className="shrink-0 text-muted-foreground" />
                    <span className="truncate">{selecionado.label}</span>
                  </span>
                ) : (
                  <SelectValue placeholder="Escolha uma opção" />
                )}
              </SelectTrigger>
              <SelectContent align="start" position="popper" className="duration-400 data-[state=open]:zoom-in-100">
                {projectTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <type.icon size={15} className="shrink-0" />
                    <span className="truncate">{type.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="mensagem" className={rotulo}>
              Mensagem
            </Label>
            <Textarea id="mensagem" name="mensagem" placeholder="Conte o que você precisa" value={form.mensagem} onChange={mudar} className="h-28 resize-none text-[15px] shadow-xs" required />
          </div>

          <AnimatedButton type="submit" state={buttonState} className="mt-1 h-12">
            <IconBrandWhatsapp size={18} />
            Enviar pelo WhatsApp
          </AnimatedButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
