import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextShop — Lab 08 Next.js App",
  description: "Full Stack Programming Lab 08 — BSSE Air University Islamabad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
