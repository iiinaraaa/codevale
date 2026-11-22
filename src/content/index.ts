import type { Lesson, Phase } from "./types";
import { REACT_LESSONS, REACT_PHASES } from "./react-lessons";

/** Lições e fases de cada trilha de curso. Trilhas sem conteúdo ainda retornam listas vazias. */
export function contentFor(trackSlug: string): { lessons: Lesson[]; phases: Phase[] } {
  if (trackSlug === "react") return { lessons: REACT_LESSONS, phases: REACT_PHASES };
  return { lessons: [], phases: [] };
}
