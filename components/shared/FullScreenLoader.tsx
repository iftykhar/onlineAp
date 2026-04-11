import React from 'react';
import { Loader2 } from 'lucide-react';

export default function FullScreenLoader({ message = "Loading content, please wait..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-[32px] shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
          <Loader2 className="w-10 h-10 text-[#8b5cf6] animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Just a moment</h2>
        <p className="text-slate-500 font-medium text-center max-w-[250px]">
          {message}
        </p>
      </div>
    </div>
  );
}
