"use client";

import { useEffect, useState } from "react";

export type TtThemeId = "grey" | "black" | "white" | "sepia";

function normalizeTheme(v: string | null): TtThemeId {
  return v === "grey" || v === "black" || v === "white" || v === "sepia"
    ? v
    : "black";
}

export function getTtTheme(): TtThemeId {
  if (typeof document === "undefined") return "black";
  return normalizeTheme(document.documentElement.getAttribute("data-tt-theme"));
}

export function useTtTheme(): TtThemeId {
  const [theme, setTheme] = useState<TtThemeId>(() => getTtTheme());

  useEffect(() => {
    const el = document.documentElement;

    const update = () => setTheme(getTtTheme());
    update();

    const obs = new MutationObserver(() => update());
    obs.observe(el, { attributes: true, attributeFilter: ["data-tt-theme"] });

    return () => obs.disconnect();
  }, []);

  return theme;
}

export function isDarkTtTheme(theme: TtThemeId): boolean {
  // In TokenTap, only the explicit "white" theme is light.
  return theme !== "white";
}