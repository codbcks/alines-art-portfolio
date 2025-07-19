'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Home, Images } from 'lucide-react';

const AdminDashboardPage = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/galleries', label: 'Galleries', icon: Images },
    { href: '/admin/homepage', label: 'Homepage', icon: Home },
    { href: '/admin/cv', label: 'CV', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your portfolio content</p>
        </div>

        {/* Navigation */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex flex-1 items-center justify-center space-x-3 px-4 py-5 text-base font-medium transition-all duration-200 ${
                      isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                    } `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-all" />
                      <span className="text-[15px] font-medium">{item.label}</span>
                    </div>

                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 rounded-t-full bg-blue-500"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-8"></main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
