
// // "use client"
// // import React, { useState } from 'react'
// // import { Plus, FileText, MousePointer2 } from 'lucide-react'
// // import { useTestCreationStore } from '@/app/store/useTestCreationStore'
// // import QuestionModal from './QuestionModal'

// // const QuestionSet = () => {
// //   const { questions, basicInfo, removeQuestion, setStep } = useTestCreationStore();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingQuestion, setEditingQuestion] = useState<any>(null);

// //   const handleOpenModal = () => {
// //     setEditingQuestion(null);
// //     setIsModalOpen(true);
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto space-y-8">
      
// //       {/* 1. Header with Question Count */}
// //       <div className="flex justify-between items-center">
// //         <h3 className="text-xl font-bold text-slate-800">Question Set</h3>
// //         {questions.length > 0 && (
// //           <button 
// //             onClick={handleOpenModal}
// //             className="flex items-center gap-2 px-6 py-3 bg-[#8b5cf6] text-white rounded-xl font-bold hover:bg-[#7c3aed] transition-all"
// //           >
// //             <Plus className="w-5 h-5" /> Add More
// //           </button>
// //         )}
// //       </div>

// //       {/* 2. Main Content Area */}
// //       {questions.length === 0 ? (
// //         /* EMPTY STATE: Matching "Manual Question.png" */
// //         <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[32px] border-2 border-dashed border-gray-100">
// //           <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
// //             <MousePointer2 className="w-10 h-10 text-[#8b5cf6]" />
// //           </div>
          
// //           <button 
// //             onClick={handleOpenModal}
// //             className="group relative flex items-center gap-3 px-8 py-4 bg-white border-2 border-[#8b5cf6] text-[#8b5cf6] font-bold rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all duration-300"
// //           >
// //             <Plus className="w-6 h-6" />
// //             Create Question Manually
// //           </button>
          
// //           <p className="mt-6 text-gray-400 text-sm">
// //             No questions added yet. Click above to start.
// //           </p>
// //         </div>
// //       ) : (
// //         /* LIST STATE: Matching "View Mode.png" */
// //         <div className="grid gap-4">
// //           {questions.map((q, idx) => (
// //             <div key={q.id} className="bg-white p-6 rounded-3xl border border-gray-100 flex justify-between items-center shadow-sm">
// //               <div className="flex gap-4 items-center">
// //                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-400">
// //                   {idx + 1}
// //                 </div>
// //                 <div>
// //                   <h4 className="font-bold text-slate-700">{q.title}</h4>
// //                   <div className="flex gap-2 mt-1">
// //                     <span className="text-[10px] font-bold text-purple-500 bg-purple-50 px-2 py-0.5 rounded uppercase">
// //                       {q.type}
// //                     </span>
// //                     {q.options && (
// //                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded uppercase">
// //                        {q.options.length} Options
// //                      </span>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button 
// //                   onClick={() => { setEditingQuestion(q); setIsModalOpen(true); }}
// //                   className="p-2 text-gray-400 hover:text-[#8b5cf6] transition-colors"
// //                 >
// //                   <Plus className="w-5 h-5" /> {/* Or Edit Icon */}
// //                 </button>
// //                 <button onClick={() => removeQuestion(q.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
// //                   <Plus className="w-5 h-5 rotate-45" /> {/* Delete style */}
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* 3. Navigation Buttons */}
// //       <div className="flex justify-between pt-10">
// //         <button 
// //           onClick={() => setStep(1)} 
// //           className="px-10 py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors"
// //         >
// //           Go Back
// //         </button>
// //         <button 
// //           disabled={questions.length === 0}
// //           className="px-12 py-4 bg-[#8b5cf6] text-white font-bold rounded-2xl shadow-lg hover:bg-[#7c3aed] disabled:opacity-50 disabled:grayscale transition-all"
// //           onClick={() => console.log("Final Submit", { basicInfo, questions })}
// //         >
// //           Finish & Publish
// //         </button>
// //       </div>

// //       {isModalOpen && (
// //         <QuestionModal 
// //           isOpen={isModalOpen} 
// //           onClose={() => setIsModalOpen(false)} 
// //           initialData={editingQuestion}
// //         />
// //       )}
// //     </div>
// //   )
// // }

// // export default QuestionSet;

// "use client"
// import React, { useState } from 'react'
// import { Plus, MousePointer2, Circle, Square, AlignLeft, Trash2 } from 'lucide-react'
// import { useTestCreationStore } from '@/app/store/useTestCreationStore'
// import QuestionModal from './QuestionModal'

// const QuestionSet = () => {
//   const { questions, basicInfo, removeQuestion, setStep } = useTestCreationStore();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState<any>(null);

