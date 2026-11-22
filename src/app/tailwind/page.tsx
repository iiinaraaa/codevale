import type { Metadata } from "next";
import { TailwindGame } from "@/components/TailwindGame";

export const metadata: Metadata = { title: "Codevale > Praticando Tailwind" };

export default function TailwindPage() {
  return <TailwindGame />;
}
