"use client"
import React, { useState } from 'react'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import FullScreenLoader from '@/components/shared/FullScreenLoader'

interface Props {
  userName: string;
  examTitle: string;
  isTimeout: boolean;
}

const CompletionScreen = ({ userName, examTitle, isTimeout }: Props) => {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <>
      {isNavigating && <FullScreenLoader message="Returning to Dashboard..." />}
      <div className="min-h-[calc(100vh-140px)] bg-gray-50 py-5 shadow-sm">
          <div className="max-w-4xl w-full mx-auto bg-white border border-gray-100 rounded-[32px] p-12 md:p-20 shadow-sm text-center">
          <div className="flex justify-center mb-8">
              {isTimeout ? (
              <div className="relative">
                  <Clock className="w-24 h-24 text-[#334155]" strokeWidth={1.5} />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  <div className="bg-[#ef4444] rounded-full p-1">
                      <AlertCircle className="w-8 h-8 text-white fill-[#ef4444]" />
                  </div>
                  </div>
              </div>
              ) : (
              <div className="bg-[#3b82f6] rounded-2xl p-5 shadow-lg shadow-blue-100">
                  <CheckCircle2 className="w-14 h-14 text-white" />
              </div>
              )}
          </div>

          <h1 className="text-3xl font-bold text-[#1e293b] mb-4">
              {isTimeout ? "Timeout!" : "Test Completed"}
          </h1>

          <p className="text-[#64748b] text-lg max-w-2xl mx-auto leading-relaxed mb-12">
              {isTimeout ? (
              <>Dear <span className="font-semibold text-[#334155]">{userName}</span>, Your exam time has been finished. Thank you for participating.</>
              ) : (
              <>Congratulations! <span className="font-semibold text-[#334155]">{userName}</span>, You have completed your MCQ Exam for {examTitle}. Thank you for participating.</>
              )}
          </p>

          <button 
              onClick={() => {
                setIsNavigating(true);
                window.location.href = '/dashboard';
              }}
              className="px-12 py-4 border cursor-pointer border-gray-200 rounded-2xl font-bold text-[#334155] hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
              Back to Dashboard
          </button>
          </div>
        </div>
    </>
  )
}

export default CompletionScreen