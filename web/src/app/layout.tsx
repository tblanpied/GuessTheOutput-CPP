import { Fraunces, Inter } from "next/font/google";

import { clsx } from "clsx";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

import Header from "@/components/layout/header/Header";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(fraunces.variable, inter.className)}
    >
      <body
        className="h-full w-full font-sans antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class">
          <div
            className={cn(
              `flex min-h-screen flex-col
              bg-[linear-gradient(to_right,rgba(215,215,215,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(215,215,215,0.35)_1px,transparent_1px)]
              bg-size-[40px_40px]
              dark:bg-[linear-gradient(to_right,rgba(40,40,70,0.125)_1px,transparent_1px),linear-gradient(to_bottom,rgba(40,40,70,0.125)_1px,transparent_1px)]`
            )}
          >
            <Header />

            <main className="mt-12 grow md:text-lg lg:text-xl">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
