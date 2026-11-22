import type { GamePhase } from "./types";

/**
 * Fases do jogo de Tailwind.
 * Para criar uma fase nova, adicione um objeto aqui (veja CONTRIBUTING.md).
 * A fase é vencida quando cada personagem fica em cima do seu objetivo,
 * então qualquer combinação de classes que chegue lá vale.
 * O tamanho do personagem e dos objetivos é 60x60 px, com 8 px de margem.
 */
export const GAME_PHASES: GamePhase[] = [
  {
    id: "flex-1",
    title: "Canto da cesta",
    goalFarm: "A cesta fica no canto inferior direito. Leve o coelho até lá.",
    goalNight: "A estação de energia fica no canto inferior direito. Leve o drone até lá.",
    sprites: 1,
    initial: "flex",
    goals: [{ right: 8, bottom: 8 }],
    hints: [
      "Pense no eixo principal e no eixo cruzado do flex. Em que direção o personagem precisa andar?",
      "Olhe para as classes que começam com justify- (eixo principal) e items- (eixo cruzado).",
      "Resposta: flex justify-end items-end. justify-end empurra para o fim da linha (direita) e items-end para o fim do eixo cruzado (embaixo).",
    ],
  },
  {
    id: "flex-2",
    title: "No meio do campo",
    goalFarm: "Agora a cesta está bem no centro do campo.",
    goalNight: "Agora a estação está bem no centro da cidade.",
    sprites: 1,
    initial: "flex",
    goals: [{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }],
    hints: [
      "Centralizar é alinhar nos dois eixos ao mesmo tempo.",
      "Existe um valor center para justify- e outro para items-.",
      "Resposta: flex justify-center items-center. (grid place-items-center também funciona!)",
    ],
  },
  {
    id: "flex-3",
    title: "Fila de cenouras",
    goalFarm: "Três coelhos precisam ficar em fila, um embaixo do outro, com espaço entre eles.",
    goalNight: "Três drones precisam ficar em fila vertical, com espaço entre eles.",
    sprites: 3,
    initial: "flex",
    goals: [
      { left: 8, top: 8 },
      { left: 8, top: 84 },
      { left: 8, top: 160 },
    ],
    hints: [
      "Por padrão o flex coloca os itens em linha. Existe uma classe para trocar a direção.",
      "flex-col muda a direção para coluna. O espaço entre itens vem de gap-*. Cada unidade vale 4px, e o espaço aqui é de 16px.",
      "Resposta: flex flex-col gap-4. gap-4 = 16px entre cada personagem.",
    ],
  },
  {
    id: "flex-4",
    title: "Espalhando pelo celeiro",
    goalFarm: "Três coelhos: um na ponta esquerda, um no meio e um na ponta direita, todos no topo.",
    goalNight: "Três drones: um na ponta esquerda, um no meio e um na ponta direita, todos no topo.",
    sprites: 3,
    initial: "flex",
    goals: [
      { left: 8, top: 8 },
      { left: "50%", top: 8, transform: "translateX(-50%)" },
      { right: 8, top: 8 },
    ],
    hints: [
      "Você quer distribuir o espaço livre entre os itens, empurrando o primeiro e o último para as pontas.",
      "Procure um valor de justify- que significa 'espaço entre'.",
      "Resposta: flex justify-between. O espaço sobrando fica entre os itens.",
    ],
  },
];
