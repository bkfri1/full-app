'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvidor";
import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "react-modal-hook";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        suppressHydrationWarning
      >
        <ModalProvider>
        <ConvexClientProvider>
           <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}

            <div className="fixed left-3 top-3"><ModeToggle></ModeToggle></div>
          </ThemeProvider>
        </ConvexClientProvider>
        </ModalProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
