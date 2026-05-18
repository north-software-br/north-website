import { Timer, Zap, Plug, ShieldOff } from "lucide-react";
import Container from "../container/container";

const highlights = [
  "Sistemas que rodam",
  "Integrações que economizam horas",
  "Análises que mudam decisões",
];

export default function About() {
  return (
    <section id="about" className="relative w-full py-42 bg-negro-900">
      {/* Hero → About: fade negro-800 → negro-900 */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-negro-800 to-transparent pointer-events-none z-0"
      />
      {/* About → Features: fade negro-900 → negro-800 */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-negro-800 pointer-events-none z-0"
      />

      <Container>
        <div className="relative z-10 flex flex-col gap-10">
          {/* Label */}

          {/* Opening pull quote */}

          <h2 className="mt-6 text-3xl lg:text-5xl text-center font-bold leading-tight tracking-tight text-cumaru-200">
            <span className="text-accent ">Quem</span> somos nós?
          </h2>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 text-cumaru-400 text-base leading-relaxed">
            <div className="flex flex-col gap-8 text-xl">
              <div className="flex flex-col gap-3">
                <Timer className="text-accent" size={24} />
                <p>
                  No centro de uma das maiores reservas de complexidade do
                  planeta, aprendemos uma coisa simples:{" "}
                  <strong className="text-cumaru-200 font-medium">
                    sistema bom é o que dura.
                  </strong>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Zap className="text-accent" size={24} />
                <p>
                  Tecnologia útil é a que diminui o ruído — não a que adiciona
                  mais. É a que faz o caixa fechar, a nota sair, o cliente ser
                  atendido na terça às nove da manhã.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8 text-xl">
              <div className="flex flex-col gap-3">
                <Plug className="text-accent" size={24} />
                <p>
                  A North Software existe para ocupar um vazio: o espaço entre o
                  discurso da transformação digital e a realidade de quem
                  precisa que o ERP fale com a planilha.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <ShieldOff className="text-accent" size={24} />
                <p>
                  Sem promessas infladas. Sem dashboards que ninguém abre. Sem
                  inteligência artificial vendida como milagre.
                </p>
              </div>
            </div>
          </div>

          {/* What we do */}
          <ul className="mt-14 flex flex-col sm:flex-row gap-4">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex-1 flex items-center gap-3 rounded-2xl border border-white/8 bg-negro-800/60 px-6 py-5"
              >
                <span className="size-1.5 rounded-full bg-taruma-400 shrink-0" />
                <span className="text-cumaru-200 text-sm font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
