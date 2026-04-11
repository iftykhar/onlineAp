import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Question {
  id: string;
  title: string;
  type: "checkbox" | "radio" | "text";
  options?: string[];
  correctAnswer?: string | string[];
}

interface TestState {
  currentStep: number;
  examId: string | null; // Backend exam ID after creation
  // Step 1: Basic Info
  basicInfo: {
    title: string;
    totalCandidates: string;
    totalSlots: string;
    questionSets: string;
    questionType: string;
    startTime: string;
    endTime: string;
    duration: string;
    negativeMarking: string;
  };
  // Step 2: Questions
  questions: Question[];

  // Actions
  setStep: (step: number) => void;
  setExamId: (id: string) => void;
  updateBasicInfo: (info: Partial<TestState["basicInfo"]>) => void;
  addQuestion: (question: Question) => void;
  removeQuestion: (id: string) => void;
  resetStore: () => void;
}

export const useTestCreationStore = create<TestState>()(
  persist(
    (set) => ({
      currentStep: 1,
      examId: null,
      basicInfo: {
        title: "",
        totalCandidates: "",
        totalSlots: "",
        questionSets: "",
        questionType: "MCQ",
        startTime: "",
        endTime: "",
        duration: "",
        negativeMarking: "No Negative Marking",
      },
      questions: [],

      setStep: (step) => set({ currentStep: step }),

      setExamId: (id) => set({ examId: id }),

      updateBasicInfo: (info) =>
        set((state) => ({ basicInfo: { ...state.basicInfo, ...info } })),

      addQuestion: (newQuestion) =>
        set((state) => {
          const index = state.questions.findIndex(
            (q) => q.id === newQuestion.id,
          );
          if (index !== -1) {
            // Update existing
            const updated = [...state.questions];
            updated[index] = newQuestion;
            return { questions: updated };
          }
          // Add new
          return { questions: [...state.questions, newQuestion] };
        }),

      removeQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),

      resetStore: () =>
        set({
          currentStep: 1,
          examId: null,
          questions: [],
          basicInfo: {
            title: "",
            totalCandidates: "",
            totalSlots: "",
            questionSets: "",
            questionType: "MCQ",
            startTime: "",
            endTime: "",
            duration: "",
            negativeMarking: "No Negative Marking",
          },
        }),
    }),
    { name: "admin-test-draft" }, // Persists in LocalStorage for "Offline Mode"
  ),
);
