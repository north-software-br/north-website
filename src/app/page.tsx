import Hero from "@/components/hero/hero";
import Process from "@/components/process/process";
import About from "@/components/about/about";
import Services from "@/components/services/services";
import Contact from "@/components/contact/contact";
import Projects from "@/components/projects/projects";

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
