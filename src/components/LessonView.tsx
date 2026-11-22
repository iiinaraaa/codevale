"use client";

import Link from "next/link";
import type { Lesson } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { useToast } from "@/lib/toast";
import { Quiz } from "./Quiz";

export function LessonView({
  trackSlug,
  lesson,
  reviewQuiz,
  prevSlug,
  nextSlug,
}: {
  trackSlug: string;
  lesson: Lesson;
  /** pergunta da lição anterior, para "Lembra da aula passada?" */
  reviewQuiz?: Lesson["activity"];
  prevSlug?: string;
  nextSlug?: string;
}) {
  const { progress, completeLesson } = useProgress();
  const toast = useToast();
  const key = `${trackSlug}/${lesson.slug}`;
  const done = !!progress.lessons[key];

  function finish() {
    if (completeLesson(key, lesson.coins)) {
      toast(`Lição concluída! +${lesson.coins} moedinhas.`);
    }
  }

  return (
    <article className="space-y-6">
      <header>
        <h1 className="px mb-3 text-[clamp(16px,2.6vw,22px)]">{lesson.title}</h1>
        <span className="pill">~{lesson.minutes} min</span>
        <span className="pill">+{lesson.coins} moedinhas</span>
        {lesson.video && <span className="pill">vídeo em {lesson.video.lang === "en" ? "inglês" : "português"}</span>}
      </header>

      {reviewQuiz && (
        <Quiz
          alt
          title="Lembra da aula passada?"
          quiz={reviewQuiz}
          quizKey={`${key}:review`}
          reward={2}
        />
      )}

      <section className="box">
        <h2 className="px mb-3.5 text-sm">Pra que serve?</h2>
        {lesson.why.map((p, i) => (
          <p key={i} className="mb-3">{p}</p>
        ))}
        {lesson.analogy && (
          <div className="mt-3.5 grid gap-2.5 md:grid-cols-3">
            {lesson.analogy.map((a) => (
              <div key={a.label} className="border-[3px] border-line bg-panel2 p-2.5 text-[15px]">
                <b className="block">{a.label}</b>
                {a.text}
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        {lesson.video ? (
          <>
            <div className="video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${lesson.video.youtubeId}`}
                title={lesson.video.title}
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-sm text-muted">
              Vídeo: {lesson.video.title}, por{" "}
              <a className="underline" href={lesson.video.channelUrl} target="_blank" rel="noopener noreferrer">
                {lesson.video.channel}
              </a>
              . Embed oficial do YouTube.
            </p>
          </>
        ) : (
          <div className="box box-alt">
            <p className="mb-1 font-bold">Vídeo em curadoria</p>
            <p className="m-0 text-sm text-muted">
              Esta lição ainda não tem um vídeo escolhido. Sugira um pela comunidade: veja CONTRIBUTING.md.
            </p>
          </div>
        )}
        {lesson.reading && (
          <p className="mt-3 text-[15px]">
            Leitura oficial:{" "}
            <a className="font-bold underline" href={lesson.reading.url} target="_blank" rel="noopener noreferrer">
              {lesson.reading.label}
            </a>
          </p>
        )}
      </section>

      {lesson.code && (
        <section>
          <h2 className="px mb-3.5 text-sm">Explicando o código</h2>
          <pre className="code">{lesson.code.code}</pre>
          <ol className="m-0 mt-3.5 list-none space-y-2 p-0">
            {lesson.code.notes.map((n, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="pin">{i + 1}</span>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {lesson.pitfall && (
        <section className="box border-l-[10px] border-l-bad">
          <h2 className="px mb-3.5 text-sm">Armadilha comum</h2>
          <p className="m-0">{lesson.pitfall}</p>
        </section>
      )}

      <Quiz title="Atividade" quiz={lesson.activity} quizKey={`${key}:activity`} reward={5} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => toast(prevSlug ? "Que tal rever a lição anterior? Está logo ali na lista." : "Releia com calma, sem pressa.")}
        >
          Ainda não entendi
        </button>
        <button type="button" className="btn" onClick={finish} disabled={done}>
          {done ? "Lição concluída ✓" : "Concluir lição"}
        </button>
        {nextSlug && (
          <Link href={`/trilhas/${trackSlug}/${nextSlug}`} className="btn btn-ghost">
            Próxima lição
          </Link>
        )}
      </div>
    </article>
  );
}
