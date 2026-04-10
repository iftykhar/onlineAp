"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTestCreationStore } from '@/app/store/useTestCreationStore';
import { BasicInfoFormData, basicInfoSchema } from '@/app/schema/testSchema';
// import { useTestCreationStore } from '@/store/useTestCreationStore';
// import { basicInfoSchema, BasicInfoFormData } from '@/schema/testSchema';

const BasicInfoForm = () => {
  const { basicInfo, updateBasicInfo, setStep } = useTestCreationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BasicInfoFormData>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: basicInfo as BasicInfoFormData,
  });

  const onSubmit = (data: BasicInfoFormData) => {
    updateBasicInfo(data);
    setStep(2); // Move to Question Sets
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Exam Title */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Exam Title</label>
          <input
            {...register('title')}
            placeholder="e.g. Probationary Officer Assessment"
            className={`w-full p-4 rounded-2xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-purple-100`}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Candidates */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Total Candidates</label>
            <input
              type="number"
              {...register('totalCandidates')}
              placeholder="00"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Total Slots */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Total Slots</label>
            <input
              type="number"
              {...register('totalSlots')}
              placeholder="00"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* Question Sets */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Question Sets</label>
            <input
              type="number"
              {...register('questionSets')}
              placeholder="00"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Question Type */}
           <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Question Type</label>
            <select
              {...register('questionType')}
              className="w-full p-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-100"
            >
              <option value="MCQ">MCQ</option>
              <option value="Checkbox">Checkbox</option>
              <option value="Text">Rich Text / Manual</option>
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Duration (Minutes)</label>
            <input
              type="number"
              {...register('duration')}
              placeholder="e.g. 60"
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Start Time */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Start Time</label>
            <input
              type="datetime-local"
              {...register('startTime')}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">End Time</label>
            <input
              type="datetime-local"
              {...register('endTime')}
              className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-12 py-4 bg-[#8b5cf6] text-white font-bold rounded-2xl shadow-lg shadow-purple-100 hover:bg-[#7c3aed] transition-all active:scale-95"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfoForm;