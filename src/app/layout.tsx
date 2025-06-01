import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Header from "@/components/Home/Header";
import { auth } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Easeforms",
  description: "Easily create smart, beautiful forms in seconds",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="scroll-smooth bg-white text-gray-800">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans min-h-screen flex flex-col`}
      >
        <Header session={session}/>
        <main className="flex-1 relative overflow-hidden">{children}</main>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
