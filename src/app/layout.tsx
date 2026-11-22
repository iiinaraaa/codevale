import type { Metadata, Viewport } from "next";
import { Press_Start_2P, Atkinson_Hyperlegible, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { PomodoroWidget } from "@/components/PomodoroWidget";
import { THEME_SCRIPT } from "@/lib/theme-script";

const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel", display: "swap" });
const body = Atkinson_Hyperlegible({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Codevale > Aprendendo a programar",
  description:
    "Plataforma open source para estudar React, Next.js, TypeScript e Tailwind CSS, com tema pixel art (Farm de dia, Night City à noite).",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${pixel.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="mx-auto max-w-[1120px] px-4 pb-28 pt-7">{children}</main>
          <PomodoroWidget />
        </Providers>
      </body>
    </html>
  );
}
