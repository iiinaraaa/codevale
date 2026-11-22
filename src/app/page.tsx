import { PageTitle } from "@/components/PageTitle";
import { HomeHero } from "@/components/HomeHero";
import Link from "next/link";
import { ValleyMap } from "@/components/ValleyMap";

export default function HomePage() {
  return (
    <>
      <PageTitle title="Aprendendo a programar" />
      <HomeHero />
      <h2 className="px mb-3.5 text-sm">Mapa do vale</h2>
      <ValleyMap />
      <div className="box box-alt mt-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="px mb-2 text-sm">Desafio do dragão</h2>
          <p className="m-0 text-muted">Responda perguntas sobre o que você estudou e derrote o dragão, golpe a golpe.</p>
        </div>
        <Link href="/dragao" className="btn">Enfrentar o dragão</Link>
      </div>
    </>
  );
}
