/**
 * Mini interpretador de classes Tailwind, só para o jogo da Oficina.
 * Ele não é o Tailwind de verdade: traduz um punhado de classes para CSS
 * e assim dá para validar a posição real dos personagens no navegador.
 * Para suportar uma classe nova, adicione-a em STATIC ou em resolveDynamic.
 */
export type Decl = [prop: string, value: string];

const STATIC: Record<string, Decl[]> = {
  flex: [["display", "flex"]],
  grid: [["display", "grid"]],
  block: [["display", "block"]],
  "flex-row": [["flex-direction", "row"]],
  "flex-col": [["flex-direction", "column"]],
  "flex-wrap": [["flex-wrap", "wrap"]],
  "justify-start": [["justify-content", "flex-start"]],
  "justify-center": [["justify-content", "center"]],
  "justify-end": [["justify-content", "flex-end"]],
  "justify-between": [["justify-content", "space-between"]],
  "justify-around": [["justify-content", "space-around"]],
  "justify-evenly": [["justify-content", "space-evenly"]],
  "items-start": [["align-items", "flex-start"]],
  "items-center": [["align-items", "center"]],
  "items-end": [["align-items", "flex-end"]],
  "items-stretch": [["align-items", "stretch"]],
  "place-items-start": [["place-items", "start"]],
  "place-items-center": [["place-items", "center"]],
  "place-items-end": [["place-items", "end"]],
};

function resolveDynamic(c: string): Decl[] | null {
  let m = c.match(/^gap-(\d+)$/);
  if (m) return [["gap", `${Number(m[1]) * 4}px`]];
  m = c.match(/^grid-cols-(\d+)$/);
  if (m) return [["grid-template-columns", `repeat(${m[1]}, minmax(0, 1fr))`]];
  m = c.match(/^p-(\d+)$/);
  if (m) return [["padding", `${Number(m[1]) * 4}px`]];
  return null;
}

function camel(prop: string): string {
  return prop.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase());
}

export function interpret(input: string): {
  style: Record<string, string>;
  css: string[];
  unknown: string[];
} {
  const style: Record<string, string> = {};
  const css: string[] = [];
  const unknown: string[] = [];

  for (const c of input.split(/\s+/).filter(Boolean)) {
    const decls = STATIC[c] ?? resolveDynamic(c);
    if (!decls) {
      unknown.push(c);
      continue;
    }
    css.push(`.${c} {\n${decls.map(([p, v]) => `  ${p}: ${v};`).join("\n")}\n}`);
    for (const [p, v] of decls) style[camel(p)] = v;
  }
  return { style, css, unknown };
}
