'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Improved Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const galleryItems = [
    { label: 'Paintings', href: '/paintings' },
    { label: 'Sketches', href: '/sketches' },
    { label: 'Installations', href: '/installations' },
  ];

  const navItems = [
    { label: 'Bio', href: '/bio' },
    { label: 'CV', href: '/cv' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md shadow-sm">
      <div className="max-w-8xl mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Make it a Link to home */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-serif text-lg">AS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Gallery Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-900 hover:text-purple-900 px-3 py-2 text-sm font-medium transition-colors">
                Gallery
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
              <div className="absolute left-0 mt-1 min-w-max bg-white shadow-lg rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                <div className="py-2">
                  {galleryItems.map((item) => (
                    <Link key={item.label} href={item.href}>
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-900 transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-900 hover:text-purple-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
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
        } md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Mobile Gallery Dropdown */}
          <div>
            <button
              onClick={() => setIsGalleryOpen(!isGalleryOpen)}
              className="w-full text-left flex items-center justify-between text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md font-medium transition-colors"
            >
              Gallery
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
                {galleryItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-gray-600 hover:text-gray-900 px-3 py-2 text-sm rounded-md hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsGalleryOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
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
