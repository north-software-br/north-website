import {
  IconSearch,
  IconBrandFigma,
  IconCode,
  IconShieldCheck,
  IconCloudUpload,
  IconTrendingUp,
} from "@tabler/icons-react";

export type PortfolioData = {
  portfolio_image?: string;
  portfolio_video?: string;
  portfolio_title: string;
  portfolio_description: string;
  portfolio_year?: string;
};

export const portfolioData: PortfolioData[] = [
  {
    portfolio_video:
      "https://cdn.jsdelivr.net/gh/north-software-br/north-website@main/public/midia/adv-paiva.mp4",
    portfolio_title: "GABRIELA C.O. PAIVA",
    portfolio_description:
      "Website institucional desenvolvido para o escritório Gabriela Paiva, com foco em transmitir credibilidade, profissionalismo e presença digital. O projeto foi pensado para apresentar os serviços jurídicos de forma clara e estratégica, destacando a atuação personalizada, a excelência técnica e o compromisso com soluções inteligentes para cada cliente.",
  },
  {
    portfolio_video:
      "https://cdn.jsdelivr.net/gh/north-software-br/north-website@main/public/midia/antonelly-site.mp4",
    portfolio_title: "ANTONELLY CONSTRUÇÕES",
    portfolio_description:
      "Desenvolvimento de uma plataforma institucional para a Antonelly Construções e Serviços, criada para representar a solidez de mais de 20 anos de atuação no mercado. A experiência foi estruturada para comunicar a dimensão da empresa, sua expertise nos setores da construção civil e naval, além do compromisso com qualidade, segurança e excelência operacional.",
  },

  {
    portfolio_video:
      "https://cdn.jsdelivr.net/gh/north-software-br/north-website@main/public/midia/matupi.mp4",
    portfolio_title: "GRUPO MATUPI",
    portfolio_description:
      "A Matupi nasceu com um propósito claro: valorizar as raízes amazônicas e transformar o melhor da produção local em produtos que carregam identidade, qualidade e afeto. No coração da floresta, entre saberes tradicionais e inovação, construímos uma marca com os pés firmes no chão vermelho e os olhos voltados para o futuro. O website institucional foi desenvolvido para traduzir essa essência, comunicando a origem familiar, o cuidado em cada etapa da produção e o compromisso com quem coloca Matupi na mesa.",
  },
  {
    portfolio_video:
      "https://cdn.jsdelivr.net/gh/north-software-br/north-website@main/public/midia/mimp.mp4",
    portfolio_title: "MIMP",
    portfolio_description:
      "A MIMP é referência em consultoria de propriedade intelectual, atuando na proteção de marcas, identidades e criações no mercado. Desenvolvemos o website institucional da empresa para traduzir a seriedade e a expertise do escritório apresentando seus serviços de registro de marca e direito autoral de forma clara, acessível e estratégica para quem busca proteger o que construiu.",
  },
  {
    portfolio_video:
      "https://cdn.jsdelivr.net/gh/north-software-br/north-website@main/public/midia/office-145.mp4",
    portfolio_title: "OFFICE 145",
    portfolio_description:
      "Website institucional para o edifício Empresarial Office 145, criado para transmitir modernidade, credibilidade e praticidade. O projeto foi pensado para apresentar de forma clara os diferenciais do empreendimento, destacando sua infraestrutura completa, tecnologia, segurança e soluções voltadas para pequenas e médias empresas que buscam um ambiente corporativo funcional e eficiente.",
  },
];

export type StepMediaKind =
  | "discovery"
  | "design"
  | "dev"
  | "quality"
  | "deploy"
  | "evolution";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  Icon: React.ElementType;
  media: StepMediaKind;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Descoberta e Planejamento",
    description:
      "Mergulhamos no seu negócio para entender objetivos, mapear requisitos e definir a arquitetura ideal antes de qualquer linha de código.",
    deliverables: [
      "Levantamento de requisitos",
      "Entendimento do negócio",
      "Definição de escopo",
      "Arquitetura inicial",
    ],
    Icon: IconSearch,
    media: "discovery",
  },
  {
    number: "02",
    title: "Design e Prototipação",
    description:
      "Você visualiza e aprova o produto antes do desenvolvimento começar — sem surpresas, sem retrabalho.",
    deliverables: [
      "Wireframes",
      "UX/UI",
      "Validação antes do desenvolvimento",
      "Aprovação visual",
    ],
    Icon: IconBrandFigma,
    media: "design",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construímos seu sistema em ciclos curtos, com entregas frequentes para você acompanhar a evolução de perto.",
    deliverables: [
      "Frontend e Backend",
      "Integrações",
      "APIs",
      "Banco de dados",
    ],
    Icon: IconCode,
    media: "dev",
  },
  {
    number: "04",
    title: "Testes e Qualidade",
    description:
      "Cada funcionalidade passa por testes rigorosos de funcionamento, performance e segurança antes de chegar até você.",
    deliverables: [
      "Testes funcionais",
      "Correção de bugs",
      "Performance",
      "Segurança",
    ],
    Icon: IconShieldCheck,
    media: "quality",
  },
  {
    number: "05",
    title: "Implantação",
    description:
      "Colocamos seu sistema no ar com infraestrutura configurada, monitoramento ativo e backups automatizados.",
    deliverables: [
      "Deploy em produção",
      "Configuração de servidores",
      "Monitoramento",
      "Backup",
    ],
    Icon: IconCloudUpload,
    media: "deploy",
  },
  {
    number: "06",
    title: "Evolução Contínua",
    description:
      "O lançamento é só o começo: seguimos ao seu lado evoluindo o produto conforme seu negócio cresce.",
    deliverables: [
      "Novas funcionalidades",
      "Melhorias",
      "Suporte",
      "Crescimento do produto",
    ],
    Icon: IconTrendingUp,
    media: "evolution",
  },
];
