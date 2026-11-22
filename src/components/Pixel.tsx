/** Pequenos pixel arts em SVG que usam as cores do tema. */

function R({ x, y, w, h, c }: { x: number; y: number; w: number; h: number; c: string }) {
  return <rect x={x} y={y} width={w} height={h} fill={c} />;
}

/** Planta (tema Farm), estágio 0 a 4 */
export function PlantSvg({ stage }: { stage: number }) {
  const soil = <R x={2} y={14} w={12} h={2} c="#7a4e2a" />;
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      {soil}
      {stage === 0 && <R x={7} y={13} w={2} h={1} c="#3a2412" />}
      {stage >= 1 && stage < 4 && (
        <>
          <R x={7} y={9} w={2} h={5} c="#3e7f2e" />
          <R x={5} y={8} w={2} h={2} c="#7dbb58" />
          <R x={9} y={8} w={2} h={2} c="#7dbb58" />
        </>
      )}
      {stage >= 2 && stage < 4 && (
        <>
          <R x={7} y={5} w={2} h={4} c="#3e7f2e" />
          <R x={4} y={5} w={3} h={2} c="#7dbb58" />
          <R x={9} y={5} w={3} h={2} c="#7dbb58" />
        </>
      )}
      {stage === 3 && (
        <>
          <R x={6} y={1} w={4} h={4} c="#c2416a" />
          <R x={7} y={2} w={2} h={2} c="#f0b323" />
        </>
      )}
      {stage >= 4 && (
        <>
          <R x={7} y={8} w={2} h={6} c="#7a4e2a" />
          <R x={2} y={1} w={12} h={8} c="#3e7f2e" />
          <R x={4} y={3} w={2} h={2} c="#c2416a" />
          <R x={9} y={5} w={2} h={2} c="#c2416a" />
          <R x={6} y={2} w={2} h={2} c="#c2416a" />
        </>
      )}
    </svg>
  );
}

/** Prédio (tema Night City): cada estágio acende um andar */
export function CitySvg({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
      <R x={2} y={14} w={12} h={2} c="#2b2070" />
      <R x={4} y={2} w={8} h={12} c="#2a2060" />
      {[0, 1, 2, 3].map((f) => {
        const on = f >= 4 - stage;
        const y = 3 + f * 3;
        return (
          <g key={f}>
            <R x={5} y={y} w={2} h={2} c={on ? "#ffd84a" : "#3d2f8f"} />
            <R x={9} y={y} w={2} h={2} c={on ? "#35e6f5" : "#3d2f8f"} />
          </g>
        );
      })}
    </svg>
  );
}

/** Planta ou prédio, conforme o tema */
export function GrowthIcon({ stage }: { stage: number }) {
  return (
    <>
      <span className="only-farm"><PlantSvg stage={stage} /></span>
      <span className="only-night"><CitySvg stage={stage} /></span>
    </>
  );
}

export function stageOf(percent: number): number {
  if (percent <= 0) return 0;
  if (percent < 25) return 1;
  if (percent < 60) return 2;
  if (percent < 100) return 3;
  return 4;
}

export function AvatarSvg() {
  return (
    <svg viewBox="0 0 12 12" role="img" aria-label="Avatar" shapeRendering="crispEdges">
      <R x={3} y={1} w={6} h={2} c="var(--wood)" />
      <R x={2} y={3} w={8} h={6} c="#f2c9a0" />
      <R x={4} y={5} w={1} h={1} c="#3a2412" />
      <R x={7} y={5} w={1} h={1} c="#3a2412" />
      <R x={5} y={7} w={2} h={1} c="#c2416a" />
      <R x={3} y={9} w={6} h={2} c="var(--accent)" />
    </svg>
  );
}

/** Coelho (Farm) e drone (Night) do jogo de Tailwind */
export function SpriteChar() {
  return (
    <>
      <span className="only-farm">
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <R x={3} y={0} w={2} h={4} c="#f7f3ea" />
          <R x={9} y={0} w={2} h={4} c="#f7f3ea" />
          <R x={3} y={1} w={1} h={2} c="#f4a6b8" />
          <R x={10} y={1} w={1} h={2} c="#f4a6b8" />
          <R x={2} y={4} w={10} h={6} c="#f7f3ea" />
          <R x={4} y={6} w={1} h={1} c="#3a2412" />
          <R x={9} y={6} w={1} h={1} c="#3a2412" />
          <R x={6} y={8} w={2} h={1} c="#f4a6b8" />
          <R x={3} y={10} w={8} h={3} c="#f7f3ea" />
          <R x={3} y={13} w={3} h={1} c="#d8cfbd" />
          <R x={8} y={13} w={3} h={1} c="#d8cfbd" />
        </svg>
      </span>
      <span className="only-night">
        <svg viewBox="0 0 14 14" aria-hidden="true">
          <R x={0} y={3} w={4} h={1} c="#6ff0fb" />
          <R x={10} y={3} w={4} h={1} c="#6ff0fb" />
          <R x={6} y={2} w={2} h={2} c="#ff4fa3" />
          <R x={2} y={4} w={10} h={5} c="#8b5cf6" />
          <R x={3} y={5} w={8} h={3} c="#2a1f66" />
          <R x={5} y={6} w={1} h={1} c="#ffd84a" />
          <R x={8} y={6} w={1} h={1} c="#ffd84a" />
          <R x={4} y={9} w={1} h={3} c="#6ff0fb" />
          <R x={9} y={9} w={1} h={3} c="#6ff0fb" />
        </svg>
      </span>
    </>
  );
}

