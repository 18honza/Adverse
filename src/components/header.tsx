"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => setOpen(false), [pathname]);

  // Body scroll lock that preserves position on iOS Safari.
  // The naive `body.style.overflow = "hidden"` approach loses the scroll
  // position on iOS — page jumps to the top when the menu opens.
  // The position-fixed-with-saved-scroll trick is the bulletproof fix.
  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const body = document.body;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-bg border-b border-divider">
      <div className="mx-auto max-w-(--container-default) flex items-center justify-between px-5 md:px-6 py-3 md:py-4 gap-6">
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
            className="h-8 md:h-9 w-auto"
          />
        </Link>

        <button
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 relative z-[70]"
        >
          {/* Toggle icon — keep it stable visually so the user always sees the
              right action (X when open, hamburger when closed). */}
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          id="primary-nav"
          className="hidden md:flex items-center gap-8"
          aria-label="Hlavní navigace"
        >
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

      {/* Fullscreen mobile menu overlay */}
      <AnimatePresence>
        {open && <MobileMenu pathname={pathname} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

// =====================================================================
// Mobile menu — fullscreen overlay
// =====================================================================
function MobileMenu({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      id="mobile-menu"
      key="mobile-menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden fixed inset-0 z-[60] bg-bg flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobilní navigace"
    >
      {/* Header offset so logo + close X stay aligned with the underlying header */}
      <div className="h-[59px] shrink-0 border-b border-divider" />
      <div className="h-[3px] bg-accent shrink-0" />

      {/* Nav items */}
      <motion.nav
        className="flex-1 flex flex-col justify-center px-6 -mt-12 overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
        }}
      >
        <ul>
          {site.nav.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <motion.li
                key={item.href}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-divider"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-baseline gap-5 py-5 font-display font-black uppercase tracking-tight",
                    "text-3xl",
                    "transition-colors active:text-accent",
                    isActive ? "text-accent" : "text-text",
                  )}
                >
                  <span className="text-[10px] tracking-[3px] text-accent shrink-0 w-5 font-sans">
                    0{i + 1}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-accent" aria-hidden="true">
                      ←
                    </span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>

      {/* Quick contact — fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="px-6 py-5 border-t border-divider bg-surface-alt shrink-0"
      >
        <div className="text-[10px] uppercase tracking-[3px] text-accent font-bold mb-3">
          Rychlý kontakt
        </div>
        <div className="space-y-2">
          {site.team.map((p) => (
            <div
              key={p.email}
              className="flex items-center justify-between text-sm"
            >
              <span className="font-bold text-text">{p.name}</span>
              <div className="flex items-center gap-3 text-text-muted">
                <a
                  href={`tel:${p.phone}`}
                  aria-label={`Zavolat ${p.name}`}
                  className="flex items-center gap-1.5 active:text-accent transition-colors"
                  onClick={onClose}
                >
                  <Phone size={14} className="text-accent" />
                  {p.phoneDisplay}
                </a>
              </div>
            </div>
          ))}
          <a
            href={`mailto:${site.team[0].email}`}
            className="flex items-center gap-2 pt-2 text-text-muted text-xs active:text-accent transition-colors"
            onClick={onClose}
          >
            <Mail size={14} className="text-accent" />
            {site.team[0].email}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// =====================================================================
// Desktop NavLink — 3-layer hover effect (minhxthanh / 21st.dev)
// =====================================================================
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

  return (
    <Link href={href} className="relative inline-block group">
      <span
        className={cn(
          "relative z-10 block px-4 py-2.5 text-xs font-bold uppercase tracking-[2px]",
          "transition-colors duration-300 group-hover:text-white",
          active ? "text-accent" : "text-text",
        )}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 border-t-2 border-b-2 border-text",
          "scale-y-[2] opacity-0 origin-center",
          "transition-all duration-300",
          "group-hover:scale-y-100 group-hover:opacity-100",
        )}
      />
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
