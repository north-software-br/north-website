"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Safari } from "../ui/safari";
import { BackgroundGradient } from "../ui/background-gradient";
import { Highlight } from "../ui/hero-highlight";
import { IconArrowUpRight } from "@tabler/icons-react";
import { portfolioData, PortfolioData } from "@/constants";
import Container from "../container/container";

interface ProjectCardProps {
  item: PortfolioData;
  index: number;
}

const ProjectCard = ({ item, index }: ProjectCardProps) => {
  return (
    <div
      className="sticky top-20 flex items-start pt-6 pb-8 md:h-[60vh] md:min-h-0 md:items-center md:py-0"
      style={{ zIndex: index + 1 }}
    >
      <div className="w-full">
        <div className="relative max-h-[calc(100svh-4rem)] overflow-hidden md:max-h-[48vh]">
          <div className="flex flex-col gap-5 md:flex-row md:gap-5 sm:bg-transparent bg-background p-2">
            <div className="flex w-full flex-col justify-center gap-4 bg-background md:w-1/2 md:pr-10">
              <span className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                {item.portfolio_title}
              </span>
              <span className="line-clamp-5 text-sm font-normal leading-relaxed text-negro-200 sm:line-clamp-none sm:text-base lg:text-lg text-justify">
                {item.portfolio_description}
              </span>
            </div>

            <div className="w-full md:w-1/2">
              <BackgroundGradient className="p-3 sm:p-4 lg:p-3" bright={false}>
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
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section id="projects" className="bg-background mt-24 sm:mt-32">
      <Container>
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-4 justify-center items-center"
        >
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
        </motion.div>

        {portfolioData.slice(0, 3).map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}

        <div className="w-full flex justify-end items-center mt-6">
          <a
            href="/projects"
            className="group/btn relative flex h-10 w-fit cursor-pointer items-center overflow-hidden rounded-full border border-white/10 bg-negro-700 ps-5 pe-12 text-sm font-medium text-cumaru-200 transition-all duration-500 hover:ps-12 hover:pe-5"
          >
            <span className="relative z-10 whitespace-nowrap transition-all duration-500">
              Ver todos os projetos
            </span>
            <div className="absolute right-1 flex size-8 items-center justify-center rounded-full bg-taruma-400 text-negro-900 transition-all duration-500 group-hover/btn:right-[calc(100%-36px)]">
              <IconArrowUpRight className="size-3.5" />
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Projects;
