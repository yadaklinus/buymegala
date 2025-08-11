import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";
import {Toaster} from 'react-hot-toast'
import 'dotenv'

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import  Navbar  from "@/components/navbar";
import SessionProvide from "@/components/sessionProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b0b0e" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvide>
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-gradient-to-br from-[#0b0b0e] via-[#111216] to-[#1a1208] text-[#E6E6E6] font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="min-h-screen">
            <Navbar/>
            <main className="p-4 sm:p-6 lg:p-8">
              <Toaster/>
              {children}
            </main>
             <footer className="text-center py-4 mt-8 text-gray-400 text-sm">
                <p>Buy Me A Gala © 2024. Crafted with Next.js & Tailwind CSS.</p>
            </footer>
        </div>
      </body>
    </html>
    </SessionProvide>
  );
}
