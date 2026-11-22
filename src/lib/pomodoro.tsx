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
import { useProgress } from "./progress";
import { useToast } from "./toast";

type Phase = "focus" | "break";

export type PomoState = {
  on: boolean;
  running: boolean;
  phase: Phase;
  focusMin: number;
  breakMin: number;
  /** segundos restantes (valor "congelado" quando pausado) */
  left: number;
  /** instante (ms) em que a fase termina, quando rodando */
  endsAt: number | null;
  minimized: boolean;
  sound: boolean;
  showInTitle: boolean;
};

const STORAGE_KEY = "codevale:pomodoro:v1";

const INITIAL: PomoState = {
  on: false,
  running: false,
  phase: "focus",
  focusMin: 25,
  breakMin: 5,
  left: 25 * 60,
  endsAt: null,
  minimized: false,
  sound: true,
  showInTitle: true,
};

export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, totalSeconds);
  const m = Math.floor(s / 60);
  const x = s % 60;
  return `${String(m).padStart(2, "0")}:${String(x).padStart(2, "0")}`;
}

function beep() {
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 660;
    gain.gain.value = 0.04;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.25);
    osc.onended = () => void ctx.close();
  } catch {
    /* som é opcional */
  }
}

type PomodoroContextValue = {
  state: PomoState;
  /** "24:13" quando o timer está rodando e o título da aba deve mostrá-lo */
  timerLabel: string | null;
  activate: (opts: { focusMin: number; breakMin: number; sound: boolean; showInTitle: boolean }) => void;
  toggle: () => void;
  close: () => void;
  setMinimized: (v: boolean) => void;
};

const PomodoroContext = createContext<PomodoroContextValue | null>(null);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const { awardCycle } = useProgress();
  const toast = useToast();
  const [state, setState] = useState<PomoState>(INITIAL);
  const stateRef = useRef<PomoState>(INITIAL);
  const loaded = useRef(false);

  const commit = useCallback((next: PomoState) => {
    stateRef.current = next;
    setState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignora */
    }
  }, []);

  // restaura o estado salvo (sobrevive a recarregar a página)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = { ...INITIAL, ...(JSON.parse(raw) as Partial<PomoState>) };
        stateRef.current = saved;
        setState(saved);
      }
    } catch {
      /* ignora */
    }
    loaded.current = true;
  }, []);

  // relógio
  useEffect(() => {
    if (!state.running) return;
    const id = window.setInterval(() => {
      const s = stateRef.current;
      if (!s.running || s.endsAt === null) return;
      const left = Math.ceil((s.endsAt - Date.now()) / 1000);
      if (left > 0) {
        if (left !== s.left) setState({ ...s, left });
        stateRef.current = { ...s, left };
        return;
      }
      // fase terminou
      if (s.sound) beep();
      if (s.phase === "focus") {
        awardCycle();
        toast("Ciclo completo! +1 moedinha. Hora da pausa.");
        const secs = s.breakMin * 60;
        commit({ ...s, phase: "break", left: secs, endsAt: Date.now() + secs * 1000 });
      } else {
        toast("Pausa terminou. Quando quiser, inicie outro foco.");
        commit({ ...s, phase: "focus", running: false, left: s.focusMin * 60, endsAt: null });
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, [state.running, awardCycle, commit, toast]);

  const activate = useCallback<PomodoroContextValue["activate"]>(
    ({ focusMin, breakMin, sound, showInTitle }) => {
      commit({
        ...INITIAL,
        on: true,
        focusMin,
        breakMin,
        sound,
        showInTitle,
        left: focusMin * 60,
      });
    },
    [commit],
  );

  const toggle = useCallback(() => {
    const s = stateRef.current;
    if (s.running) {
      const left = s.endsAt ? Math.max(1, Math.ceil((s.endsAt - Date.now()) / 1000)) : s.left;
      commit({ ...s, running: false, left, endsAt: null });
    } else {
      commit({ ...s, running: true, endsAt: Date.now() + s.left * 1000 });
    }
  }, [commit]);

  const close = useCallback(() => commit({ ...INITIAL }), [commit]);

  const setMinimized = useCallback(
    (v: boolean) => commit({ ...stateRef.current, minimized: v }),
    [commit],
  );

  const timerLabel = state.on && state.running && state.showInTitle ? formatTime(state.left) : null;

  const value = useMemo(
    () => ({ state, timerLabel, activate, toggle, close, setMinimized }),
    [state, timerLabel, activate, toggle, close, setMinimized],
  );

  return <PomodoroContext.Provider value={value}>{children}</PomodoroContext.Provider>;
}

export function usePomodoro(): PomodoroContextValue {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error("usePomodoro precisa estar dentro de <PomodoroProvider>");
  return ctx;
}
