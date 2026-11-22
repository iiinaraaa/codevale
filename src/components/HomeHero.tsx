"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { studyStats } from "@/lib/stats";
import { REACT_LESSONS } from "@/content/react-lessons";

const LEVEL_TITLES: [number, string, string][] = [
  [15, "Fazendeiro mestre", "Lenda da cidade"],
  [10, "Jardineiro", "Netrunner"],
  [5, "Broto", "Hacker júnior"],
  [1, "Semente", "Novato"],
];

export function LevelTitle({ level }: { level: number }) {
  const t = LEVEL_TITLES.find(([min]) => level >= min) ?? LEVEL_TITLES[LEVEL_TITLES.length - 1];
  return (
    <>
      <span className="only-farm">{t[1]}</span>
      <span className="only-night">{t[2]}</span>
    </>
  );
}

export function HomeHero() {
  const { progress, level } = useProgress();
  const stats = studyStats(progress.study);

  const next = REACT_LESSONS.find((l) => !progress.lessons[`react/${l.slug}`]);
  const doneCount = REACT_LESSONS.filter((l) => progress.lessons[`react/${l.slug}`]).length;
  const pct = Math.round((doneCount / REACT_LESSONS.length) * 100);

  return (
    <section className="mb-7 grid items-stretch gap-6 md:grid-cols-[1.5fr_1fr]">
      <div className="box">
        <h1 className="px mb-3 text-[clamp(18px,3.2vw,26px)]">
          <span className="only-farm">De volta ao vale.</span>
          <span className="only-night">A cidade te esperava.</span>
        </h1>
        <p className="text-muted">
          Você estudou <b>{stats.total}</b> {stats.total === 1 ? "dia" : "dias"} no total. Esse número só cresce, nunca zera.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {next ? (
            <Link href={`/trilhas/react/${next.slug}`} className="btn">
              {doneCount === 0 ? "Começar: React" : `Continuar: ${next.title}`}
            </Link>
          ) : (
            <Link href="/trilhas/react" className="btn">Rever o Campo de React</Link>
          )}
          <span className="text-[15px] text-muted">
            {doneCount} de {REACT_LESSONS.length} lições de React
          </span>
        </div>
        <div className="bar mt-4" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso em React">
          <i style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="stat"><b>{stats.total}</b><span>dias estudados</span></div>
        <div className="stat"><b>Nv {level}</b><span><LevelTitle level={level} /></span></div>
        <div className="stat"><b>{stats.best}</b><span>melhor sequência (sem pressão)</span></div>
        <div className="stat"><b>{stats.last30}</b><span>dias nos últimos 30</span></div>
      </div>
    </section>
  );
}
