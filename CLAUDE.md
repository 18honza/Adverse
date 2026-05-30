@AGENTS.md

# Adverse — agent instructions

Web pro digitální marketingovou agenturu Adverse (realitní + cestovní obor v ČR). Next.js 16 App Router + Tailwind v4 + Framer Motion.

## Skill priorities (primary)

When working on this project, lean on these skills by default — invoke them
proactively without being asked when the task obviously fits:

| Skill | When to use |
|---|---|
| **superpowers:brainstorming** | Any new feature, page, or behaviour change — before code. |
| **superpowers:** (writing-plans / executing-plans / etc.) | Multi-step or non-trivial work — plan first, execute task-by-task. |
| **frontend-design:frontend-design** | New UI surfaces — pages, sections, distinctive components. |
| **taste-skill** | Polish / architecture-level UI decisions, metric-based design rules. |
| **impeccable** | Audit / polish / harden / clarify / animate existing UI. |
| **stop-slop** | All user-facing copy (CZ). Strip AI tells before shipping any text. |
| **awesome-design-md** (`~/.claude/awesome-design-md/design-md/<brand>/DESIGN.md`) | When the user references a brand vibe (Vercel, Linear, Stripe, Apple, Ferrari…) read that brand's DESIGN.md and apply its tokens / type / motion. |
| **21st.dev Magic MCP** (`mcp__21st-dev-magic__*`) | Need a React component — search 21st.dev first; only build from scratch if nothing fits or tokens are out. |
| **playwright-skill** | Verify UI changes in a real browser, mobile viewport checks, click-through QA after non-trivial flows (form, flip card, scroll-tied animations). |
| **context-engineering:** | When agent context, tools, memory, or multi-agent patterns are in play. |

Other skills (Vercel deploy, claude-api, anthropic-skills doc tools, etc.)
remain available — use as needed but they're secondary for this project.

## Project conventions

- **Language:** Czech UI copy; English code comments + commits.
- **Style:** squared corners (no rounded utilities) across cards/tiles to
  match the established portfolio + bento + reference language.
- **Brand colors:** `--color-accent: #e63030` (red), `--color-text: #111`,
  `--color-bg: #fff`, `--color-dark: #0d0d0d`. Defined in `globals.css`
  under `@theme inline`.
- **Typography:** headings = Arial Black uppercase tracking-tight; body =
  Inter; serif italic (Georgia) used sparingly for short emphases only.
- **Mark element:** key words in headings can wear `.mark-box`
  (`bg-text text-white px-2`) — e.g. "vidíte." in hero, "spolu" in growth.
- **No real photos yet:** service / portfolio cards use gradient + SVG
  placeholders. Cover images go to `/public/img/portfolio/<slug>.jpg` and
  `/public/img/team/{jan,ondrej}.jpg` — render conditional on file presence.
- **Mobile-first:** keep page hero/sections compact on small screens, test
  with playwright at ~360–390 px viewport before claiming done.
- **No `npx shadcn add` against the project root** — it overwrites
  `globals.css` and `Button`. Fetch component code via WebFetch and write
  manually into `src/components/ui/` instead.

## Stack quick-ref

- **Next.js 16** (App Router, Turbopack, Inter via next/font/google)
- **TypeScript** strict, **Tailwind v4** (`@theme inline` in globals.css)
- **Framer Motion** for animation; **Lucide React** for icons
- **Resend** for contact form (Server Action `src/app/kontakt/actions.ts`,
  needs `RESEND_API_KEY` env var; dev falls back to console log)
- **Hosting plan:** Vercel + Wedos DNS redirect (see README)

## Repo

- GitHub: <https://github.com/18honza/Adverse>
- `npm run dev` for local; phone access works thanks to
  `allowedDevOrigins` whitelist in `next.config.ts`.
