"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
 * Default theme: `light`. On every route change we re-query the sections
 * and reset to the default — otherwise the previous page's theme would
 * stick to <body> and the new page's section elements (fresh DOM nodes)
 * would never be observed because we'd be holding stale references.
 */
export function ScrollTheme({ defaultTheme = "light" }: { defaultTheme?: string }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset to default on every route change so we never inherit the
    // outgoing page's theme while the new page is rendering.
    document.body.dataset.theme = defaultTheme;

    // Track which section is currently "active" — the one whose centre is
    // closest to the viewport centre.
    let activeId: string | null = null;
    // Re-query sections lazily so DOM swaps (route transitions, suspense
    // boundaries resolving, etc.) are picked up automatically.
    let sections: HTMLElement[] = [];
    const refreshSections = () => {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section-theme]"),
      );
    };

    const update = () => {
      // If our cached list went stale (page swap), refresh it.
      if (
        !sections.length ||
        !document.contains(sections[0])
      ) {
        refreshSections();
      }
      if (!sections.length) return;

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

    refreshSections();
    // Run after the new route's DOM has had a chance to commit.
    requestAnimationFrame(() => {
      refreshSections();
      update();
    });

    // Also watch DOM mutations on <main> — when the page swaps, sections
    // appear/disappear and we want to react immediately rather than wait
    // for the first scroll event.
    const main = document.querySelector("main") ?? document.body;
    const observer = new MutationObserver(() => {
      refreshSections();
      update();
    });
    observer.observe(main, { childList: true, subtree: true });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [defaultTheme, pathname]);

  return null;
}
