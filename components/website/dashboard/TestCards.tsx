import React from 'react'
import { Clock, FileText, XCircle } from 'lucide-react'
import Link from 'next/link';
import { ExamData } from '@/hooks/useExams';

interface TestCardsProps {
  tests: ExamData[];
}

const TestCards = ({ tests }: TestCardsProps) => {

  if (tests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-blue-50 rounded-full p-10 mb-6">
          <FileText className="w-20 h-20 text-blue-400 opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-[#334155] mb-2">No Online Test Available</h3>
        <p className="text-gray-500 max-w-sm">
          Currently, there are no online tests available. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {tests.map((test) => (
        <div key={test._id} className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-[#334155] mb-6">
            {test.title}
          </h2>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>Duration: <span className="font-medium text-gray-900">{test.duration} min</span></span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5 text-gray-400" />
              <span>Question: <span className="font-medium text-gray-900">{test.questions?.length || 0}</span></span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <XCircle className="w-5 h-5 text-gray-400" />
              <span>Negative Marking: <span className="font-medium text-gray-900">{test.negativeMarking || "No Negative Marking"}</span></span>
            </div>
          </div>

        <Link href={`/test/${test.slug}`}>
          <button className="w-full sm:w-32 py-2.5 border-2 border-[#8b5cf6] text-[#8b5cf6] font-semibold rounded-xl hover:bg-[#8b5cf6] hover:text-white transition-colors">
            Start
          </button>
        </Link>
        </div>
      ))}
    </div>
  )
}

export default TestCards