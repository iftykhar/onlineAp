"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface ExamData {
  _id: string;
  title: string;
  slug: string;
  totalCandidates: number;
  totalSlots: number;
  questionSets: number;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number;
  negativeMarking?: string;
  status: "draft" | "published";
  questions: {
    _id: string;
    title: string;
    type: "radio" | "checkbox" | "text" | "rich-text";
    options?: string[];
    correctAnswer?: string | string[];
  }[];
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt: string;
}

// Admin: fetch all exams
export function useExams(search?: string) {
  return useQuery<ExamData[]>({
    queryKey: ["exams", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/exam", { params: { search } });
      return data.data;
    },
  });
}

// Admin: create exam
export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (examData: {
      title: string;
      totalCandidates: number;
      totalSlots: number;
      questionSets: number;
      questionType?: string;
      startTime: string;
      endTime: string;
      duration: number;
      negativeMarking?: string;
    }) => {
      const { data } = await axiosInstance.post("/exam", examData);
      return data.data as ExamData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

// Admin: update exam
export function useUpdateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...examData
    }: Partial<ExamData> & { id: string }) => {
      const { data } = await axiosInstance.put(`/exam/${id}`, examData);
      return data.data as ExamData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

// Admin: delete exam
export function useDeleteExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/exam/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

// Admin: publish exam
export function usePublishExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.patch(`/exam/${id}/publish`);
      return data.data as ExamData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
}

// Candidate: fetch available published exams
export function useAvailableExams(search?: string) {
  return useQuery<ExamData[]>({
    queryKey: ["available-exams", search],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/exam/available", { params: { search } });
      return data.data;
    },
  });
}

// Candidate: fetch exam by slug (hides correct answers)
export function useExamBySlug(slug: string) {
  return useQuery<ExamData>({
    queryKey: ["exam", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/exam/slug/${slug}`);
      return data.data;
    },
    enabled: !!slug,
  });
}

// Admin: fetch exam by ID (includes answers)
export function useExamById(id: string) {
  return useQuery<ExamData>({
    queryKey: ["exam-detail", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/exam/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
}

// Question mutations
export function useAddQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      examId,
      question,
    }: {
      examId: string;
      question: {
        title: string;
        type: "radio" | "checkbox" | "text" | "rich-text";
        options?: string[];
        correctAnswer?: string | string[];
      };
    }) => {
      const { data } = await axiosInstance.post(
        `/exam/${examId}/questions`,
        question
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["exam-detail"] });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      examId,
      questionId,
      data: questionData,
    }: {
      examId: string;
      questionId: string;
      data: Partial<{
        title: string;
        type: "radio" | "checkbox" | "text" | "rich-text";
        options?: string[];
        correctAnswer?: string | string[];
      }>;
    }) => {
      const { data } = await axiosInstance.put(
        `/exam/${examId}/questions/${questionId}`,
        questionData
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-detail"] });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      examId,
      questionId,
    }: {
      examId: string;
      questionId: string;
    }) => {
      await axiosInstance.delete(`/exam/${examId}/questions/${questionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exam-detail"] });
    },
  });
}

// Submission
export function useSubmitExam() {
  return useMutation({
    mutationFn: async ({
      examId,
      payload,
    }: {
      examId: string;
      payload: {
        answers: { questionId: string; answer: string | string[] }[];
        isTimeout?: boolean;
        tabSwitchCount?: number;
      };
    }) => {
      const { data } = await axiosInstance.post(
        `/submission/${examId}/submit`,
        payload
      );
      return data.data;
    },
  });
}

export function useMySubmission(examId: string) {
  return useQuery({
    queryKey: ["my-submission", examId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/submission/${examId}/my-submission`
      );
      return data.data;
    },
    enabled: !!examId,
  });
}

export function useMyAttempts(examId: string) {
  return useQuery({
    queryKey: ["my-attempts", examId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/submission/${examId}/my-attempts`
      );
      return data.data;
    },
    enabled: !!examId,
  });
}

export function useExamSubmissions(examId: string) {
  return useQuery({
    queryKey: ["exam-submissions", examId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/submission/${examId}/submissions`
      );
      return data.data;
    },
    enabled: !!examId,
  });
}
