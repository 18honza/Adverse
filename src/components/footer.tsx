import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark text-zinc-300 border-t-[3px] border-accent mt-16 sm:mt-24">
      <div className="mx-auto max-w-(--container-default) px-6 pt-16 pb-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-12 mb-12">
          <div>
            <Image
              src="/img/logo.svg"
              alt="Adverse"
              width={120}
              height={40}
              className="h-10 w-auto invert hue-rotate-180 mb-3"
            />
            <p className="font-serif italic text-text-faint">
              Každý klient je pro nás jedinečný.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs tracking-[3px] mb-4">Adverse</h4>
            <ul className="space-y-2">
              {site.nav
                .filter((n) => !("primary" in n) || !n.primary)
                .map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="hover:text-accent transition-colors"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs tracking-[3px] mb-4">Kontakt</h4>
            <ul className="space-y-4">
              {site.team.map((p) => (
                <li key={p.email}>
                  <strong className="text-white block">{p.name}</strong>
                  <a
                    href={`tel:${p.phone}`}
                    className="block hover:text-accent transition-colors"
                  >
                    {p.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${p.email}`}
                    className="block hover:text-accent transition-colors"
                  >
                    {p.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-5 text-xs text-zinc-500 tracking-wider">
          © {year} Adverse. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  );
}
