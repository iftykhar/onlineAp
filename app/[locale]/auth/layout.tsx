import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "onlinap",
  description: "This is an online assesment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <Navbar user={undefined}  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
