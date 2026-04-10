// "use client"
// import React from "react";
// import { useTestCreationStore } from "@/app/store/useTestCreationStore";
// import { Edit3, Users, Clock, Layers, Calendar } from "lucide-react";

// const SavedBasicInfo = () => {
//   const { basicInfo, setStep } = useTestCreationStore();

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100">
//       <div className="flex justify-between items-start mb-8">
//         <div>
//           <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full">
//             Step 1: Completed
//           </span>
//           <h2 className="text-2xl font-bold text-slate-800 mt-3">
//             {basicInfo.title || "Untitled Test"}
//           </h2>
//         </div>
//         <button
//           onClick={() => setStep(1)}
//           className="flex items-center gap-2 text-sm font-bold text-[#8b5cf6] hover:bg-purple-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-purple-100"
//         >
//           <Edit3 className="w-4 h-4" /> Edit Details
//         </button>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//         {/* Stat Item */}
//         <div className="space-y-1">
//           <p className="text-[10px] font-bold text-gray-400 uppercase">Candidates</p>
//           <div className="flex items-center gap-2">
//             <Users className="w-4 h-4 text-slate-400" />
//             <span className="font-bold text-slate-700">{basicInfo.totalCandidates}</span>
//           </div>
//         </div>

//         <div className="space-y-1">
//           <p className="text-[10px] font-bold text-gray-400 uppercase">Duration</p>
//           <div className="flex items-center gap-2">
//             <Clock className="w-4 h-4 text-slate-400" />
//             <span className="font-bold text-slate-700">{basicInfo.duration} Min</span>
//           </div>
//         </div>

//         <div className="space-y-1">
//           <p className="text-[10px] font-bold text-gray-400 uppercase">Sets/Slots</p>
//           <div className="flex items-center gap-2">
//             <Layers className="w-4 h-4 text-slate-400" />
//             <span className="font-bold text-slate-700">{basicInfo.questionSets} / {basicInfo.totalSlots}</span>
//           </div>
//         </div>

//         <div className="space-y-1">
//           <p className="text-[10px] font-bold text-gray-400 uppercase">Type</p>
//           <div className="flex items-center gap-2">
//             <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
//               {basicInfo.questionType}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SavedBasicInfo;

"use client"
import { useTestCreationStore } from "@/app/store/useTestCreationStore";
import { Edit3, Users, Clock, Calendar } from "lucide-react";

const SavedBasicInfo = () => {
  const { basicInfo, setStep } = useTestCreationStore();

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{basicInfo.title}</h2>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{basicInfo.totalCandidates} Candidates</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{basicInfo.duration} Minutes</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
               <Calendar className="w-4 h-4" />
               <span className="text-sm font-medium">Start: {basicInfo.startTime}</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setStep(1)}
          className="p-3 bg-purple-50 text-[#8b5cf6] rounded-2xl hover:bg-purple-100 transition-colors"
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SavedBasicInfo;