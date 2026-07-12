"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * Global chrome (header + footer) for the production site. The /fable
 * concept route ships its own art-directed chrome, so the shared one
 * steps aside there. Children stay server-rendered (passed as props).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFable = pathname === "/fable" || pathname?.startsWith("/fable/");

  if (isFable) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
