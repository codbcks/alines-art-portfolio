'use client';

import type React from 'react';
import Navigation from '@/components/navigation';
import ContactBadge from '@/components/contact-badge';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Navigation />
        <main className="px-5 pt-16 sm:px-10 lg:px-20">{children}</main>
        <ContactBadge />
      </body>
    </html>
  );
}
