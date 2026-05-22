"use client";

import { Safari } from "../ui/safari";
import { BackgroundGradient } from "../ui/background-gradient";
import { Highlight } from "../ui/hero-highlight";
import {
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandFigma,
  IconBrandTailwind,
  IconBrandReactNative,
} from "@tabler/icons-react";
type TechStack = {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    stroke?: number;
  }>;
};

type PortfolioData = {
  portfolio_image?: string;
  portfolio_video?: string;
  portfolio_title: string;
  portfolio_description: string;
  portfolio_tags: string[];
  portfolio_tech: TechStack[];
};

const portfolioData: PortfolioData[] = [
  {
    portfolio_video: "/midia/adv-paiva.mp4",
    portfolio_title: "GABRIELA C.O. PAIVA",
    portfolio_description:
      "Website institucional desenvolvido para o escritório Gabriela Paiva, com foco em transmitir credibilidade, profissionalismo e presença digital. O projeto foi pensado para apresentar os serviços jurídicos de forma clara e estratégica, destacando a atuação personalizada, a excelência técnica e o compromisso com soluções inteligentes para cada cliente.",
    portfolio_tags: ["UX Research", "Interface Design"],
    portfolio_tech: [
      { name: "Figma", icon: IconBrandFigma },
      { name: "React", icon: IconBrandReact },
      { name: "Next.js", icon: IconBrandNextjs },
      { name: "TypeScript", icon: IconBrandTypescript },
    ],
  },
  {
    portfolio_video: "/midia/antonelly-site.mp4",
    portfolio_title: "ANTONELLY CONSTRUÇÕES",
    portfolio_description:
      "Desenvolvimento de uma plataforma institucional para a Antonelly Construções e Serviços, criada para representar a solidez de mais de 20 anos de atuação no mercado. A experiência foi estruturada para comunicar a dimensão da empresa, sua expertise nos setores da construção civil e naval, além do compromisso com qualidade, segurança e excelência operacional.",
    portfolio_tags: ["Product Design", "Interaction Design"],
    portfolio_tech: [
      { name: "Figma", icon: IconBrandFigma },
      { name: "React", icon: IconBrandReact },
      { name: "TypeScript", icon: IconBrandTypescript },
      { name: "Tailwind", icon: IconBrandTailwind },
    ],
  },
  {
    portfolio_video: "/midia/office-145.mp4",
    portfolio_title: "OFFICE 145",
    portfolio_description:
      "Website institucional para o edifício Empresarial Office 145, criado para transmitir modernidade, credibilidade e praticidade. O projeto foi pensado para apresentar de forma clara os diferenciais do empreendimento, destacando sua infraestrutura completa, tecnologia, segurança e soluções voltadas para pequenas e médias empresas que buscam um ambiente corporativo funcional e eficiente.",
    portfolio_tags: ["Brand identity design", "UX Research"],
    portfolio_tech: [
      { name: "Figma", icon: IconBrandFigma },
      { name: "React Native", icon: IconBrandReactNative },
      { name: "TypeScript", icon: IconBrandTypescript },
    ],
  },
];

interface ProjectCardProps {
  item: PortfolioData;
  index: number;
}

const ProjectCard = ({ item, index }: ProjectCardProps) => {
  return (
    <div
      className="sticky top-20 flex min-h-svh items-start pt-6 pb-8 md:h-[60vh] md:min-h-0 md:items-center md:py-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="w-full">
        <div className="relative max-h-[calc(100svh-4rem)] overflow-hidden md:max-h-[48vh]">
          <div className="flex flex-col gap-5 md:flex-row md:gap-5">
            <div className="flex w-full flex-col justify-center gap-4 bg-background md:w-1/2 md:pr-10">
              <span className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                {item.portfolio_title}
              </span>
              <span className="line-clamp-5 text-sm font-normal leading-relaxed text-negro-200 sm:line-clamp-none sm:text-base lg:text-lg text-justify">
                {item.portfolio_description}
              </span>
            </div>

            <div className="w-full md:w-1/2">
              <BackgroundGradient className="p-3 sm:p-4 lg:p-6" bright={false}>
                <Safari
                  imageSrc={item.portfolio_image}
                  videoSrc={item.portfolio_video}
                />
              </BackgroundGradient>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="bg-background mt-24 sm:mt-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 ">
        <div className="flex flex-col gap-4 justify-center items-center animate-in fade-in slide-in-from-top-8 duration-700 ease-in-out">
          <div className="max-w-xs sm:max-w-2xl mx-auto text-center flex flex-col gap-5">
            <h2 className="text-foreground text-3xl sm:text-5xl font-semibold">
              Alguns de nossos{" "}
              <Highlight className="from-taruma-200 via-taruma-100 to-cumaru-300 rounded-3xl text-negro-700 dark:from-taruma-500/70 dark:via-taruma-400/60 dark:to-negro-500 dark:text-cumaru-100">
                projetos
              </Highlight>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg font-normal">
              Uma seleção de trabalhos que entregamos para nossos clientes desde
              a estratégia de marca até o design de produtos digitais. Cada
              projeto é uma história de colaboração e criatividade
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
        {portfolioData.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
