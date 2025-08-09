"use client"
import { Gift } from "lucide-react";
import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import  {formatCurrency}  from "@/components/format-currency";
import exchangeRate from "@/config/exchangeRatre";
import axios from "axios";
import toast from "react-hot-toast";
import { PaystackButton } from "react-paystack";


export default function UserProfilePage() {
    const path = usePathname()
    const [galas, setGalas] = useState<any>(1);
    const [message, setMessage] = useState('');
    const [supporterName, setSupporterName] = useState('');
    const userName = path.split("@")[1]
    const rate = exchangeRate()
    const [user,setUser] = useState<any>({})
    const router = useRouter()

    useEffect(()=>{
       main()
    },[userName])
   

    if(path[1] !== "@"){
        return notFound()
    }

     async function main(){
            await axios.post("/api/page",{userName}).then(res=>{
                if(res.status != 200){
                router.replace("/not-found")
            }
            if(res.data.goLive == false){
                router.replace("/not-found")
            }
             setUser(res.data)
            }).catch(error=>{
                 router.replace("/not-found")
            })
            
            console.log(user)
        }

    const amountValue = (parseInt(user?.galaPrice || 0) * (galas || 0))

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string

    const componentProps = {
      email: "support@buymegala.app",
      amount: amountValue * 100,
      metadata: {
        custom_fields: [
          {
            display_name: "Supporter Name",
            variable_name: "supporter_name",
            value: supporterName || "anonymous",
          },
          {
            display_name: "Message",
            variable_name: "message",
            value: message || "",
          }
        ]
      },
      publicKey,
      text: `Support ${formatCurrency(amountValue)}`,
      onSuccess: async ({ reference }:{reference:any}) => {
        toast.success("Thanks for the support")
        await axios.post("/api/pay",{
          name: supporterName || "anonymous",
          message: message || "",
          amount: amountValue,
          userName
        }).then(res=>{
          console.log(res.data)
        })
        setMessage("")
        setSupporterName("")
      },
      onClose: () => {},
    };
    
    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-800">Buy <span className="text-yellow-500">{userName}</span> a gala</h1>
                    <form className="mt-8 space-y-6">
                        <div className="bg-gray-100 rounded-lg p-4">
                           <div className="flex flex-wrap items-center gap-4">
                                <Gift className="h-10 w-10 text-yellow-500 flex-shrink-0" />
                                <span className="text-2xl font-bold text-gray-800 flex-shrink-0">x</span>
                                <div className="flex items-center space-x-2 flex-wrap">
                                    {[1, 2, 5, 10].map(num => (
                                        <button key={num} type="button" onClick={() => setGalas(num)} className={`h-12 w-12 rounded-full font-bold text-lg transition-all flex-shrink-0 ${galas === num ? 'bg-yellow-500 text-white scale-110' : 'bg-white hover:bg-yellow-100'}`}>
                                            {num}
                                        </button>
                                    ))}
                                </div>
                                <input 
                                    type="number"
                                    value={galas}
                                    onChange={(e) => setGalas(e.target.value ? parseInt(e.target.value, 10) : '')}
                                    className="h-12 w-24 text-center font-bold text-lg border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                                    min="1"
                                    placeholder="Custom"
                                />
                           </div>
                        </div>
                        <input type="text" placeholder="Your name (optional)" value={supporterName} onChange={(e) => setSupporterName(e.target.value)} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition" />
                        <textarea placeholder="Say something nice... (optional)" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"></textarea>
                        <PaystackButton {...componentProps} className="w-full bg-yellow-500 text-gray-900 font-bold py-4 rounded-lg text-xl hover:bg-yellow-600 transition disabled:bg-gray-400"/>
                    </form>
                </div>
            </div>
            <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                    <img src={user.profilePicture} alt={user.displayName} className="w-24 h-24 rounded-full mx-auto ring-4 ring-yellow-400" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.displayName}</h2>
                    <p className="text-gray-500">@{user.userName}</p>
                </div>
            </div>
        </div>
    );
}