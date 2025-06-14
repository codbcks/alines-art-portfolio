'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGalleries } from '@/hooks/useGalleries';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { galleries, loading } = useGalleries();

  const navItems = [
    { label: 'bio', href: '/bio' },
    { label: 'cv', href: '/cv' },
    { label: 'contact', href: '/contact' },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 bg-white/85 shadow-sm backdrop-blur-md">
      <div className="max-w-8xl mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <span className="font-serif text-lg text-gray-600">AY</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-6 md:flex">
            {/* Gallery Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-purple-900">
                gallery
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="invisible absolute left-0 z-50 mt-1 min-w-max translate-y-2 transform rounded-lg border border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="py-2">
                  {loading ? (
                    <div className="px-4 py-2 text-sm text-gray-500">Loading galleries...</div>
                  ) : galleries.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-500">No galleries found</div>
                  ) : (
                    galleries.map((gallery) => (
                      <Link key={gallery.id} href={`/${gallery.slug}`}>
                        <span className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-purple-900">
                          {gallery.title}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-purple-900"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 ease-in-out md:hidden`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Mobile Gallery Dropdown */}
          <div>
            <button
              onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              gallery
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isGalleryOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                isGalleryOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="ml-4 space-y-1 pt-1">
                {loading ? (
                  <div className="px-3 py-2 text-sm text-gray-500">Loading galleries...</div>
                ) : galleries.length === 0 ? (
                  <div className="px-3 py-2 text-sm text-gray-500">No galleries found</div>
                ) : (
                  galleries.map((gallery) => (
                    <Link
                      key={gallery.id}
                      href={`/${gallery.slug}`}
                      className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsGalleryOpen(false);
                      }}
                    >
                      {gallery.title}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-md px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
