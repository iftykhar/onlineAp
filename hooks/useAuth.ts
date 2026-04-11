"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user
    ? {
        id: session.user.id,
        fullName: session.user.fullName,
        email: session.user.email!,
        role: session.user.role as "admin" | "user",
        avatar: session.user.avatar,
      }
    : null;

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    // Refetch session to get the updated user data
    // signIn with redirect:false doesn't auto-redirect, so we do it manually
    const session = await fetch("/api/auth/session").then((r) => r.json());
    const role = session?.user?.role;
    const redirectTo = role === "admin" ? "/admin/dashboard" : "/dashboard";
    router.push(redirectTo);
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    isUser,
    login,
    logout,
    session,
  };
}
