import type { Metadata } from "next";
import { DragonBattle } from "@/components/DragonBattle";

export const metadata: Metadata = { title: "Codevale > Enfrentando o Dragão" };

export default function DragonPage() {
  return <DragonBattle />;
}
