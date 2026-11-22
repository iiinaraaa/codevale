"use client";

import { useState } from "react";
import type { Quiz as QuizData } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { useToast } from "@/lib/toast";

export function Quiz({
  title,
  quiz,
  quizKey,
  reward = 5,
  alt = false,
}: {
  title: string;
  quiz: QuizData;
  quizKey: string;
  reward?: number;
  alt?: boolean;
}) {
  const { rewardOnce } = useProgress();
  const toast = useToast();
  const [picked, setPicked] = useState<number | null>(null);

  function pick(i: number) {
    setPicked(i);
    if (i === quiz.answer && rewardOnce(quizKey, reward)) {
      toast(`Acertou! +${reward} moedinhas.`);
    }
  }

  return (
    <section className={"box " + (alt ? "box-alt" : "")}>
      <h2 className="px mb-3.5 text-sm">{title}</h2>
      <p>{quiz.question}</p>
      <div className="my-3 grid gap-2" role="group" aria-label="Opções">
        {quiz.options.map((o, i) => {
          const cls = picked === i ? (i === quiz.answer ? "ok" : "no") : "";
          return (
            <button key={i} type="button" className={`opt ${cls}`} onClick={() => pick(i)}>
              {o}
            </button>
          );
        })}
      </div>
      <div className="min-h-[1.6em] font-bold" aria-live="polite">
        {picked === null ? "" : picked === quiz.answer ? `Isso! ${quiz.explain}` : "Quase. Tente de novo, sem pressa."}
      </div>
    </section>
  );
}
