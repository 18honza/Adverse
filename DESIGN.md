---
version: alpha
name: Adverse-design
description: Visual system for the Adverse marketing website — a quiet, confident agency brand for Czech real-estate and travel agencies. White canvas with squared corners, a single saturated red accent that carries CTA + emphasis, Arial-Black uppercase headings against neutral Inter body, and restraint as the dominant visual choice (motion appears only where it earns its place).

colors:
  ink: "#111111"            # primary text + headings
  ink-muted: "#666666"      # secondary body
  ink-faint: "#999999"      # tertiary / labels
  ink-mute-2: "#aaaaaa"     # disabled / placeholder
  hairline: "#ececec"       # divider / border default
  hairline-strong: "#d6d6d6" # stronger divider / focus ring
  canvas: "#ffffff"         # default surface
  canvas-soft: "#f8f8f8"    # alt surface (services, milestones)
  canvas-warm: "#fafaf7"    # optional warmer alt for scroll-bg variety
  ink-canvas: "#0d0d0d"     # full dark surface (testimonial, hero variant)
  accent: "#e63030"         # brand red — CTA, mark, eyebrow
  accent-hover: "#c92020"   # accent on hover / active
  accent-soft: "rgba(230, 48, 48, 0.12)"  # tinted glow / fill states

scroll-section-bg-palette:
  - role: opener (hero)
    bg: "#0d0d0d"           # dark
    ink: "#ffffff"
    accent: "#e63030"
  - role: services
    bg: "#ffffff"
    ink: "#111111"
  - role: bridge / philosophy
    bg: "#fafaf7"           # warm cream
    ink: "#111111"
  - role: portfolio
    bg: "#ffffff"
    ink: "#111111"
  - role: testimonial
    bg: "#0d0d0d"
    ink: "#ffffff"
  - role: cta-final
    bg: "#ffffff"
    ink: "#111111"

typography:
  display-font: "Arial Black, Helvetica Neue, Arial, sans-serif"
  body-font: "Inter, Helvetica Neue, Arial, sans-serif"
  serif-font: "Georgia, Times New Roman, serif"  # italic only, sparingly, short sub-quotes
  scale:
    hero-display: "clamp(2.5rem, 6vw, 5rem)"    # h1 hero
    h1: "clamp(2rem, 5vw, 3.5rem)"
    h2: "clamp(1.75rem, 4vw, 3rem)"
    h3: "1.5rem"
    body-lg: "1.125rem"
    body: "1rem"
    body-sm: "0.875rem"
    eyebrow: "0.75rem"        # tracking 0.25em, uppercase, accent red
    caption: "0.6875rem"
  weights:
    display: 900             # Arial Black
    body-regular: 400
    body-semibold: 600       # Inter for CTAs + emphasis
  rules:
    - "All headings: uppercase, font-display, letter-spacing 0.5px tightening to -1px at hero scale, line-height 1.1."
    - "Eyebrows: caps, tracking 4px, accent red, no period at end, sit above the heading."
    - "Serif italic Georgia used at most once per section as a short trailing line — never headings, never long body."
    - "Body line length capped 65–75ch."
    - "Czech-lang specifics: long words (e.g. Specializované) must not overflow on narrow screens — clamp scales handle this."

components:
  - name: btn-primary
    surface: "accent"
    ink: "white"
    radius: "2px"             # squared corners
    weight: 700
    tracking: "0.16em"
    transform: "uppercase"
    px: "1.5rem"; py: "0.75rem"
    hover: "bg accent-hover"
    focus: "ring 2px accent-soft"
  - name: btn-outline
    surface: "transparent"
    border: "2px solid ink"
    ink: "ink"
    radius: "2px"
    hover: "bg ink, ink white"
  - name: mark-box
    purpose: "highlight a single word inside a heading (e.g. 'vidíte.', 'spolu')"
    surface: "ink"
    ink: "white"
    padding: "0 0.5rem"
    display: "inline-block"
    semantics: "decorative — pure visual emphasis, not semantic"
  - name: portfolio-tile
    aspect: "4:3"
    radius: "0"                # squared
    border: "1px solid hairline"
    background: "fallback gradient OR cover photo"
    overlay: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)"
    body: "tag (eyebrow accent) + title (ink white)"
    hover: "image scale 1.04"
  - name: portfolio-flip-card
    base: "portfolio-tile (front)"
    interaction: "click to flip 180deg around Y + scale 1.35; click X / Esc to flip back"
    back-surface: "canvas (white) with hairline border"
    back-content: "tag + title (ink) + description + category-specific media + CTA"
  - name: service-card-bento
    surface: "ink-canvas (dark)"
    radius: "0"
    border: "1px solid white/10"
    decoration: "dot grid pattern + per-service SVG composition (target / browser / film strip / palette …)"
    body: "service num (accent) + title (white) + optional one-line (white/60)"
    arrow-link: "glass top-right (white/10 backdrop blur)"
    note: "absolute ban: this card now has hover-fill variants per the new design — see component spec"
  - name: contact-progress-indicator
    pattern: "three 8px dots + animated red pill that wraps completed dots"
    transition: "spring stiffness 300 damping 22 mass 0.8"

