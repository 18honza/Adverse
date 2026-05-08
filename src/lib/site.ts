export const site = {
  name: "Adverse",
  url: "https://adverse.cz",
  tagline: "Výsledky, které vidíte.",
  description:
    "Adverse — digitální marketing pro realitní a cestovní agentury v ČR. Meta a Google reklamy, sociální sítě, tvorba webů, video produkce, grafika.",
  team: [
    {
      name: "Jan Jirák",
      role: "Performance & Strategy",
      phone: "+420730811665",
      phoneDisplay: "730 811 665",
      email: "jan.jirak@adverse.cz",
      bio: "Stará se o výkonnostní reklamy, strategii a komunikaci s klienty. Hodně dat, hodně otázek, žádné šablony.",
    },
    {
      name: "Ondřej Neděla",
      role: "Creative & Production",
      phone: "+420792363603",
      phoneDisplay: "792 363 603",
      email: "ondrej.nedela@adverse.cz",
      bio: "Vede kreativu, video produkci a grafický design. Bez nudných reklam a bez recyklovaných vizuálů.",
    },
  ],
  nav: [
    { href: "/sluzby", label: "Služby" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/reference", label: "Reference" },
    { href: "/o-nas", label: "O nás" },
    { href: "/kontakt", label: "Kontakt", primary: true },
  ],
} as const;
