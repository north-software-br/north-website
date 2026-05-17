import Hero from "@/components/hero/hero";
import Fetaures from "@/components/features/features";
import About from "@/components/about/about";
import Clients from "@/components/clients/clients";
import Contact from "@/components/contact/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Clients />
      <Fetaures />
      <Contact />
    </>
  );
}
