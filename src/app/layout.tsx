import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import BrandIntro from '@/components/layout/BrandIntro';

// Self-hosted Outfit (vendored from @fontsource/outfit, OFL licensed).
// Replaces next/font/google to keep Turbopack production builds deterministic
// with zero fonts.googleapis.com fetch at build/runtime (Vercel-safe).
const outfit = localFont({
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
  src: [
    { path: './fonts/outfit-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fonts/outfit-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/outfit-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/outfit-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/outfit-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: './fonts/outfit-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
});

export const metadata: Metadata = {
  title: 'The Unplugged Wear | Heavyweight Organic Apparel',
  description:
    'Quiet architectural garments crafted from 500 GSM organic French terry and combed jersey. Zero deadstock, printed on-demand with intentional permanence.',
  keywords: [
    'The Unplugged Wear',
    'minimalist streetwear',
    'heavyweight hoodie 500 GSM',
    'organic cotton',
    'slow fashion India',
    'print-on-demand',
  ],
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-sans antialiased bg-store-canvas text-store-text-primary min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-dark focus:text-white focus:font-semibold focus:text-xs focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary-mint"
        >
          Skip to main content
        </a>
        <Providers>
          <BrandIntro />
          {children}
        </Providers>
      </body>
    </html>
  );
}
