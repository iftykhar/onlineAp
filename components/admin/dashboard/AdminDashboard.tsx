// import React from 'react'
// import { Search } from 'lucide-react'
// import AdminTestCards from './AdminTestCards'


// const AdminDashboard = () => {
//   return (
//     <div className='container mx-auto py-10 px-4'>
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <h1 className="text-2xl font-bold text-[#334155]">Online Tests</h1>
        
//         <div className="relative w-full md:w-96">
//           <input 
//             type="text" 
//             placeholder="Search by exam title" 
//             className="w-full pl-4 pr-12 py-3 rounded-xl border border-purple-100 bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
//           />
//           <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f3e8ff] p-2 rounded-lg cursor-pointer">
//             <Search className="w-5 h-5 text-[#8b5cf6]" />
//           </div>
//         </div>
//         <div className="">
//            <button 
//             className="w-full p-5 sm:w-40 py-2.5 border-2 border-[#8b5cf6] text-white font-semibold rounded-xl bg-[#8b5cf6] hover:bg-[#8b5cf6]/70 hover:text-white transition-colors"
//             >
//             Create Test
//             </button>
//         </div>
//       </div>

//       {/* Main Grid */}
//       <AdminTestCards />

//       {/* Pagination Footer */}
//       <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
//         <div className="flex items-center gap-2">
//           <button className="p-2 border rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"> &lt; </button>
//           <span className="px-4 py-2 bg-gray-100 rounded-md text-gray-900 font-medium">1</span>
//           <button className="p-2 border rounded-md bg-white hover:bg-gray-50"> &gt; </button>
//         </div>
        
//         <div className="flex items-center gap-4">
//           <span>Online Test Per Page</span>
//           <select className="border rounded-md px-2 py-1 outline-none">
//             <option>8</option>
//             <option>16</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard


"use client"

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import AdminTestCards from '@/components/admin/dashboard/AdminTestCards'
import Link from 'next/link';

interface TestData {
  id: string;
  title: string;
  candidates: string | number;
  questionSet: string | number;
  examSlots: string | number;
}

const AdminDashboard = () => {
  const [testData, setTestData] = useState<TestData[]>([
    {
      id: '1',
      title: "Psychometric Test for Management Trainee Officer",
      candidates: "10,000",
      questionSet: 3,
      examSlots: 3,
    },
    {
      id: '2',
      title: "Psychometric Test for Management Trainee Officer",
      candidates: "Not Set",
      questionSet: "Not Set",
      examSlots: "Not Set",
    },
  ])

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

      {/* Test Cards */}
      <AdminTestCards tests={testData} />

      {/* Pagination */}
      {testData.length > 0 && (
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