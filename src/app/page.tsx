import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/hero";
import Process from "@/components/process/process";
import Services from "@/components/services/services";

export const metadata: Metadata = {
  title: "North Software — Sistemas, Apps e Sites sob medida",
  description:
    "Software house do Norte do Brasil especializada em sistemas para operações internas, aplicativos mobile, sites de alta conversão e automação com IA. Construído no Norte. Feito para o mundo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "North Software — Sistemas, Apps e Sites sob medida",
    description:
      "Software house do Norte do Brasil especializada em sistemas para operações internas, aplicativos mobile, sites de alta conversão e automação com IA.",
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

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
