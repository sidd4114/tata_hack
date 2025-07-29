import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HomeIcon, BarChartIcon, BellIcon, GearIcon } from "@radix-ui/react-icons";
import React from "react";
import { DataProvider } from './DataContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Battery Dashboard",
  description: "AI-based battery monitoring and management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-[#f3f4f6]`}>
        <DataProvider>
          <div className="flex min-h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-14 bg-[#181A20] flex flex-col items-center justify-between py-4 border-r border-[#232323] shadow-lg select-none overflow-hidden min-h-screen">
              <div className="flex flex-col items-center w-full">
                <span className="text-2xl font-bold text-[#60a5fa] mb-8">⚡</span>
                <nav className="flex flex-col gap-4 flex-1 items-center">
                  <a href="#" className="group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#232323] transition-colors duration-200">
                    <HomeIcon className="w-6 h-6 text-[#f3f4f6] group-hover:text-[#60a5fa]" />
                  </a>
                  <a href="#" className="group flex items-center justify-center w-10 h-10 rounded-lg bg-[#232323]">
                    <BarChartIcon className="w-6 h-6 text-[#60a5fa]" />
                  </a>
                  <a href="#" className="group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#232323] transition-colors duration-200">
                    <BellIcon className="w-6 h-6 text-[#f3f4f6] group-hover:text-[#fbbf24]" />
                  </a>
                  <a href="#" className="group flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#232323] transition-colors duration-200">
                    <GearIcon className="w-6 h-6 text-[#f3f4f6] group-hover:text-[#d1d5db]" />
                  </a>
                </nav>
              </div>
              <div className="mb-2 flex flex-col items-center">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#232323] shadow object-cover" />
              </div>
            </aside>
            {/* Main content */}
            <main className="flex-1 min-h-screen bg-black px-0 md:px-8 py-6 overflow-x-hidden overflow-y-auto">
              {children}
            </main>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}
