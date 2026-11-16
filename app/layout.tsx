import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fruitopia | Fresh & Wholesome Avocado Street Kart • Ashok Nagar, Chennai',
  description: "Fruitopia - Chennai's healthy street food kart in Ashok Nagar. Fresh Hass avocado smoothies, artisan guacamole toasts, nourishing broccoli soup, and cooling green buttermilk.",
  keywords: ['Fruitopia', 'Ashok Nagar Chennai', 'Avocado Toast', 'Avocado Smoothie', 'Healthy Street Food', 'Chennai Cafe'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" data-theme="light">
        {children}
      </body>
    </html>
  );
}
