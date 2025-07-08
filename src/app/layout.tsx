'use client';

import type React from 'react';
import NavigationBar from '@/components/navigation-bar';
import ContactBadge from '@/components/contact-badge';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <NavigationBar />
        <main className="px-5 pt-16 sm:px-10 lg:px-20">{children}</main>
        <ContactBadge />
      </body>
    </html>
  );
}
