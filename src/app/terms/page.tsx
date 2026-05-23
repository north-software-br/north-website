import type { Metadata } from "next";
import Container from "@/components/container/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso — North Software",
  description: "Leia os termos de uso e serviço da North Software.",
};

const sections = [
  {
    number: "1",
    title: "Termos",
    body: "Ao acessar ao site North Software, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.",
  },
  {
    number: "2",
    title: "Uso de Licença",
    body: `É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site North Software, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:

• modificar ou copiar os materiais;
• usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);
• tentar descompilar ou fazer engenharia reversa de qualquer software contido no site North Software;
• remover quaisquer direitos autorais ou outras notações de propriedade dos materiais;
• transferir os materiais para outra pessoa ou "espelhar" os materiais em qualquer outro servidor.

Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por North Software a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrônico ou impresso.`,
  },
  {
    number: "3",
    title: "Isenção de Responsabilidade",
    body: "Os materiais no site da North Software são fornecidos 'como estão'. North Software não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos. Além disso, o North Software não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.",
  },
  {
    number: "4",
    title: "Limitações",
    body: "Em nenhum caso o North Software ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em North Software, mesmo que North Software ou um representante autorizado da North Software tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos consequentes ou incidentais, essas limitações podem não se aplicar a você.",
  },
  {
    number: "5",
    title: "Precisão dos Materiais",
    body: "Os materiais exibidos no site da North Software podem incluir erros técnicos, tipográficos ou fotográficos. North Software não garante que qualquer material em seu site seja preciso, completo ou atual. North Software pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, North Software não se compromete a atualizar os materiais.",
  },
  {
    number: "6",
    title: "Links",
    body: "O North Software não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por North Software do site. O uso de qualquer site vinculado é por conta e risco do usuário.",
  },
  {
    number: "7",
    title: "Modificações",
    body: "O North Software pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.",
  },
  {
    number: "8",
    title: "Lei Aplicável",
    body: "Estes termos e condições são regidos e interpretados de acordo com as leis do North Software e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.",
  },
];

export default function TermsPage() {
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
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar ao início
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-taruma-400 text-xs font-semibold uppercase tracking-widest">
              Documento legal
            </span>
          </div>

          <h1 className="text-cumaru-50 text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Termos de Uso
          </h1>
          <p className="text-cumaru-400 text-sm">
            Última atualização: maio de 2025
          </p>
        </div>

        {/* Intro */}
        <p className="text-cumaru-300 text-base leading-relaxed mb-16 max-w-3xl">
          Por favor, leia estes termos de serviço com atenção antes de usar o
          site da North Software. Ao acessar ou utilizar nosso site, você
          concorda em ficar vinculado a estes termos.
        </p>

        {/* Sections */}
        <div className="flex flex-col divide-y divide-white/6">
          {sections.map((section) => (
            <div
              key={section.number}
              className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-3 flex items-start gap-4">
                <span className="text-taruma-400/40 text-xs font-mono font-semibold tabular-nums pt-1">
                  {section.number.padStart(2, "0")}
                </span>
                <h2 className="text-cumaru-100 text-base font-semibold">
                  {section.title}
                </h2>
              </div>
              <div className="md:col-span-9">
                <p className="text-cumaru-400 text-sm leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-10 border-t border-white/6">
          <p className="text-cumaru-600 text-xs leading-relaxed max-w-2xl">
            Em caso de dúvidas sobre estes termos, entre em contato conosco
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