//   const handleOpenModal = () => {
//     setEditingQuestion(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (q: any) => {
//     setEditingQuestion(q);
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-8">
      
//       {/* 1. Header with Question Count */}
//       <div className="flex justify-between items-center">
//         <h3 className="text-xl font-bold text-slate-800">Question Set ({questions.length})</h3>
//         {questions.length > 0 && (
//           <button 
//             onClick={handleOpenModal}
//             className="flex items-center gap-2 px-6 py-2.5 bg-[#8b5cf6] text-white rounded-xl font-bold hover:bg-[#7c3aed] transition-all shadow-sm"
//           >
//             <Plus className="w-5 h-5" /> Add More
//           </button>
//         )}
//       </div>

//       {/* 2. Main Content Area */}
//       {questions.length === 0 ? (
//         /* EMPTY STATE: Matching "Manual Question.png" */
//         <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-sm">
//           <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
//             <MousePointer2 className="w-10 h-10 text-[#8b5cf6]" />
//           </div>
          
//           <button 
//             onClick={handleOpenModal}
//             className="group relative flex items-center gap-3 px-10 py-4 bg-white border-2 border-[#8b5cf6] text-[#8b5cf6] font-extrabold rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all duration-300"
//           >
//             <Plus className="w-6 h-6" />
//             Create Question Manually
//           </button>
          
//           <p className="mt-6 text-slate-400 font-medium text-sm">
//             No questions added yet. Start by creating your first question.
//           </p>
//         </div>
//       ) : (
//         /* LIST STATE: Detailed Dynamic Preview */
//         <div className="space-y-6">
//           {questions.map((q, idx) => (
//             <div key={q.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6 transition-all hover:border-purple-100">
              
//               {/* Card Header: Identity and Actions */}
//               <div className="flex justify-between items-start">
//                 <div className="flex gap-5">
//                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-100">
//                     {idx + 1}
//                   </div>
//                   <div>
//                     <h4 className="text-xl font-bold text-slate-800 leading-tight mb-2">{q.title}</h4>
//                     <span className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-[#8b5cf6] text-[10px] font-bold rounded-lg uppercase tracking-widest border border-purple-100">
//                       {q.type}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="flex gap-1">
//                   <button 
//                     onClick={() => handleEdit(q)} 
//                     className="p-2.5 text-slate-400 hover:text-[#8b5cf6] hover:bg-purple-50 rounded-xl transition-all"
//                     title="Edit Question"
//                   >
//                     <Plus className="w-5 h-5" /> 
//                   </button>
//                   <button 
//                     onClick={() => removeQuestion(q.id)} 
//                     className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
//                     title="Remove Question"
//                   >
//                     <Plus className="w-5 h-5 rotate-45" /> 
//                   </button>
//                 </div>
//               </div>

//               {/* Dynamic Answer Previews based on Type */}
//               <div className="pl-[68px] grid gap-3">
                
//                 {/* Type 1: Radio (Single Choice) */}
//                 {q.type === 'radio' && q.options?.map((opt: string, i: number) => (
//                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-slate-50/40">
//                     <Circle className="w-5 h-5 text-slate-300" />
//                     <span className="text-slate-600 font-semibold">{opt}</span>
//                   </div>
//                 ))}

//                 {/* Type 2: Checkbox (Multiple Choice) */}
//                 {q.type === 'checkbox' && q.options?.map((opt: string, i: number) => (
//                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-50 bg-slate-50/40">
//                     <Square className="w-5 h-5 text-slate-300" />
//                     <span className="text-slate-600 font-semibold">{opt}</span>
//                   </div>
//                 ))}

//                 {/* Type 3: Text (Rich Text / Manual) */}
//                 {q.type === 'text' && (
//                   <div className="w-full p-8 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center gap-3">
//                     <AlignLeft className="w-6 h-6 text-slate-300" />
//                     <p className="text-sm text-slate-400 font-medium italic">
//                       Candidate will provide a detailed rich text response for this question.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* 3. Navigation Footer */}
//       <div className="flex justify-between items-center pt-10 border-t border-gray-100">
//         <button 
//           onClick={() => setStep(1)} 
//           className="px-8 py-4 text-slate-400 font-bold hover:text-slate-700 transition-colors"
//         >
//           Go Back to Info
//         </button>
//         <button 
//           disabled={questions.length === 0}
//           className="px-14 py-4 bg-[#8b5cf6] text-white font-bold rounded-2xl shadow-xl shadow-purple-100 hover:bg-[#7c3aed] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
//           onClick={() => console.log("Final Submission:", { basicInfo, questions })}
//         >
//           Finish & Publish Test
//         </button>
//       </div>

