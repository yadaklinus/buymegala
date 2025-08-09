"use client"
import { formatCurrency } from "@/components/format-currency";
import axios from "axios";
import { DollarSign, Gift, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import {Snippet} from "@heroui/snippet";
import { notFound, useRouter } from "next/navigation";
import auths from "@/components/protect";




export default function DashboardPage() {
    const {data:session,status} = useSession();
    auths()
    const [supporters,setSupporters] = useState<any>([]);
    const [totalEarnings,setTotalEarnings]  = useState(0)
    const [activate, setActivate] = useState(false);
    const [shareLink, setShareLink] = useState("");
    

     async function main2(name:any){
        const res = await axios.post("/api/setting",{userName:name})
        console.log(res.data)
        setActivate(res.data.goLive)
       
    }
    

    useEffect(()=>{
        async function main(){
            const res = await axios.post("/api/supporters",{email:session?.user?.email})
            console.log(res.data)
            setTotalEarnings(res.data.reduce((acc:number, s:any) => acc + parseFloat(s.amount), 0))
            setSupporters(res.data)
            
        }
      if(status === "authenticated"){
        main()
        const username = (session?.user?.email)?.split("@")[0]
        main2(username)
        if (typeof window !== 'undefined') {
          setShareLink(`${window.location.origin}/@${username}`)
        }
      }
    },[status])
   
                           
    
     // const totalGalas = useMemo(() => user.supporters.reduce((acc:number, s:any) => acc + s.amount / user.galaPrice, 0), [user.supporters, user.galaPrice]);

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold my-4 text-gray-800 mb-6">Your Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-yellow-100 p-3 rounded-full"><DollarSign className="h-6 w-6 text-yellow-600" /></div><div><p className="text-gray-500">Total Earnings</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(totalEarnings)}</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-green-100 p-3 rounded-full"><User className="h-6 w-6 text-green-600" /></div><div><p className="text-gray-500">Total Supporters</p><p className="text-2xl font-bold text-gray-800">{supporters?.length || 0}</p></div></div>
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4"><div className="bg-blue-100 p-3 rounded-full"><Gift className="h-6 w-6 text-blue-600" /></div><div><p className="text-gray-500">Page Status</p><p className={`text-2xl font-bold ${activate ? "text-green-800 mr-2 px-2.5 py-0.5 rounded bg-green-100" : "text-red-800 mr-2 px-2.5 py-0.5 rounded bg-red-100"}`}>{activate ? "Active" : "In-active"}</p>
                     <Snippet symbol="." variant="bordered">
                        {shareLink}
                    </Snippet>
                </div></div>
            </div>
            <div className="bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 p-6 border-b">Recent Supporters</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="p-4 font-semibold">From</th>
                                <th className="p-4 font-semibold">Amount</th>
                                <th className="p-4 font-semibold">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {supporters?.length > 0 && supporters.map((s:any, index:any)=>(
                                <tr key={s.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-4 flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{s.name.charAt(0)}</div>
                                <span className="font-medium text-gray-700">{s.name}</span>
                            </td>
                            <td className="p-4">
                                <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{formatCurrency(s.amount)}</span>
                            </td>
                            <td className="p-4 text-gray-600 italic">"{s.message}"</td>
                                </tr>
                            ))}                            
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </div>
    );
    
}


{/* <td className="p-4 flex items-center space-x-3">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">{s.name.charAt(0)}</div>
                                <span className="font-medium text-gray-700">{s.name}</span>
                            </td>
                            <td className="p-4">
                                <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{formatCurrency(s.amount)}</span>
                            </td>
                            <td className="p-4 text-gray-600 italic">"{s.message}"</td> */}