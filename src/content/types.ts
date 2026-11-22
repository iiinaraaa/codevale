export type Quiz = {
  question: string;
  options: string[];
  /** índice da opção correta */
  answer: number;
  explain: string;
};

export type Video = {
  /** ID do vídeo no YouTube (a parte depois de v=) */
  youtubeId: string;
  title: string;
  channel: string;
  channelUrl: string;
  lang: "en" | "pt";
};

export type Lesson = {
  slug: string;
  title: string;
  /** número da fase dentro da trilha */
  phase: number;
  minutes: number;
  /** moedinhas ao concluir */
  coins: number;
  /** "Pra que serve?" (parágrafos) */
  why: string[];
  analogy?: { label: string; text: string }[];
  video?: Video;
  reading?: { label: string; url: string };
  code?: { code: string; notes: string[] };
  pitfall?: string;
  activity: Quiz;
};

export type Phase = { id: number; title: string };

export type Track = {
  slug: string;
  name: string;
  /** nome curto, usado no título da aba (ex.: "React") */
  short: string;
  /** nome do lugar no mapa do vale */
  place: string;
  description: string;
  status: "available" | "soon";
  /** "course" = lições; "game" = jogo prático */
  kind: "course" | "game";
  href: string;
  phases?: Phase[];
};

export type GamePhase = {
  id: string;
  title: string;
  goalFarm: string;
  goalNight: string;
  /** quantos personagens aparecem */
  sprites: number;
  /** classes iniciais no editor */
  initial: string;
  /** estilos CSS de cada objetivo (um por personagem), na ordem */
  goals: Record<string, string | number>[];
  hints: [string, string, string];
};

export type Frame = {
  id: string;
  name: { farm: string; night: string };
  /** índice do visual (ver .frame[data-f] no globals.css) */
  style: number;
  level: number;
  /** null = não se compra */
  price: number | null;
  /** como desbloquear, quando não se compra */
  achievement?: "react-done" | "days-100" | "dragon-slayer";
  requirement: string;
};