layout:
  container-narrow: "880px"
  container-default: "1200px"
  grid-gutter:
    mobile: "0.75rem"
    tablet: "1.25rem"
    desktop: "1.5rem"
  section-spacing:
    mobile: "3.5rem"          # 56px
    tablet: "5rem"            # 80px
    desktop: "6rem–8rem"      # 96–128px
  rules:
    - "No rounded corners across cards / tiles / form controls. Establishes editorial / squared visual language separate from rounded-SaaS norm."
    - "Asymmetric bento grids over uniform card grids whenever the content allows (services, portfolio teaser)."
    - "Mobile: stack to single column. Tighter padding, smaller heading scale steps. Never preserve desktop padding rhythm on mobile."

motion:
  ease: "cubic-bezier(0.22, 1, 0.36, 1)"   # ease-out-quart
  durations:
    micro: "120ms"            # hover state changes
    base: "200ms"             # transitions, focus
    reveal: "450–700ms"       # on-enter animations
    scroll-tied: "synced with scroll-progress, no fixed duration"
  rules:
    - "Animate transform + opacity. Never animate layout properties (width, height, top, left)."
    - "Respect prefers-reduced-motion: marquee, typewriter, scroll-tied scaling, blur effects all degrade to instant final state."
    - "No bounce, no elastic ease. Ease-out family only."
    - "Scroll-tied animations are stable: initial state must look intentional (not 'broken / loading') because mobile users may sit on it for seconds before scrolling."

depth:
  shadows: "absent by default. Borders + tinted glows do the work shadows usually do."
  glass: "rare and purposeful — only on overlay controls (close X on flip card, top-right arrow on bento). Never on hero, never on cards as default."
  layering: "z-index used only where necessary: sticky header (z-50), mobile menu overlay (z-60), flipped portfolio card lifts to z-30 above its grid neighbours."

guardrails:
  - "No drop shadows on cards (we use borders + tinted backgrounds)."
  - "No text-gradients. Mark-box (solid black bg + white text) is the only typographic emphasis treatment."
  - "No glassmorphism as a default surface. Only on small overlay controls."
  - "No rounded corners on cards / tiles. Buttons and pills get the 2px radius (`--radius: 2px`) only — visual reset for the rest is sharp."
  - "Never AI buzzwords in copy. No 'transformace', no 'synergie', no 'leverage'. Read every word out loud — if it sounds like an MBA wrote it, rewrite it."
  - "Never em-dashes (—). Use comma, colon, semicolon, period, or parentheses."
  - "Never a generic SaaS hero (icon-feature-stat-CTA template) or the 3-identical-card grid."
  - "One serif italic per section max. Used at the end of a body paragraph as a trailing note (`Každý klient je pro nás jedinečný.`), never as a heading or sustained text."

responsive:
  breakpoints:
    sm: "640px"
    md: "768px"
    lg: "1024px"
    xl: "1280px"
  rules:
    - "Designed mobile-first. Tap targets ≥ 44px."
    - "Mobile menu: fullscreen overlay (not dropdown). Position-fixed-with-saved-scrollY to preserve scroll position on iOS Safari."
    - "Heading scale uses clamp() where possible to avoid abrupt jumps."
    - "Hero stats row: three items on mobile too, but with reduced font scale (text-base sm:text-2xl md:text-4xl) and whitespace-nowrap on the 'META + GGL' label."

agent-prompts:
  - "When adding a new section, ask: does this earn motion? Default to static unless the answer is a clear yes."
  - "Before writing copy, read the existing copy in PRODUCT.md tone. If a candidate sentence sounds 30% MBA, rewrite."
  - "When using SVGs as decoration, prefer 5–8% opacity ambient watermarks over centered focal SVGs (focal SVGs need to be earned)."
  - "If a component appears 3+ times across the site, extract it (see /components/ui/ for primitives)."
  - "Brand consult ladder: (1) read this DESIGN.md; (2) if user references a brand (Vercel, Linear, Stripe…), open ~/.claude/awesome-design-md/design-md/<brand>/DESIGN.md and reconcile, brand-overrides-our-defaults only for tokens the user explicitly asked to borrow."
---
