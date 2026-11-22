import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRACKS, getTrack } from "@/content/tracks";
import { contentFor } from "@/content";
import { PageTitle } from "@/components/PageTitle";
import { LessonSidebar } from "@/components/LessonSidebar";
import { LessonView } from "@/components/LessonView";

type Props = { params: Promise<{ track: string; lesson: string }> };

export function generateStaticParams() {
  return TRACKS.flatMap((t) => contentFor(t.slug).lessons.map((l) => ({ track: t.slug, lesson: l.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track, lesson } = await params;
  const t = getTrack(track);
  const l = contentFor(track).lessons.find((x) => x.slug === lesson);
  if (!t || !l) return { title: "Codevale" };
  return { title: `Codevale > Aprendendo ${t.short} > ${l.title}` };
}

export default async function LessonPage({ params }: Props) {
  const { track, lesson } = await params;
  const t = getTrack(track);
  const { lessons, phases } = contentFor(track);
  const index = lessons.findIndex((l) => l.slug === lesson);
  if (!t || index < 0) notFound();

  const current = lessons[index];
  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  return (
    <>
      <PageTitle title={`Aprendendo ${t.short} > ${current.title}`} />
      <div className="mb-2.5 font-mono text-sm text-muted">
        {t.place} › Fase {current.phase} › {current.title}
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[290px_minmax(0,1fr)]">
        <LessonSidebar trackSlug={t.slug} trackPlace={t.place} phases={phases} lessons={lessons} currentSlug={current.slug} />
        <LessonView
          trackSlug={t.slug}
          lesson={current}
          reviewQuiz={prev?.activity}
          prevSlug={prev?.slug}
          nextSlug={next?.slug}
        />
      </div>
    </>
  );
}
