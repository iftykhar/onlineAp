"use client"
import React, { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useExamById } from '@/hooks/useExams';
import { useTestCreationStore } from '@/app/store/useTestCreationStore';
import OnlineTest from '@/components/admin/test/OnlineTest';
import FullScreenLoader from '@/components/shared/FullScreenLoader';

export default function EditTestPage() {
  const { id } = useParams() as { id: string };
  const { data: exam, isLoading, error } = useExamById(id);
  const { resetStore, updateBasicInfo, setExamId, addQuestion } = useTestCreationStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (exam && !isLoading && !initialized.current) {
      initialized.current = true;
      resetStore();
      setExamId(exam._id);

      const toDatetimeLocal = (isoString?: string) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);
      };

      updateBasicInfo({
        title: exam.title,
        totalCandidates: String(exam.totalCandidates),
        totalSlots: String(exam.totalSlots),
        questionSets: String(exam.questionSets),
        questionType: exam.questionType || "MCQ",
        startTime: toDatetimeLocal(exam.startTime),
        endTime: toDatetimeLocal(exam.endTime),
        duration: String(exam.duration),
        negativeMarking: exam.negativeMarking || "No Negative Marking",
      });
      
      if (exam.questions && exam.questions.length > 0) {
        exam.questions.forEach((q: any) => {
          addQuestion({
            id: q._id,
            title: q.title,
            type: q.type as any,
            options: q.options,
            correctAnswer: q.correctAnswer
          });
        });
      }
    }
  }, [exam, isLoading, resetStore, setExamId, updateBasicInfo, addQuestion]);

  if (isLoading || (exam && !initialized.current)) {
    return <FullScreenLoader message="Loading exam data..." />;
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#f8fafc] flex justify-center items-center text-red-500 font-medium">
        Failed to load exam details.
      </div>
    );
  }

  return <OnlineTest />;
}
