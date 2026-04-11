import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (process.env.USE_MOCK_AUTH === "true") {
          if (
            credentials?.email === "test@example.com" &&
            credentials?.password === "password123"
          ) {
            return {
              id: "1",
              fullName: "Mock User",
              email: "test@example.com",
              role: "admin",
              accessToken: "mock-token-123",
              avatar: "/images/default-avatar.png",
            };
          }
          return null;
        }

        // Real backend call
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const result = await res.json();
          if (!res.ok) throw new Error(result?.message || "Login failed");

          if (result?.data?.accessToken) {
            return {
              id: result.data.user.id,
              fullName: result.data.user.fullName,
              email: result.data.user.email,
              role: result.data.user.role,
              accessToken: result.data.accessToken,
              avatar: result.data.user.image?.url || null,
            };
          }
        } catch (error: any) {
          throw new Error(error.message || "Auth error");
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
        token.fullName = user.fullName;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.accessToken = token.accessToken;
        session.user.role = token.role;
        session.user.id = token.id as string;
        session.user.fullName = token.fullName as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
