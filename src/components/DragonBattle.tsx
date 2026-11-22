"use client";

import { useEffect, useState } from "react";
import { TRACKS } from "@/content/tracks";
import { contentFor } from "@/content";
import { useProgress } from "@/lib/progress";
import { useToast } from "@/lib/toast";
import { PageTitle } from "./PageTitle";
import { DragonSvg, HeroSvg } from "./Pixel";

type Option = { text: string; correct: boolean };
type Q = { id: string; lesson: string; question: string; options: Option[]; explain: string };
type Phase = "intro" | "fight" | "won";
type Fx = "hit" | "defend" | null;

const MAX_HP = 5;
const MIN_COMPLETED = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DragonBattle() {
  const { progress, defeatDragon } = useProgress();
  const toast = useToast();

  const [phase, setPhase] = useState<Phase>("intro");
  const [queue, setQueue] = useState<Q[]>([]);
  const [qi, setQi] = useState(0);
  const [hits, setHits] = useState(0);
  const [wrong, setWrong] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [solved, setSolved] = useState(false);
  const [fx, setFx] = useState<Fx>(null);
  const [reward, setReward] = useState(0);

  // todas as lições com atividade, de todas as trilhas
  const all = TRACKS.flatMap((t) =>
    contentFor(t.slug).lessons.map((l) => ({ key: `${t.slug}/${l.slug}`, lesson: l })),
  );
  const completed = all.filter((x) => progress.lessons[x.key]);
  const useCompleted = completed.length >= MIN_COMPLETED;
  const pool = useCompleted ? completed : all;
  const maxHp = Math.min(MAX_HP, pool.length);

  useEffect(() => {
    if (!fx) return;
    const id = window.setTimeout(() => setFx(null), 650);
    return () => window.clearTimeout(id);
  }, [fx]);

  function start() {
    const picked = shuffle(pool).slice(0, maxHp);
    setQueue(
      picked.map(({ key, lesson }) => ({
        id: key,
        lesson: lesson.title,
        question: lesson.activity.question,
        explain: lesson.activity.explain,
        options: shuffle(
          lesson.activity.options.map((text, i) => ({ text, correct: i === lesson.activity.answer })),
        ),
      })),
    );
    setQi(0);
    setHits(0);
    setWrong([]);
    setMistakes(0);
    setSolved(false);
    setFx(null);
    setReward(0);
    setPhase("fight");
  }

  const current = queue[qi];
  const dead = hits >= maxHp && phase !== "intro";

  function pick(i: number) {
    if (!current || solved || wrong.includes(i)) return;
    if (current.options[i].correct) {
      setSolved(true);
      setHits((h) => h + 1);
      setFx("hit");
    } else {
      setWrong((w) => [...w, i]);
      setMistakes((m) => m + 1);
      setFx("defend");
    }
  }

  function next() {
    if (hits >= maxHp) {
      const gain = defeatDragon();
      setReward(gain);
      setPhase("won");
      toast(gain > 0 ? `Dragão derrotado! +${gain} moedinhas.` : "Dragão derrotado de novo!");
      return;
    }
    setQi((n) => n + 1);
    setWrong([]);
    setSolved(false);
  }

  const hpPct = maxHp > 0 ? Math.round(((maxHp - hits) / maxHp) * 100) : 100;
  const dragonClass =
    "arena-dragon " +
    (dead ? "dragon-dead" : fx === "hit" ? "dragon-hit" : fx === "defend" ? "dragon-defend" : "dragon-idle");

  return (
    <>
      <PageTitle title="Enfrentando o Dragão" />
      <h1 className="px mb-1.5 text-[clamp(16px,2.6vw,22px)]">
        <span className="only-farm">O Dragão do Bug</span>
        <span className="only-night">O Dragão Glitch</span>
      </h1>
      <p className="mb-4 text-muted">
        Cada resposta certa é um golpe. Errou? O dragão só se defende, sem perder nada: tente outra opção.
      </p>

      <div className="mb-3.5 flex flex-wrap items-center gap-3.5">
        <span className="px text-[10px]">Vida do dragão</span>
        <div
          className="bar min-w-[200px] flex-1 md:max-w-sm"
          role="progressbar"
          aria-valuenow={hpPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Vida do dragão"
        >
          <i style={{ width: `${hpPct}%`, backgroundColor: "var(--accent2)" }} />
        </div>
        <span className="text-sm text-muted">
          {maxHp - hits} de {maxHp}
        </span>
      </div>

      <div className="arena" aria-label="Arena de batalha">
        <div className={"arena-hero" + (fx === "hit" ? " hero-attack" : "")}>
          <HeroSvg />
        </div>
        <div className={dragonClass}>
          <DragonSvg dead={dead} />
        </div>
        {fx === "hit" && <div className="arena-fx">-1</div>}
      </div>

      <div className="mt-6">
        {phase === "intro" && (
          <div className="box">
            <h2 className="px mb-3.5 text-sm">Pronta para lutar?</h2>
            <p>
              O dragão tem <b>{maxHp}</b> pontos de vida. Você responde perguntas sobre o que estudou e cada acerto tira um ponto.
            </p>
            <p className="text-muted">
              {useCompleted
                ? `As perguntas vêm das ${completed.length} lições que você já concluiu.`
                : "Você ainda concluiu poucas lições, então vou sortear perguntas de todo o conteúdo disponível. Conclua mais lições para o dragão ficar do seu tamanho."}
            </p>
            <p className="text-sm text-muted">
              A primeira vitória de cada dia rende 30 moedinhas. Derrotá-lo uma vez desbloqueia uma moldura de perfil.
            </p>
            <button type="button" className="btn" onClick={start} disabled={maxHp === 0}>
              Lutar!
            </button>
          </div>
        )}

        {phase === "fight" && current && (
          <div className="box">
            <div className="mb-1.5 text-sm text-muted">
              Golpe {Math.min(qi + 1, maxHp)} de {maxHp} · da lição “{current.lesson}”
            </div>
            <p className="font-bold">{current.question}</p>
            <div className="my-3 grid gap-2" role="group" aria-label="Opções">
              {current.options.map((o, i) => {
                const cls = solved && o.correct ? "ok" : wrong.includes(i) ? "no" : "";
                return (
                  <button
                    key={i}
                    type="button"
                    className={`opt ${cls}`}
                    onClick={() => pick(i)}
                    disabled={solved || wrong.includes(i)}
                  >
                    {o.text}
                  </button>
                );
              })}
            </div>
            <div className="min-h-[1.6em] font-bold" aria-live="polite">
              {solved
                ? `Acertou! ${current.explain}`
                : wrong.length > 0
                  ? "O dragão se defendeu! Tente outra opção."
                  : ""}
            </div>
            {solved && (
              <button type="button" className="btn mt-2" onClick={next}>
                {hits >= maxHp ? "Golpe final!" : "Próximo golpe"}
              </button>
            )}
          </div>
        )}

        {phase === "won" && (
          <div className="box">
            <h2 className="px mb-3.5 text-sm">Dragão derrotado!</h2>
            <p>
              {mistakes === 0
                ? "Vitória perfeita, sem nenhum erro!"
                : `Você venceu com ${mistakes} ${mistakes === 1 ? "tentativa errada" : "tentativas erradas"}, e aprendeu com elas.`}
            </p>
            <p className="text-muted">
              {reward > 0
                ? `+${reward} moedinhas pela primeira vitória do dia.`
                : "Hoje você já ganhou as moedinhas do dragão, mas treinar de novo ajuda a fixar."}
            </p>
            <button type="button" className="btn" onClick={start}>
              Lutar de novo
            </button>
          </div>
        )}
      </div>
    </>
  );
}
