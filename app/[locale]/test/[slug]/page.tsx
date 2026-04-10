// "use client"
// import React, { useState, useEffect, useCallback } from 'react'
// import { useRouter } from 'next/navigation'
// import CompletionScreen from '@/components/website/test/CompletionScreen';
// import { toast } from 'sonner';

// export default function ExamPage() {
//   const [timeLeft, setTimeLeft] = useState(120); // 20 mins
//   const [isFinished, setIsFinished] = useState(false);
//   const [tabSwitchCount, setTabSwitchCount] = useState(0);

//   const handleSubmit = useCallback(() => {
//     setIsFinished(true);
//     // Call API to save answers here
//     console.log("Exam Submitted");
//   }, []);

//   const assessmentData = {
//   totalTimeSeconds: 300, // 20 minutes
//   questions: [
//     {
//       id: "q1",
//       type: "radio", // Only one answer
//       questionText: "Which of the following indicators is used to measure market volatility?",
//       options: ["Relative Strength Index (RSI)", "MACD", "Bollinger Bands", "Fibonacci Retracement"]
//     },
//     {
//       id: "q2",
//       type: "checkbox", // Multiple answers
//       questionText: "Select the primary colors used in digital design:",
//       options: ["Red", "Green", "Blue", "Yellow"]
//     },
//     {
//       id: "q3",
//       type: "rich-text", // Elaborate explanation
//       questionText: "Explain the impact of market volatility on consumer behavior.",
//     }
//   ]
// }

//   const QuestionRenderer = ({ type, options }: { type: string, options?: string[] }) => {
//   if (type === 'radio' || type === 'checkbox') {
//     return (
//       <div className="space-y-4">
//         {options?.map((opt, i) => (
//           <label key={i} className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors group">
//             <input 
//               type={type} 
//               name="answer" 
//               className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500" 
//             />
//             <span className="ml-4 text-gray-700 group-hover:text-indigo-900">{opt}</span>
//           </label>
//         ))}
//       </div>
//     );
//   }

  

//   if (type === 'rich-text') {
//     return (
//       <div className="border rounded-xl overflow-hidden">
//         <div className="bg-gray-50 p-2 border-b flex gap-4 text-gray-500">
//            {/* Simplified Toolbar Icons */}
//            <span className="font-bold">B</span> <i>I</i> <u>U</u>
//         </div>
//         <textarea 
//           placeholder="Type questions here..." 
//           className="w-full h-48 p-4 outline-none resize-none"
//         />
//       </div>
//     );
//   }

//   return null;
// }
//   // 1. Timer Logic
//   useEffect(() => {
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }
//     const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, handleSubmit]);

//   // 2. Anti-Cheat: Tab Switching
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         setTabSwitchCount(prev => prev + 1);
//         toast("Warning: Tab switching is detected and logged.");
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, []);

//   // 3. Anti-Cheat: Window Resize (Device Width change)
//   useEffect(() => {
//     const handleResize = () => {
//       console.warn("Window resized - Potential split screen detected");
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (isFinished) return <CompletionScreen userName="User" examTitle="Assessment" isTimeout={false} />;

//   return (
//     <div className=" min-h-screen bg-[#f8fafc] pb-20">
//         <div className=" contianer mx-auto py-10">
//         {/* Header with Progress and Timer */}
//         <header className="bg-white container mx-auto rounded-md  border-b p-4 sticky top-0 z-10">
//             <div className="container mx-auto rounded-lg flex justify-between items-center">
//             <div className="text-lg font-medium">Question (1/20)</div>
//             <div className="bg-[#f1f5f9] px-6 py-2 rounded-lg font-mono text-xl font-bold">
//                 {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} left
//             </div>
//             </div>
//         </header>

//         <main className="container mx-auto mt-8 px-4">
//             <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
//             <h2 className="text-xl font-semibold mb-8">Q1. Which of the following...</h2>
            
//             {/* Render Input types here */}
//             <QuestionRenderer type="radio" options={assessmentData.questions[0].options} />

