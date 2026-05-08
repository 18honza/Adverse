"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-divider">
      <div className="mx-auto max-w-(--container-default) flex items-center justify-between px-6 py-4 gap-6">
        <Link
          href="/"
          aria-label="Adverse — domovská stránka"
          className="shrink-0"
        >
          <Image
            src="/img/logo.svg"
            alt="Adverse"
            width={120}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <button
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav id="primary-nav" className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              primary={"primary" in item ? item.primary : false}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </div>

      <div className="h-[3px] bg-accent" />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-bg border-b border-divider"
          >
            <ul className="flex flex-col px-6 py-2">
              {site.nav.map((item) => (
                <li
                  key={item.href}
                  className="border-b border-divider last:border-b-0"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-4 text-xs font-bold uppercase tracking-[2px] transition-colors",
                      pathname === item.href
                        ? "text-accent"
                        : "text-text hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  primary,
  active,
}: {
  href: string;
  label: string;
  primary: boolean;
  active: boolean;
}) {
  // Primary CTA (Kontakt) keeps its red pill — it's visually the strongest
  // call to action in the nav and shouldn't blend with the others.
  if (primary) {
    return (
      <Link
        href={href}
        className="bg-accent text-white text-xs font-bold uppercase tracking-[2px] px-4 py-2 rounded-sm hover:bg-accent-hover transition-colors"
      >
        {label}
      </Link>
    );
  }

  // Non-primary items: 3-layer hover effect adapted from minhxthanh/21st.dev.
  //   1. Text turns from text-color → white as the box fills.
  //   2. Top + bottom borders fly in from doubled vertical scale → 1.
  //   3. Black background fills from the top down (origin-top scale 0 → 1).
  return (
    <Link
      href={href}
      className="relative inline-block group"
    >
      <span
        className={cn(
          "relative z-10 block px-4 py-2.5 text-xs font-bold uppercase tracking-[2px]",
          "transition-colors duration-300 group-hover:text-white",
          active ? "text-accent" : "text-text",
        )}
      >
        {label}
      </span>
      {/* Top + bottom borders — start at scaleY(2), compress to 1 on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-t-2 border-b-2 border-text",
          "scale-y-[2] opacity-0 origin-center",
          "transition-all duration-300",
          "group-hover:scale-y-100 group-hover:opacity-100",
        )}
      />
      {/* Background fill — drops from top */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[2px] left-0 w-full h-full bg-text",
          "scale-0 opacity-0 origin-top",
          "transition-all duration-300",
          "group-hover:scale-100 group-hover:opacity-100",
        )}
      />
    </Link>
  );
}
