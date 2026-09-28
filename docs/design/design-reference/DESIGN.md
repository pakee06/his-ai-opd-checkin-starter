---
name: React UI Component Library — Suth Theme
description: Design token specification and styling principles for the Suth theme.
version: 1.301.3
theme:
  name: suth
  primary: "#0E5D6C"
  background: "#EEF8FB"
  rounded:
    btn: "6px"
    input: "6px"
    card: "8px"
colors:
  primary:
    default: "#0E5D6C"
    active: "#0E5D6C"
    hover: "#0B4955"
    faded: "#DCF1F6"
  on-primary: "#ffffff"
  success:
    default: "#1bb253"
    hover: "#04a06f"
    disable: "#90e6c2"
    faded: "#d6ffee"
  warning:
    default: "#ffc514"
    hover: "#ffc533"
    disable: "#ffe599"
    faded: "#fff5d8"
  danger:
    default: "#ff4343"
    hover: "#f04f43"
    disable: "#ffb8b3"
    faded: "#ffe6e3"
  text:
    base: "#0F172A"
    mid: "#475569"
    low: "#94A3B8"
    title: "#0B4955"
  sidebar: "#0E5D6C"
  table-header: "#84C5D4"
typography:
  fontFamily:
    body: "'NotoSansThai', 'Inter'"
    print: "'Sarabun', 'Inter'"
    password: "'Verdana'"
  fontWeight:
    thin: 100
    extralight: 200
    light: 300
    normal: 400
    medium: 500
    semibold: 600
    bold: 700
    extrabold: 800
    black: 900
spacing:
  sm: "3px"
  md: "6px"
  main: "10px"
  form-row-gap: "8px"
  form-column-gap: "16px"
rounded:
  none: "0"
  sm: "2px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  "2xl": "16px"
  "3xl": "24px"
  full: "100%"
---

# Design System Specification — Suth Theme

This document is a persistent, human- and machine-readable design
specification for the **Suth** theme of this React UI Library.

---

## 1. Overview

The Suth theme is a teal/cyan-accented brand variant, structurally
identical to the HEP theme (same radius, spacing, and typography scale)
but with its own distinct primary color scale. It was added by copying the
HEP token block and replacing only the `color.themes` scale — see
[../../storybook-mcp/ai-studio-stitch-export.md](../../storybook-mcp/ai-studio-stitch-export.md)
for a full component-by-component export of this theme.

---

## 2. Colors

Semantic tokens govern all coloring. Direct hexadecimal styling in
component code is strictly prohibited — always use the token/CSS
variable.

* **Primary & Focus**: `#0E5D6C` (Deep Teal). The interactive anchor for
  buttons, links, active nav items, and focus rings.
* **Primary Scale**: `50` `#EEF8FB` → `100` `#DCF1F6` → `200` `#B9E2EC` →
  `300` `#84C5D4` → `400` `#4C9FB2` → `500` `#127486` → `600` `#0E5D6C` →
  `700` `#0B4955` → `800` `#08363F` → `900`/`1000` `#05242A`.
* **Status Indicators**: success `#1bb253`, warning `#ffc514`, danger
  `#ff4343` (shared across all themes).
* **Text Hierarchy**: `#0F172A` (base) → `#475569` (mid) → `#94A3B8`
  (low), with `#0B4955` for titles/headings.
* **Surfaces**: app content background `#eff6ff`, card/modal surface
  `#FFFFFF`, table header `#84C5D4`, sidebar `#0E5D6C` (active
  `#08363F`, text/icons on it: `#ffffff`).
* **Status/Tag Colors**: red `#fc5a5a`, green `#3dd598`, light-green
  `#82c43c`, orange `#ff974a`, yellow `#ffc542`, magenta `#ff9ad5`,
  purple `#a461d8`, light-blue `#50b5ff`, blue `#1b85f3` (each with a
  paired light "low" background variant for badges/tags).

---

## 3. Typography

* **Body & Interface** (`font.body`): `'NotoSansThai', 'Inter'`.
* **Print & Forms** (`font.print`): `'Sarabun', 'Inter'`.
* **Security Inputs** (`font.password`): `'Verdana'`.
* **Type Scale**: `text-xxs` (10px) up to `text-9xl` (128px). Card header
  text `1rem` (16px) default / `0.875rem` (14px) small. Button text
  `14px`.
