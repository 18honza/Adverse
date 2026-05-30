# Product

## Register

brand

## Users

Majitelé a marketingoví ředitelé malých až středně velkých realitních a cestovních agentur v ČR. Věk 30–50, povětšinou ne-technický, mají vlastní byznys a něco už zkusili (často špatně). Web čtou v krátkých návštěvách mezi schůzkami: rychle posoudí, jestli stojí za to nás kontaktovat. Job-to-be-done: za 30 vteřin pochopit (1) kdo jsme, (2) že to děláme jinak než agentura, kterou už zkusili, (3) jak nás kontaktovat.

## Product Purpose

Stránka, která prodá první schůzku. Není to portfolio pro hodnocení od poroty ani brochure-ware. Cíl: convert návštěvníka na telefonát nebo vyplněný formulář. Důvěra > kreativita, konkrétno > buzzwordy, doklad > sliby. Pokud Adverse vypadá jako "agentura která recykluje šablony", je web rozbitý — bez ohledu na to jak "dobře" se to designem hodnotí.

## Brand Personality

Tři slova: **osobní, doložitelný, sofistikovaný**.

Hlas: jako Honza s Ondřejem mluví na kávě s klientem. Krátké věty. Konkrétní čísla místo slibů. *"Voláme si přímo my dva. Žádný account manager."* > *"Strategický partner pro vaši digitální transformaci."*

Vizuální vibe: tichá jistota. Bílý prostor, černá typografie, červený akcent pouze tam kde má smysl (CTA, číslo, eyebrow). Bez pýchy, bez křiku. Jistota tím že to nepotřebuje křičet.

Emoce které má vyvolat: *"tihle to chápou"*, *"jsou tu pro mě, ne pro fakturu"*, *"konečně někdo kdo mluví srozumitelně"*.

## Anti-references

- **Generic SaaS landing.** Modrý gradient hero, "Trusted by" logo strip, tři identické feature karty s ikonkou + nadpisem + textem, "Get started for free". Cokoliv co vypadá jako 80 % YC startupů.
- **AI/bot slop.** Neonové gradienty, glow efekty per se, *"AI-powered"* buzzwordy, em-dashy, generická Lorem-ipsum kopie, čtyři odstavce které říkají nic.
- Stará reklamka 2010s (drop shadows, glossy buttons, stockové fotky podání ruky).
- Cold luxury brand bez ohně (jen černá + tenká zlatá serifa + *"bespoke"* / *"discreet"*).

## Design Principles

1. **Důvěra přes konkrétno.** Každý claim má důkaz: číslo, jméno klienta, screen z kampaně. Bez konkrétna je to slib, který nemusíme dodržet.
2. **Plain Czech, ne corp Czech.** Mluvíme jako lidi. *"Domluvit schůzku"* > *"Rezervovat konzultaci"*. *"Co umíme"* > *"Naše služby"*. *"Pojďme si promluvit"* > *"Kontaktujte naše obchodní oddělení"*.
3. **Restraint > maximalism.** Bílá je validní volba. Ne každá sekce potřebuje hero animaci. Více brand vizuální energie do jedné silné scény (hero) než pět průměrných.
4. **Two-founder honesty.** Web stojí na tom, že jsme dva studenti, ne armáda 50 lidí. To je naše výhoda, ne omluva. Stránka *O nás* vede s fotkama + jménama, ne s "Naším týmem věnujeme se vám".
5. **Mobile first jako default.** 60–70 % našich klientů otevře web na telefonu mezi schůzkama. Mobilní UX není degradace desktop varianty.

## Accessibility & Inclusion

- WCAG AA target na text (kontrast 4.5:1) a non-text (3:1).
- Respektovat `prefers-reduced-motion` — typewriter, scroll-tied animace, marquee a další motion mít alternativní cestu (instant reveal, statický stav).
- Tap targets ≥ 44 px na touch.
- Czech jazyk první (`lang="cs"`), text neoříznutý za dlouhých slov (responsive typography scale).
- Screen reader: každá animovaná typografie má `aria-label` s plným textem, dekorativní SVG má `aria-hidden`.
