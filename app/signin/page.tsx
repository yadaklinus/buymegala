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
        // const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,{email,password})
        // console.log(res.config)
        // main()\
        const res = await signIn('google',{redirect:false})
        console.log(res)
        router.replace("/")

        
    }
    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-6">     
                <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-yellow-600 transition">
                    Signin with Google
                </button>
            </form>
            
        </div>
    );
}