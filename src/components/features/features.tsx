"use client";

import { GRID_ITEMS } from "@/constants";
import Container from "../container/container";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

const Fetaures = () => {
  return (
    <section className="w-full overflow-hidden">
      <Container>
        <BentoGrid className="w-full py-20">
          {GRID_ITEMS.map((item, i) => (
            <BentoGridItem
              id={item.id}
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
              img={item.img}
              imgWidth={item.imgWidth}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </Container>
    </section>
  );
};

export default Fetaures;
