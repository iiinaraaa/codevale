import type { Track } from "./types";

export const TRACKS: Track[] = [
  {
    slug: "js",
    short: "JavaScript",
    name: "JavaScript para React",
    place: "Vila do JS",
    description: "Só o JavaScript que o React realmente usa.",
    status: "soon",
    kind: "course",
    href: "/trilhas/js",
  },
  {
    slug: "react",
    short: "React",
    name: "React do zero",
    place: "Campo de React",
    description: "Do primeiro componente até hooks, passo a passo.",
    status: "available",
    kind: "course",
    href: "/trilhas/react",
    phases: [
      { id: 1, title: "Primeiros passos" },
      { id: 2, title: "Componentes e dados" },
      { id: 3, title: "Interatividade" },
    ],
  },
  {
    slug: "ts",
    short: "TypeScript",
    name: "TypeScript: do JS ao TS",
    place: "Estufa do TS",
    description: "Tradutor JS → TS e limpeza de código.",
    status: "soon",
    kind: "course",
    href: "/trilhas/ts",
  },
  {
    slug: "tailwind",
    short: "Tailwind",
    name: "Tailwind na prática",
    place: "Oficina Tailwind",
    description: "Jogo estilo Flexbox Froggy com a cara do vale.",
    status: "available",
    kind: "game",
    href: "/tailwind",
  },
  {
    slug: "next",
    short: "Next.js",
    name: "Next.js para iniciantes",
    place: "Torre do Next",
    description: "Rotas, layouts e Server Components com calma.",
    status: "soon",
    kind: "course",
    href: "/trilhas/next",
  },
];

export function getTrack(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}
