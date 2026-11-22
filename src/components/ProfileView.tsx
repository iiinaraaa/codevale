"use client";

import { FRAMES } from "@/content/frames";
import { REACT_LESSONS } from "@/content/react-lessons";
import { GAME_PHASES } from "@/content/tailwind-phases";
import { useProgress } from "@/lib/progress";
import { heatCells, studyStats } from "@/lib/stats";
import { useTheme } from "@/lib/theme";
import { useToast } from "@/lib/toast";
import { PageTitle } from "./PageTitle";
import { AvatarSvg, GrowthIcon, stageOf } from "./Pixel";
import { LevelTitle } from "./HomeHero";
import type { Frame } from "@/content/types";

export function ProfileView() {
  const { progress, coins, level, buyFrame, equipFrame, setName, reset } = useProgress();
  const { theme } = useTheme();
  const toast = useToast();

  const stats = studyStats(progress.study);
  const cells = heatCells(progress.study);
  const nextLevelXp = level * 60;
  const xpPct = Math.round(((progress.xp - (level - 1) * 60) / 60) * 100);

  const reactDone = REACT_LESSONS.filter((l) => progress.lessons[`react/${l.slug}`]).length;
  const gameDone = GAME_PHASES.filter((p) => progress.games[p.id]).length;
  const reactPct = Math.round((reactDone / REACT_LESSONS.length) * 100);
  const gamePct = Math.round((gameDone / GAME_PHASES.length) * 100);

  const plots = [
    { name: "Vila do JS", pct: 0 },
    { name: "Campo de React", pct: reactPct },
    { name: "Estufa do TS", pct: 0 },
    { name: "Oficina Tailwind", pct: gamePct },
    { name: "Torre do Next", pct: 0 },
  ];

  function unlockedByAchievement(f: Frame): boolean {
    if (f.achievement === "react-done") return reactDone === REACT_LESSONS.length;
    if (f.achievement === "days-100") return stats.total >= 100;
    if (f.achievement === "dragon-slayer") return progress.dragonWins >= 1;
    return false;
  }
  function owns(f: Frame): boolean {
    return progress.ownedFrames.includes(f.id) || unlockedByAchievement(f);
  }

  const equipped = FRAMES.find((f) => f.id === progress.equippedFrame && owns(f)) ?? FRAMES[0];

  function buy(f: Frame) {
    if (f.price === null) return;
    if (buyFrame(f.id, f.price)) toast("Moldura comprada e equipada!");
    else toast("Faltam moedinhas para essa moldura.");
  }

  function wipe() {
    if (window.confirm("Apagar todo o seu progresso neste navegador? Isso não pode ser desfeito.")) {
      reset();
      toast("Progresso apagado.");
    }
  }

  return (
    <>
      <PageTitle title="Meu perfil" />

      <section className="box mb-7 grid items-center gap-7 md:grid-cols-[auto_1fr]">
        <div className="frame" data-f={equipped.style}>
          <div className="in"><AvatarSvg /></div>
        </div>
        <div>
          <label className="sr-only" htmlFor="nome">Seu nome</label>
          <input
            id="nome"
            value={progress.name}
            onChange={(e) => setName(e.target.value.slice(0, 24))}
            className="px mb-1.5 w-full max-w-md border-[3px] border-transparent bg-transparent text-lg hover:border-line focus:border-line"
          />
          <p className="mb-2.5 text-muted">
            Nível {level} · <LevelTitle level={level} /> · {coins} moedinhas
          </p>
          <div className="bar max-w-[420px]" role="progressbar" aria-valuenow={xpPct} aria-valuemin={0} aria-valuemax={100} aria-label="Experiência do nível">
            <i style={{ width: `${xpPct}%` }} />
          </div>
          <p className="mt-1.5 text-sm text-muted">
            Faltam {Math.max(0, nextLevelXp - progress.xp)} moedinhas para o próximo nível. O nível sobe com as moedinhas
            acumuladas, então gastar nunca faz você perder nível.
          </p>
        </div>
      </section>

      <h2 className="px mb-3.5 text-sm">
        <span className="only-farm">Seu jardim</span>
        <span className="only-night">Sua skyline</span>
      </h2>
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {plots.map((p) => (
          <div key={p.name} className="border-[3px] border-line bg-panel p-2.5 text-center shadow-[3px_3px_0_var(--shade)]">
            <div className="mx-auto h-16 w-16"><GrowthIcon stage={stageOf(p.pct)} /></div>
            <b className="block text-[15px]">{p.name}</b>
            <small className="text-muted">{p.pct}%</small>
          </div>
        ))}
      </div>

      <h2 className="px mb-3.5 text-sm">Dias estudados</h2>
      <div className="box mb-8">
        <div className="heat" aria-label="Calendário de estudo das últimas 14 semanas">
          {cells.map((c) => (
            <i key={c.date} className={c.level ? `heat-${c.level}` : ""} title={c.date + (c.level ? ": estudou" : "")} />
          ))}
        </div>
        <p className="mb-0 mt-2.5 text-sm text-muted">
          Total: <b>{stats.total}</b> · melhor sequência: <b>{stats.best}</b> · últimos 30 dias: <b>{stats.last30}</b>. Faltar um dia não zera nada.
        </p>
      </div>

      <h2 className="px mb-3.5 text-sm">Molduras</h2>
      <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {FRAMES.map((f) => {
          const has = owns(f);
          const isOn = equipped.id === f.id;
          const lockedByLevel = f.price !== null && !has && f.level > level;
          return (
            <div
              key={f.id}
              className={
                "flex items-center gap-3.5 border-[3px] bg-panel p-3 shadow-[3px_3px_0_var(--shade)] " +
                (isOn ? "border-gold" : "border-line")
              }
            >
              <div className={"frame frame-small" + (has ? "" : " frame-locked")} data-f={f.style}>
                <div className="in" />
              </div>
              <div>
                <b>{theme === "dark" ? f.name.night : f.name.farm}</b>
                <small className="mb-1.5 block text-[13px] leading-snug text-muted">{f.requirement}</small>
                {has ? (
                  isOn ? (
                    <b>Equipada</b>
                  ) : (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => equipFrame(f.id)}>Usar</button>
                  )
                ) : f.price === null ? (
                  <small className="text-muted">Bloqueada</small>
                ) : lockedByLevel ? (
                  <small className="text-muted">Chegue ao nível {f.level}</small>
                ) : (
                  <button type="button" className="btn btn-sm" onClick={() => buy(f)}>Comprar</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border-[3px] border-dashed border-line p-4 text-[15px] text-muted">
        <p className="mb-2">
          Seu progresso fica salvo só neste navegador (localStorage). Sem conta e sem servidor, por enquanto.
        </p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={wipe}>Apagar meu progresso</button>
      </div>
    </>
  );
}
