import { z } from "zod";

export const basicInfoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  totalCandidates: z.string().min(1, "Required"),
  totalSlots: z.string().min(1, "Required"),
  questionSets: z.string().min(1, "Required"),
  questionType: z.enum(["MCQ", "Checkbox", "Text"]),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.string().min(1, "Duration is required"),
  negativeMarking: z.string().optional(),
});

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;