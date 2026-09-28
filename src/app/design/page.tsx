import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';

/*
 * Living style guide for the Suth theme.
 * Every value shown here comes from docs/design/design-reference/DESIGN.md (v1.301.3)
 * and is rendered through the CSS variables declared in src/app/globals.css.
 * Layout sizes on this page are multiples of spacing.main (the "Base Spacing Unit").
 */

export const metadata: Metadata = {
  title: 'Design — Suth Style Guide',
  description: 'Living style guide generated from DESIGN.md',
};

const u = (n: number) => `calc(var(--spacing-main) * ${n})`;

type ColorToken = { name: string; cssVar: string; hex: string; alias?: string };
type ColorGroup = { title: string; source: string; tokens: ColorToken[] };

const colorGroups: ColorGroup[] = [
  {
    title: 'Primary scale',
    source: '§2 Colors — Primary Scale',
    tokens: [
      { name: 'primary-50', cssVar: '--color-primary-50', hex: '#EEF8FB' },
      { name: 'primary-100', cssVar: '--color-primary-100', hex: '#DCF1F6' },
      { name: 'primary-200', cssVar: '--color-primary-200', hex: '#B9E2EC' },
      { name: 'primary-300', cssVar: '--color-primary-300', hex: '#84C5D4' },
      { name: 'primary-400', cssVar: '--color-primary-400', hex: '#4C9FB2' },
      { name: 'primary-500', cssVar: '--color-primary-500', hex: '#127486' },
      { name: 'primary-600', cssVar: '--color-primary-600', hex: '#0E5D6C' },
      { name: 'primary-700', cssVar: '--color-primary-700', hex: '#0B4955' },
      { name: 'primary-800', cssVar: '--color-primary-800', hex: '#08363F' },
      { name: 'primary-900', cssVar: '--color-primary-900', hex: '#05242A' },
      { name: 'primary-1000', cssVar: '--color-primary-1000', hex: '#05242A' },
    ],
  },
  {
    title: 'Theme & primary',
    source: 'front matter — theme, colors.primary, colors.on-primary',
    tokens: [
      { name: 'theme.primary', cssVar: '--color-theme-primary', hex: '#0E5D6C', alias: 'primary-600' },
      { name: 'theme.background', cssVar: '--color-theme-background', hex: '#EEF8FB', alias: 'primary-50' },
      { name: 'primary.default', cssVar: '--color-primary-default', hex: '#0E5D6C', alias: 'primary-600' },
      { name: 'primary.active', cssVar: '--color-primary-active', hex: '#0E5D6C', alias: 'primary-600' },
      { name: 'primary.hover', cssVar: '--color-primary-hover', hex: '#0B4955', alias: 'primary-700' },
      { name: 'primary.faded', cssVar: '--color-primary-faded', hex: '#DCF1F6', alias: 'primary-100' },
      { name: 'on-primary', cssVar: '--color-on-primary', hex: '#ffffff' },
    ],
  },
  {
    title: 'Status',
    source: 'front matter — colors.success / warning / danger',
    tokens: [
      { name: 'success.default', cssVar: '--color-success-default', hex: '#1bb253' },
      { name: 'success.hover', cssVar: '--color-success-hover', hex: '#04a06f' },
      { name: 'success.disable', cssVar: '--color-success-disable', hex: '#90e6c2' },
      { name: 'success.faded', cssVar: '--color-success-faded', hex: '#d6ffee' },
      { name: 'warning.default', cssVar: '--color-warning-default', hex: '#ffc514' },
      { name: 'warning.hover', cssVar: '--color-warning-hover', hex: '#ffc533' },
      { name: 'warning.disable', cssVar: '--color-warning-disable', hex: '#ffe599' },
      { name: 'warning.faded', cssVar: '--color-warning-faded', hex: '#fff5d8' },
      { name: 'danger.default', cssVar: '--color-danger-default', hex: '#ff4343' },
      { name: 'danger.hover', cssVar: '--color-danger-hover', hex: '#f04f43' },
      { name: 'danger.disable', cssVar: '--color-danger-disable', hex: '#ffb8b3' },
      { name: 'danger.faded', cssVar: '--color-danger-faded', hex: '#ffe6e3' },
    ],
  },
  {
    title: 'Text',
    source: 'front matter — colors.text',
    tokens: [
      { name: 'text.base', cssVar: '--color-text-base', hex: '#0F172A' },
      { name: 'text.mid', cssVar: '--color-text-mid', hex: '#475569' },
      { name: 'text.low', cssVar: '--color-text-low', hex: '#94A3B8' },
      { name: 'text.title', cssVar: '--color-text-title', hex: '#0B4955', alias: 'primary-700' },
    ],
  },
  {
    title: 'Surfaces',
    source: '§2 Colors — Surfaces, front matter — sidebar, table-header',
    tokens: [
      { name: 'surface-app (app content background)', cssVar: '--color-surface-app', hex: '#eff6ff' },
      { name: 'surface-card (card/modal)', cssVar: '--color-surface-card', hex: '#FFFFFF' },
      { name: 'sidebar', cssVar: '--color-sidebar', hex: '#0E5D6C', alias: 'primary-600' },
      { name: 'sidebar-active', cssVar: '--color-sidebar-active', hex: '#08363F', alias: 'primary-800' },
      { name: 'on-sidebar (text/icons)', cssVar: '--color-on-sidebar', hex: '#ffffff' },
      { name: 'table-header', cssVar: '--color-table-header', hex: '#84C5D4', alias: 'primary-300' },
    ],
  },
  {
    title: 'Status / Tag',
    source: '§2 Colors — Status/Tag Colors',
    tokens: [
      { name: 'tag-red', cssVar: '--color-tag-red', hex: '#fc5a5a' },
      { name: 'tag-green', cssVar: '--color-tag-green', hex: '#3dd598' },
      { name: 'tag-light-green', cssVar: '--color-tag-light-green', hex: '#82c43c' },
      { name: 'tag-orange', cssVar: '--color-tag-orange', hex: '#ff974a' },
      { name: 'tag-yellow', cssVar: '--color-tag-yellow', hex: '#ffc542' },
      { name: 'tag-magenta', cssVar: '--color-tag-magenta', hex: '#ff9ad5' },
      { name: 'tag-purple', cssVar: '--color-tag-purple', hex: '#a461d8' },
      { name: 'tag-light-blue', cssVar: '--color-tag-light-blue', hex: '#50b5ff' },
      { name: 'tag-blue', cssVar: '--color-tag-blue', hex: '#1b85f3' },
    ],
  },
  {
    title: 'Component colors',
    source: '§7 Components',
    tokens: [
      { name: 'button-primary', cssVar: '--color-button-primary', hex: '#0E5D6C', alias: 'primary-600' },
      { name: 'button-primary-disabled', cssVar: '--color-button-primary-disabled', hex: '#84C5D4', alias: 'primary-300' },
      { name: 'table-row', cssVar: '--color-table-row', hex: '#ffffff' },
      { name: 'table-row-alt (zebra)', cssVar: '--color-table-row-alt', hex: '#F8FAFC' },
      { name: 'table-row-selected', cssVar: '--color-table-row-selected', hex: '#B9E2EC', alias: 'primary-200' },
      { name: 'input-border', cssVar: '--color-input-border', hex: '#CBD5E1' },
      { name: 'input-border-hover', cssVar: '--color-input-border-hover', hex: '#4C9FB2', alias: 'primary-400' },
      { name: 'input-border-focus', cssVar: '--color-input-border-focus', hex: '#127486', alias: 'primary-500' },
      { name: 'avatar', cssVar: '--color-avatar', hex: '#84C5D4', alias: 'primary-300' },
      { name: 'avatar-active-border', cssVar: '--color-avatar-active-border', hex: '#127486', alias: 'primary-500' },
      { name: 'sidebar-popup', cssVar: '--color-sidebar-popup', hex: '#EEF8FB', alias: 'primary-50' },
    ],
  },
];

