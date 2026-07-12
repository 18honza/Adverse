import Link from "next/link";

/**
 * Ink footer with the outlined wordmark running the full width — the
 * page signs off the way a poster does.
 */
export function FableFooter() {
  return (
    <footer
      data-fable-tone="paper"
      className="bg-[color:var(--f-ink)] px-[6vw] pt-[10vh] pb-8 text-[color:var(--f-white)] overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="fable-stroke-faint block text-center font-display font-bold uppercase leading-[0.8] tracking-tight text-[clamp(4rem,17vw,15rem)] select-none"
      >
        Adverse
      </span>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-[color:var(--f-white)]/15 pt-6">
        <nav aria-label="Patička">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { href: "/sluzby", label: "Služby" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/reference", label: "Reference" },
              { href: "/o-nas", label: "O nás" },
              { href: "/kontakt", label: "Kontakt" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[11px] font-bold uppercase tracking-[2px] text-[color:var(--f-white)]/60 transition-colors hover:text-[color:var(--f-white)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-[11px] uppercase tracking-[2px] text-[color:var(--f-white)]/40">
          © 2026 Adverse · Fable koncept
        </p>
      </div>
    </footer>
  );
}
