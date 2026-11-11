import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/hero";
import Process from "@/components/process/process";
import Services from "@/components/services/services";
import { Divisa } from "@/components/section/section";

export const metadata: Metadata = {
  title: "North Software - Sistemas, Apps e Sites sob medida",
  description:
    "Desenvolvemos sistemas para operações internas, aplicativos, sites e automações com IA, sob medida para cada negócio. Construído no Norte, feito para o mundo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "North Software - Sistemas, Apps e Sites sob medida",
    description:
      "Sistemas, aplicativos, sites e automações com IA, sob medida para cada negócio. Construído no Norte, feito para o mundo.",
    url: "https://northsoftware.com.br",
    siteName: "North Software",
    locale: "pt_BR",
    type: "website",
  },
};

// Seções abaixo da dobra: chunks separados, fora do JS inicial
const About = dynamic(() => import("@/components/about/about"));
const Projects = dynamic(() => import("@/components/projects/projects"));
const Contact = dynamic(() => import("@/components/contact/contact"));
const Testimonials = dynamic(() => import("@/components/testimonials/testimonials"));

export default function Home() {
  return (
    <>
      {/* ritmo do encontro das águas: escuro, claro, escuro, claro, escuro */}
      <Hero />
      <Services />
      <Divisa de="negro" para="cumaru" />
      <Process />
      <Divisa de="cumaru" para="fundo" inverter />
      <About />
      <Projects />
      <Divisa de="fundo" para="cumaru" />
      <Testimonials />
      <Divisa de="cumaru" para="fundo" inverter />
      <Contact />
    </>
  );
}
