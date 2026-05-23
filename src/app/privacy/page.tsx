import type { Metadata } from "next";
import Container from "@/components/container/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — North Software",
  description: "Leia a política de privacidade da North Software.",
};

const principles = [
  {
    body: "Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.",
  },
  {
    body: "Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.",
  },
  {
    body: "Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.",
  },
  {
    body: "O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.",
  },
  {
    body: "Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.",
  },
  {
    body: "O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco.",
  },
];

const commitments = [
  "Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública.",
  "Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos.",
  "Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do North Software, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.",
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-negro-900 pt-32 pb-24">
      <Container>
        {/* Header */}
        <div className="mb-16 border-b border-white/6 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cumaru-500 text-sm hover:text-taruma-400 transition-colors duration-200 mb-8"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="size-4"
            >
              <path
                d="M10 12L6 8l4-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar ao início
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-taruma-400 text-xs font-semibold uppercase tracking-widest">
              Documento legal
            </span>
          </div>

          <h1 className="text-cumaru-50 text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Política de Privacidade
          </h1>
          <p className="text-cumaru-400 text-sm">
            Efetiva a partir de 23 de maio de 2026
          </p>
        </div>

        {/* Intro */}
        <div className="mb-16 max-w-3xl">
          <p className="text-cumaru-300 text-base leading-relaxed">
            A sua privacidade é importante para nós. É política do North
            Software respeitar a sua privacidade em relação a qualquer
            informação sua que possamos coletar no site North Software, e outros
            sites que possuímos e operamos.
          </p>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <div className="flex flex-col divide-y divide-white/6">
            {principles.map((item, index) => (
              <div key={index} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-1 flex items-start">
                  <span className="text-taruma-400/40 text-xs font-mono font-semibold tabular-nums pt-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-11">
                  <p className="text-cumaru-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment section */}
        <div className="border border-white/6 rounded-2xl p-8 md:p-10 mb-16">
          <h2 className="text-cumaru-100 text-xl font-semibold mb-2">
            Compromisso do Usuário
          </h2>
          <p className="text-cumaru-400 text-sm leading-relaxed mb-8">
            O usuário se compromete a fazer uso adequado dos conteúdos e da
            informação que o North Software oferece no site e, com caráter
            enunciativo mas não limitativo:
          </p>
          <ul className="flex flex-col gap-5">
            {commitments.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="mt-0.5 flex-shrink-0 flex size-5 items-center justify-center rounded-full border border-taruma-400/30 text-taruma-400 text-xs font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>
                <p className="text-cumaru-400 text-sm leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* More info */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-cumaru-100 text-xl font-semibold mb-4">
            Mais Informações
          </h2>
          <p className="text-cumaru-400 text-sm leading-relaxed">
            Esperemos que esteja esclarecido e, como mencionado anteriormente,
            se houver algo que você não tem certeza se precisa ou não,
            geralmente é mais seguro deixar os cookies ativados, caso interaja
            com um dos recursos que você usa em nosso site.
          </p>
        </div>

        {/* Footer note */}
        <div className="pt-10 border-t border-white/6">
          <p className="text-cumaru-600 text-xs leading-relaxed max-w-2xl">
            Em caso de dúvidas sobre esta política, entre em contato conosco
            através do e-mail{" "}
            <a
              href="mailto:contato@northsoftware.com.br"
              className="text-cumaru-400 hover:text-taruma-400 transition-colors duration-200"
            >
              contato@northsoftware.com.br
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
