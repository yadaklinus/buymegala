"use client"
import { formatCurrency } from "@/components/format-currency";
import axios from "axios";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {Switch} from "@heroui/switch";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";




export default function SettingsPage() {
    const [displayName, setDisplayName] = useState<any>("")
    const [username, setUsername] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [galaPrice, setGalaPrice] = useState<any>("");
    const {data:session,status} = useSession()
    const [activate, setActivate] = useState(false);
    const[toogleActive,setToogleActive] = useState(false)
  const router = useRouter()
     if(status === "loading"){
         return ""
     }
     if(status === "unauthenticated"){
         return router.replace("/")
     }

    useEffect(()=>{
        if(status === "authenticated"){
            setDisplayName(session.user?.name)
            setUsername((session.user?.email)?.split("@")[0])
            setEmail(session.user?.email)
           main((session.user?.email)?.split("@")[0])
        }
         
    },[status])

    const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setToogleActive(true)
        if(galaPrice < 500){
            toast.error("Price can not e less than 500")
            setToogleActive(false)
            return
        }
        const res = await axios.post("/api/galaprice",{email,newPrice:galaPrice})

        console.log(res)
        if(res.status == 200){
           toast.success("Saved")
        }
        console.log(res.data)
        setToogleActive(false)
       

    };

    async function main(name:any){
        const res = await axios.post("/api/setting",{userName:name})
        console.log(res.data)
        setActivate(res.data.goLive)
       setGalaPrice(!res.data.galaPrice || res.data.galaPrice == 0 ? 0 : res.data.galaPrice)
    }

    const handleToggle = async (newValue:any) => {
    if(galaPrice <= 0){
        toast.error("Update Gala Price")
        setToogleActive(false)
        return
    }
    setActivate(newValue);
    setToogleActive(true)
    
    

    try {
      const response = await axios.post('/api/activate', {
        email,
        active: newValue,
      });
      console.log('Response:', response.data);
      toast.success("Status Changed")
      setToogleActive(false)
    } catch (error) {
      console.error('API Error:', error);
    }
  };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>
            
            <Switch isDisabled={toogleActive} isSelected={activate} onValueChange={handleToggle} defaultSelected color="success">
               <h1 className="text-1xl font-bold text-gray-800">Activate</h1>
            </Switch>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500" disabled/></div>
                </div>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                     <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span><input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed" disabled /></div>
                    <p className="text-xs text-gray-500 mt-1">Username cannot be changed.</p>
                </div>
                <div>
                    <label htmlFor="galaPrice" className="block text-sm font-medium text-gray-700 mb-1">Price per gala (₦)</label>
                    <div className="relative">
                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{formatCurrency(0)[0]}</span>
                       <input type="number" id="galaPrice" value={galaPrice} onChange={(e) => setGalaPrice(e.target.value)} min="50" step="10" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"/>
                    </div>
                </div>
                <div className="pt-4"><button disabled={toogleActive} type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-yellow-600 transition">Save Changes</button></div>
            </form>
        </div>
    );
}