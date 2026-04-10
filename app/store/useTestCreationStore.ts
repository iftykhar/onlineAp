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
  };
  // Step 2: Questions
  questions: Question[];

  // Actions
  setStep: (step: number) => void;
  updateBasicInfo: (info: Partial<TestState["basicInfo"]>) => void;
  addQuestion: (question: Question) => void;
  removeQuestion: (id: string) => void;
  resetStore: () => void;
}

export const useTestCreationStore = create<TestState>()(
  persist(
    (set) => ({
      currentStep: 1,
      basicInfo: {
        title: "",
        totalCandidates: "",
        totalSlots: "",
        questionSets: "",
        questionType: "MCQ",
        startTime: "",
        endTime: "",
        duration: "",
      },
      questions: [],

      setStep: (step) => set({ currentStep: step }),

      updateBasicInfo: (info) =>
        set((state) => ({ basicInfo: { ...state.basicInfo, ...info } })),

      //   addQuestion: (question) =>
      //     set((state) => {
      //       const exists = state.questions.find((q) => q.id === question.id);
      //       if (exists) {
      //         return {
      //           questions: state.questions.map((q) =>
      //             q.id === question.id ? question : q,
      //           ),
      //         };
      //       }
      //       return { questions: [...state.questions, question] };
      //     }),
      // Inside your Zustand store actions:
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
          },
        }),
    }),
    { name: "admin-test-draft" }, // Persists in LocalStorage for "Offline Mode"
  ),
);
