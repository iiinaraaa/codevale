"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type Progress = {
  name: string;
  /** total de moedinhas ganhas (define o nível, nunca diminui) */
  xp: number;
  /** moedinhas gastas na lojinha */
  spent: number;
  /** lições concluídas: chave "trilha/slug" */
  lessons: Record<string, boolean>;
  /** recompensas já recebidas (quizzes etc.) */
  rewards: Record<string, boolean>;
  /** fases do jogo: "done" ou "hint" (viu a resposta) */
  games: Record<string, "done" | "hint">;
  /** dias estudados: "AAAA-MM-DD" -> quantidade de atividades */
  study: Record<string, number>;
  ownedFrames: string[];
  equippedFrame: string;
  cycles: number;
  /** quantas vezes o dragão foi derrotado */
  dragonWins: number;
};

const STORAGE_KEY = "codevale:progress:v1";

const EMPTY: Progress = {
  name: "Dev do vale",
  xp: 0,
  spent: 0,
  lessons: {},
  rewards: {},
  games: {},
  study: {},
  ownedFrames: ["madeira"],
  equippedFrame: "madeira",
  cycles: 0,
  dragonWins: 0,
};

export function dayKey(d: Date = new Date()): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function levelFromXp(xp: number): number {
  return Math.floor(xp / 60) + 1;
}

type ProgressContextValue = {
  progress: Progress;
  ready: boolean;
  coins: number;
  level: number;
  completeLesson: (key: string, coins: number) => boolean;
  rewardOnce: (key: string, coins: number) => boolean;
  completeGame: (id: string, usedAnswer: boolean, coins: number) => number;
  awardCycle: () => void;
  /** registra a vitória; devolve as moedinhas ganhas (só na primeira vitória do dia) */
  defeatDragon: () => number;
  buyFrame: (id: string, price: number) => boolean;
  equipFrame: (id: string) => void;
  setName: (name: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function withStudy(p: Progress): Progress {
  const k = dayKey();
  return { ...p, study: { ...p.study, [k]: (p.study[k] ?? 0) + 1 } };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);
  const ref = useRef<Progress>(EMPTY);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const loaded = { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) };
        ref.current = loaded;
        setProgress(loaded);
      }
    } catch {
      /* localStorage indisponível: segue sem salvar */
    }
    setReady(true);
  }, []);

  const update = useCallback((fn: (p: Progress) => Progress) => {
    const next = fn(ref.current);
    ref.current = next;
    setProgress(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignora */
    }
  }, []);

  const completeLesson = useCallback(
    (key: string, coins: number) => {
      if (ref.current.lessons[key]) return false;
      update((p) => withStudy({ ...p, xp: p.xp + coins, lessons: { ...p.lessons, [key]: true } }));
      return true;
    },
    [update],
  );

  const rewardOnce = useCallback(
    (key: string, coins: number) => {
      if (ref.current.rewards[key]) return false;
      update((p) => withStudy({ ...p, xp: p.xp + coins, rewards: { ...p.rewards, [key]: true } }));
      return true;
    },
    [update],
  );

  const completeGame = useCallback(
    (id: string, usedAnswer: boolean, coins: number) => {
      const current = ref.current.games[id];
      // refazer sem a resposta melhora o selo e dá o que faltava
      if (current === "done") return 0;
      if (current === "hint" && usedAnswer) return 0;
      const gain = usedAnswer ? Math.floor(coins / 2) : current === "hint" ? Math.ceil(coins / 2) : coins;
      update((p) =>
        withStudy({ ...p, xp: p.xp + gain, games: { ...p.games, [id]: usedAnswer ? "hint" : "done" } }),
      );
      return gain;
    },
    [update],
  );

  const awardCycle = useCallback(() => {
    update((p) => withStudy({ ...p, xp: p.xp + 1, cycles: p.cycles + 1 }));
  }, [update]);

  const defeatDragon = useCallback(() => {
    const key = `dragon:${dayKey()}`;
    const first = !ref.current.rewards[key];
    const gain = first ? 30 : 0;
    update((p) =>
      withStudy({
        ...p,
        xp: p.xp + gain,
        dragonWins: p.dragonWins + 1,
        rewards: first ? { ...p.rewards, [key]: true } : p.rewards,
      }),
    );
    return gain;
  }, [update]);

  const buyFrame = useCallback(
    (id: string, price: number) => {
      const p = ref.current;
      if (p.ownedFrames.includes(id)) return false;
      if (p.xp - p.spent < price) return false;
      update((s) => ({
        ...s,
        spent: s.spent + price,
        ownedFrames: [...s.ownedFrames, id],
        equippedFrame: id,
      }));
      return true;
    },
    [update],
  );

  const equipFrame = useCallback(
    (id: string) => update((p) => ({ ...p, equippedFrame: id })),
    [update],
  );

  const setName = useCallback((name: string) => update((p) => ({ ...p, name })), [update]);

  const reset = useCallback(() => update(() => EMPTY), [update]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      ready,
      coins: progress.xp - progress.spent,
      level: levelFromXp(progress.xp),
      completeLesson,
      rewardOnce,
      completeGame,
      awardCycle,
      defeatDragon,
      buyFrame,
      equipFrame,
      setName,
      reset,
    }),
    [progress, ready, completeLesson, rewardOnce, completeGame, awardCycle, defeatDragon, buyFrame, equipFrame, setName, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress precisa estar dentro de <ProgressProvider>");
  return ctx;
}
