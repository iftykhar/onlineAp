import Image from 'next/image';
import React from 'react';
import { Phone, Mail } from 'lucide-react'; // optional icons

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-white py-6 px-8">
      <div className="container mx-auto">

        <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-6">
          
          {/* Left Section: Branding */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Powered by</span>
            <Image
              src="/images/logowhite.png"
              alt="Akij Resource Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Right Section: Contact Info */}
          <div className="flex flex-col md:flex-row justify-start gap-2 text-sm">
            <div className="flex items-center gap-2">
              
              <span className="font-medium">Helpline</span>
              <Phone size={16} className="text-gray-400" />
              <span>+8801712345678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              {/* <span className="font-medium">Email:</span> */}
              <span>support@akij.work</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;