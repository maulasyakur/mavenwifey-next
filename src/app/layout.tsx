import type { Metadata } from "next";
import "./globals.css";
import { Pixelify_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"], // Load only the Latin character set
  variable: "--font-pixelify", // CSS variable name for easy reference
  display: "swap", // Ensures text remains visible during font load
});

export const metadata: Metadata = {
  title: "mavenwifey",
  description: "Nadita's personal website with blog posts, chats, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", pixelifySans.className)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
