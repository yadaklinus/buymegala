"use client"
import axios from "axios";
import { Info } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function LandingPage() {
    const url = process.env.NEXT_PUBLIC_API_URL

    

     useEffect(()=>{
        async function main() {
        //   const res = await fetch(`${url}/auth`,{method:"GET"})
        //   console.log(res)
        }
        main()
      })
    return (
        <>
            <div className="text-center py-16 px-4 bg-white rounded-lg shadow-xl mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">A new way to fund your creative work.</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                    Accept support from your audience with the price of a Gala.
                    It's easier than you think.
                </p>
                <div className="mt-8">
                    <Link href={"/signup"}
                        className="bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition duration-300 transform hover:scale-105"
                    >
                        Start my Page
                    </Link >
                </div>
            </div>

            <div className="text-left py-16 px-8 bg-white rounded-lg shadow-xl">
                 <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center"><Info className="mr-3 h-8 w-8 text-yellow-500" /> About Us</h2>
                 <p className="text-gray-700 leading-relaxed">
                    Welcome to 'Buy Me A Gala'! We believe that creativity should be supported, and appreciation shouldn't be complicated. 'Gala' is a popular, inexpensive snack, and our platform uses it as a metaphor for small, meaningful gestures of support.
                 </p>
                 <p className="mt-4 text-gray-700 leading-relaxed">
                    Whether you're a writer, artist, musician, or developer, 'Buy Me A Gala' provides a simple way for your audience to say "thank you" for your work. Fans can support you with the equivalent cost of one or more galas, making it easy and affordable for anyone to contribute. Our goal is to foster a community where creators can thrive with the direct support of those who love their work.
                 </p>
            </div>
        </>
    );
}