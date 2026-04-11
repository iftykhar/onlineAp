import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";

const intlMiddleware = createIntlMiddleware({
  locales: ["bn", "en"],
  defaultLocale: "bn",
  localeDetection: true,
});

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Skip auth check for public assets and api routes
  if (
    pathname.includes("/api") ||
    pathname.includes("/_next") ||
    pathname.includes("/favicon.ico") ||
    pathname.match(/\.(.*)$/)
  ) {
    return intlMiddleware(req);
  }

  // 2. Get NextAuth token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 3. Define route types
  // Pathnames in middleware include the locale prefix if it's already there, 
  // but next-auth getToken handles req context well.
  const isAdminRoute = pathname.includes("/admin");
  const isDashboardRoute = pathname.includes("/dashboard");
  const isAuthPage = pathname.includes("/auth/signin"); // No signup anymore

  // 4. Redirect Logic
  
  // If trying to access protected route without token
  if ((isAdminRoute || isDashboardRoute) && !token) {
    const locale = pathname.split("/")[1] || "bn";
    const loginUrl = new URL(`/${locale}/auth/signin`, req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If trying to access admin route as non-admin
  if (isAdminRoute && token?.role !== "admin") {
    const locale = pathname.split("/")[1] || "bn";
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // If already logged in and hitting login page
  if (isAuthPage && token) {
    const locale = pathname.split("/")[1] || "bn";
    const home = token.role === "admin" ? "/admin/dashboard" : "/dashboard";
    return NextResponse.redirect(new URL(`/${locale}${home}`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};