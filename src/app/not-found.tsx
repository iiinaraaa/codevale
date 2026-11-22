import Link from "next/link";

export default function NotFound() {
  return (
    <div className="box">
      <h1 className="px mb-3 text-lg">Esse caminho não existe no vale</h1>
      <p>Talvez a lição tenha mudado de lugar. Volte ao mapa e siga a trilha de novo.</p>
      <Link href="/" className="btn">Voltar ao vale</Link>
    </div>
  );
}
