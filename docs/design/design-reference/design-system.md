# Suth Design System

## 1. Purpose & Audience

This document defines the design principles, foundations, and usage
guidelines for the **Suth** theme of the react-ui-component-library — a
multi-brand, design-token-driven component library for healthcare and
veterinary SaaS products. It is written for designers and engineers
building or reviewing screens in this theme. It complements, but does not
duplicate, two sibling references in this folder:

- [DESIGN.md](./DESIGN.md) — the full token specification (exact values)
- [design-tokens.md](./design-tokens.md) — the same values as compact
  tables, formatted for AI prototyping prompts

Read this document for **why** and **when**; read those two for **exact
values**.

## 2. Design Principles

1. **Calm precision.** Suth's teal accent (`#0E5D6C`) reads as clinical
   and composed rather than alarming or playful — appropriate for
   information-dense healthcare workflows viewed for long shifts.
2. **Consistency over novelty.** Suth shares its structural language
   (radius, spacing, type scale) with Default/HEP by design. A component
   should never need theme-specific layout logic — only its color tokens
   change.
3. **Legibility first.** Text hierarchy (`#0F172A` → `#475569` →
   `#94A3B8`) exists to let a user scan a screen fast under time pressure,
   not to decorate it. Don't introduce additional text colors outside
   this scale.
4. **Every color is semantic, not decorative.** A color is chosen because
   it means something (primary action, danger, success) — never picked
   for visual variety. If a screen needs a new meaning, that's a token
   discussion, not a one-off hex value.

## 3. Foundations

### 3.1 Color

Sharp, teal-accented palette built from an 11-step primary scale plus
semantic success/warning/danger tokens shared across all themes. See
[design-tokens.md § Semantic colors](./design-tokens.md#semantic-colors)
for the full table. Never hardcode a hex value in component code — always
reference the token (CSS variable or Tailwind utility mapping to it).

### 3.2 Typography

Two-tier font strategy:
- **Interface** (`NotoSansThai, Inter`) for all on-screen UI text —
  chosen for reliable Thai/Latin bilingual rendering at UI sizes.
- **Print** (`Sarabun, Inter`) for anything destined for paper (labels,
  receipts, medical reports) — Sarabun renders more legibly at small
  print sizes than NotoSansThai.

Type scale and weights are shared globally (not theme-specific) — see
[design-tokens.md § Typography](./design-tokens.md#typography).

### 3.3 Spacing & Layout

Built on a `10px` base unit (`spacing.main`), the same density as
Default/HEP. This is a **dense, information-forward** layout profile —
do not add PetSphere's extra breathing room (`12px` base) to Suth
screens; the two themes serve different product contexts (clinical
enterprise vs. pet-owner-facing).

### 3.4 Elevation

A single, restrained inset-shadow language for cards
(`inset 0 0 4px rgba(0,0,0,0.1)` default, `inset 0 0 2px` small) — no
drop shadows, no floating panels with heavy elevation. Depth is
communicated through borders/backgrounds, not shadow stacking.

### 3.5 Shape

`6px`–`8px` radius on interactive controls and containers: sharp enough
to read as precise/engineered, soft enough to not feel harsh. This is
the same "sharp signature" as Default/HEP — see
[DESIGN.md § 6. Shapes](./DESIGN.md#6-shapes).

### 3.6 Iconography

Icons come from the shared `icon-component` package, sized and colored
via the `icon` token group (`color.icon.*`), never as raw SVGs with
inline fill colors — this keeps icon color theme-aware automatically.

## 4. Accessibility Guidelines

- Maintain **4.5:1** minimum contrast for body text against its
  background (the `text.base`/`text.mid`/`text.low` scale against
  `#ffffff` and `#EEF8FB` surfaces already meets this — don't introduce
  lighter text colors than `text.low`).
- Every interactive control must have a visible focus state; use the
  existing `input.border.focus` / `--color-primary-*` tokens rather than
  inventing a new focus color.
- Status must never be communicated by color alone — pair status colors
  (success/warning/danger) with an icon or text label, since color-blind
  users and printed black-and-white reports both lose that signal.
- Don't rely on placeholder text as the only label for a form field —
  screen readers and printed forms both need a persistent label.

## 5. Component Usage Principles

These are usage patterns, not a prop reference — see
[docs/storybook-mcp/component-md/](../../storybook-mcp/ai-studio-stitch-export.md)
for props/examples per component.

- **Buttons vs. Links**: use `Button` for actions that change state or
  submit data; use `Typography.Link` only for navigation to another
  view/document.
- **Table vs. Card list**: use `Table` when users need to compare rows
  across the same columns (scanning); use a `Card`/`CardList` when each
  record has a distinct visual identity worth more space (e.g. a patient
  summary).
- **Modal vs. inline form**: reserve `Modal` for focused, interruptive
  tasks (confirm a destructive action, quick single-field edit); prefer
  inline editing or a dedicated page for anything with more than ~4
  fields, since modals compound poorly with this theme's already-dense
  layout.
- **Status components**: always use the dedicated `Status/*` component
  for a given domain concept (e.g. `DrugStatus`, `AppointmentStatus`)
  instead of composing `Tag`/`Badge` manually — this is what keeps status
  color meaning consistent across the whole app.

## 6. Content & Language Guidelines

- UI copy in this system is predominantly Thai with English used for
  proper nouns, technical/medical terms, and codes (HN, AN, VN, Dx) — see
  the story fixtures under `src/components/**/*.stories.tsx` for real
  examples of this mix.
- Keep labels short enough to survive the dense `10px`-base spacing
  profile without wrapping awkwardly; if a label needs two lines, prefer
  restructuring the layout over shrinking the font below `text-sm`.

## 7. Governance

- **Single source of truth**: `src/tokens/themes/suth.json` (generated —
  never hand-edit; see [tokens.json](../../../tokens.json) and the
  `add-theme` skill for how tokens are authored and rebuilt).
- **When token values change**: update `design-tokens.md` and the
  relevant section of `DESIGN.md` in this same folder in the same change
  (see `docs/skills/add-theme-checklist.md` step 2).
- **Structural reference**: [applayout-reference.html](./applayout-reference.html)
  is the canonical rendered app-shell markup for this theme — treat it as
  the base skeleton for new screens rather than inventing new layout
  structure.
