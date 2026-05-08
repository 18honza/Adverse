import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold uppercase tracking-[4px] text-accent mb-4",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DividerRed({ className }: { className?: string }) {
  return (
    <hr
      className={cn(
        "w-8 h-[2px] bg-accent border-0 my-4 mx-auto",
        className,
      )}
    />
  );
}
