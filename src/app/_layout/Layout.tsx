"use client";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Using Inter as a fallback font-family
const inter = Inter({ subsets: ["latin"] });

const UniversalLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <html
        lang="en"
        className={`${inter.className} bg-void-background text-text min-h-screen max-w-screen-sm text-base font-normal`}
      >
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
};

export default UniversalLayout;
