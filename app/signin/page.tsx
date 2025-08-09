"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
// import {} from "lucide-react"


export default function SignInPage() {

    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const router = useRouter()
    async function main() {
        const res = await axios.get(`${url}/auth/status`)
        console.log(res.data)
      }
     
    const url = process.env.NEXT_PUBLIC_API_URL

    useEffect(()=>{
     
    })

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
       e.preventDefault();
        const res = await signIn('google',{redirect:false})
        console.log(res)
        router.replace("/")

        
    }
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-2xl">🍩</span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold text-gray-900">Welcome back</h1>
              <p className="mt-1 text-gray-600">Sign in to continue to Buy Me A Gala</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <button type="submit" className="w-full inline-flex items-center justify-center gap-3 bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl text-lg hover:bg-yellow-600 transition-all shadow-md">
                <span>Continue with Google</span>
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
              By continuing, you agree to our <Link href="#" className="underline hover:text-gray-700">Terms</Link> and <Link href="#" className="underline hover:text-gray-700">Privacy Policy</Link>.
            </div>
          </div>
        </div>
    );
}