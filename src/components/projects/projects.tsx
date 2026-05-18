"use client";

import { Badge } from "@/components/ui/badge";
import { LampContainer } from "../ui/lamp";
import { motion } from "motion/react";
import { Safari } from "../ui/safari";
import { BackgroundGradient } from "../ui/background-gradient";

type PortfolioData = {
  portfolio_image: string;
  portfolio_title: string;
  portfolio_description: string;
  portfolio_tags: string[];
};

const portfolioData: PortfolioData[] = [
  {
    portfolio_image:
      "https://images.shadcnspace.com/assets/portfolio/flowbank.webp",
    portfolio_title: "Flowbank",
    portfolio_description:
      "Flowbank is a digital banking platform that offers a range of financial services, including savings accounts, loans, and investment options. The platform is designed to provide users with a seamless and intuitive banking experience, with features such as real-time account management, personalized financial insights, and secure transactions.",
    portfolio_tags: ["UX Research", "Interface Design"],
  },
  {
    portfolio_image:
      "https://images.shadcnspace.com/assets/portfolio/academy.webp",
    portfolio_title: "Academy.co",
    portfolio_description:
      "Academy.co is an online learning platform that offers a wide range of courses and educational resources for students and professionals. The platform features a user-friendly interface, personalized learning paths, and interactive content to help users acquire new skills and knowledge in various fields.",
    portfolio_tags: ["Product Design", "Interaction Design"],
  },
  {
    portfolio_image:
      "https://images.shadcnspace.com/assets/portfolio/genome.webp",
    portfolio_title: "Genome",
    portfolio_description:
      "Genome is a health and wellness app that provides users with personalized insights and recommendations based on their genetic data. The app offers features such as DNA analysis, health risk assessments, and lifestyle recommendations to help users make informed decisions about their health and well-being.",
    portfolio_tags: ["Brand identity design", "UX Research"],
  },
];

interface ProjectCardProps {
  item: PortfolioData;
  index: number;
}

const ProjectCard = ({ item, index }: ProjectCardProps) => {
  return (
    <div
      className="sticky top-0 h-[50vh] flex items-center"
      style={{ zIndex: index + 1 }}
    >
      <div className="w-full">
        <div
          className="relative overflow-hidden "
          style={{ maxHeight: "40vh" }}
        >
          <div className="flex flex-row gap-5 ">
            <div className="w-[50%] flex flex-col gap-4 justify-center bg-background">
              {" "}
              <span className="text-4xl font-semibold">
                {item.portfolio_title}
              </span>
              <span className="font-normal text-lg text-negro-200">
                {item.portfolio_description}
              </span>
            </div>

            <div className="w-[50%]">
              <BackgroundGradient className="p-6" bright={false}>
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
    <section className="bg-background mt-32">
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
