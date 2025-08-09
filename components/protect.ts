"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function auths(){
     const {data:session,status} = useSession();
        const router = useRouter()
        if(status === "loading"){
            return ""
        }
        if(status === "unauthenticated"){
            return router.replace("/")
        }
}