//       {/* Add/Edit Modal */}
//       {isModalOpen && (
//         <QuestionModal 
//           isOpen={isModalOpen} 
//           onClose={() => setIsModalOpen(false)} 
//           initialData={editingQuestion}
//         />
//       )}
//     </div>
//   )
// }

// export default QuestionSet;


"use client"
import React, { useState } from 'react'
import { Plus, MousePointer2, Circle, Square, AlignLeft, Check } from 'lucide-react'
import { useTestCreationStore } from '@/app/store/useTestCreationStore'
import QuestionModal from './QuestionModal'

const QuestionSet = () => {
  const { questions, basicInfo, removeQuestion, setStep } = useTestCreationStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);

  const handleOpenModal = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* 1. Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-800">Question Set ({questions.length})</h3>
        {questions.length > 0 && (
          <button 
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#8b5cf6] text-white rounded-xl font-bold hover:bg-[#7c3aed] transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" /> Add More
          </button>
        )}
      </div>

      {/* 2. Main Content Area */}
      {questions.length === 0 ? (
        /* EMPTY STATE: Matching "Manual Question.png" */
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[40px] border-2 border-dashed border-gray-100 shadow-sm">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6">
            <MousePointer2 className="w-10 h-10 text-[#8b5cf6]" />
          </div>
          <button 
            onClick={handleOpenModal}
            className="group relative flex items-center gap-3 px-10 py-4 bg-white border-2 border-[#8b5cf6] text-[#8b5cf6] font-extrabold rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all duration-300"
          >
            <Plus className="w-6 h-6" />
            Create Question Manually
          </button>
          <p className="mt-6 text-slate-400 font-medium text-sm">No questions added yet.</p>
        </div>
      ) : (
        /* LIST STATE: View Mode with Answer Keys */
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
              
              <div className="flex justify-between items-start">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-sm font-bold text-slate-400 border border-slate-100">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 leading-tight mb-2">{q.title}</h4>
                    <span className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-[#8b5cf6] text-[10px] font-bold rounded-lg uppercase tracking-widest border border-purple-100">
                      {q.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <button onClick={() => { setEditingQuestion(q); setIsModalOpen(true); }} className="p-2.5 text-slate-400 hover:text-[#8b5cf6] transition-all">
                    <Plus className="w-5 h-5" /> 
                  </button>
                  <button onClick={() => removeQuestion(q.id)} className="p-2.5 text-slate-300 hover:text-red-500 transition-all">
                    <Plus className="w-5 h-5 rotate-45" /> 
                  </button>
                </div>
              </div>

              {/* Dynamic Answer Previews */}
              <div className="pl-[68px] grid gap-3">
                {q.type !== 'text' ? (
                  q.options?.map((opt: string, i: number) => {
                    const isCorrect = Array.isArray(q.correctAnswer) 
                      ? q.correctAnswer.includes(opt) 
                      : q.correctAnswer === opt;

                    return (
                      <div 
                        key={i} 
                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                          isCorrect 
                            ? "border-green-200 bg-green-50/50 ring-1 ring-green-100" 
                            : "border-gray-50 bg-slate-50/40 opacity-70"
                        }`}
                      >
                        {isCorrect ? (
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        ) : (
                          q.type === 'radio' ? <Circle className="w-5 h-5 text-slate-300" /> : <Square className="w-5 h-5 text-slate-300" />
                        )}
                        <span className={`font-semibold ${isCorrect ? "text-green-700" : "text-slate-600"}`}>
                          {opt}
                        </span>
                        {isCorrect && (
                          <span className="ml-auto text-[10px] font-bold text-green-600 uppercase tracking-widest bg-white px-2 py-0.5 rounded-md border border-green-100">
                            Correct
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full p-8 rounded-2xl border-2 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center gap-3">
                    <AlignLeft className="w-6 h-6 text-slate-300" />
                    <p className="text-sm text-slate-400 font-medium italic">Short answer question (Manual Grading)</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Navigation Footer */}
      <div className="flex justify-between items-center pt-10 border-t border-gray-100">
        <button onClick={() => setStep(1)} className="px-8 py-4 text-slate-400 font-bold hover:text-slate-700">
          Go Back
        </button>
        <button 
          disabled={questions.length === 0}
          className="px-14 py-4 bg-[#8b5cf6] text-white font-bold rounded-2xl shadow-xl shadow-purple-100 hover:bg-[#7c3aed] disabled:opacity-40"
          onClick={() => console.log("Final Submission:", { basicInfo, questions })}
        >
          Finish & Publish Test
        </button>
      </div>

      {isModalOpen && (
        <QuestionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialData={editingQuestion}
        />
      )}
    </div>
  )
}

export default QuestionSet;