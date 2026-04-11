"use client"

import React, { useState, useMemo } from 'react'
import TestCards from './TestCards'
import { Search } from 'lucide-react'
import { useAvailableExams } from '@/hooks/useExams'
import TestCardSkeleton from '@/components/shared/TestCardSkeleton'

const UserDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: exams, isLoading, error } = useAvailableExams(debouncedSearch);

  const filteredExams = exams || [];

  return (
    <div className='container mx-auto py-10 px-4'>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-[#334155]">Online Tests</h1>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search by exam title" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-purple-100 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f3e8ff] p-2 rounded-lg cursor-pointer">
            <Search className="w-5 h-5 text-[#8b5cf6]" />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="mt-8">
          <TestCardSkeleton />
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-500">
          <p>Failed to load exams. Please try again.</p>
        </div>
      )}

      {/* Main Grid */}
      {!isLoading && !error && (
        <TestCards tests={filteredExams} />
      )}

      {/* Pagination Footer */}
      {!isLoading && filteredExams.length > 0 && (
        <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"> &lt; </button>
            <span className="px-4 py-2 bg-gray-100 rounded-md text-gray-900 font-medium">1</span>
            <button className="p-2 border rounded-md bg-white hover:bg-gray-50"> &gt; </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span>Online Test Per Page</span>
            <select className="border rounded-md px-2 py-1 outline-none">
              <option>8</option>
              <option>16</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDashboard