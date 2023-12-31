'use client'

import Modal from "@/components/Modal";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useBoardStore } from "@/store/BoardStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trello 2.0 Clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [darkMode] = useBoardStore((state) => [state.darkMode])
  return (
    <html lang="en">
      <body className={`${darkMode ? "bg-[#07101e]" : "bg-[#F5F6F8]"}`}>
        
        {children}
        <Modal />
      
      </body>
    </html>
  );
}
