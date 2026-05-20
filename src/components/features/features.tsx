"use client";

import { GRID_ITEMS } from "@/constants";
import Container from "../container/container";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

const Fetaures = () => {
  return (
    <section className="w-full overflow-hidden">
      <Container>
        <BentoGrid className="w-full py-10">
          {GRID_ITEMS.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgWidth={item.imgWidth}
              imgClassName={item.imgClassName}
              type={item.type}
              terminalCommands={"terminalCommands" in item ? item.terminalCommands : undefined}
              terminalOutputs={"terminalOutputs" in item ? item.terminalOutputs : undefined}
            />
          ))}
        </BentoGrid>
      </Container>
    </section>
  );
};

export default Fetaures;
