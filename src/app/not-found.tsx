import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center min-h-[70vh] text-center px-6">
      <div>
        <div className="font-display text-[clamp(6rem,20vw,12rem)] text-accent leading-none">
          404
        </div>
        <p className="text-lg text-text-muted my-6 max-w-md">
          Tato stránka neexistuje. Zkuste to znovu z domovské stránky.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-text text-white text-xs font-bold uppercase tracking-[2px] hover:bg-accent transition-colors"
        >
          Zpět domů
        </Link>
      </div>
    </section>
  );
}
