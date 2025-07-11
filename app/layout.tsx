import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plantventory",
  description: "Manage your plants",
  keywords: ["plants", "inventory", "management", "gardening"],
  authors: [{ name: "Martin Ifeanyi" }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <Toaster />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
