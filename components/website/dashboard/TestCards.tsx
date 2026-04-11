"use client"
import React, { useState } from 'react'
import { Clock, FileText, XCircle, Info } from 'lucide-react'
import Link from 'next/link';
import { ExamData } from '@/hooks/useExams';
import FullScreenLoader from '@/components/shared/FullScreenLoader';
import AttemptsModal from './AttemptsModal';

interface TestCardsProps {
  tests: ExamData[];
}

const TestCards = ({ tests }: TestCardsProps) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedExam, setSelectedExam] = useState<{ id: string; title: string } | null>(null);

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
    <>
      {isNavigating && <FullScreenLoader message="Opening exam environment..." />}
      
      {/* Attempts Modal */}
      {selectedExam && (
        <AttemptsModal 
          examId={selectedExam.id}
          examTitle={selectedExam.title}
          onClose={() => setSelectedExam(null)}
        />
      )}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {tests.map((test) => (
          <div key={test._id} className="group/card relative bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm  transition-all duration-300">
            {/* History Link Icon */}
            <div 
              onClick={() => setSelectedExam({ id: test._id, title: test.title })}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-purple-600 hover:bg-purple-50 cursor-pointer transition-all duration-200"
              title="View attempts"
            >
              <Info size={22} />
            </div>

            <h2 className="text-xl font-semibold text-[#334155] mb-6 pr-8">
              {test.title}
            </h2>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="p-1.5 bg-blue-50 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-sm">Duration: <span className="font-bold text-gray-900">{test.duration} min</span></span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <div className="p-1.5 bg-purple-50 rounded-lg">
                  <FileText className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-sm">Question: <span className="font-bold text-gray-900">{test.questions?.length || 0}</span></span>
              </div>

              
              <div className="flex items-center gap-2 text-gray-600">
                <div className="p-1.5 bg-red-50 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-sm">Negative Marking: <span className="font-bold text-gray-900">{test.negativeMarking || "No"}</span></span>
              </div>
            </div>

            <Link href={`/test/${test.slug}`} onClick={() => setIsNavigating(true)}>
              <button className="w-full sm:w-36 py-3 border-2 cursor-pointer border-[#8b5cf6] text-[#8b5cf6] font-bold rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all duration-300 active:scale-95">
                Start Test
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default TestCards