"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Container from "../container/container";
import { Separator } from "@/components/ui/separator";
import ContactForm from "./contact-form";
import { Marquee } from "../ui/shadcn-space/radix/animations/marquee";

const contactDetails = [
  {
    label: "Telefone",
    value: "+55 (92) 99525-1477",
    href: "https://wa.me/5592995251477",
  },
  {
    label: "Email",
    value: "comercial@northsoftware.com.br",
    href: "mailto:comercial@northsoftware.com.br",
  },
];

const brandList = [
  {
    image: "/logos/logos_clients/logo_antonelly.svg",
    name: "Antonelly",
    scale: 1.2,
  },
  {
    image: "/logos/logos_clients/logo_elp.svg",
    name: "ELP",
    scale: 3.4,
  },
  {
    image: "/logos/logos_clients/logo_co_paiva.svg",
    name: "Co Paiva",
    scale: 3.5,
  },
  {
    image: "/logos/logos_clients/logo_vdl.svg",
    name: "VDL",
    scale: 1,
  },
];

export default function Contact() {
  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true, amount: 0.15 });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, amount: 0.15 });

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-32 bg-negro-900"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-negro-800 to-transparent pointer-events-none z-0"
      />

      <Container>
        <div className="relative z-10 grid grid-cols-12 items-start gap-y-12 md:gap-8">
          {/* Info side */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: -32 }}
            animate={infoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="col-span-12 md:col-span-6 flex flex-col gap-10 min-w-0"
          >
            <div className="flex flex-col gap-6">
              <div className="flex gap-3 items-center">
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-cumaru-200">
                Pronto para levar seu projeto ao{" "}
                <span className="text-accent">próximo nível?</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-8">
              {contactDetails.map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-1">
                  <p className="text-sm text-cumaru-400">{label}</p>
                  <a
                    href={href}
                    className="text-base font-medium text-cumaru-200 hover:text-taruma-400 transition-colors duration-200"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm text-cumaru-400">Localização</p>
              <p className="text-base font-medium text-cumaru-200">
                Amazonas, Brasil
              </p>
            </div>

            <Separator className="opacity-10" />

            <div className="flex flex-col gap-6">
              <p className="text-sm text-cumaru-400">
                Empresas que confiam em nós
              </p>
              <Marquee className="[--duration:20s] [--gap:1.5rem] p-0">
                {brandList.map((brand) => (
                  <div
                    key={brand.name}
                    className="flex h-16 w-40 shrink-0 items-center justify-center overflow-hidden p-2"
                  >
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={160}
                      height={64}
                      unoptimized
                      className="h-full w-full object-contain grayscale opacity-70 transition-transform duration-300 hover:grayscale-0 hover:opacity-100"
                      style={{ transform: `scale(${brand.scale})` }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="col-span-1 hidden md:block" />

          {/* Form side */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 32 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="col-span-12 md:col-span-5 min-w-0"
          >
            <ContactForm />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
