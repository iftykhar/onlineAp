"use client"
import React from "react";
import { useTestCreationStore } from "@/app/store/useTestCreationStore";
import BasicInfoForm from "./BasicInfoForm";
import SavedBasicInfo from "./SavedBasicInfo";
import QuestionSet from "./QuestionSet";
import OnlinteTestHead from "./OnlinteTestHead";

const OnlineTest = () => {
  const currentStep = useTestCreationStore((state) => state.currentStep);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 px-6">
      <div className="container mx-auto py-10">
        <OnlinteTestHead />
        
        <main className="mt-8 space-y-6">
          {/* Transition: Step 1 (Form) vs Step 2 (Summary) */}
          {currentStep === 1 ? (
            <BasicInfoForm />
          ) : (
            <>
              <SavedBasicInfo />
              <QuestionSet />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default OnlineTest;