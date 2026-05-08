const services = [
  "Meta Ads",
  "Google Ads",
  "Sociální sítě",
  "Tvorba webů",
  "Video produkce",
  "Grafický design",
];

export function Marquee() {
  // Render twice for seamless loop (translate -50% returns to start)
  const items = [...services, ...services];
  return (
    <div
      aria-hidden="true"
      className="relative bg-text text-white border-y-[3px] border-accent py-4 overflow-hidden"
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {items.map((s, i) => (
          <span
            key={i}
            className="font-display font-black text-2xl uppercase tracking-[3px] inline-flex items-center gap-12"
          >
            {s}
            <span className="w-2 h-2 bg-accent rounded-full inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
