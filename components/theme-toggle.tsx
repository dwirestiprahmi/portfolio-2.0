"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-2 border-foreground px-2.5 py-1 font-mono text-sm uppercase tracking-widest shadow-[2px_2px_0_0_hsl(var(--foreground))] transition-[transform,box-shadow] duration-75 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_hsl(var(--foreground))] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      {mounted ? (isDark ? "Day" : "Night") : "Theme"}
    </button>
  );
}
