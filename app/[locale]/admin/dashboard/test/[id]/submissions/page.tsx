"use client"
import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useExamSubmissions, useExamById } from '@/hooks/useExams'
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react'
import FullScreenLoader from '@/components/shared/FullScreenLoader'

export default function SubmissionsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  
  const { data: exam, isLoading: isLoadingExam } = useExamById(id);
  const { data: submissions, isLoading: isLoadingSubmissions } = useExamSubmissions(id);

  if (isLoadingExam || isLoadingSubmissions) {
    return <FullScreenLoader message="Fetching candidates..." />;
  }

  return (
    <div className='min-h-[calc(100vh-140px)] bg-gray-50'>
      <div className='container mx-auto py-10 px-4 '>
        <button 
          onClick={() => router.push('/admin/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#8b5cf6] mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
          <h1 className="text-2xl font-bold text-[#334155] mb-2">{exam?.title} - Submissions</h1>
          <p className="text-slate-500 font-medium">Total submissions: {submissions?.length || 0}</p>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-semibold text-sm">
                  <th className="px-6 py-4">Candidate Name</th>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Submitted At</th>
                  <th className="px-6 py-4">Warnings (Tab Switches)</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {submissions?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium italic">
                      No submissions found for this exam yet.
                    </td>
                  </tr>
                ) : (
                  submissions?.map((sub: any) => (
                    <tr key={sub._id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-800 font-semibold">{sub.userId?.fullName || "Unknown"}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{sub.userId?.email || "N/A"}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">
                        {new Date(sub.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {sub.tabSwitchCount > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100">
                            {sub.tabSwitchCount} Warnings
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium text-sm">0</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {sub.isTimeout ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-[10px] uppercase font-bold tracking-wider rounded-lg border border-red-100">
                            <Clock className="w-3 h-3" /> Auto-Submitted
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] uppercase font-bold tracking-wider rounded-lg border border-green-100">
                            <CheckCircle className="w-3 h-3" /> Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
