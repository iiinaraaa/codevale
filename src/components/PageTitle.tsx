"use client";

import { useEffect } from "react";
import { usePomodoro } from "@/lib/pomodoro";

/**
 * Define o título da aba como "Codevale > {title}".
 * Quando o pomodoro está rodando, mostra o tempo na frente: "🍅 24:13 · Codevale > ...".
 */
export function PageTitle({ title }: { title: string }) {
  const { timerLabel } = usePomodoro();

  useEffect(() => {
    const base = `Codevale > ${title}`;
    document.title = timerLabel ? `🍅 ${timerLabel} · ${base}` : base;
  }, [title, timerLabel]);

  return null;
}