const typeScale = [
  { name: 'text-xxs', cssVar: '--text-xxs', value: '10px', use: 'ขนาดเล็กสุดของสเกล' },
  { name: 'card header (small)', cssVar: '--text-card-header-sm', value: '0.875rem (14px)', use: 'หัวการ์ดขนาดเล็ก' },
  { name: 'button', cssVar: '--text-button', value: '14px', use: 'ข้อความบนปุ่ม' },
  { name: 'card header', cssVar: '--text-card-header', value: '1rem (16px)', use: 'หัวการ์ดค่าเริ่มต้น' },
  { name: 'text-9xl', cssVar: '--text-9xl', value: '128px', use: 'ขนาดใหญ่สุดของสเกล' },
];

const fontFamilies = [
  { name: 'font.body', cssVar: '--font-body', value: "'NotoSansThai', 'Inter' (+ Noto Sans Thai, Inter จาก next/font)", use: 'Body & Interface' },
  { name: 'font.print', cssVar: '--font-print', value: "'Sarabun', 'Inter'", use: 'Print & Forms' },
  { name: 'font.password', cssVar: '--font-password', value: "'Verdana'", use: 'Security Inputs' },
];

// CSS variable names are written out in full so Tailwind keeps them in the build.
const fontWeights = [
  ['thin', 100, '--font-weight-thin'],
  ['extralight', 200, '--font-weight-extralight'],
  ['light', 300, '--font-weight-light'],
  ['normal', 400, '--font-weight-normal'],
  ['medium', 500, '--font-weight-medium'],
  ['semibold', 600, '--font-weight-semibold'],
  ['bold', 700, '--font-weight-bold'],
  ['extrabold', 800, '--font-weight-extrabold'],
  ['black', 900, '--font-weight-black'],
] as const;

