"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import FullScreenLoader from "./FullScreenLoader";

const getInitials = (name: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

const Navbar = ({ user }: { user: any }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut({ callbackUrl: "/auth/signin" });
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 min-h-[70px] relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between w-full relative">
          
          <Link href="/" className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105 z-10">
            <Image
              src="/images/logo.png"
              alt="Akij Resource Logo"
              width={120}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {!user && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-[#374151] text-2xl font-bold tracking-tight">Akij Resource</h1>
            </div>
          )}

          <div className="flex items-center gap-4 z-10" ref={profileRef}>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex relative">
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setProfileOpen(!profileOpen)}
                  >
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm overflow-hidden uppercase shadow-sm">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={`${user.fullName || "User"} avatar`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{getInitials(user.fullName)}</span>
                      )}
                    </div>
                    <div className="text-left hidden sm:block">
                      <p className="text-[#1f2937] font-bold text-sm leading-tight">{user.fullName}</p>
                      <p className="text-gray-500 text-xs text-nowrap">Ref. ID - {user.id.slice(-6).toUpperCase()}</p>
                    </div>
                    <ChevronDown size={18} className={`text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {/* Dropdown Menu */}
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-4 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                      <ul className="text-sm text-gray-700">
                        <li
                          onClick={handleSignOut}
                          className="px-4 py-3 hover:bg-red-50 cursor-pointer text-red-600 font-bold flex items-center gap-2 transition-colors uppercase italic"
                        >
                          <X size={16} /> Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden p-2 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={22} className="text-primary" /> : <Menu size={22} className="text-gray-500" />}
                </button>

                {/* Mobile Dropdown */}
                {menuOpen && (
                  <div className="absolute top-[60px] right-0 w-64 bg-white border border-gray-100 rounded-2xl shadow-2xl md:hidden z-50 p-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                       <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs uppercase overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} className="w-full h-full object-cover" alt="User Avatar" />
                        ) : (
                          getInitials(user.fullName)
                        )}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-gray-900">{user.fullName}</p>
                          <p className="text-xs text-gray-500">Member</p>
                       </div>
                    </div>
                    <ul className="space-y-1">
                      <li
                        onClick={handleSignOut}
                        className="px-4 py-3 bg-red-50 rounded-xl cursor-pointer text-red-600 font-bold flex items-center gap-3 uppercase italic"
                      >
                        <X size={18} /> Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-[40px] md:w-[120px]"></div>
            )}
          </div>

        </div>
      </div>

      {/* Logout Loader Overlay */}
      {isLoggingOut && (
        <FullScreenLoader message="Signing you out, please wait..." />
      )}
    </nav>
  );
};

export default Navbar;