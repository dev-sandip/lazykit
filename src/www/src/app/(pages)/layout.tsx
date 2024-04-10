import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { META_DATA } from "@/data/metadata";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/reusable/header";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="h-[calc(100vh-55px)] overflow-y-scroll">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