const spacingTokens = [
  { name: 'spacing.sm', cssVar: '--spacing-sm', value: '3px' },
  { name: 'spacing.md', cssVar: '--spacing-md', value: '6px' },
  { name: 'spacing.form-row-gap', cssVar: '--spacing-form-row-gap', value: '8px' },
  { name: 'spacing.main', cssVar: '--spacing-main', value: '10px' },
  { name: 'spacing.form-column-gap', cssVar: '--spacing-form-column-gap', value: '16px' },
];

const radiusTokens = [
  { name: 'rounded.none', cssVar: '--radius-none', value: '0' },
  { name: 'rounded.sm', cssVar: '--radius-sm', value: '2px' },
  { name: 'rounded.md', cssVar: '--radius-md', value: '6px' },
  { name: 'rounded.lg', cssVar: '--radius-lg', value: '8px' },
  { name: 'rounded.xl', cssVar: '--radius-xl', value: '12px' },
  { name: 'rounded.2xl', cssVar: '--radius-2xl', value: '16px' },
  { name: 'rounded.3xl', cssVar: '--radius-3xl', value: '24px' },
  { name: 'rounded.full', cssVar: '--radius-full', value: '100%' },
];

const componentRadii = [
  { name: 'theme.rounded.btn', cssVar: '--radius-btn', value: '6px' },
  { name: 'button lg', cssVar: '--radius-btn-lg', value: '8px' },
  { name: 'theme.rounded.input', cssVar: '--radius-input', value: '6px' },
  { name: 'theme.rounded.card', cssVar: '--radius-card', value: '8px' },
  { name: 'card small', cssVar: '--radius-card-sm', value: '6px' },
  { name: 'checkbox', cssVar: '--radius-checkbox', value: '4px' },
];

const layoutTokens = [
  { name: 'Sidebar Width', cssVar: '--layout-sidebar-width', value: '70px' },
  { name: 'Footer Height', cssVar: '--layout-footer-height', value: '30px' },
  { name: 'Max Content Width', cssVar: '--layout-max-content-width', value: '1280px' },
];

const breakpoints = [
  ['xs', 480],
  ['sm', 640],
  ['md', 768],
  ['lg', 1024],
  ['xl', 1280],
  ['2xl', 1536],
  ['full-hd', 1920],
  ['2k', 2560],
  ['4k', 3840],
] as const;

