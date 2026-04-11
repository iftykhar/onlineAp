import Image from 'next/image';
import React from 'react';
import { Phone, Mail } from 'lucide-react'; // optional icons

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white py-12 px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left Section: Branding */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gray-400 font-sans">Powered by</span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/logowhite.png"
                alt="Akij Resource Logo"
                width={120}
                height={40}
                className="object-contain cursor-pointer"
              />
            </div>
          </div>

          {/* Right Section: Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-8 text-sm">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-300">Helpline</span>
              <div className="flex items-center gap-2 text-gray-100 italic">
                 <Phone size={18} className="text-[#8b5cf6]" />
                 <span className="text-base ">+88 011020202505</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-100 italic">
              <Mail size={18} className="text-[#8b5cf6]" />
              <span className="text-base">support@akij.work</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;