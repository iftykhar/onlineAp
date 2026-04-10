import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export function useAuth() {
  const { user, accessToken, isAuthenticated, setAuth, clearAuth } =
    useAuthStore();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      setAuth(data.data.user, data.data.accessToken);
      const redirectTo =
        data.data.user.role === "admin" ? "/admin/dashboard" : "/dashboard";
      router.push(redirectTo);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      clearAuth();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
      router.push("/auth/login");
    }
  };

  const isAdmin = user?.role === "admin";
  const isUser = user?.role === "user";

  return {
    user,
    accessToken,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    logout,
  };
}
