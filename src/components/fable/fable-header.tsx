"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Fixed transparent header for the Fable page. Sections declare the text
 * tone the header should use while they sit under it (`data-fable-tone=
 * "ink" | "paper"`); a rAF scroll probe reads the section crossing the
 * header line and eases the text colour to match. No bar, no blur — the
 * page surface runs uninterrupted behind the type.
 */
export function FableHeader() {
  const [tone, setTone] = useState<"ink" | "paper">("paper");

  useEffect(() => {
    const probe = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-fable-tone]"),
      );
      const lineY = 44; // vertical centre of the header content
      let next: "ink" | "paper" = "ink";
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= lineY && rect.bottom >= lineY) {
          next = (el.dataset.fableTone as "ink" | "paper") ?? "ink";
          break;
        }
      }
      setTone(next);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        probe();
        ticking = false;
      });
    };

    probe();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const ink = tone === "ink";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "flex items-center justify-between",
        "px-5 sm:px-8 py-5",
        "transition-colors duration-500",
        ink ? "text-[color:var(--f-ink)]" : "text-[color:var(--f-white)]",
      )}
    >
      <Link
        href="/"
        className="font-display font-bold uppercase tracking-tight text-base sm:text-lg leading-none"
      >
        Adverse<span className="text-[0.6em] align-super">®</span>
      </Link>

      <nav aria-label="Hlavní navigace">
        <ul className="flex items-center gap-4 sm:gap-8">
          {[
            { href: "/sluzby", label: "Služby" },
            { href: "/portfolio", label: "Portfolio" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-[10px] sm:text-[11px] font-bold uppercase tracking-[1.5px] sm:tracking-[2.5px]",
                  "border-b border-transparent pb-0.5 transition-colors duration-200",
                  ink
                    ? "hover:border-[color:var(--f-ink)]"
                    : "hover:border-[color:var(--f-white)]",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
