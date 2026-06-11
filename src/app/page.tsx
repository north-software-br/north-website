import dynamic from "next/dynamic";
import Hero from "@/components/hero/hero";
import Process from "@/components/process/process";
import Services from "@/components/services/services";

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
