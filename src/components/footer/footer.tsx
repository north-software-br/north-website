// Rodapé baseado no bloco "footer-12" do Shadcn Space (marca e frase à esquerda, colunas de links, barra legal),
// adaptado: entrada em CSS (.revelar) em vez de motion com conteúdo invisível, sem repetir os contatos (estão na
// seção logo acima) e fechando com a palavra North grande saindo pela base, na diagonal Tarumã do "N".
import Image from "next/image";
import Link from "next/link";
import { NORTH_FULL_LOGO } from "../../../public";
import Container from "../container/container";

const colunas = [
  [
    { title: "Serviços", href: "/#services" },
    { title: "Processo", href: "/#process" },
    { title: "Sobre", href: "/#about" },
  ],
  [
    { title: "Projetos", href: "/#projects" },
    { title: "Clientes", href: "/#clientes" },
    { title: "Contato", href: "/#contact" },
  ],
  [
    { title: "LinkedIn", href: "https://www.linkedin.com/company/north-software", externo: true },
    { title: "Termos de uso", href: "/terms" },
    { title: "Política de privacidade", href: "/privacy" },
  ],
];

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/6 bg-negro-900">
      <Container>
        <div className="flex flex-col gap-12 pt-16 pb-8 lg:flex-row lg:items-start lg:pt-20">
          <div className="revelar flex flex-col gap-4 lg:flex-1">
            <Link href="/" aria-label="North Software, início" className="w-fit">
              <Image src={NORTH_FULL_LOGO} width={200} height={60} alt="North Software" className="h-auto w-32" />
            </Link>
            <p className="max-w-xs text-cumaru-400">Construído no Norte, feito para o mundo.</p>
          </div>

          <nav aria-label="Rodapé" className="revelar grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:flex lg:gap-16 max-sm:[&>ul:last-child]:col-span-2">
            {colunas.map((coluna) => (
              <ul key={coluna[0].title} className="flex flex-col lg:w-40 lg:gap-1">
                {coluna.map((l) => (
                  <li key={l.title}>
                    <a
                      href={l.href}
                      {...("externo" in l ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-block py-2.5 text-cumaru-300 lg:py-1.5 transition-[color,translate] duration-200 hover:translate-x-1 hover:text-taruma-300 motion-reduce:hover:translate-x-0"
                    >
                      {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/6 py-6 text-sm text-cumaru-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {ano} North Software. Todos os direitos reservados.</p>
          <p>Sistemas, aplicativos, sites e automações com IA.</p>
        </div>
      </Container>

      {/* a palavra da marca saindo pela base (decorativa) */}
      <p aria-hidden className="pointer-events-none -mb-[0.22em] text-center text-[clamp(5rem,22vw,20rem)] leading-none font-bold tracking-[-0.06em] text-transparent select-none [-webkit-text-stroke:1px_rgba(61,175,166,.28)]">
        North
      </p>
    </footer>
  );
}
