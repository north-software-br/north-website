# North Software - site institucional

Site da North Software (software house de Manaus - AM): sistemas para operações internas, aplicativos, sites e automação com IA. Página única com seções + `/projects`, `/terms`, `/privacy`.

- Repositório: https://github.com/north-software-br/north-website (`main` é produção; deploy na Hostinger com Node). Trabalho em branch (`feat/...`); commit/push só quando pedirem.
- Build com webpack (`npm run build` = `next build --webpack`): o Turbopack falha na Hostinger.

## Stack
- Next.js 16 (App Router), React 19, TypeScript 5, Tailwind v4 (tema em `src/app/theme.css` + `globals.css`), shadcn/Radix, `motion`, `@tabler/icons-react`, `three` (esfera do hero), `rough-notation` (Highlighter).
- `npm run lint` (ESLint flat do Next 16, `eslint.config.mjs`) deve passar sem erros nem avisos. Componentes de terceiros mantidos como vieram têm `eslint-disable` com o motivo no comentário.

## Identidade
- Paleta (tokens em `theme.css`): **Negro** (Rio Negro, `negro-50..900`, core `#14304A`), **Tarumã** (encontro das águas, `taruma-*`, core `#3DAFA6`), **Cumaru** (papel quente, `cumaru-*`, core `#F0EDE3`). O site usa o tema escuro (`dark` no `<html>`).
- Fontes: Satoshi (variável, local) em tudo; Geist Mono para rótulos técnicos. Não usar outra fonte de destaque (a serifa itálica foi reprovada).
- Conceito em exploração: **"encontro das águas"** (Negro e Cumaru lado a lado, divisa Tarumã), de forma sutil.

## Conteúdo e contato
- E-mail oficial único: `contato@northsoftware.com.br`. WhatsApp e logos de clientes em `src/constants/index.ts` (`CONTATO`, `whatsappHref`, `CLIENT_LOGOS`), junto com `portfolioData` e `PROCESS_STEPS`.
- Não inventar números, prazos ou resultados. Os números da seção Sobre ("3×", "<1h", "100%") ainda não foram confirmados pelo time.

## Componentes
- Priorizar componentes prontos (Shadcn Space, Magic UI, ReUI, Aceternity, ou os já em `components/ui`) em vez de escrever do zero; adaptar cores e corrigir acessibilidade na cópia do projeto, com comentário "ajuste North". Ex.: `ui/shadcn-space/radix/animations/marquee.tsx` (cópias com `aria-hidden`, parado com movimento reduzido), usado na faixa de logos dos Clientes.

## Regras de interface (aprendidas nos projetos Becca, SA Kaizen e AMPARO)
- Um único `h1` por página.
- Animações: entrada em CSS quando possível (`.subir` em `globals.css`), `motion` só com `transform`/`opacity`, nada de conteúdo escondido no HTML esperando JS em seções novas, respeitar `prefers-reduced-motion`. Entrada ao rolar das seções novas: classe `.revelar` (CSS `animation-timeline: view()`, sem JS).
- Alvos de toque com pelo menos 24px. Sem `text-justify`.
- Verificar antes de entregar: `npm run lint`, `npm run build`, Chrome headless via CDP sem rolagem horizontal de 320 a 2560px e CLS perto de 0.

## Home (ordem e ritmo do "encontro das águas")
Hero (escuro) > Serviços (escuro) > divisa > Processo (claro, Cumaru) > divisa > Sobre (Negro-900) > Projetos > divisa > Clientes (claro) > divisa > Contato > rodapé. `Divisa` e `SectionHead`/`Acento` em `components/section/section.tsx` (cabeçalho com índice "01 · Serviços" em mono, título bold com a "outra água" em Tarumã; em fundo claro usar `claro`, que troca para Negro e Tarumã escuro por contraste).
- **Hero** (`hero/hero.tsx`, aprovado, não mexer sem pedido): tipografia do hero original ("Construímos o que o seu negócio precisa." com Highlighter, "North Software" + Sistemas/Web/Mobile com a varredura), frase de apoio, botões WhatsApp e Ver projetos, esfera atual (`displacement-sphere.tsx`, sem mudanças) e feixe de luz (`ui/spotlight-new.tsx`, adaptado da Aceternity).
- **Serviços** (`services/services.tsx`): lista à esquerda e palco à direita (diagrama animado do serviço, entregas, tecnologias, CTA para o WhatsApp com o serviço). No celular o painel abre no item. Só o diagrama ativo é renderizado; textos empilhados na mesma célula (altura estável). Substituiu a grade de cartões e o modal.
- **Processo** (`process/process.tsx`): etapas em cartões compactos num trilho Tarumã que preenche ao rolar (mouse/foco também selecionam a etapa); no desktop, painel escuro fixo à esquerda (altura 25rem) com `_components/produto-evoluindo.tsx`: a mesma tela de sistema se constrói etapa a etapa (notas da descoberta, wireframe, componentes com o nome, ✓ dos testes, navegador "No ar", módulo novo v1.3). Opção escolhida entre três; sem números inventados nem nomes de clientes.
- **Sobre** (`about/about.tsx`): marca N animada (`hero/logo-north.tsx`, a entrada espera aparecer na tela), origem das cores e os 4 diferenciais, sem números de impacto.
- **Projetos** (`projects/projects.tsx` + `projeto-card.tsx`, também em `/projects`): janela de navegador com capa (`public/projetos/*.webp`, primeiro quadro de cada vídeo) e vídeo que só carrega/toca no hover (mouse) ou quando bem visível (toque/destaque). Dados em `portfolioData` (`portfolio_name`, `portfolio_type`, `portfolio_poster`).
- **Clientes** (`testimonials/testimonials.tsx`): logos (em fundo claro ficam escuros; `solido` para selos coloridos) e depoimentos reais ao lado da tela do projeto, troca a cada 7s com pausa no hover/foco.
- **Contato** (`contact/contact.tsx`): WhatsApp e e-mail como ações grandes + formulário (monta a mensagem e abre o WhatsApp).
- Menu marca a seção em foco (`navbar.tsx` > `useSecaoAtiva`, `NavItems active`).

## Pendências conhecidas
- Navbar (`ui/resizable-navbar.tsx`) anima largura/margem ao rolar e gera um CLS pequeno (~0,005).
- Vídeos dos projetos (~4,5 MB cada) vêm do jsDelivr apontando para a `main`: arquivos novos só funcionam depois do merge.
