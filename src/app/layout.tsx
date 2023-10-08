import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R3F Physics",
  description: "By Tomas Leriche",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "h-full")}>{children}</body>
    </html>
  );
}
