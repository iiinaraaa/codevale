# Como contribuir

Obrigado por ajudar o vale a crescer! Todo o conteúdo está em `src/content`, em arquivos TypeScript.

## Regras de conteúdo

1. **Uma ideia nova por lição.** Só avance depois de o conceito anterior estar firme.
2. Explique **pra que serve** antes de mostrar código.
3. Comente o código: use o campo `notes` para explicar as partes importantes.
4. Textos em **português**. Vídeos podem ser em inglês (a interface avisa).
5. Escreva com suas próprias palavras. **Não copie** textos de outros sites: resuma e linke a fonte.

## Criar uma lição de React

Em `src/content/react-lessons.ts`, adicione um objeto à lista `REACT_LESSONS`:

```ts
{
  slug: "meu-slug",          // vira a URL
  title: "Título da lição",
  phase: 3,                  // fase da trilha
  minutes: 10,
  coins: 20,
  why: ["Pra que serve, em linguagem simples."],
  reading: { label: "react.dev: ...", url: "https://react.dev/learn/..." },
  code: { code: `...`, notes: ["Explicação 1", "Explicação 2"] },
  pitfall: "Erro comum que você quer evitar.",
  activity: {
    question: "Pergunta?",
    options: ["A", "B", "C"],
    answer: 1,               // índice da opção certa (começa em 0)
    explain: "Por que essa é a certa.",
  },
}
```

A pergunta "Lembra da aula passada?" é gerada sozinha a partir da atividade da lição anterior, e a mesma atividade entra no sorteio do Desafio do Dragão. Por isso, escreva perguntas que façam sentido sozinhas, sem depender do texto da lição.

## Sugerir um vídeo

Preencha o campo `video` da lição:

```ts
video: {
  youtubeId: "ID_DO_VIDEO",   // a parte depois de v= na URL
  title: "Título do vídeo",
  channel: "Nome do canal",
  channelUrl: "https://www.youtube.com/@canal",
  lang: "en",
}
```

Antes de abrir o PR, confira: o vídeo está no ar, está atualizado, é **bem explicado e adequado para iniciantes**, e o canal permite incorporação. Use sempre o embed oficial e nunca baixe ou re-hospede vídeos. Registre o crédito em `CREDITS.md`.

## Criar uma fase do jogo de Tailwind

Em `src/content/tailwind-phases.ts`, adicione um objeto a `GAME_PHASES`. Cada personagem tem 60x60 px e o campo tem 8 px de margem. Os objetivos (`goals`) são estilos CSS de posição, um por personagem. A fase termina quando todos os personagens ficam em cima dos objetivos, então qualquer combinação de classes que chegue lá vale.

Se a fase usar uma classe nova, ensine-a ao interpretador em `src/lib/tailwind-lite.ts`.

## Criar uma moldura de perfil

Adicione um item em `src/content/frames.ts` e o visual correspondente em `src/app/globals.css` (`.frame[data-f="N"]`).

## Código

- Rode `npm run typecheck` e `npm run build` antes de abrir o PR.
- Mantenha o texto da interface em português e o código em inglês ou português de forma consistente com o arquivo.
- Acessibilidade conta: foco visível, contraste e respeito a `prefers-reduced-motion`.
