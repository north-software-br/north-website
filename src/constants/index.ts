export const GRID_ITEMS = [
  {
    id: 1,
    type: "large" as const,
    title: "Sistemas integrados sob medida",
    description: "Velocidade sem atalhos",
    className:
      "col-span-1 md:col-span-3 min-h-[400px] sm:min-h-[360px] lg:min-h-[320px]",
    imgClassName: "object-contain h-full opacity-90",
    img: "/illustrations/LOGIN-SIAN-PRINT.png",
    secondImg: "/illustrations/SIAN-PRINT.png",
    imgWidth: 600,
  },
  {
    id: 2,
    type: "terminal" as const,
    title: "Do briefing ao deploy, você acompanha cada etapa",
    description: "Processos transparentes",
    className: "col-span-1 min-h-[280px]",
    imgClassName: "",
    img: "",
    imgWidth: 0,
    terminalCommands: [
      "git clone north/seu-projeto",
      "npm run dev",
      "git commit -m 'feat: nova funcionalidade'",
      "npm run deploy --env=production",
    ],
    terminalOutputs: {
      0: ["✔ Repositório clonado com sucesso."],
      1: ["✔ Servidor rodando em localhost:3000"],
      2: ["✔ Commit criado. Branch atualizada."],
      3: [
        "✔ Build concluído.",
        "✔ Deploy realizado com sucesso.",
        "🚀 Projeto no ar!",
      ],
    },
  },
  {
    id: 3,
    type: "beam" as const,
    title: "Arquitetura que escala conforme seu negócio cresce",
    description: "Qualidade de verdade",
    className: "col-span-1 min-h-[280px]",
    imgClassName: "",
    img: "",
    imgWidth: 0,
  },
  {
    id: 4,
    type: "small" as const,
    title: "Sem intermediários, você fala direto com quem constrói",
    description: "Comunicação direta",
    className: "col-span-1 min-h-[280px]",
    imgClassName: "opacity-80",
    img: "/illustrations/06-direct.svg",
    imgWidth: 600,
  },
];

export type PortfolioData = {
  portfolio_image?: string;
  portfolio_video?: string;
  portfolio_title: string;
  portfolio_description: string;
  portfolio_year?: string;
};

export const portfolioData: PortfolioData[] = [
  {
    portfolio_video: "/midia/adv-paiva.mp4",
    portfolio_title: "GABRIELA C.O. PAIVA",
    portfolio_description:
      "Website institucional desenvolvido para o escritório Gabriela Paiva, com foco em transmitir credibilidade, profissionalismo e presença digital. O projeto foi pensado para apresentar os serviços jurídicos de forma clara e estratégica, destacando a atuação personalizada, a excelência técnica e o compromisso com soluções inteligentes para cada cliente.",

    portfolio_year: "2024",
  },
  {
    portfolio_video: "/midia/antonelly-site.mp4",
    portfolio_title: "ANTONELLY CONSTRUÇÕES",
    portfolio_description:
      "Desenvolvimento de uma plataforma institucional para a Antonelly Construções e Serviços, criada para representar a solidez de mais de 20 anos de atuação no mercado. A experiência foi estruturada para comunicar a dimensão da empresa, sua expertise nos setores da construção civil e naval, além do compromisso com qualidade, segurança e excelência operacional.",

    portfolio_year: "2024",
  },

  {
    portfolio_video: "/midia/matupi.mp4",
    portfolio_title: "GRUPO MATUPI",
    portfolio_description:
      "A Matupi nasceu com um propósito claro: valorizar as raízes amazônicas e transformar o melhor da produção local em produtos que carregam identidade, qualidade e afeto. No coração da floresta, entre saberes tradicionais e inovação, construímos uma marca com os pés firmes no chão vermelho e os olhos voltados para o futuro. O website institucional foi desenvolvido para traduzir essa essência, comunicando a origem familiar, o cuidado em cada etapa da produção e o compromisso com quem coloca Matupi na mesa.",

    portfolio_year: "2024",
  },
  {
    portfolio_video: "/midia/mimp.mp4",
    portfolio_title: "MIMP",
    portfolio_description:
      "A MIMP é referência em consultoria de propriedade intelectual, atuando na proteção de marcas, identidades e criações no mercado. Desenvolvemos o website institucional da empresa para traduzir a seriedade e a expertise do escritório apresentando seus serviços de registro de marca e direito autoral de forma clara, acessível e estratégica para quem busca proteger o que construiu.",
    portfolio_year: "2024",
  },
];
