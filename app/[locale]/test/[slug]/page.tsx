"use client"
import React, { useState, useEffect, useCallback, use } from 'react'
import CompletionScreen from '@/components/website/test/CompletionScreen';
import { toast } from 'sonner';
import { useExamBySlug, useSubmitExam, useMySubmission } from '@/hooks/useExams';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function ExamPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const { user } = useAuth();
  
  const { data: examData, isLoading: isLoadingExam, error: examError } = useExamBySlug(slug);
  const examId = examData?._id;
  
  const { data: mySubmission, isLoading: isLoadingSubmission } = useMySubmission(examId || "");
  const submitExamMutation = useSubmitExam();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize timer when exam data loads
  useEffect(() => {
    if (examData && timeLeft === null && !mySubmission) {
      setTimeLeft(examData.duration * 60);
    }
  }, [examData, timeLeft, mySubmission]);

  // Handle if already submitted
  useEffect(() => {
    if (mySubmission) {
      setIsFinished(true);
    }
  }, [mySubmission]);

  const handleAnswerChange = (questionId: string, value: any, isCheckbox: boolean = false) => {
    setAnswers(prev => {
      if (isCheckbox) {
        const currentSelection = prev[questionId] || [];
        const newSelection = currentSelection.includes(value)
          ? currentSelection.filter((v: string) => v !== value)
          : [...currentSelection, value];
        return { ...prev, [questionId]: newSelection };
      }
      return { ...prev, [questionId]: value };
    });
  };

  const handleSubmit = useCallback(async (type: "manual" | "timeout" = "manual") => {
    if (!examId || isFinished) return;
    
    setIsSubmitting(true);
    const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
      questionId: qId,
      answer: ans,
    }));

    try {
      await submitExamMutation.mutateAsync({
        examId,
        payload: {
          answers: formattedAnswers,
          isTimeout: type === "timeout",
          tabSwitchCount
        }
      });
      
      if (type === "timeout") {
        setIsTimeout(true);
      }
      setIsFinished(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to submit exam");
    } finally {
      setIsSubmitting(false);
    }
  }, [examId, answers, tabSwitchCount, submitExamMutation, isFinished]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft === null || isFinished) return;
    if (timeLeft <= 0) {
      handleSubmit("timeout");
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev! - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished, handleSubmit]);

  // Anti-Cheat: Tab Switching / Fullscreen exit detection
  useEffect(() => {
    if (isFinished || !examData) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount(prev => prev + 1);
        setShowWarningModal(true);
      }
    };
    
    // Some browsers use blur/focus on window for tab switches
    const handleWindowBlur = () => {
      setTabSwitchCount(prev => prev + 1);
      setShowWarningModal(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [isFinished, examData]);

  // Question Renderer
  const QuestionRenderer = ({ question }: { question: any }) => {
    const { _id: id, type, options } = question;

    if (type === 'radio' || type === 'checkbox') {
      return (
        <div className="space-y-4">
          {options?.map((opt: string, i: number) => (
            <label key={i} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors group">
              <input 
                type={type} 
                name={id} 
                checked={type === 'radio' ? answers[id] === opt : (answers[id] || []).includes(opt)}
                onChange={() => handleAnswerChange(id, opt, type === 'checkbox')}
                className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500" 
              />
              <span className="ml-4 text-gray-700 group-hover:text-indigo-900">{opt}</span>
            </label>
          ))}
        </div>
      );
    }

    if (type === 'text') {
      return (
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-gray-50 p-2 border-b flex gap-4 text-gray-500 text-xs font-bold uppercase">
             <span>Bold</span> <span>Italic</span> <span>Underline</span>
          </div>
          <textarea 
            placeholder="Type your explanation here..." 
            value={answers[id] || ""}
            onChange={(e) => handleAnswerChange(id, e.target.value)}
            className="w-full h-48 p-4 outline-none resize-none"
          />
        </div>
      );
    }
    return null;
  }

  if (isLoadingExam || isLoadingSubmission) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (examError || !examData) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex justify-center items-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Exam not available</h2>
          <p className="text-slate-500 mt-2">This exam may be closed or doesn't exist.</p>
          <button onClick={() => router.push('/dashboard')} className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <CompletionScreen 
        userName={user?.fullName || "Candidate"} 
        examTitle={examData.title} 
        isTimeout={isTimeout} 
      />
    );
  }

  const currentQuestion = examData.questions?.[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      
      {/* Anti-Cheat Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Warning Recorded</h2>
              <p className="text-slate-600">
                You have left the exam window. This action has been recorded. Continuing to leave the exam window may result in cancellation of your test.
              </p>
            </div>
            <button 
              onClick={() => setShowWarningModal(false)}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors"
            >
              I Understand, Return to Exam
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto py-10">
        <header className="bg-white container mx-auto rounded-md border-b p-4 sticky top-0 z-10 shadow-sm transition-all">
          <div className="flex justify-between items-center px-4">
            <div className="text-lg font-medium">Question ({currentQuestionIndex + 1}/{examData.questions?.length || 0})</div>
            <div className={`px-6 py-2 rounded-lg font-mono text-xl font-bold ${
              timeLeft !== null && timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-[#f1f5f9] text-slate-800'
            }`}>
              {timeLeft !== null ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')} left` : "Loading time..."}
            </div>
          </div>
        </header>

        <main className="container mx-auto mt-8 px-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            {currentQuestion ? (
              <>
                <h2 className="text-xl font-semibold mb-8">
                  Q{currentQuestionIndex + 1}. {currentQuestion.title}
                </h2>
                <QuestionRenderer question={currentQuestion} />
              </>
            ) : (
              <div className="text-center py-10 text-slate-500">No questions available for this exam.</div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between mt-12 space-y-4 sm:space-y-0">
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                className="px-6 py-3 border rounded-xl hover:bg-gray-50 disabled:opacity-50 transition-colors bg-white font-semibold"
                disabled={currentQuestionIndex === 0 || isSubmitting}
              >
                Previous
              </button>

              <button 
                onClick={() => {
                  if (currentQuestionIndex < (examData.questions?.length || 1) - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                  } else {
                    handleSubmit("manual");
                  }
                }}
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#6366f1] text-white rounded-xl font-semibold hover:bg-[#4f46e5] disabled:opacity-50 flex items-center justify-center min-w-[160px] transition-all"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  currentQuestionIndex === (examData.questions?.length || 1) - 1 ? "Submit Test" : "Save & Continue"
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}