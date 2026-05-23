import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/projects-page";

export const metadata: Metadata = {
  title: "Projetos — North Software",
  description:
    "Uma seleção de trabalhos que entregamos para nossos clientes. Estratégia, design e desenvolvimento em cada detalhe.",
};

export default function Projects() {
  return <ProjectsPage />;
}
