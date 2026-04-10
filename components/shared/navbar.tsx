// // import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { ChevronDown } from 'lucide-react';
// import Image from 'next/image';

// const Navbar = ({ user }: { user: any }) => {
//   return (
//     <nav className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 shadow-sm min-h-[70px]">
      
//       {/* Column 1: Logo & Dashboard Label */}
//       <div className="flex items-center gap-12 flex-1">
//         <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
//           <Image
//             src="/images/logo.png"
//             alt="Akij Resource Logo"
//             width={120}
//             height={40}
//             className="object-contain"
//             priority
//           />
//         </Link>

//         {user && (
//           <span className="text-gray-700 font-medium text-lg ml-4">
//             Dashboard
//           </span>
//         )}
//       </div>

//       {/* Column 2: Center Title (Shows only when logged out) */}
//       {!user && (
//         <div className="flex-1 flex justify-center">
//           <h1 className="text-[#374151] text-2xl font-semibold">
//             Akij Resource
//           </h1>
//         </div>
//       )}

//       {/* Column 3: User Section */}
//       <div className="flex-1 flex justify-end">
//         {user ? (
//           <div className="relative group">
//             <div className="flex items-center gap-3 cursor-pointer">
//               {/* Avatar */}
//               <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
//                 <img
//                   src={user.avatar || "/images/default-avatar.png"}
//                   alt={`${user.username || "Default"} avatar`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               {/* User Info */}
//               <div className="text-left hidden sm:block">
//                 <p className="text-[#1f2937] font-bold text-sm leading-tight">
//                   {user.username}
//                 </p>
//                 <p className="text-gray-500 text-xs">
//                   Ref. ID - {user.refId}
//                 </p>
//               </div>

//               {/* Dropdown Arrow */}
//               <ChevronDown
//                 size={18}
//                 className="text-gray-400 group-hover:text-gray-600 transition-colors"
//               />
//             </div>

//             {/* Dropdown Menu Stub */}
//             <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
//               <ul className="py-2 text-sm text-gray-700">
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
//                 <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
//               </ul>
//             </div>
//           </div>
//         ) : (
//           <div className="w-[40px]"></div> 
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = ({ user }: { user: any }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm min-h-[70px] relative">
      <div className="container mx-auto">
        <div className=" px-4 flex items-center justify-between py-3">
          
          {/* Column 1: Logo & Dashboard Label */}
          <div className="flex items-center gap-12 flex-1">
            <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
              <Image
                src="/images/logo.png"
                alt="Akij Resource Logo"
                width={120}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            {user && (
              <span className="hidden md:inline text-gray-700 font-medium text-lg ml-4">
                Dashboard
              </span>
            )}
          </div>

          {/* Column 2: Center Title (Shows only when logged out) */}
          {!user && (
            <div className="flex-1 flex justify-center">
              <h1 className="text-[#374151] text-2xl font-semibold">Akij Resource</h1>
            </div>
          )}

          {/* Column 3: User Section */}
          <div className="flex-1 flex justify-end items-center">
            {user ? (
              <>
                {/* Desktop User Section */}
                <div className="hidden md:flex relative group">
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={user.avatar || "/images/default-avatar.png"}
                        alt={`${user.fullName || "User"} avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-[#1f2937] font-bold text-sm leading-tight">{user.fullName}</p>
                      <p className="text-gray-500 text-xs">Ref. ID - {user.id.slice(-6).toUpperCase()}</p>
                    </div>
                    <ChevronDown size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <ul className="py-2 text-sm text-gray-700">
                      {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li> */}
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                  </div>
                </div>

                {/* Mobile Hamburger */}
                <button
                  className="md:hidden p-2 rounded-md border border-gray-200"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* Mobile Menu Drawer */}
                {menuOpen && (
                  <div className="absolute top-[70px] right-4 w-56 bg-white border border-gray-200 rounded-lg shadow-lg md:hidden transition-all duration-200 ease-in-out">
                    <ul className="py-2 text-sm text-gray-700">
                      {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li> */}
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="w-[40px]"></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;