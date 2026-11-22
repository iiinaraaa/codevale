<div align="center">

# 🌾 Codevale

**Estude React, Next.js, TypeScript e Tailwind CSS num vale em pixel art.**

Trilhas, explicações em português, atividades, jogos e pomodoro, tudo open source.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## ✨ Sobre

O Codevale é uma plataforma para aprender front-end de forma leve e divertida, com trilhas de estudo, vídeos curados (sempre com crédito), atividades e um visual pixel art com dois temas:

| Tema | Visual |
| --- | --- |
| 🌻 **Farm** (claro) | Cottagecore, inspirado em jogos de fazenda |
| 🌃 **Night City** (escuro) | Cyberpunk com neon |

O título da aba muda conforme o que você estuda (`Codevale > Aprendendo React > useState`) e mostra o tempo do pomodoro.

## 🎮 O que já existe (MVP)

- 🗺️ **Mapa do vale** com as 5 trilhas
- ⚛️ **Trilha de React** (iniciante): 9 lições com "pra que serve", código explicado, armadilhas e atividade
- 🎨 **Oficina Tailwind**: jogo estilo Flexbox Froggy, com 4 fases, dicas em 3 níveis e "ver CSS gerado"
- 🐉 **Desafio do Dragão**: perguntas sobre o que você estudou, cada acerto é um golpe até derrotar o dragão
- ⏱️ **Pomodoro** fixo no canto: arrastável, minimizável e salvo entre visitas
- 🪙 **Moedinhas, níveis e dias estudados** (que nunca zeram), com planta/prédio que cresce por trilha
- 🧑‍🌾 **Perfil** com molduras (compra por nível e moedinhas, ou por conquista)
- 💾 Tudo salvo no navegador (`localStorage`). Sem login e sem servidor por enquanto.

## 🚀 Como rodar

Requisitos: **Node.js 20** ou mais novo.

```bash
npm install
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Roda o build de produção |
| `npm run typecheck` | Confere os tipos com o TypeScript |

## 🗂️ Estrutura

```
src/
  app/            páginas (App Router)
  components/     interface (mapa, lição, jogo, pomodoro, perfil)
  content/        CONTEÚDO: trilhas, lições, fases do jogo, molduras, pixel arts
  lib/            progresso, tema, pomodoro, estatísticas
```

O conteúdo vive em arquivos TypeScript dentro de `src/content`, então qualquer pessoa pode contribuir com um Pull Request.

## 🤝 Como contribuir

Contribuições são muito bem-vindas! Leia o [CONTRIBUTING.md](CONTRIBUTING.md) para ver as regras de conteúdo e como criar uma lição. Você também pode abrir uma issue com uma sugestão de conteúdo.

## 🧭 Roadmap

- [ ] Vídeos curados nas lições de React (campo `video`)
- [ ] Mini-trilha "JS para React"
- [ ] Trilha de TypeScript (tradutor JS → TS e limpeza de código)
- [ ] Trilha de Next.js
- [ ] Mais fases no jogo de Tailwind (grid, responsividade, estados)
- [ ] Conteúdo em MDX, flashcards com revisão espaçada e glossário
- [ ] Foto de perfil (upload com efeito pixel) e login
- [ ] Testes automatizados

## 📜 Créditos e licenças

- **Código:** [MIT](LICENSE)
- **Conteúdo original** (textos das lições): sugerimos CC BY-SA 4.0, defina antes de publicar
- **Vídeos e leituras** são de terceiros: usamos só o embed oficial e sempre creditamos. Veja [CREDITS.md](CREDITS.md).
