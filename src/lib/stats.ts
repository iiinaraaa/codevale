import { dayKey } from "./progress";

export type HeatCell = { date: string; level: 0 | 1 | 2 | 3 };

const DAY = 24 * 60 * 60 * 1000;

function parse(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** últimas `days` datas (a mais antiga primeiro), terminando hoje */
export function heatCells(study: Record<string, number>, days = 98): HeatCell[] {
  const cells: HeatCell[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const key = dayKey(d);
    const n = study[key] ?? 0;
    cells.push({ date: key, level: n === 0 ? 0 : n < 3 ? 1 : n < 6 ? 2 : 3 });
  }
  return cells;
}

export function studyStats(study: Record<string, number>) {
  const keys = Object.keys(study)
    .filter((k) => study[k] > 0)
    .sort();
  const total = keys.length;

  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const k of keys) {
    const d = parse(k);
    run = prev && Math.round((d.getTime() - prev.getTime()) / DAY) === 1 ? run + 1 : 1;
    if (run > best) best = run;
    prev = d;
  }

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29).getTime();
  const last30 = keys.filter((k) => parse(k).getTime() >= start).length;

  return { total, best, last30 };
}
