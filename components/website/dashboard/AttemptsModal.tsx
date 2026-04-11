"use client";

import React from "react";
import { X, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useMyAttempts } from "@/hooks/useExams";

interface AttemptsModalProps {
  examId: string;
  examTitle: string;
  onClose: () => void;
}

const AttemptsModal = ({ examId, examTitle, onClose }: AttemptsModalProps) => {
  const { data: attempts, isLoading } = useMyAttempts(examId);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateString));
  };

  const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(dateString));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">Attempt History</h2>
            <p className="text-sm text-gray-500 mt-1">{examTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200/50 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-4">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 text-sm font-medium">Fetching history...</p>
            </div>
          ) : attempts && attempts.length > 0 ? (
            <div className="space-y-4">
              {attempts.map((attempt: any, index: number) => (
                <div 
                  key={attempt._id}
                  className="group relative p-4 rounded-2xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-lg hover:border-purple-100 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center">
                          #{attempts.length - index}
                        </span>
                        <p className="font-bold text-gray-900">
                          {formatDate(attempt.submittedAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 text-xs">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {formatTime(attempt.submittedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 size={12} className={attempt.status === 'graded' ? 'text-green-500' : 'text-blue-500'} />
                          <span className="capitalize">{attempt.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                       <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Result</p>
                       <p className="text-lg font-black text-purple-600">
                         {attempt.score !== undefined ? `${attempt.score}%` : 'N/A'}
                       </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-3">
              <div className="p-4 bg-gray-50 rounded-full">
                <AlertCircle className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-gray-500 font-medium">No attempts found yet.</p>
              <p className="text-xs text-gray-400">Your history will appear here once you complete a test.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttemptsModal;
