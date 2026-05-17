"use client";

import Container from "../container/container";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

export const gridItems = [
  {
    id: 1,
    title: "Transformamos desafios complexos em produtos digitais elegantes",
    description: "Estúdio de produto completo",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full object-contain opacity-30",
    titleClassName: "justify-end",
    img: "/illustrations/01-studio.svg",
    imgWidth: 800,
    spareImg: "",
  },
  {
    id: 2,
    title: "Da descoberta ao lançamento — dominamos todo o ciclo de entrega",
    description: "Sem lacunas. Sem repassos.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "w-full h-full object-contain opacity-30",
    titleClassName: "justify-end",
    img: "/illustrations/02-journey.svg",
    imgWidth: 600,
    spareImg: "",
  },
  {
    id: 3,
    title: "Todos os serviços que seu produto precisa",
    description: "Em um só lugar",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "w-full h-full object-contain opacity-30",
    titleClassName: "justify-end",
    img: "/illustrations/03-modules.svg",
    imgWidth: 600,
    spareImg: "",
  },
  // {
  //   id: 4,
  //   title: "Mais de 50 produtos entregues para empresas brasileiras.",
  //   description: "Histórico comprovado",
  //   className: "lg:col-span-2 md:col-span-3 md:row-span-1",
  //   imgClassName: "w-full h-full object-contain opacity-30",
  //   titleClassName: "justify-end",
  //   img: "/illustrations/04-stack.svg",
  //   spareImg: "",
  // },
  // {
  //   id: 5,
  //   title: "Construído para crescer com o seu negócio desde o primeiro dia",
  //   description: "Arquitetura pronta para escala",
  //   className: "md:col-span-3 md:row-span-2",
  //   imgClassName: "w-full h-full object-contain opacity-30",
  //   titleClassName: "justify-end",
  //   img: "/illustrations/05-scale.svg",
  //   spareImg: "",
  // },
  // {
  //   id: 6,
  //   title: "Pronto para construir algo incrível juntos?",
  //   description: "",
  //   className: "lg:col-span-2 md:col-span-3 md:row-span-1",
  //   imgClassName: "",
  //   titleClassName: "justify-end",
  //   img: "",
  //   spareImg: "",
  // },
];

const Fetaures = () => {
  return (
    <section className="w-full overflow-hidden">
      <Container>
        <BentoGrid className="w-full py-20">
          {gridItems.map((item, i) => (
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
