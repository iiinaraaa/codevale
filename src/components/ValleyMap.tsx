"use client";

import Link from "next/link";
import { TRACKS } from "@/content/tracks";
import { REACT_LESSONS } from "@/content/react-lessons";
import { GAME_PHASES } from "@/content/tailwind-phases";
import { SPRITES } from "@/content/sprites";
import { useProgress } from "@/lib/progress";

type SpotPos = { left: string; top: string; big?: boolean };

const POSITIONS: Record<string, SpotPos> = {
  js: { left: "14%", top: "77%" },
  react: { left: "40%", top: "81%", big: true },
  ts: { left: "71%", top: "70%" },
  tailwind: { left: "89%", top: "88%" },
  next: { left: "83%", top: "48%" },
};

/** Mapa do vale: cada lugar é uma trilha. */
export function ValleyMap() {
  const { progress } = useProgress();

  const reactDone = REACT_LESSONS.filter((l) => progress.lessons[`react/${l.slug}`]).length;
  const gameDone = GAME_PHASES.filter((p) => progress.games[p.id]).length;

  function info(slug: string): { pct: number; label: string } {
    if (slug === "react") {
      return { pct: Math.round((reactDone / REACT_LESSONS.length) * 100), label: `${reactDone} de ${REACT_LESSONS.length} lições` };
    }
    if (slug === "tailwind") {
      return { pct: Math.round((gameDone / GAME_PHASES.length) * 100), label: `${gameDone} de ${GAME_PHASES.length} fases` };
    }
    return { pct: 0, label: "em breve" };
  }

  return (
    <div>
      <div className="map-wrap">
        <div className="map">
          <svg viewBox="0 0 800 440" aria-hidden="true">
            <rect width="800" height="440" fill="var(--sky)" />
            <g className="only-farm">
              <rect x="690" y="30" width="50" height="50" fill="#FFD84A" />
              <rect x="680" y="40" width="70" height="30" fill="#FFD84A" />
              <rect x="120" y="50" width="90" height="20" fill="#fff" />
              <rect x="140" y="36" width="50" height="16" fill="#fff" />
              <rect x="400" y="80" width="110" height="20" fill="#fff" />
              <rect x="420" y="66" width="60" height="16" fill="#fff" />
            </g>
            <g className="only-night">
              <rect x="690" y="30" width="44" height="44" fill="#EDE7FF" />
              <rect x="706" y="30" width="28" height="44" fill="#190B45" />
              <rect x="90" y="40" width="4" height="4" fill="#fff" />
              <rect x="220" y="80" width="4" height="4" fill="#35E6F5" />
              <rect x="330" y="30" width="4" height="4" fill="#fff" />
              <rect x="470" y="70" width="4" height="4" fill="#FF4FA3" />
              <rect x="590" y="40" width="4" height="4" fill="#fff" />
              <rect x="40" y="110" width="4" height="4" fill="#fff" />
              <rect x="760" y="120" width="4" height="4" fill="#fff" />
            </g>
            <polygon fill="var(--hillfar)" points="0,200 80,200 80,180 200,180 200,160 320,160 320,175 440,175 440,150 560,150 560,130 680,130 680,165 800,165 800,440 0,440" />
            <polygon fill="var(--ground)" points="0,260 120,260 120,250 300,250 300,262 520,262 520,250 700,250 700,240 800,240 800,440 0,440" />
            <polygon fill="var(--water)" points="440,440 440,380 470,380 470,340 500,340 500,300 530,300 530,262 560,262 560,300 535,300 535,345 505,345 505,385 475,385 475,440" />
            <g fill="var(--path)">
              <rect x="100" y="330" width="260" height="14" />
              <rect x="350" y="300" width="14" height="44" />
              <rect x="350" y="300" width="230" height="14" />
              <rect x="566" y="300" width="14" height="70" />
              <rect x="566" y="360" width="130" height="14" />
              <rect x="640" y="205" width="14" height="110" />
            </g>
            <g transform="translate(28 263) scale(3)" dangerouslySetInnerHTML={{ __html: SPRITES.casa }} />
            <g transform="translate(100 242) scale(4)" dangerouslySetInnerHTML={{ __html: SPRITES.casa }} />
            <g transform="translate(300 195) scale(5)" dangerouslySetInnerHTML={{ __html: SPRITES.celeiro }} />
            <rect x="230" y="296" width="190" height="52" fill="var(--ground)" stroke="var(--line)" strokeWidth="4" />
            <rect x="238" y="304" width="174" height="8" fill="var(--crop)" />
            <rect x="238" y="318" width="174" height="8" fill="var(--crop2)" />
            <rect x="238" y="332" width="174" height="8" fill="var(--crop)" />
            <g transform="translate(520 216) scale(4)" dangerouslySetInnerHTML={{ __html: SPRITES.estufa }} />
            <g transform="translate(670 288) scale(4)" dangerouslySetInnerHTML={{ __html: SPRITES.oficina }} />
            <g transform="translate(620 122) scale(4)" dangerouslySetInnerHTML={{ __html: SPRITES.torre }} />
          </svg>

          {TRACKS.map((t) => {
            const pos = POSITIONS[t.slug];
            const { pct, label } = info(t.slug);
            const inner = (
              <>
                <span className="px mb-1.5 block text-[9px]">{t.place}</span>
                <span className="bar block">
                  <i style={{ width: `${pct}%` }} />
                </span>
                <small className="text-xs text-muted">{label}</small>
              </>
            );
            const cls = "spot" + (pos.big ? " spot-big" : "") + (t.status === "soon" ? " spot-off" : "");
            const style = { left: pos.left, top: pos.top };
            return t.status === "available" ? (
              <Link key={t.slug} href={t.href} className={cls} style={style}>
                {inner}
              </Link>
            ) : (
              <div key={t.slug} className={cls} style={style} title={`${t.place}: ${t.description} (em breve)`}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-2.5 text-sm text-muted">
        Cada lugar é uma trilha. O mapa acende e floresce conforme você avança. Lugares apagados abrem em breve, e nada
        trava: a ordem é só uma sugestão.
      </p>
    </div>
  );
}
