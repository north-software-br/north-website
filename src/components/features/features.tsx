"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { GRID_ITEMS } from "@/constants";
import Container from "../container/container";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

const Fetaures = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="features" className="w-full overflow-hidden">
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <BentoGrid className="w-full py-10">
            {GRID_ITEMS.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                className={item.className}
                img={item.img}
                secondImg={"secondImg" in item ? item.secondImg : undefined}
                imgWidth={item.imgWidth}
                imgClassName={item.imgClassName}
                type={item.type}
                terminalCommands={"terminalCommands" in item ? item.terminalCommands : undefined}
                terminalOutputs={"terminalOutputs" in item ? item.terminalOutputs : undefined}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </Container>
    </section>
  );
};

export default Fetaures;
