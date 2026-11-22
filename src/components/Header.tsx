"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/lib/progress";
import { useTheme } from "@/lib/theme";
import { SPRITES } from "@/content/sprites";

const NAV = [
  { href: "/", label: "Vale" },
  { href: "/trilhas/react", label: "React" },
  { href: "/tailwind", label: "Tailwind" },
  { href: "/dragao", label: "Dragão" },
  { href: "/pomodoro", label: "Pomodoro" },
  { href: "/perfil", label: "Perfil" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const { coins } = useProgress();
  const { toggle } = useTheme();

  return (
    <header className="sticky top-0 z-20 border-b-4 border-line bg-panel">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-4 px-4 py-2.5">
        <Link href="/" className="flex items-center gap-2.5 no-underline" aria-label="Codevale, página inicial">
          <svg width="38" height="33" viewBox="0 0 24 21" shapeRendering="crispEdges" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SPRITES.torre }} />
          <span className="px text-[15px] text-ink">Codevale</span>
        </Link>

        <nav aria-label="Principal" className="flex flex-1 gap-1.5 overflow-x-auto p-1">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "whitespace-nowrap border-[3px] px-3 py-2 font-bold no-underline " +
                  (active
                    ? "border-line bg-accent text-on-accent shadow-[3px_3px_0_var(--shade)]"
                    : "border-transparent hover:border-line")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <span className="chip" title="Suas moedinhas">
            <i className="coin" />
            <span>{coins}</span>
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-label="Trocar tema"
            className="cursor-pointer border-[3px] border-line bg-panel2 px-3 py-1.5 font-bold shadow-[3px_3px_0_var(--shade)] active:translate-x-0.5 active:translate-y-0.5"
          >
            <span className="only-farm">Farm ☀</span>
            <span className="only-night">Night City ☾</span>
          </button>
        </div>
      </div>
    </header>
  );
}