/** Dragão do Bug (usa as cores --dg do tema). `dead` troca os olhos por X. */
export function DragonSvg({ dead = false }: { dead?: boolean }) {
  return (
    <svg viewBox="0 0 24 19" aria-hidden="true" shapeRendering="crispEdges">
      {/* asas */}
      <R x={10} y={1} w={1} h={7} c="var(--dg2)" />
      <R x={11} y={2} w={3} h={6} c="var(--dgw)" />
      <R x={14} y={1} w={1} h={7} c="var(--dg2)" />
      <R x={15} y={3} w={3} h={5} c="var(--dgw)" />
      {/* cauda */}
      <R x={18} y={10} w={3} h={3} c="var(--dg)" />
      <R x={20} y={8} w={2} h={3} c="var(--dg)" />
      <R x={21} y={5} w={2} h={3} c="var(--dg)" />
      <R x={22} y={3} w={1} h={2} c="var(--dgw)" />
      {/* corpo e barriga */}
      <R x={7} y={8} w={11} h={7} c="var(--dg)" />
      <R x={8} y={11} w={9} h={4} c="var(--dgb)" />
      <R x={7} y={14} w={11} h={1} c="var(--dg2)" />
      {/* pernas */}
      <R x={8} y={15} w={2} h={3} c="var(--dg2)" />
      <R x={14} y={15} w={2} h={3} c="var(--dg2)" />
      <R x={7} y={18} w={4} h={1} c="var(--dg)" />
      <R x={13} y={18} w={4} h={1} c="var(--dg)" />
      {/* pescoço e cabeça */}
      <R x={6} y={6} w={3} h={4} c="var(--dg)" />
      <R x={2} y={5} w={6} h={5} c="var(--dg)" />
      <R x={0} y={8} w={3} h={3} c="var(--dg)" />
      <R x={1} y={8} w={1} h={1} c="var(--dg2)" />
      <R x={1} y={10} w={3} h={1} c="var(--dg2)" />
      <R x={1} y={11} w={1} h={1} c="#ffffff" />
      <R x={3} y={11} w={1} h={1} c="#ffffff" />
      {/* chifres */}
      <R x={4} y={3} w={1} h={2} c="var(--dg2)" />
      <R x={7} y={3} w={1} h={2} c="var(--dg2)" />
      {/* olho */}
      {dead ? (
        <>
          <R x={4} y={6} w={1} h={1} c="#000000" />
          <R x={6} y={6} w={1} h={1} c="#000000" />
          <R x={5} y={7} w={1} h={1} c="#000000" />
          <R x={4} y={8} w={1} h={1} c="#000000" />
          <R x={6} y={8} w={1} h={1} c="#000000" />
        </>
      ) : (
        <>
          <R x={4} y={6} w={3} h={2} c="#ffffff" />
          <R x={4} y={6} w={1} h={2} c="#000000" />
          <R x={6} y={6} w={1} h={1} c="var(--accent2)" />
        </>
      )}
    </svg>
  );
}

/** Heroína/herói com espada */
export function HeroSvg() {
  return (
    <svg viewBox="0 0 14 16" aria-hidden="true" shapeRendering="crispEdges">
      <R x={3} y={0} w={6} h={3} c="#9aa0b5" />
      <R x={4} y={0} w={4} h={1} c="#c9cedd" />
      <R x={3} y={3} w={6} h={3} c="#f2c9a0" />
      <R x={7} y={4} w={1} h={1} c="#3a2412" />
      <R x={2} y={6} w={8} h={5} c="var(--accent)" />
      <R x={4} y={7} w={4} h={1} c="var(--gold)" />
      <R x={1} y={7} w={2} h={3} c="#f2c9a0" />
      <R x={10} y={6} w={2} h={2} c="#f2c9a0" />
      <R x={12} y={1} w={1} h={8} c="#e8ebf5" />
      <R x={11} y={8} w={3} h={1} c="var(--gold)" />
      <R x={3} y={11} w={2} h={3} c="#5a3a1e" />
      <R x={7} y={11} w={2} h={3} c="#5a3a1e" />
      <R x={2} y={14} w={3} h={2} c="#3a2412" />
      <R x={7} y={14} w={3} h={2} c="#3a2412" />
    </svg>
  );
}
