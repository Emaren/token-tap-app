"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type ThemeId = "grey" | "black" | "white" | "sepia";

const STORAGE_KEY = "tokentap.theme.v1";

const THEMES: Array<{ id: ThemeId; label: string; swatch: string }> = [
  { id: "grey", label: "Grey", swatch: "#8f9399" },
  { id: "black", label: "Black", swatch: "#111111" },
  { id: "white", label: "White", swatch: "#f6f6f6" },
  { id: "sepia", label: "Sepia", swatch: "#7a5c43" },
];

function applyTheme(theme: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-tt-theme", theme);
}

function normalizeTheme(v: string | null): ThemeId {
  return v === "grey" || v === "black" || v === "white" || v === "sepia" ? v : "black";
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("black");
  const pathname = usePathname();
  const dockRight = "max(0.75rem, calc((100vw - var(--tt-shell-max, 100vw)) / 2 + 0.75rem))";

  useEffect(() => {
    const stored = normalizeTheme(
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    );
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const onPick = (next: ThemeId) => {
    setTheme(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  if (pathname === "/") return null;

  return (
    <div
      className="fixed top-[calc(env(safe-area-inset-top)+0.5rem)] z-[1200]"
      style={{ right: dockRight }}
    >
      <div className="rounded-full border border-white/25 bg-black/50 backdrop-blur px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-1.5">
          {THEMES.map((t) => {
            const active = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                title={t.label}
                aria-label={`Switch theme to ${t.label}`}
                onClick={() => onPick(t.id)}
                className={[
                  "w-5 h-5 rounded-full border transition-transform",
                  active ? "scale-110 border-cyan-300" : "border-white/40",
                ].join(" ")}
                style={{ background: t.swatch }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
