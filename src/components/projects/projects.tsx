"use client";

import { Safari } from "../ui/safari";
import { BackgroundGradient } from "../ui/background-gradient";
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
  portfolio_image: string;
  portfolio_title: string;
  portfolio_description: string;
  portfolio_tags: string[];
  portfolio_tech: TechStack[];
};

const portfolioData: PortfolioData[] = [
  {
    portfolio_image:
      "https://images.shadcnspace.com/assets/portfolio/flowbank.webp",
    portfolio_title: "Flowbank",
    portfolio_description:
      "Flowbank is a digital banking platform that offers a range of financial services, including savings accounts, loans, and investment options. The platform is designed to provide users with a seamless and intuitive banking experience, with features such as real-time account management, personalized financial insights, and secure transactions.",
    portfolio_tags: ["UX Research", "Interface Design"],
    portfolio_tech: [
      { name: "Figma", icon: IconBrandFigma },
      { name: "React", icon: IconBrandReact },
      { name: "Next.js", icon: IconBrandNextjs },
      { name: "TypeScript", icon: IconBrandTypescript },
    ],
  },
  {
    portfolio_image:
      "https://images.shadcnspace.com/assets/portfolio/academy.webp",
    portfolio_title: "Academy.co",
    portfolio_description:
      "Academy.co is an online learning platform that offers a wide range of courses and educational resources for students and professionals. The platform features a user-friendly interface, personalized learning paths, and interactive content to help users acquire new skills and knowledge in various fields.",
    portfolio_tags: ["Product Design", "Interaction Design"],
    portfolio_tech: [
      { name: "Figma", icon: IconBrandFigma },
      { name: "React", icon: IconBrandReact },
      { name: "TypeScript", icon: IconBrandTypescript },
      { name: "Tailwind", icon: IconBrandTailwind },
    ],
  },
  {
    portfolio_image:
      "https://images.shadcnspace.com/assets/portfolio/genome.webp",
    portfolio_title: "Genome",
    portfolio_description:
      "Genome is a health and wellness app that provides users with personalized insights and recommendations based on their genetic data. The app offers features such as DNA analysis, health risk assessments, and lifestyle recommendations to help users make informed decisions about their health and well-being.",
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
            <div className="flex w-full flex-col justify-center gap-4 bg-background md:w-1/2">
              <span className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                {item.portfolio_title}
              </span>
              <span className="line-clamp-5 text-sm font-normal leading-relaxed text-negro-200 sm:line-clamp-none sm:text-base lg:text-lg">
                {item.portfolio_description}
              </span>
            </div>

            <div className="w-full md:w-1/2">
              <BackgroundGradient className="p-3 sm:p-4 lg:p-6" bright={false}>
                <Safari imageSrc={item.portfolio_image} />
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
              Alguns de nossos <span className="text-accent">projetos</span>
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
