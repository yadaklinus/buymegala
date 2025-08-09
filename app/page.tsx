"use client"
import axios from "axios";
import { Info } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
    const url = process.env.NEXT_PUBLIC_API_URL

     useEffect(()=>{
        async function main() {
        }
        main()
      })
    return (
        <>
            <section className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-white to-yellow-100" />
              <div className="relative text-center py-20 px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">Support creators with a Gala</h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                  A friendly, fast way for fans to support your work. Set your Gala price and share your page.
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <Link href={"/signin"}
                      className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                      Start my Page
                  </Link>
                  <Link href={"/signin"} className="px-8 py-3 rounded-full border border-yellow-500 text-yellow-700 hover:bg-yellow-50 font-semibold">Sign in</Link>
                </div>
              </div>
            </section>

            <div className="mt-10 text-left py-12 px-8 bg-white rounded-lg shadow-xl">
                 <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center"><Info className="mr-3 h-8 w-8 text-yellow-500" /> Why Buy Me A Gala?</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
                   <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                     Simple pricing per Gala. Support that adds up, one snack at a time.
                   </div>
                   <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                     Share your page link and get support instantly. No code needed.
                   </div>
                   <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                     Built with modern tech, secure auth, and optimized checkout.
                   </div>
                 </div>
            </div>
        </>
    );
}