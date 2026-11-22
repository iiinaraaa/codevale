"use client";

import { useState } from "react";
import { usePomodoro } from "@/lib/pomodoro";
import { useToast } from "@/lib/toast";
import { PageTitle } from "./PageTitle";

type Preset = "25" | "50" | "custom";

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function PomodoroSetup() {
  const { state, activate } = usePomodoro();
  const toast = useToast();
  const [preset, setPreset] = useState<Preset>("25");
  const [customFocus, setCustomFocus] = useState(30);
  const [customBreak, setCustomBreak] = useState(5);
  const [sound, setSound] = useState(true);
  const [showInTitle, setShowInTitle] = useState(true);

  function go() {
    const focusMin = preset === "25" ? 25 : preset === "50" ? 50 : clamp(customFocus, 1, 180);
    const breakMin = preset === "25" ? 5 : preset === "50" ? 10 : clamp(customBreak, 1, 60);
    activate({ focusMin, breakMin, sound, showInTitle });
    toast("Pomodoro fixado no canto. É só apertar Iniciar.");
  }

  const presetBtn = (key: Preset, label: string) => (
    <button
      type="button"
      aria-pressed={preset === key}
      onClick={() => setPreset(key)}
      className={
        "cursor-pointer border-[3px] border-line px-4 py-3 font-bold shadow-[3px_3px_0_var(--shade)] " +
        (preset === key ? "bg-accent text-on-accent" : "bg-panel")
      }
    >
      {label}
    </button>
  );

  return (
    <>
      <PageTitle title="Hora do foco" />
      <h1 className="px mb-5 text-[clamp(16px,2.6vw,22px)]">Hora do foco</h1>
      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="box">
          <h2 className="px mb-3.5 text-sm">Escolha o ritmo</h2>
          <div className="my-3.5 flex flex-wrap gap-2.5" role="group" aria-label="Ritmo do pomodoro">
            {presetBtn("25", "25 min foco · 5 pausa")}
            {presetBtn("50", "50 min foco · 10 pausa")}
            {presetBtn("custom", "Personalizado")}
          </div>

          {preset === "custom" && (
            <div className="mb-3.5 flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                Foco (min)
                <input
                  type="number"
                  min={1}
                  max={180}
                  value={customFocus}
                  onChange={(e) => setCustomFocus(Number(e.target.value))}
                  className="w-20 border-[3px] border-line bg-panel2 px-2 py-1"
                />
              </label>
              <label className="flex items-center gap-2">
                Pausa (min)
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={customBreak}
                  onChange={(e) => setCustomBreak(Number(e.target.value))}
                  className="w-20 border-[3px] border-line bg-panel2 px-2 py-1"
                />
              </label>
            </div>
          )}

          <label className="my-2 flex items-center gap-2.5">
            <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
            Som suave no fim de cada ciclo
          </label>
          <label className="my-2 flex items-center gap-2.5">
            <input type="checkbox" checked={showInTitle} onChange={(e) => setShowInTitle(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
            Mostrar o tempo no título da aba
          </label>

          <div className="mt-4">
            <button type="button" className="btn" onClick={go}>
              {state.on ? "Reiniciar com este ritmo" : "Ativar e fixar no canto"}
            </button>
          </div>
        </div>

        <div className="box box-alt">
          <h2 className="px mb-3.5 text-sm">Como funciona</h2>
          <p>
            Depois de ativado, o relógio fica fixo no canto da tela enquanto você navega entre as lições. Dá para arrastar,
            minimizar, e ele não perde a conta se você recarregar a página.
          </p>
          <p className="m-0">
            <span className="only-farm">Durante o foco uma plantinha cresce.</span>
            <span className="only-night">Durante o foco uma bateria de energia vai carregando.</span> Cada ciclo completo
            rende uma moedinha e conta como dia estudado.
          </p>
        </div>
      </div>
    </>
  );
}
