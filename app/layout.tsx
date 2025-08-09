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
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
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
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <div className="bg-gray-100 min-h-screen font-sans antialiased">
            <Navbar/>
            <main className="p-4 sm:p-6 lg:p-8">
              <Toaster/>
             
                {children}
            </main>
             <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
                <p>Buy Me A Gala &copy; 2024. Created with React & Tailwind CSS.</p>
            </footer>
        </div>
      </body>
    </html>
    </SessionProvide>
  );
}
