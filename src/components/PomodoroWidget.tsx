"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { usePomodoro, formatTime } from "@/lib/pomodoro";
import { PlantSvg } from "./Pixel";

/** Relógio fixo no canto da tela: arrastável, minimizável e salvo entre visitas. */
export function PomodoroWidget() {
  const { state, toggle, close, setMinimized } = usePomodoro();
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);

  if (!state.on) return null;

  const total = (state.phase === "focus" ? state.focusMin : state.breakMin) * 60;
  const progress = total > 0 ? 1 - state.left / total : 0;
  const plantStage = Math.min(3, Math.floor(progress * 4));
  const battery = Math.round(progress * 10);

  function onDown(e: ReactPointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button") || !box.current) return;
    const r = box.current.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current || !box.current) return;
    const w = box.current.offsetWidth;
    const h = box.current.offsetHeight;
    setPos({
      x: Math.max(0, Math.min(window.innerWidth - w, e.clientX - drag.current.dx)),
      y: Math.max(0, Math.min(window.innerHeight - h, e.clientY - drag.current.dy)),
    });
  }
  function onUp() {
    drag.current = null;
  }

  const style = pos
    ? { left: pos.x, top: pos.y }
    : { right: 16, bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" };

  return (
    <div ref={box} className="pomo-widget" style={style} role="timer" aria-label="Pomodoro">
      <div
        className="flex cursor-grab select-none items-center justify-between bg-accent px-2.5 py-1.5 text-[13px] font-bold text-on-accent"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        <span>
          {state.phase === "focus" ? "Foco" : "Pausa"}
          {state.running ? "" : " (pausado)"}
          {state.minimized ? ` · ${formatTime(state.left)}` : ""}
        </span>
        <button
          type="button"
          className="cursor-pointer px-1 font-bold"
          onClick={() => setMinimized(!state.minimized)}
          aria-label={state.minimized ? "Expandir" : "Minimizar"}
        >
          {state.minimized ? "+" : "–"}
        </button>
      </div>
      {!state.minimized && (
        <div className="p-3 text-center">
          <div className="only-farm mx-auto h-[72px] w-[72px]">
            <PlantSvg stage={plantStage} />
          </div>
          <div className="only-night batt" aria-hidden="true">
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} className={i < battery ? "on" : ""} />
            ))}
          </div>
          <div className="px my-1.5 text-2xl">{formatTime(state.left)}</div>
          <div className="mt-2.5 flex justify-center gap-2">
            <button type="button" className="btn btn-sm" onClick={toggle}>
              {state.running ? "Pausar" : "Iniciar"}
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={close}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
