# Codevale

Plataforma **open source** para estudar **React, Next.js, TypeScript e Tailwind CSS**, com trilhas, vídeos curados (com crédito), explicações em português, atividades, pomodoro e um visual pixel art:

- **Farm** (tema claro): cottagecore, inspirado em jogos de fazenda
- **Night City** (tema escuro): cyberpunk com neon

O título da aba muda conforme o que você estuda (`Codevale > Aprendendo React > useState`) e mostra o tempo do pomodoro.

## O que já existe (MVP)

- Mapa do vale com as 5 trilhas
- **Trilha de React** (iniciante): 9 lições com "pra que serve", código explicado, armadilhas e atividade
- **Oficina Tailwind**: jogo estilo Flexbox Froggy, com 4 fases, dicas em 3 níveis e "ver CSS gerado"
- **Desafio do Dragão**: perguntas sobre o que você estudou, cada acerto é um golpe até derrotar o dragão
- **Pomodoro** fixo no canto: arrastável, minimizável e salvo entre visitas
- Moedinhas, níveis, dias estudados (que nunca zeram) e planta/prédio que cresce por trilha
- Perfil com molduras (compra por nível e moedinhas, ou por conquista)
- Tudo salvo no navegador (`localStorage`). Sem login e sem servidor por enquanto.

## Como rodar

Requisitos: Node.js 20 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Outros comandos: `npm run build`, `npm run start`, `npm run typecheck`.

## Estrutura

```
src/
  app/            páginas (App Router)
  components/     interface (mapa, lição, jogo, pomodoro, perfil)
  content/        CONTEÚDO: trilhas, lições, fases do jogo, molduras, pixel arts
  lib/            progresso, tema, pomodoro, estatísticas
```

O conteúdo vive em arquivos TypeScript dentro de `src/content`, então qualquer pessoa pode contribuir com um Pull Request. Veja o [CONTRIBUTING.md](CONTRIBUTING.md).

## Roadmap

- [ ] Vídeos curados nas lições de React (campo `video`)
- [ ] Mini-trilha "JS para React"
- [ ] Trilha de TypeScript (tradutor JS → TS e limpeza de código)
- [ ] Trilha de Next.js
- [ ] Mais fases no jogo de Tailwind (grid, responsividade, estados)
- [ ] Conteúdo em MDX, flashcards com revisão espaçada e glossário
- [ ] Foto de perfil (upload com efeito pixel) e login
- [ ] Testes automatizados

## Créditos e licenças

- Código: [MIT](LICENSE)
- Conteúdo original (textos das lições): sugerimos CC BY-SA 4.0, defina antes de publicar
- Vídeos e leituras são de terceiros: usamos só o embed oficial e sempre creditamos. Veja [CREDITS.md](CREDITS.md).
