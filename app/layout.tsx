import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fruitopia | Fresh & Wholesome Avocado Street Kart • Ashok Nagar, Chennai',
  description: "Fruitopia - Chennai's artisanal healthy street food kart in Ashok Nagar. Fresh Hass avocado smoothies, artisan guacamole toasts, nourishing broccoli soup, and cooling green buttermilk.",
  keywords: ['Fruitopia', 'Ashok Nagar Chennai', 'Avocado Toast', 'Avocado Smoothie', 'Healthy Street Food', 'Chennai Cafe', 'Artisanal Street Food'],
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-[var(--text-main)] bg-[var(--bg-page)] selection:bg-avocado-500 selection:text-white" data-theme="light">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-avocado-700 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
