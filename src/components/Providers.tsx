"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme";
import { ToastProvider } from "@/lib/toast";
import { ProgressProvider } from "@/lib/progress";
import { PomodoroProvider } from "@/lib/pomodoro";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProgressProvider>
          <PomodoroProvider>{children}</PomodoroProvider>
        </ProgressProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
