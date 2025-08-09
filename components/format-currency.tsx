// "use client"
// import axios from "axios";
// import { useEffect } from "react";


import useCurrentCurrency from "@/config/currentCurrency";

// const fetchUserLocation = async () => {
//     try {
//       const response = await axios.get('https://ipapi.co/json/');
//       console.log('User IP data:', response.data);
//       return response.data.currency;
//     } catch (error) {
//       console.error('Error fetching location:', error);
//       return null;
//     }
// };


//     async function main() {
//     //   const res = await fetch(`${url}/auth`,{method:"GET"})
//     //   console.log(res)
//     currency = await fetchUserLocation();
//     }
//     main()

const  currency = useCurrentCurrency();


export const formatCurrency = (amount:any) => new Intl.NumberFormat('en-US', { style: 'currency', currency: `${currency}`, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)
