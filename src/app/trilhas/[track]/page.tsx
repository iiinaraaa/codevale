import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TRACKS, getTrack } from "@/content/tracks";
import { contentFor } from "@/content";
import { PageTitle } from "@/components/PageTitle";
import { LessonSidebar } from "@/components/LessonSidebar";

type Props = { params: Promise<{ track: string }> };

export function generateStaticParams() {
  return TRACKS.filter((t) => t.kind === "course").map((t) => ({ track: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { track } = await params;
  const t = getTrack(track);
  return { title: t ? `Codevale > Aprendendo ${t.short}` : "Codevale" };
}

export default async function TrackPage({ params }: Props) {
  const { track } = await params;
  const t = getTrack(track);
  if (!t || t.kind !== "course") notFound();

  const { lessons, phases } = contentFor(t.slug);
  const first = lessons[0];

  return (
    <>
      <PageTitle title={`Aprendendo ${t.short}`} />
      <div className="grid items-start gap-7 lg:grid-cols-[290px_minmax(0,1fr)]">
        {lessons.length > 0 ? (
          <LessonSidebar trackSlug={t.slug} trackPlace={t.place} phases={phases} lessons={lessons} />
        ) : null}
        <div className="box">
          <h1 className="px mb-3 text-[clamp(16px,2.6vw,22px)]">{t.place}</h1>
          <p className="font-bold">{t.name}</p>
          <p className="text-muted">{t.description}</p>
          {first ? (
            <>
              <p>
                Cada lição segue o mesmo ritmo: pra que serve, vídeo, código explicado linha por linha, armadilhas e uma
                atividade. Uma ideia nova por vez.
              </p>
              <Link href={`/trilhas/${t.slug}/${first.slug}`} className="btn">Começar a primeira lição</Link>
            </>
          ) : (
            <p>
              Este lugar do vale ainda está em construção. Quer ajudar a criar as lições? Veja o CONTRIBUTING.md do
              projeto.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
