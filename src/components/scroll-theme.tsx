"use client";

import { useEffect } from "react";

/**
 * Section-owned scroll theming. Mount once near the page root. Every
 * element marked `data-section-theme="<name>"` becomes a watched section;
 * when its centre crosses the viewport centre, `<body>` adopts that
 * theme via `data-theme`. Globals.css interpolates `background-color`
 * and `color` over 480ms so the surface morphs smoothly.
 *
 * Themes recognised today: `light`, `cream`, `dark`, `red`.
 * Adding more = add a CSS rule in globals.css and use the new value as a
 * `data-section-theme` on any section. No code changes needed here.
 *
 * Default theme: `light`. We never tear it down — the last section to win
 * remains the theme until the next one crosses center.
 */
export function ScrollTheme({ defaultTheme = "light" }: { defaultTheme?: string }) {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]"),
    );
    if (!sections.length) return;

    // Set the default immediately so we don't flash an unstyled state.
    document.body.dataset.theme = defaultTheme;

    // Track which section is currently "active" — the one whose centre is
    // closest to the viewport centre.
    let activeId: string | null = null;

    const update = () => {
      const vpCenter = window.innerHeight / 2;
      let best: { id: string; dist: number; theme: string } | null = null;

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        // Section must overlap viewport at all
        if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - vpCenter);
        const theme = el.dataset.sectionTheme ?? defaultTheme;
        const id = `${el.dataset.themeId ?? el.id ?? theme}-${rect.top.toFixed(0)}`;
        if (!best || dist < best.dist) best = { id, dist, theme };
      }

      if (best && best.id !== activeId) {
        activeId = best.id;
        if (document.body.dataset.theme !== best.theme) {
          document.body.dataset.theme = best.theme;
        }
      }
    };

    // Use rAF-coalesced scroll handler — IntersectionObserver alone fires
    // edge events but we want centre proximity, which scroll gives us cheaply.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [defaultTheme]);

  return null;
}
