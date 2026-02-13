import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keeping font import
import "./globals.css";
import GlobalPlayer from "@/components/player/GlobalPlayer";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";

// ... Font configuration ...
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parca Radio",
  description: "Midnight Tech Radio - Live & Archived",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-background text-foreground relative overflow-x-hidden flex"
        )}
      >
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
          <Header />
          <main className="flex-1 pb-24 px-4 py-6 md:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        <GlobalPlayer />
      </body>
    </html>
  );
}
