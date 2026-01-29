import { Inter } from "next/font/google";

import { clsx } from "clsx";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("bg-background min-h-screen font-sans antialiased", inter.className)}>
        {children}
      </body>
    </html>
  );
}
