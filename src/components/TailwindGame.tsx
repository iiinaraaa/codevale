"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { GAME_PHASES } from "@/content/tailwind-phases";
import type { GamePhase } from "@/content/types";
import { interpret } from "@/lib/tailwind-lite";
import { useProgress } from "@/lib/progress";
import { useToast } from "@/lib/toast";
import { SpriteChar } from "./Pixel";
import { PageTitle } from "./PageTitle";

const REWARD = 15;
const TOLERANCE = 6;

function PhaseView({ phase, onNext, hasNext }: { phase: GamePhase; onNext: () => void; hasNext: boolean }) {
  const { completeGame } = useProgress();
  const toast = useToast();
  const [value, setValue] = useState(phase.initial);
  const [hintLevel, setHintLevel] = useState(0);
  const [solved, setSolved] = useState(false);
  const won = useRef(false);
  const hintRef = useRef(0);
  const sprites = useRef<(HTMLDivElement | null)[]>([]);
  const goals = useRef<(HTMLDivElement | null)[]>([]);

  const result = useMemo(() => interpret(value), [value]);

  useEffect(() => {
    hintRef.current = hintLevel;
  }, [hintLevel]);

  useEffect(() => {
    function check() {
      let all = phase.sprites > 0;
      for (let i = 0; i < phase.sprites; i++) {
        const s = sprites.current[i];
        const g = goals.current[i];
        if (!s || !g) {
          all = false;
          break;
        }
        const a = s.getBoundingClientRect();
        const b = g.getBoundingClientRect();
        if (Math.abs(a.left - b.left) > TOLERANCE || Math.abs(a.top - b.top) > TOLERANCE) {
          all = false;
          break;
        }
      }
      if (all && !won.current) {
        won.current = true;
        setSolved(true);
        const usedAnswer = hintRef.current >= 3;
        const gain = completeGame(phase.id, usedAnswer, REWARD);
        if (gain === 0) toast("Fase concluída!");
        else toast(usedAnswer ? `Fase concluída! +${gain} moedinhas. Refaça sem a resposta para ganhar o resto.` : `Fase concluída! +${gain} moedinhas.`);
      }
    }
    const id = requestAnimationFrame(check);
    window.addEventListener("resize", check);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", check);
    };
  }, [value, phase, completeGame, toast]);

  const hints = phase.hints;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="min-w-0">
        <p>
          <span className="only-farm">{phase.goalFarm}</span>
          <span className="only-night">{phase.goalNight}</span> Escreva as classes que levam até lá. O resultado muda enquanto você digita.
        </p>
        <div className="editor" aria-label="Editor de classes">
          <div className="opacity-50">{'<main class="h-full">'}</div>
          <div>
            {"  "}
            {'<div class="'}
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              aria-label="Classes Tailwind do contêiner"
            />
            {'">'}
          </div>
          {Array.from({ length: phase.sprites }, (_, i) => (
            <div key={i} className="opacity-50">{"    <Personagem />"}</div>
          ))}
          <div>{"  </div>"}</div>
          <div className="opacity-50">{"</main>"}</div>
        </div>

        <div className="my-3.5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={hintLevel >= 3}
            onClick={() => setHintLevel((h) => Math.min(3, h + 1))}
          >
            {hintLevel === 0 ? "Pedir dica" : hintLevel === 1 ? "Outra dica" : hintLevel === 2 ? "Ver a resposta" : "Dicas esgotadas"}
          </button>
          <span className="text-sm text-muted">dicas são livres; ver a resposta dá menos moedinhas</span>
        </div>
        <div className="min-h-12 border-[3px] border-line bg-panel2 px-3.5 py-2.5" aria-live="polite">
          {hintLevel === 0 ? "Sem pressa. Se travar, peça uma dica." : hints[hintLevel - 1]}
        </div>

        <details className="box box-alt mt-4 !p-3">
          <summary className="cursor-pointer font-bold">Ver CSS gerado</summary>
          <pre className="mt-2 whitespace-pre-wrap font-mono text-sm">
            {result.css.length ? result.css.join("\n") : "/* escreva uma classe */"}
            {result.unknown.length ? `\n\n/* ainda não suportadas aqui: ${result.unknown.join(", ")} */` : ""}
          </pre>
        </details>
      </div>

      <div className="min-w-0">
        <div className={"stage" + (solved ? " stage-win" : "")}>
          {phase.goals.map((g, i) => (
            <div
              key={i}
              ref={(el) => {
                goals.current[i] = el;
              }}
              className="goal"
              style={g as unknown as CSSProperties}
              aria-hidden="true"
            />
          ))}
          <div className="field" style={result.style as unknown as CSSProperties}>
            {Array.from({ length: phase.sprites }, (_, i) => (
              <div
                key={i}
                ref={(el) => {
                  sprites.current[i] = el;
                }}
                className="sprite"
              >
                <SpriteChar />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3.5 font-bold" aria-live="polite">
          {solved ? "Fase concluída!" : "Objetivo ainda não alcançado."}
        </p>
        {solved && hasNext && (
          <button type="button" className="btn mt-1" onClick={onNext}>
            Próxima fase
          </button>
        )}
        {solved && !hasNext && <p className="text-muted">Você concluiu todas as fases por enquanto. Novas chegam em breve!</p>}
        <p className="mt-3 text-[15px] text-muted">
          A conclusão é automática: o jogo compara a posição real dos personagens com os objetivos, então qualquer combinação de
          classes que chegue lá vale.
        </p>
      </div>
    </div>
  );
}

export function TailwindGame() {
  const { progress } = useProgress();
  const [index, setIndex] = useState(0);
  const phase = GAME_PHASES[index];

  return (
    <div>
      <PageTitle title={`Praticando Tailwind > Fase ${index + 1}`} />
      <div className="mb-1.5 text-sm text-muted">Oficina Tailwind › Flex básico</div>
      <h1 className="px mb-1.5 text-[clamp(16px,2.6vw,22px)]">
        Fase {index + 1} · {phase.title}
      </h1>
      <div className="my-3 mb-5 flex flex-wrap gap-1.5" role="group" aria-label="Escolher fase">
        {GAME_PHASES.map((p, i) => {
          const st = progress.games[p.id];
          const cls = "dot" + (st === "done" ? " dot-done" : st === "hint" ? " dot-hint" : "") + (i === index ? " dot-now" : "");
          return (
            <button
              key={p.id}
              type="button"
              className={cls}
              onClick={() => setIndex(i)}
              aria-label={`Fase ${i + 1}: ${p.title}${st ? " (concluída)" : ""}`}
              aria-current={i === index ? "step" : undefined}
            />
          );
        })}
      </div>
      <PhaseView
        key={phase.id}
        phase={phase}
        hasNext={index < GAME_PHASES.length - 1}
        onNext={() => setIndex((i) => Math.min(GAME_PHASES.length - 1, i + 1))}
      />
    </div>
  );
}