const knownGaps: { title: string; detail: string }[] = [
  {
    title: 'DESIGN.md ไม่มีหัวข้อ “Known Gaps”',
    detail:
      'ไฟล์ v1.301.3 มีหัวข้อ 1–9 เท่านั้น รายการด้านล่างจึงเป็นช่องว่างที่พบระหว่างสร้างหน้านี้ ยังไม่ได้บันทึกไว้ใน DESIGN.md — ควรให้เจ้าของ design system ยืนยันและเพิ่มหัวข้อนี้ในไฟล์',
  },
  {
    title: 'Type scale ระบุไม่ครบ',
    detail:
      'ระบุแค่ช่วง text-xxs (10px) ถึง text-9xl (128px) + หัวการ์ด 16px/14px + ปุ่ม 14px ขั้นระหว่างกลาง (xs–8xl) และ line-height ไม่มีค่า หน้านี้จึงแสดงเฉพาะ 5 ขนาดที่ระบุ และไม่มีขนาดสำหรับหัวข้อหน้า (H1/H2)',
  },
  {
    title: 'สีพื้นหลังแอปมี 2 ค่า',
    detail:
      'front matter theme.background = #EEF8FB (primary-50) แต่ §2 Surfaces ระบุ app content background = #eff6ff ซึ่งไม่อยู่ใน primary scale ต้องเลือกว่าหน้าจอควรใช้ค่าไหน (หน้านี้ใช้ theme.background เป็นพื้นหลังหน้า และใช้ surface-app ในตัวอย่าง app shell)',
  },
  {
    title: 'Tag “low” background ไม่มีค่า',
    detail: '§2 บอกว่าแต่ละสี tag มีคู่ “low” สำหรับพื้น badge แต่ไม่ได้ให้ hex จึงยังทำ badge/tag component ไม่ได้',
  },
  {
    title: 'Contrast ไม่ผ่านกฎ 4.5:1 ของ §8',
    detail:
      'ข้อความขาวบน success #1bb253 ≈ 2.79:1, บน danger #ff4343 ≈ 3.42:1, บน warning #ffc514 ≈ 1.59:1, บนปุ่ม disabled #84C5D4 ≈ 1.92:1 และ text.low #94A3B8 บนขาว ≈ 2.56:1 และไม่มี token on-success / on-warning / on-danger',
  },
  {
    title: 'รายละเอียด component ไม่ครบ',
    detail:
      'ไม่มี padding/ความสูงปุ่ม (รวม size lg ที่บอกแค่ radius 8px), สีข้อความตอน disabled, ความกว้างเส้นขอบ, รูปแบบ focus ring (ความหนา/offset), ขนาด avatar และสีข้อความบน avatar, สีข้อความหัวตาราง และสี footer — ตัวอย่างในหน้านี้ใช้ spacing token ที่ใกล้ที่สุดและเส้น 1px ค่าเริ่มต้นแทน',
  },
  {
    title: 'primary.active เท่ากับ primary.default',
    detail: 'ทั้งคู่เป็น #0E5D6C จึงมองไม่เห็นความต่างของสถานะ active ขณะที่ sidebar active ใช้ #08363F',
  },
  {
    title: 'Radius checkbox อยู่นอกสเกล',
    detail: 'checkbox ใช้ 4px ซึ่งไม่อยู่ใน rounded scale (0, 2, 6, 8, 12, 16, 24, 100%)',
  },
  {
    title: 'ชื่อฟอนต์และการโหลดฟอนต์',
    detail:
      "DESIGN.md ไม่ได้บอกว่าจะโหลดฟอนต์จากไหน และชื่อ 'NotoSansThai' (ไม่มีเว้นวรรค) ไม่ตรงกับชื่อจริง “Noto Sans Thai” ตอนนี้โปรเจกต์โหลด Noto Sans Thai + Inter (ไฟล์ woff2 ใน src/app/fonts ผ่าน next/font/local) แล้วต่อท้ายไว้ใน font.body ส่วน Sarabun (font.print) ยังไม่ได้โหลด และ Verdana (font.password) พึ่งฟอนต์ที่มีในเครื่อง",
  },
  {
    title: 'ไม่มี dark mode',
    detail: 'DESIGN.md ไม่มี token โหมดมืด แต่ globals.css เดิมของโปรเจกต์มี prefers-color-scheme: dark หน้านี้จึงบังคับใช้สีโหมดสว่างเสมอ',
  },
  {
    title: 'Spacing scale สั้น',
    detail: 'มีแค่ 3 / 6 / 8 / 10 / 16px ไม่มีขั้นใหญ่สำหรับระยะระหว่าง section หน้านี้ใช้ผลคูณของ spacing.main (Base Spacing Unit 10px) แทน',
  },
  {
    title: 'อ้างอิงไฟล์ที่ไม่มีใน repo นี้',
    detail:
      '§1 และ §9 อ้างถึง src/tokens/themes/suth.json, src/tokens/themeNames.ts, ThemeConfigProvider, add-theme skill, docs/storybook-mcp/* และ react-ui-storybook MCP — ตอนนี้มี src/tokens/themes/suth.json แล้ว แต่ส่วนที่เหลือยังไม่มีในโปรเจกต์นี้',
  },
];

