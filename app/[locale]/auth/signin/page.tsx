import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Signin | onlinap",
  description: "This is an online assesment platform",
};

export default function page() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
