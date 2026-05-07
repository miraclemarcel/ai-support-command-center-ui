import type { Metadata } from "next";

import "./globals.css";

import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: "AI Support Command Center",
  description: "AI customer support dashboard",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}