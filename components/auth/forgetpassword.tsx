"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
import axiosInstance from "@/lib/axios";

const forgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
});

type ForgetPasswordValues = z.infer<typeof forgetPasswordSchema>;

export function ForgetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const form = useForm<ForgetPasswordValues>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: "", newPassword: "" },
  });

  const onSubmit = async (data: ForgetPasswordValues) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
        newPassword: data.newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successfully!");
        router.push("/auth/signin");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
      console.error("Forget password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container">
        <div className="flex justify-center rounded-2xl h-auto overflow-hidden">
          <div className="flex flex-col justify-center w-full max-w-md py-8 px-4 sm:px-6 lg:px-10">
            <div className="w-full mx-auto space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-center">
                Reset Password
              </h2>

              <div className="bg-gray-100/50 p-10 rounded-2xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                         <FormItem>
                          <FormLabel className="text-sm sm:text-base">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                              className="h-10 sm:h-12 text-sm sm:text-base"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                         <FormItem>
                          <FormLabel className="text-sm sm:text-base">New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                {...field}
                                className="h-10 sm:h-12 text-sm sm:text-base"
                              />
                              <button
                                type="button"
                                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-10 sm:h-12 pt-4 bg-primary hover:bg-primary/90 text-sm sm:text-base font-bold text-white cursor-pointer"
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
