"use client";

import React, { useState } from "react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconWorld,
  IconDeviceMobile,
  IconAdjustments,
  IconPlugConnected,
  IconBriefcase,
  IconBrandWhatsapp,
} from "@tabler/icons-react";

type ButtonState = "idle" | "loading" | "success";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  projectType: string;
  message: string;
  terms: boolean;
}

const projectTypes = [
  { value: "Desenvolvimento Web", label: "Desenvolvimento Web", icon: IconWorld },
  { value: "Aplicativo Mobile", label: "Aplicativo Mobile", icon: IconDeviceMobile },
  { value: "Sistema Personalizado", label: "Sistema Personalizado", icon: IconAdjustments },
  { value: "Integração de Sistemas", label: "Integração de Sistemas", icon: IconPlugConnected },
  { value: "Consultoria", label: "Consultoria", icon: IconBriefcase },
];

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    message: "",
    terms: false,
  });
  const [buttonState, setButtonState] = useState<ButtonState>("idle");

  const selectedProject = projectTypes.find((p) => p.value === formData.projectType);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("loading");

    const message = [
      `Olá! Gostaria de falar sobre um projeto.`,
      ``,
      `*Nome:* ${formData.firstName} ${formData.lastName}`,
      `*E-mail:* ${formData.email}`,
      `*Tipo de projeto:* ${formData.projectType}`,
      `*Mensagem:* ${formData.message}`,
    ].join("\n");

    const url = `https://wa.me/5592995251477?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setButtonState("success");
    setTimeout(() => setButtonState("idle"), 3000);
  };

  return (
    <Card className="ring-0 p-5 sm:p-6 lg:p-8 gap-6 md:gap-8 border rounded-2xl animate-in fade-in slide-in-from-right-10 duration-1000 delay-100 ease-in-out fill-mode-both">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-semibold text-foreground">
          Fale conosco sobre seu projeto
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Nome"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="h-9 shadow-xs"
                  required
                />
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Sobrenome"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="h-9 shadow-xs"
                  required
                />
              </div>

              <Input
                id="email"
                name="email"
                placeholder="seu@email.com.br"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="h-9 shadow-xs"
                required
              />

              <Select
                value={formData.projectType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, projectType: value ?? "" }))
                }
              >
                <SelectTrigger id="projectType" className="w-full h-9 shadow-xs">
                  {selectedProject ? (
                    <span className="flex items-center gap-2 text-sm">
                      <selectedProject.icon size={15} className="shrink-0 text-muted-foreground" />
                      <span className="truncate">{selectedProject.label}</span>
                    </span>
                  ) : (
                    <SelectValue placeholder="Tipo de projeto" />
                  )}
                </SelectTrigger>
                <SelectContent
                  align="start"
                  position="popper"
                  className=" data-[state=open]:zoom-in-100 duration-400"
                >
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <type.icon size={15} className="shrink-0" />
                      <span className="truncate">{type.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea
                id="message"
                name="message"
                placeholder="Conte-nos sobre seu projeto"
                value={formData.message}
                onChange={handleChange}
                className="h-24 resize-none shadow-xs"
                required
              />

              <div className="flex items-center gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, terms: !!checked }))
                  }
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal text-muted-foreground select-none"
                >
                  Li e concordo com os Termos e Condições
                </Label>
              </div>
            </div>

            <AnimatedButton type="submit" state={buttonState}>
              <IconBrandWhatsapp size={16} />
              Enviar mensagem
            </AnimatedButton>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;