const cardGrid = (min: number): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${u(min)}, 1fr))`,
  gap: 'var(--spacing-form-column-gap)',
});

const tableCell: CSSProperties = { padding: 'var(--spacing-md) var(--spacing-main)', textAlign: 'left' };

function Section({ id, title, source, children }: { id: string; title: string; source: string; children: ReactNode }) {
  return (
    <section id={id} className="rounded-card bg-surface-card shadow-card" style={{ padding: u(2.4) }}>
      <h2 className="text-card-header font-bold text-text-title">{title}</h2>
      <p className="mt-(--spacing-sm) text-xxs text-text-mid">ที่มา: DESIGN.md {source}</p>
      <div style={{ marginTop: u(2) }}>{children}</div>
    </section>
  );
}

function SubHeading({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <h3 className="text-card-header-sm font-semibold text-text-base" style={first ? undefined : { marginTop: u(3) }}>
      {children}
    </h3>
  );
}

function Mono({ children }: { children: ReactNode }) {
  return <code className="font-password text-xxs text-text-mid">{children}</code>;
}

function ComponentDemo({ name, spec, children }: { name: string; spec: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-(--spacing-form-row-gap)">
      <div>
        <h3 className="text-card-header-sm font-semibold text-text-base">{name}</h3>
        <p className="text-xxs text-text-mid">{spec}</p>
      </div>
      <div className="rounded-card-sm border border-dashed border-input-border bg-surface-app" style={{ padding: u(2) }}>
        {children}
      </div>
    </div>
  );
}

function ShapeSample({ name, cssVar, value }: { name: string; cssVar: string; value: string }) {
  return (
    <li className="flex flex-col items-start gap-(--spacing-md)">
      <span
        className="block border border-primary-500 bg-primary-100"
        style={{ width: u(6), height: u(6), borderRadius: `var(${cssVar})` }}
      />
      <span className="text-card-header-sm font-semibold">{name}</span>
      <span className="text-xxs text-text-mid">{value}</span>
      <Mono>var({cssVar})</Mono>
    </li>
  );
}

const navItems = [
  ['colors', 'Colors'],
  ['typography', 'Typography'],
  ['spacing', 'Spacing'],
  ['shape', 'Shape & Elevation'],
  ['layout', 'Layout'],
  ['components', 'Components'],
  ['known-gaps', 'Known Gaps'],
] as const;

export default function DesignStyleGuidePage() {
  return (
    <div className="min-h-screen bg-theme-background font-body text-text-base">
      <main className="mx-auto max-w-(--layout-max-content-width)" style={{ padding: u(2.4) }}>
        <header className="flex flex-col gap-(--spacing-md)" style={{ marginBottom: u(2.4) }}>
          <p className="text-xxs font-semibold tracking-wider text-primary-default uppercase">
            Living style guide · Suth theme v1.301.3
          </p>
          <h1 className="text-card-header font-bold text-text-title">Design Tokens &amp; Components</h1>
          <p className="text-card-header-sm text-text-mid">
            ทุกค่าบนหน้านี้มาจาก <Mono>docs/design/design-reference/DESIGN.md</Mono> และเรนเดอร์ผ่าน CSS variable ใน{' '}
            <Mono>src/app/globals.css</Mono> — ใช้ token เดียวกันนี้ในโค้ด เช่น <Mono>bg-primary-default</Mono>,{' '}
            <Mono>rounded-btn</Mono>, <Mono>p-(--spacing-main)</Mono>
          </p>
          <nav className="flex flex-wrap gap-(--spacing-form-column-gap) text-card-header-sm" aria-label="สารบัญ">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="font-semibold text-primary-default underline hover:text-primary-hover">
                {label}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex flex-col" style={{ gap: u(2.4) }}>
          {/* ---------- Colors ---------- */}
          <Section id="colors" title="Colors" source="§2 Colors + front matter colors">
            <div className="flex flex-col" style={{ gap: u(3) }}>
              {colorGroups.map((group) => (
                <div key={group.title}>
                  <SubHeading first>{group.title}</SubHeading>
                  <p className="text-xxs text-text-low">{group.source}</p>
                  <ul className="mt-(--spacing-main)" style={cardGrid(16)}>
                    {group.tokens.map((token) => (
                      <li key={token.cssVar} className="overflow-hidden rounded-card-sm border border-input-border">
                        <div style={{ background: `var(${token.cssVar})`, height: u(6) }} />
                        <div className="flex flex-col gap-(--spacing-sm) p-(--spacing-main)">
                          <span className="text-card-header-sm font-semibold">{token.name}</span>
                          <span className="font-password text-card-header-sm">{token.hex}</span>
                          <Mono>var({token.cssVar})</Mono>
                          {token.alias ? <span className="text-xxs text-text-low">= {token.alias}</span> : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* ---------- Typography ---------- */}
          <Section id="typography" title="Typography" source="§3 Typography + front matter typography">
            <SubHeading first>Type scale (เฉพาะขนาดที่ DESIGN.md ระบุ)</SubHeading>
            <ul className="mt-(--spacing-main) flex flex-col divide-y divide-input-border">
              {typeScale.map((t) => (
                <li key={t.cssVar} className="flex flex-wrap items-baseline gap-(--spacing-form-column-gap) py-(--spacing-main)">
                  <div className="flex flex-col" style={{ width: u(20) }}>
                    <span className="text-card-header-sm font-semibold">{t.name}</span>
                    <span className="text-xxs text-text-mid">
                      {t.value} · {t.use}
                    </span>
                    <Mono>var({t.cssVar})</Mono>
                  </div>
                  <span className="min-w-0 leading-none break-words" style={{ fontSize: `var(${t.cssVar})` }}>
                    {t.cssVar === '--text-9xl' ? 'Aa ก' : 'ลงทะเบียนผู้ป่วยนอก OPD Check-in'}
                  </span>
                </li>
              ))}
            </ul>

            <SubHeading>Font family</SubHeading>
            <ul className="mt-(--spacing-main)" style={cardGrid(24)}>
              {fontFamilies.map((f) => (
                <li
                  key={f.cssVar}
                  className="flex flex-col gap-(--spacing-sm) rounded-card-sm border border-input-border p-(--spacing-main)"
                >
                  <span className="text-card-header-sm font-semibold">
                    {f.name} <span className="font-normal text-text-mid">· {f.use}</span>
                  </span>
                  <Mono>{f.value}</Mono>
                  <span className="text-card-header" style={{ fontFamily: `var(${f.cssVar})` }}>
                    ลงทะเบียนผู้ป่วย The quick brown fox 0123456789
                  </span>
                </li>
              ))}
            </ul>

            <SubHeading>Font weight</SubHeading>
            <ul className="mt-(--spacing-main)" style={cardGrid(14)}>
              {fontWeights.map(([name, weight, cssVar]) => (
                <li key={name} className="flex flex-col rounded-card-sm border border-input-border p-(--spacing-main)">
                  <span className="text-card-header" style={{ fontWeight: `var(${cssVar})` }}>
                    ตัวอย่าง Aa
                  </span>
                  <span className="text-xxs text-text-mid">
                    {name} · {weight}
                  </span>
                </li>
              ))}
            </ul>

            <SubHeading>Text hierarchy</SubHeading>
            <div className="mt-(--spacing-main) flex flex-col gap-(--spacing-md)">
              <p className="text-card-header font-bold text-text-title">text.title — หัวข้อ / heading</p>
              <p className="text-card-header text-text-base">text.base — ข้อความหลัก</p>
              <p className="text-card-header text-text-mid">text.mid — ข้อความรอง</p>
              <p className="text-card-header text-text-low">text.low — ข้อความเบา / placeholder</p>
            </div>
          </Section>

          {/* ---------- Spacing ---------- */}
          <Section id="spacing" title="Spacing" source="§4 Layout + front matter spacing">
            <p className="text-card-header-sm text-text-mid">
              ■ คือขนาดจริงของ token ส่วนแถบ ▬ ขยาย ×10 เพื่อให้เทียบสัดส่วนกันด้วยตาได้ง่าย
            </p>
            <ul className="mt-(--spacing-main) flex flex-col divide-y divide-input-border">
              {spacingTokens.map((s) => (
                <li key={s.cssVar} className="flex flex-wrap items-center gap-(--spacing-form-column-gap) py-(--spacing-main)">
                  <div className="flex flex-col" style={{ width: u(20) }}>
                    <span className="text-card-header-sm font-semibold">{s.name}</span>
                    <span className="text-xxs text-text-mid">{s.value}</span>
                    <Mono>var({s.cssVar})</Mono>
                  </div>
                  <div className="flex items-center justify-center" style={{ width: u(3) }} title="ขนาดจริง">
                    <span className="block bg-primary-default" style={{ width: `var(${s.cssVar})`, height: `var(${s.cssVar})` }} />
                  </div>
                  <span
                    className="block rounded-sm bg-primary-300"
                    style={{ width: `calc(var(${s.cssVar}) * 10)`, height: 'var(--spacing-main)' }}
                    title="ขยาย ×10"
                  />
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- Shape & Elevation ---------- */}
          <Section id="shape" title="Shape & Elevation" source="§5 Elevation, §6 Shapes + front matter rounded">
            <SubHeading first>Rounded scale</SubHeading>
            <ul className="mt-(--spacing-main)" style={cardGrid(12)}>
              {radiusTokens.map((r) => (
                <ShapeSample key={r.cssVar} {...r} />
              ))}
            </ul>

            <SubHeading>Component radius</SubHeading>
            <ul className="mt-(--spacing-main)" style={cardGrid(12)}>
              {componentRadii.map((r) => (
                <ShapeSample key={r.cssVar} {...r} />
              ))}
            </ul>

            <SubHeading>Elevation</SubHeading>
            <div className="mt-(--spacing-main)" style={cardGrid(24)}>
              <div className="rounded-card bg-surface-card shadow-card" style={{ padding: u(2) }}>
                <p className="text-card-header font-semibold">Card default shadow</p>
                <Mono>var(--shadow-card) · inset 0px 0px 4px 0px #0000001a</Mono>
              </div>
              <div className="rounded-card-sm bg-surface-card shadow-card-sm" style={{ padding: u(2) }}>
                <p className="text-card-header-sm font-semibold">Card small shadow</p>
                <Mono>var(--shadow-card-sm) · inset 0px 0px 2px 0px #0000001a</Mono>
              </div>
            </div>
          </Section>

          {/* ---------- Layout ---------- */}
          <Section id="layout" title="Layout" source="§4 Layout">
            <ul style={cardGrid(20)}>
              {layoutTokens.map((l) => (
                <li
                  key={l.cssVar}
                  className="flex flex-col gap-(--spacing-sm) rounded-card-sm border border-input-border p-(--spacing-main)"
                >
                  <span className="text-card-header-sm font-semibold">{l.name}</span>
                  <span className="text-card-header">{l.value}</span>
                  <Mono>var({l.cssVar})</Mono>
                </li>
              ))}
            </ul>
            <SubHeading>Breakpoints (ความยาวแถบเทียบกับ 4k)</SubHeading>
            <ul className="mt-(--spacing-main) flex flex-col gap-(--spacing-md)">
              {breakpoints.map(([name, px]) => (
                <li key={name} className="flex items-center gap-(--spacing-main)">
                  <span className="shrink-0 text-card-header-sm" style={{ width: u(10) }}>
                    <span className="font-semibold">{name}</span> <span className="text-xxs text-text-mid">{px}px</span>
                  </span>
                  <span className="flex-1">
                    <span
                      className="block rounded-sm bg-primary-400"
                      style={{ width: `${(px / 3840) * 100}%`, height: 'var(--spacing-main)' }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- Components ---------- */}
          <Section id="components" title="Components (สถานะปกติ)" source="§7 Components, §6 Shapes, §5 Elevation">
            <div className="flex flex-col" style={{ gap: u(3) }}>
              <ComponentDemo
                name="button-primary"
                spec="bg #0E5D6C · text on-primary #ffffff · radius 6px · text 14px · hover primary.hover #0B4955"
              >
                <button
                  type="button"
                  className="rounded-btn bg-button-primary text-button font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline focus-visible:outline-primary-default"
                  style={{ padding: 'var(--spacing-md) var(--spacing-form-column-gap)' }}
                >
                  ยืนยันการเช็กอิน
                </button>
              </ComponentDemo>

              <ComponentDemo name="input" spec="border #CBD5E1 · hover #4C9FB2 · focus #127486 · radius 6px">
                <label className="flex flex-col gap-(--spacing-form-row-gap)" style={{ maxWidth: u(32) }}>
                  <span className="text-card-header-sm font-semibold">ค้นหาด้วย HN</span>
                  <input
                    type="text"
                    placeholder="เช่น HN-000123"
                    className="rounded-input border border-input-border bg-surface-card text-card-header-sm text-text-base placeholder:text-text-low hover:border-input-border-hover focus:border-input-border-focus focus:outline focus:outline-input-border-focus"
                    style={{ padding: 'var(--spacing-md) var(--spacing-main)' }}
                  />
                </label>
              </ComponentDemo>

              <ComponentDemo name="table" spec="header #84C5D4 · zebra #ffffff / #F8FAFC · selected row #B9E2EC">
                <div className="overflow-x-auto rounded-card-sm border border-input-border">
                  <table className="w-full border-collapse text-card-header-sm">
                    <thead className="bg-table-header">
                      <tr>
                        <th style={tableCell}>Token</th>
                        <th style={tableCell}>ค่า</th>
                        <th style={tableCell}>สถานะแถว</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-table-row">
                        <td style={tableCell}>spacing.sm</td>
                        <td style={tableCell}>3px</td>
                        <td style={tableCell}>row</td>
                      </tr>
                      <tr className="bg-table-row-alt">
                        <td style={tableCell}>spacing.md</td>
                        <td style={tableCell}>6px</td>
                        <td style={tableCell}>row-alt (zebra)</td>
                      </tr>
                      <tr className="bg-table-row-selected" aria-selected="true">
                        <td style={tableCell}>spacing.main</td>
                        <td style={tableCell}>10px</td>
                        <td style={tableCell}>selected</td>
                      </tr>
                      <tr className="bg-table-row-alt">
                        <td style={tableCell}>spacing.form-column-gap</td>
                        <td style={tableCell}>16px</td>
                        <td style={tableCell}>row-alt (zebra)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ComponentDemo>

              <ComponentDemo name="card / card-sm" spec="surface #FFFFFF · radius 8px / 6px · header 16px / 14px · inset shadow">
                <div style={cardGrid(24)}>
                  <article className="rounded-card bg-surface-card shadow-card" style={{ padding: u(2) }}>
                    <h4 className="text-card-header font-semibold text-text-title">การ์ดค่าเริ่มต้น</h4>
                    <p className="mt-(--spacing-md) text-card-header-sm text-text-mid">เนื้อหาการ์ดใช้ text.mid</p>
                  </article>
                  <article className="rounded-card-sm bg-surface-card shadow-card-sm" style={{ padding: u(1.6) }}>
                    <h4 className="text-card-header-sm font-semibold text-text-title">การ์ดขนาดเล็ก</h4>
                    <p className="mt-(--spacing-md) text-card-header-sm text-text-mid">เนื้อหาการ์ดใช้ text.mid</p>
                  </article>
                </div>
              </ComponentDemo>

              <ComponentDemo name="avatar" spec="fill #84C5D4 · active border #127486 · rounded.full">
                <div className="flex items-center gap-(--spacing-form-column-gap)">
                  {[
                    { label: 'ปกติ', active: false },
                    { label: 'active', active: true },
                  ].map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-(--spacing-md)">
                      <span
                        className={`flex items-center justify-center bg-avatar text-card-header-sm font-semibold text-text-base ${
                          a.active ? 'border border-avatar-active-border' : ''
                        }`}
                        style={{ width: u(4), height: u(4), borderRadius: 'var(--radius-full)' }}
                      >
                        สท
                      </span>
                      <span className="text-xxs text-text-mid">{a.label}</span>
                    </div>
                  ))}
                </div>
              </ComponentDemo>

              <ComponentDemo name="checkbox" spec="radius 4px · border input #CBD5E1">
                <label className="inline-flex items-center gap-(--spacing-md) text-card-header-sm">
                  <span
                    aria-hidden="true"
                    className="inline-block rounded-checkbox border border-input-border bg-surface-card"
                    style={{ width: '1em', height: '1em' }}
                  />
                  ยอมรับเงื่อนไข (ยังไม่เลือก)
                </label>
              </ComponentDemo>

              <ComponentDemo
                name="sidebar + app shell"
                spec="sidebar #0E5D6C · width 70px · active #08363F · text #ffffff · popup #EEF8FB · content #eff6ff · footer 30px"
              >
                <div className="flex overflow-hidden rounded-card-sm border border-input-border" style={{ height: u(24) }}>
                  <aside
                    className="flex shrink-0 flex-col items-center gap-(--spacing-md) bg-sidebar py-(--spacing-main) text-on-sidebar"
                    style={{ width: 'var(--layout-sidebar-width)' }}
                  >
                    {['หน้าแรก', 'OPD', 'ค้นหา', 'ตั้งค่า'].map((item, i) => (
                      <span
                        key={item}
                        className={`w-full py-(--spacing-md) text-center text-xxs ${i === 1 ? 'bg-sidebar-active font-semibold' : ''}`}
                      >
                        {item}
                      </span>
                    ))}
                  </aside>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-1 flex-col justify-between bg-surface-app p-(--spacing-main)">
                      <div
                        className="self-start rounded-card-sm bg-sidebar-popup text-card-header-sm shadow-card-sm"
                        style={{ padding: 'var(--spacing-main)' }}
                      >
                        <p className="font-semibold text-text-title">Sidebar popup</p>
                        <p className="text-xxs text-text-mid">ลงทะเบียน · คิว · นัดหมาย</p>
                      </div>
                      <p className="self-end text-xxs text-text-mid">app content background</p>
                    </div>
                    <footer
                      className="flex items-center border-t border-input-border bg-surface-card px-(--spacing-main) text-xxs text-text-low"
                      style={{ height: 'var(--layout-footer-height)' }}
                    >
                      footer · 30px
                    </footer>
                  </div>
                </div>
              </ComponentDemo>
            </div>
          </Section>

          {/* ---------- Known Gaps ---------- */}
          <Section id="known-gaps" title="Known Gaps" source="— ไม่มีหัวข้อนี้ในไฟล์ (ดูข้อ 1)">
            <div className="rounded-card-sm border border-warning-default bg-warning-faded p-(--spacing-main) text-card-header-sm text-text-base">
              DESIGN.md v1.301.3 ไม่มีหัวข้อ Known Gaps หน้านี้จึงไม่ซ่อนหัวข้อ แต่แสดงช่องว่างที่ตรวจพบจากการอ่านไฟล์แทน —
              ทุกข้อควรให้ design owner ยืนยันก่อนใช้เป็นข้อกำหนด
            </div>
            <ol className="mt-(--spacing-form-column-gap) flex flex-col gap-(--spacing-main)">
              {knownGaps.map((gap, i) => (
                <li key={gap.title} className="flex gap-(--spacing-main) rounded-card-sm border border-input-border p-(--spacing-main)">
                  <span className="shrink-0 text-card-header-sm font-bold text-primary-default">{i + 1}.</span>
                  <div className="flex flex-col gap-(--spacing-sm)">
                    <span className="text-card-header-sm font-semibold text-text-base">{gap.title}</span>
                    <span className="text-card-header-sm text-text-mid">{gap.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </div>
      </main>
    </div>
  );
}