* **Font Weight**: `thin` (100) through `black` (900).

---

## 4. Layout

* **Base Spacing Unit** (`spacing.main`): `10px`.
* **Small/Medium**: `sm` `3px`, `md` `6px`.
* **Form Gaps**: row `8px`, column `16px`.
* **Sidebar Width**: `70px`. **Footer Height**: `30px`.
* **Max Content Width**: `1280px`.
* **Breakpoints**: xs 480px, sm 640px, md 768px, lg 1024px, xl 1280px,
  2xl 1536px, full-hd 1920px, 2k 2560px, 4k 3840px.

---

## 5. Elevation and Depth

* **Card default shadow**: inset `0px 0px 4px 0px #0000001a`.
* **Card small shadow**: inset `0px 0px 2px 0px #0000001a`.

---

## 6. Shapes

Same sharp signature as Default/HEP:

* **Interactive Controls**: buttons and text inputs use `6px` radius
  (`8px` for the `lg` size).
* **Containers**: cards default to `8px` radius (`6px` small).
* **Checkboxes**: `4px`.
* **Base Profile**: ranges from `2px` (sm) up to `24px` (3xl).

---

## 7. Components

* **Buttons**: primary color `#0E5D6C`, `6px` radius, disabled state
  `#84C5D4`.
* **Tables**: header background `#84C5D4`, zebra rows alternate
  `#ffffff`/`#F8FAFC`, selected row `#B9E2EC`.
* **Inputs**: default border `#CBD5E1`, hover `#4C9FB2`, focus `#127486`.
* **Avatars**: default fill `#84C5D4`, active border `#127486`.
* **Sidebar**: background `#0E5D6C`, popup `#EEF8FB`, active item
  `#08363F`.

---

## 8. Do's and Don'ts

* **Do**: Always use design-token variables or Tailwind utility mappings
  (`var(--color-primary-default)`) instead of raw hex values.
* **Do**: Ensure text/background contrast exceeds 4.5:1.
* **Don't**: Hardcode typography sizes or font families directly in
  local stylesheets.
* **Don't**: Mix Suth's teal primary (`#0E5D6C`) with another theme's
  brand accent in the same view.

---

## 9. Agent Prompt Guide

When developing or refactoring components under the Suth theme:

1. **Read the token file first**: reference
   `src/tokens/themes/suth.json` for authoritative resolved values —
   never guess a hex value.
2. **Wrap in `ThemeConfigProvider`**: use
   `<ThemeConfigProvider themeVariant="suth">` so components inherit
   these tokens (see `src/tokens/themeNames.ts` for the full list of
   valid `ThemeVariant` values, and the `add-theme` skill for how new
   themes are wired in).
3. **Sharp corners, teal accent**: render `6px`–`8px` radius on
   interactive controls and containers, using `#0E5D6C` as the primary
   accent — do not apply PetSphere's rounder `10px`–`12px` profile here.
4. **Verify visually**: after any change, use the `react-ui-storybook` MCP
   `preview-stories` tool (see
   [../../storybook-mcp/overview.md](../../storybook-mcp/overview.md)) to
   confirm the rendered result matches this spec.
5. **Structural reference**: see [applayout-reference.html](./applayout-reference.html)
   in this folder for the real rendered DOM structure of the app shell
   (`AppLayout` + sidebar/head/footer) in this theme — use it as the base
   skeleton when prototyping new screens, rather than inventing new markup
   patterns.
6. **Prompt-ready tokens**: see [design-tokens.md](./design-tokens.md) in
   this folder for these same values as compact markdown tables — meant
   for pasting directly into an external AI UI-prototyping prompt (e.g.
   Google AI Studio / Stitch), alongside the relevant category file(s)
   from `docs/storybook-mcp/component-md/`.
7. **Principles and usage guidance**: see [design-system.md](./design-system.md)
   in this folder for the *why* behind these values — design principles,
   accessibility rules, and component usage patterns, not just numbers.
