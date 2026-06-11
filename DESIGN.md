# Design system: Artificial Intelligencers

Aesthetic lane: **engraved society charter, lamplit.** Gold ink on
near-black green paper, drawn from the existing seal logo. Not editorial,
not terminal, not SaaS.

## Color

Strategy: drenched ink ground; antique gold carries nearly all type and
ornament; verdigris is the machine voice, used at ≤10% for glows, pulses,
links, and live data.

Tokens (OKLCH, defined in `src/styles/global.css` under `@theme`):

- `ink-950` oklch(16% 0.012 170): page ground, the seal's near-black green
- `ink-900` oklch(20% 0.014 170): raised panels
- `ink-800` oklch(25% 0.016 170): borders-on-ink, hairlines at low alpha
- `gold-100` oklch(92% 0.030 95): brightest type (headlines), parchment
- `gold-300` oklch(80% 0.045 88): body type on ink
- `gold-500` oklch(70% 0.055 80): muted labels, ornament linework
- `gold-700` oklch(55% 0.050 75): faint engraving strokes
- `verdigris-300` oklch(82% 0.085 175): machine accent, glow cores
- `verdigris-500` oklch(68% 0.090 178): links, focus rings

No pure #000/#fff anywhere. Light-on-dark type gets +0.05–0.1 line-height.

## Typography

- Display: **Libre Caslon Display** — masthead and section titles only.
  Caslon is the 18th-century society face; at enormous sizes it does the
  engraved-charter work on its own.
- Body: **Libre Caslon Text** (400/700 + italic) — prose, definitions,
  event descriptions. Italic is the dictionary voice.
- Data: **Fragment Mono** — dates, times, RSVP counts, coordinates, form
  labels. The machine voice. Sparing: if a string isn't data, it isn't mono.

Scale: fluid clamp() for display (up to ~9rem masthead), ratio ≥1.333
between steps. Body 1.0625rem–1.125rem, max 70ch.

## Ornament

Engraved-rule language: thin double rules, laurel/florets as SVG, corner
ticks. One circuit-trace motif may run through ornament in verdigris.
No side-stripe accents, no gradient text, no glass.

## Components

- Buttons: `.btn-primary` parchment-gold plate (existing brand equity:
  #eae4cf → #ccb393 gradient) with dark text; `.btn-ghost` hairline gold.
- Forms: ink wells with gold hairline outlines, verdigris focus ring,
  mono labels.
- Event entries: ledger rows / proceedings entries, never identical cards.

## Motion

- GSAP. One orchestrated page-load: masthead rules draw in, headline
  reveals, event details stagger up. ScrollTrigger reveals per section.
- Ease: expo/quart outs only. Durations 0.6–1.2s. No bounce.
- Three.js hero: gold particle constellation sampled from the engraved owl,
  drifting like dust in lamplight, mouse parallax, occasional verdigris
  pulse along particles. Falls back to the static engraving when WebGL is
  unavailable or `prefers-reduced-motion`.
