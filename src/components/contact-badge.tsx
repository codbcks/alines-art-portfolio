'use client';

import { Instagram, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const ContactBadge = () => {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center space-x-4 rounded-lg bg-white/90 p-4 shadow-md backdrop-blur-sm">
      {/* Icons and info */}
      <div className="flex flex-col items-start space-y-2 text-sm text-gray-800">
        <Link
          href="https://www.instagram.com/coldcoffee.__/"
          target="_blank"
          className="flex items-center space-x-2 hover:text-pink-600"
        >
          <Instagram size={18} />
          <span>Aline Yamaura</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Mail size={18} />
          <span>aryamaura918@gmail.com</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone size={18} />
          <span>+64 27 220 1119</span>
        </div>
      </div>
    </div>
  );
};

export default ContactBadge;
