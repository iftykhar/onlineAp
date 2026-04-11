"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import  Navbar  from "@/components/shared/navbar";
import  Footer  from "@/components/shared/footer";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { SessionProvider, useSession } from "next-auth/react";

function AppContent({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { data: session } = useSession();

  const hideNavAndFooter: string[] = [];

  return (
    <QueryClientProvider client={queryClient}>
      {!hideNavAndFooter.includes(pathname) && (
        <Navbar user={session?.user} />
      )}
      {children}
      {!hideNavAndFooter.includes(pathname) && <Footer />}
    </QueryClientProvider>
  );
}

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AppContent>{children}</AppContent>
    </SessionProvider>
  );
}
