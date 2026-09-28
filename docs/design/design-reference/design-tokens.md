# Design Tokens — Suth Theme

Compact table form of this theme's design tokens, for pasting directly into
an AI Studio / Stitch prototyping prompt. Pair it with the relevant
category file(s) from
[docs/storybook-mcp/component-md/](../../storybook-mcp/ai-studio-stitch-export.md)
for component props/examples. For the fuller spec with prose guidance
(same values, different format), see [DESIGN.md](./DESIGN.md) in this
same folder.

---

## Primary color scale (`color.themes`)

| Step | Hex |
| --- | --- |
| 50 | `#EEF8FB` |
| 100 | `#DCF1F6` |
| 200 | `#B9E2EC` |
| 300 | `#84C5D4` |
| 400 | `#4C9FB2` |
| 500 | `#127486` |
| 600 | `#0E5D6C` |
| 700 | `#0B4955` |
| 800 | `#08363F` |
| 900 | `#05242A` |
| 1000 | `#05242A` |

## Semantic colors

| Token | Hex | Usage |
| --- | --- | --- |
| Primary (default/active) | `#0E5D6C` | Primary buttons, active nav, links |
| Primary hover | `#0B4955` | Hover state of primary elements |
| Primary faded | `#DCF1F6` | Subtle primary backgrounds, selected states |
| On-primary | `#ffffff` | Text/icons on primary-colored surfaces |
| Text base | `#0F172A` | Default body text |
| Text mid | `#475569` | Secondary text |
| Text low | `#94A3B8` | Disabled/placeholder text |
| Text title | `#0B4955` | Section headings |
| Success | `#1bb253` | Success states, badges, alerts |
| Warning | `#ffc514` | Warning states, badges, alerts |
| Danger | `#ff4343` | Error/destructive states |
| Sidebar background | `#0E5D6C` | App sidebar |
| Sidebar active | `#08363F` | Active sidebar item |
| On-sidebar | `#ffffff` | Text/icons on sidebar |
| Card border/stroke | `#f0f0f0` | Default card border |
| Table header | `#84C5D4` | Table header row background |
| Table row (even) | `#F8FAFC` | Zebra-striped table rows |
| Input border (default) | `#CBD5E1` | Default input border |
| Input border (focus) | `#127486` | Focused input border |
| App content background | `#eff6ff` | Main content area background |

## Status/tag colors (`color.icon.status`)

| Name | Base | Low (bg) |
| --- | --- | --- |
| Red | `#fc5a5a` | `#fedede` |
| Green | `#3dd598` | `#d8f7ea` |
| Light green | `#82c43c` | `#e6f3d8` |
| Orange | `#ff974a` | `#ffeadb` |
| Yellow | `#ffc542` | `#ffeec6` |
| Magenta | `#ff9ad5` | `#ffe1f2` |
| Purple | `#a461d8` | `#f2e5ff` |
| Light blue | `#50b5ff` | `#dcf0ff` |
| Blue | `#1b85f3` | `#1b85f3` |

## Border radius

| Token | Value |
| --- | --- |
| Button / Input default | `6px` |
| Button / Input large | `8px` |
| Card default | `8px` |
| Card small | `6px` |
| Checkbox | `4px` |
| Full (pill/circle) | `100%` |

## Spacing

| Token | Value |
| --- | --- |
| Base unit (`main`) | `10px` |
| Small (`sm`) | `3px` |
| Medium (`md`) | `6px` |
| Form row gap | `8px` |
| Form column gap | `16px` |
| Footer height | `30px` |
| Sidebar width | `70px` |
| Max content width | `1280px` |

## Typography

| Token | Value |
| --- | --- |
| Body font | `'NotoSansThai', 'Inter'` |
| Print font | `'Sarabun', 'Inter'` |
| Password mask font | `'Verdana'` |
| Card header size | `1rem` (16px) |
| Card header size (sm) | `0.875rem` (14px) |
| Button text size | `14px` |

## Shadow

| Token | Value |
| --- | --- |
| Card default | `inset 0 0 4px rgba(0,0,0,0.1)` |
| Card small | `inset 0 0 2px rgba(0,0,0,0.1)` |

## Breakpoints

| Name | Width |
| --- | --- |
| xs | 480px |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |
| full-hd | 1920px |
