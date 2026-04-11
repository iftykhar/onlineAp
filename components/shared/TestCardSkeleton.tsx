import React from 'react';

export default function TestCardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div className="h-6 w-1/2 bg-slate-200 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-10">
            <div className="h-10 w-24 bg-slate-100 rounded-xl animate-pulse" />
            <div className="h-10 w-24 bg-slate-100 rounded-xl animate-pulse" />
            <div className="h-10 w-24 bg-slate-100 rounded-xl animate-pulse" />
          </div>
          <div className="h-12 w-full bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      ))}
    </div>
  );
}
