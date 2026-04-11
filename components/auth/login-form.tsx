"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const tAuth = useTranslations("auth");

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      setIsLoading(true);
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });

      if (response?.ok && !response.error) {
        toast.success("Login successful!");
        // Fetch session to check role for redirection
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        
        if (session?.user?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error(response?.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] bg-slate-50/50 py-12 px-4">
      <div className="w-full max-w-[500px] space-y-10">
        
        {/* Page Heading */}
        <h2 className="text-3xl font-bold text-[#1f2937] text-center tracking-tight">
          {tAuth("signIn")}
        </h2>

        {/* Login Card */}
        <div className="bg-white p-8 sm:p-12 rounded-[32px] border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Email / User ID */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold mb-2 block">
                      {tAuth("email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={tAuth("enterEmail")}
                        {...field}
                        className="h-14 rounded-xl border-gray-200 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] transition-all"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold mb-2 block">
                      {tAuth("password")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={tAuth("enterPassword")}
                          {...field}
                          className="h-14 rounded-xl border-gray-200 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] transition-all pr-12"
                        />
                        <button
                          type="button"
                          className="absolute cursor-pointer inset-y-0 right-4 flex items-center text-gray-400 hover:text-[#8b5cf6] transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 font-medium" />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link - Right Aligned */}
              <div className="flex justify-end pt-1">
                <Link 
                  href="/auth/forgetpassword" 
                  className="text-sm cursor-pointer font-semibold text-slate-500 hover:text-[#8b5cf6] transition-colors"
                >
                  {tAuth("forgotPassword")}
                </Link>
              </div>

              {/* Submit Button - Large Purple */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 cursor-pointer bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  tAuth("signIn")
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}