//             <div className="flex flex-col sm:flex-row sm:justify-between mt-12 space-y-4 sm:space-y-0">
//                     <button className="px-6 py-3 border rounded-xl hover:bg-gray-50">
//                         Skip this Question
//                     </button>

//                     <button 
//                         onClick={handleSubmit}
//                         className="px-8 py-3 bg-[#6366f1] text-white rounded-xl font-semibold hover:bg-[#4f46e5]"
//                     >
//                         Save & Continue
//                     </button>
//                 </div>
//             </div>
//         </main>
//         </div>
//     </div>
//   )
// }


"use client"
import React, { useState, useEffect, useCallback } from 'react'
import CompletionScreen from '@/components/website/test/CompletionScreen';
import { toast } from 'sonner';

export default function ExamPage() {
  const assessmentData = {
    totalTimeSeconds: 60,
    questions: [
      {
        id: "q1",
        type: "radio",
        questionText: "Which of the following indicators is used to measure market volatility?",
        options: ["Relative Strength Index (RSI)", "MACD", "Bollinger Bands", "Fibonacci Retracement"]
      },
      {
        id: "q2",
        type: "checkbox",
        questionText: "Select the primary colors used in digital design:",
        options: ["Red", "Green", "Blue", "Yellow"]
      },
      {
        id: "q3",
        type: "rich-text",
        questionText: "Explain the impact of market volatility on consumer behavior.",
      }
    ]
  }

  const [timeLeft, setTimeLeft] = useState(assessmentData.totalTimeSeconds);
  const [isFinished, setIsFinished] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // State to hold answers: { q1: "Bollinger Bands", q2: ["Red", "Blue"], q3: "text..." }
  const [answers, setAnswers] = useState<Record<string, any>>({});

  // handleAnswerChange updates the local state based on input
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

  const handleSubmit = useCallback((type: "manual" | "timeout" = "manual") => {
    if (type === "timeout") {
      setIsTimeout(true);
    }
    
    setIsFinished(true);
    
    // Log the answers state for backend preparation
    console.log("Exam Submitted. Results:", {
      answers,
      isTimeout: type === "timeout",
      submittedAt: new Date().toISOString()
    });
  }, [answers]);

  // 1. Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit("timeout");
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleSubmit]);

  // Question Renderer with onChange logic
  const QuestionRenderer = ({ question }: { question: any }) => {
    const { id, type, options } = question;

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

    if (type === 'rich-text') {
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

  if (isFinished) {
    return (
      <CompletionScreen 
        userName="Md. Naimur Rahman" 
        examTitle="Probationary Officer Assessment" 
        isTimeout={isTimeout} 
      />
    );
  }

  const currentQuestion = assessmentData.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="container mx-auto py-10">
        <header className="bg-white container mx-auto rounded-md border-b p-4 sticky top-0 z-10 shadow-sm">
          <div className="flex justify-between items-center px-4">
            <div className="text-lg font-medium">Question ({currentQuestionIndex + 1}/{assessmentData.questions.length})</div>
            <div className="bg-[#f1f5f9] px-6 py-2 rounded-lg font-mono text-xl font-bold">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} left
            </div>
          </div>
        </header>

        <main className="container mx-auto mt-8 px-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-8">
              Q{currentQuestionIndex + 1}. {currentQuestion.questionText}
            </h2>
            
            <QuestionRenderer question={currentQuestion} />

            <div className="flex flex-col sm:flex-row sm:justify-between mt-12 space-y-4 sm:space-y-0">
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                className="px-6 py-3 border rounded-xl hover:bg-gray-50 disabled:opacity-50"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>

              <button 
                onClick={() => {
                  if (currentQuestionIndex < assessmentData.questions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                  } else {
                    handleSubmit("manual");
                  }
                }}
                className="px-8 py-3 bg-[#6366f1] text-white rounded-xl font-semibold hover:bg-[#4f46e5]"
              >
                {currentQuestionIndex === assessmentData.questions.length - 1 ? "Finish Test" : "Save & Continue"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}