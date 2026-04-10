import React from 'react'
import { Clock, FileText, XCircle } from 'lucide-react'
import Link from 'next/link';

const tests = [
  {
    id: "test-101",
    title: "Psychometric Test for Management Trainee Officer",
    durationMinutes: 30,
    totalQuestions: 20,
    negativeMarking: "-0.25/wrong",
    slug: "psychometric-test-mto-1",
    status: "available"
  },
  {
    id: "test-102",
    title: "Analytical Ability Test - Senior Executive",
    durationMinutes: 45,
    totalQuestions: 30,
    negativeMarking: "-0.50/wrong",
    slug: "analytical-ability-sr-exec",
    status: "available"
  },
  {
    id: "test-103",
    title: "Technical Assessment for Frontend Developer",
    durationMinutes: 60,
    totalQuestions: 40,
    negativeMarking: "No Negative Marking",
    slug: "technical-frontend-dev",
    status: "available"
  },
  {
    id: "test-104",
    title: "General Knowledge & IQ Assessment",
    durationMinutes: 20,
    totalQuestions: 50,
    negativeMarking: "-0.20/wrong",
    slug: "gk-iq-assessment",
    status: "available"
  }
];

const TestCards = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {tests.map((test) => (
        <div key={test.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold text-[#334155] mb-6">
            {test.title}
          </h2>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>Duration: <span className="font-medium text-gray-900">{test.durationMinutes} min</span></span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="w-5 h-5 text-gray-400" />
              <span>Question: <span className="font-medium text-gray-900">{test.totalQuestions}</span></span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <XCircle className="w-5 h-5 text-gray-400" />
              <span>Negative Marking: <span className="font-medium text-gray-900">{test.negativeMarking}</span></span>
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