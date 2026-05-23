"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Safari } from "../ui/safari";
import { BackgroundGradient } from "../ui/background-gradient";
import Container from "../container/container";
import { portfolioData, PortfolioData } from "@/constants";

type TechStack = {
  name: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    stroke?: number;
  }>;
};

interface ProjectCardProps {
  item: PortfolioData;
  index: number;
}

const ProjectCard = ({ item, index }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        ease: [0.4, 0, 0.2, 1],
        delay: index * 0.1,
      }}
      className="grid grid-cols-1 gap-8 border-b border-border py-12 md:grid-cols-2 md:gap-16 md:py-16"
    >
      {/* Left: info */}
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs text-muted-foreground/50">
            {item.portfolio_year}
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {item.portfolio_title}
        </h2>

        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.portfolio_description}
        </p>
      </div>

      {/* Right: preview */}
      <div>
        <BackgroundGradient className="p-3 sm:p-4 lg:p-3" bright={false}>
          <Safari
            videoSrc={item.portfolio_video}
            imageSrc={item.portfolio_image}
          />
        </BackgroundGradient>
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section className="min-h-screen w-full bg-background mt-20 pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Header */}
      <Container>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-6"
        >
          <div className="flex lg:flex-row flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-4xl xl:text-6xl">
              Nossos projetos
            </h1>

            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Do briefing ao deploy, uma seleção de trabalhos que entregamos
              para nossos clientes. Estratégia, design e desenvolvimento em cada
              detalhe.
            </p>
          </div>
        </motion.div>

        <div className=" py-10 ">
          <div className="border-t border-border" />
        </div>
      </Container>

      {/* Divider */}

      {/* Project list */}
      <section className="mt-5 pb-24 md:pb-32">
        <Container>
          {portfolioData.map((item, index) => (
            <ProjectCard key={item.portfolio_title} item={item} index={index} />
          ))}
        </Container>
      </section>
    </section>
  );
};

export default ProjectsPage;
