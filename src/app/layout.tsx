import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// DESIGN.md font.body = 'NotoSansThai', 'Inter'. Both are self-hosted variable fonts (weight 100-900,
// SIL OFL 1.1 — licenses sit next to the files) so dev/build works offline. The Noto file carries only
// Thai glyphs and the Inter file only Latin, so Thai text renders in Noto Sans Thai and Latin in Inter.
const notoSansThai = localFont({
  src: './fonts/NotoSansThai-thai-variable.woff2',
  weight: '100 900',
  variable: '--font-noto-sans-thai',
  display: 'swap',
});
const inter = localFont({
  src: './fonts/Inter-latin-variable.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HIS AI OPD Check-in Starter',
  description: 'Training starter for AI-assisted product development',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${notoSansThai.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
