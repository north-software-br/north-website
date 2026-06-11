"use client";

import { motion } from "motion/react";
import { IconRoute } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Highlighter } from "@/components/ui/highlighter";

export function SectionHeader({ className }: { className?: string }) {
  const { ref, isInView } = useScrollReveal({ amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={cn("relative z-10 mx-auto max-w-2xl text-center", className)}
    >
      <h2 className="mt-5 text-3xl font-normal leading-tight text-cumaru-100 lg:text-5xl">
        Como transformamos sua{" "}
        <Highlighter
          action="underline"
          color="#3DAFA6"
          strokeWidth={2}
          animationDuration={800}
          iterations={2}
          padding={2}
          delay={1600}
          isView
        >
          <span className="text-accent">ideia em software</span>
        </Highlighter>
      </h2>
      <p className="mt-5 text-md text-cumaru-400 lg:[@media(max-height:50rem)]:hidden">
        Um processo validado para entregar sistemas escaláveis, seguros e
        alinhados ao seu negócio.
      </p>
    </motion.div>
  );
}
