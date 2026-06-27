import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/projects-page";

export const metadata: Metadata = {
  title: "Projetos — North Software",
  description:
    "Uma seleção de trabalhos que entregamos para nossos clientes. Estratégia, design e desenvolvimento em cada detalhe.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projetos — North Software",
    description:
      "Uma seleção de trabalhos que entregamos para nossos clientes. Estratégia, design e desenvolvimento em cada detalhe.",
    url: "https://northsoftware.com.br/projects",
    siteName: "North Software",
    locale: "pt_BR",
    type: "website",
  },
};

export default function Projects() {
  return <ProjectsPage />;
}
