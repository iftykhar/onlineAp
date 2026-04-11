import React from 'react'
import { Users, FileText, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link';

// Define the shape of your Test data
interface TestData {
  id: string;
  title: string;
  candidates: string | number;
  questionSet: string | number;
  examSlots: string | number;
  status?: "draft" | "published";
  slug?: string;
}

interface AdminTestCardsProps {
  tests: TestData[];
}

const AdminTestCards = ({ tests }: AdminTestCardsProps) => {
  // --- Empty State UI (Triggers if tests array is empty) ---
  if (tests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative mb-6">
          <div className="bg-blue-50 rounded-full p-10">
            <FileText className="w-20 h-20 text-blue-400 opacity-50" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#334155] mb-2">No Online Test Available</h3>
        <p className="text-gray-500 w-full">
          Currently, there are no online tests available. Please check back later for updates.
        </p>
      </div>
    );
  }

  // --- Grid State UI (Triggers if data exists) ---
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {tests.map((test) => (
        <div 
          key={test.id} 
          className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-[#334155] leading-tight flex-1 mr-3">{test.title}</h2>
            {test.status && (
              <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${
                test.status === 'published' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {test.status === 'published' ? 'Published' : 'Draft'}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 mb-10">
            {/* Candidates */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Users className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Candidates:</p>
                <p className="font-semibold text-gray-700">{test.candidates}</p>
              </div>
            </div>

            {/* Question Set */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Question Set:</p>
                <p className="font-semibold text-gray-700">{test.questionSet}</p>
              </div>
            </div>

            {/* Exam Slots */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Exam Slots:</p>
                <p className="font-semibold text-gray-700">{test.examSlots}</p>
              </div>
            </div>
          </div>

          <Link href={`/admin/dashboard/test/${test.id}/submissions`} className="block w-full sm:w-44">
            <button className="w-full py-3 border-2 border-[#8b5cf6] text-[#8b5cf6] font-bold rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all active:scale-95">
              View Candidates
            </button>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default AdminTestCards