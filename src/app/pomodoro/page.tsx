import type { Metadata } from "next";
import { PomodoroSetup } from "@/components/PomodoroSetup";

export const metadata: Metadata = { title: "Codevale > Hora do foco" };

export default function PomodoroPage() {
  return <PomodoroSetup />;
}
