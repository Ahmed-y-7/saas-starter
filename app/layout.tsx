import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "A Next.js 16 App Router dashboard starter.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
