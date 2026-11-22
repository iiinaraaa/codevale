"use client";

import Link from "next/link";
import type { Lesson, Phase } from "@/content/types";
import { useProgress } from "@/lib/progress";

export function LessonSidebar({
  trackSlug,
  trackPlace,
  phases,
  lessons,
  currentSlug,
}: {
  trackSlug: string;
  trackPlace: string;
  phases: Phase[];
  lessons: Lesson[];
  currentSlug?: string;
}) {
  const { progress } = useProgress();
  const doneCount = lessons.filter((l) => progress.lessons[`${trackSlug}/${l.slug}`]).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;
  const currentPhase = lessons.find((l) => l.slug === currentSlug)?.phase;

  return (
    <aside aria-label={`Lições: ${trackPlace}`} className="lg:sticky lg:top-24">
      <div className="box mb-3.5 !p-3.5">
        <div className="px mb-2.5 text-[10px]">{trackPlace}</div>
        <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 text-sm text-muted">
          {doneCount} de {lessons.length} lições · sem travas, a ordem é só uma sugestão
        </div>
      </div>

      {phases.map((ph) => {
        const items = lessons.filter((l) => l.phase === ph.id);
        const allDone = items.length > 0 && items.every((l) => progress.lessons[`${trackSlug}/${l.slug}`]);
        return (
          <details
            key={ph.id}
            open={currentPhase === ph.id || (!currentSlug && !allDone)}
            className="mb-2 border-[3px] border-line bg-panel"
          >
            <summary className="cursor-pointer px-3 py-2 font-bold">
              Fase {ph.id} · {ph.title} {allDone ? "✓" : ""}
            </summary>
            <ul className="m-0 list-none p-0 pb-2">
              {items.map((l) => {
                const done = progress.lessons[`${trackSlug}/${l.slug}`];
                const now = l.slug === currentSlug;
                return (
                  <li key={l.slug}>
                    <Link
                      href={`/trilhas/${trackSlug}/${l.slug}`}
                      aria-current={now ? "page" : undefined}
                      className={
                        "block py-1 pl-9 pr-3 text-[15px] no-underline " +
                        (now ? "bg-accent font-bold text-on-accent" : "hover:bg-panel2")
                      }
                    >
                      <span className="-ml-6 mr-2 inline-block w-4">{done ? "✓" : now ? "▶" : "·"}</span>
                      {l.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        );
      })}
    </aside>
  );
}
