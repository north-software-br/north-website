import type { Metadata } from "next";
import { IMAGEM_OG } from "@/constants";
import ProjectsPage from "@/components/projects/projects-page";

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Uma seleção de trabalhos que entregamos para nossos clientes. Estratégia, design e desenvolvimento em cada detalhe.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projetos - North Software",
    description:
      "Uma seleção de trabalhos que entregamos para nossos clientes. Estratégia, design e desenvolvimento em cada detalhe.",
    url: "https://northsoftware.com.br/projects",
    siteName: "North Software",
    locale: "pt_BR",
    type: "website",
    images: [IMAGEM_OG],
  },
};

export default function Projects() {
  return <ProjectsPage />;
}
