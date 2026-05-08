export interface Testimonial {
  quote: string;
  name: string;
  industry: "Realitní" | "Cestovní";
  context: string;
  /** Optional avatar URL — falls back to initials badge when missing */
  image?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Adverse vzal naše Instagram a Meta kampaně do svých rukou — během tří měsíců nám zdvojnásobili počet poptávek. Vidíme rozdíl, slyšíme rozdíl.",
    name: "Pavel Novák",
    industry: "Realitní",
    context: "Realitní agentura — Středočeský kraj",
  },
  {
    quote:
      "Konečně agentura, která chápe, že každý klient je jiný. Místo šablon jsme dostali strategii, která sedí přesně našemu produktu.",
    name: "Hana Dvořáková",
    industry: "Cestovní",
    context: "Travel — exotické dovolené",
  },
  {
    quote:
      "Web, který nám udělali, mi za první měsíc přinesl víc kontaktů než předchozí dva roky dohromady. Kluci jsou šikovní a hlavně dostupní.",
    name: "Tomáš Krejčí",
    industry: "Realitní",
    context: "Realitní makléř",
  },
  {
    quote:
      "Reels a video obsah, který nám natočili, máme stále v top postech. Cena/výsledek je pro nás nepřekonatelná.",
    name: "Michaela Veselá",
    industry: "Cestovní",
    context: "Cestovní kancelář",
  },
  {
    quote:
      "Co se nám líbí: nikdy nemlží. Když něco funguje, řeknou. Když něco nefunguje, taky. Bez toho dnes marketing nedělá smysl.",
    name: "Lukáš Beneš",
    industry: "Realitní",
    context: "Realitní agentura — Brno",
  },
  {
    quote:
      "Grafický manuál a redesign sociálních sítí — všechno padlo na hodinu. Vypadáme dnes profesionálněji než velké řetězce.",
    name: "Petr Horák",
    industry: "Cestovní",
    context: "Travel agentura — Plzeň",
  },
];
