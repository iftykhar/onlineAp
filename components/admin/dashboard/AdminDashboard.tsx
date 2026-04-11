"use client"

import React from 'react'
import { Search } from 'lucide-react'
import AdminTestCards from '@/components/admin/dashboard/AdminTestCards'
import Link from 'next/link';
import { useExams } from '@/hooks/useExams';

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: exams, isLoading, error } = useExams(debouncedSearch);
  
  const filteredExams = exams || [];

  return (
    <div className='container mx-auto py-10 px-4'>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        
        <h1 className="text-2xl font-bold text-[#334155]">
          Online Tests
        </h1>

        {/* Search */}
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search by exam title" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-purple-100 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f3e8ff] p-2 rounded-lg">
            <Search className="w-5 h-5 text-[#8b5cf6]" />
          </div>
        </div>

        {/* Button */}
        <Link href="/admin/dashboard/test">
        <button className="w-full sm:w-40 py-2.5 bg-[#8b5cf6] text-white font-semibold rounded-xl hover:bg-[#7c3aed] transition-colors">
          Create Test
        </button>
        </Link>

      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20 text-red-500">
          <p>Failed to load exams. Please try again.</p>
        </div>
      )}

      {/* Test Cards */}
      {!isLoading && !error && (
        <AdminTestCards tests={filteredExams.map((exam) => ({
          id: exam._id,
          title: exam.title,
          candidates: exam.totalCandidates.toLocaleString(),
          questionSet: exam.questions.length > 0 ? exam.questions.length : "Not Set",
          examSlots: exam.totalSlots,
          status: exam.status,
          slug: exam.slug,
        }))} />
      )}

      {/* Pagination */}
      {!isLoading && filteredExams.length > 0 && (
        <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
          
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-md bg-white hover:bg-gray-50">
              &lt;
            </button>

            <span className="px-4 py-2 bg-gray-100 rounded-md text-gray-900 font-medium">
              1
            </span>

            <button className="p-2 border rounded-md bg-white hover:bg-gray-50">
              &gt;
            </button>
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

export default AdminDashboard