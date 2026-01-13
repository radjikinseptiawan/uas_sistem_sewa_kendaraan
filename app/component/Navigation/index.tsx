"use client"

import { getURL } from "next/dist/shared/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const route = [
   {
       name:"Master Kendaraan",
       to:"/master_kendaraan"
   },
   {
       name:"Master Customer",
       to:"/master_customer"
   },
   {
       name:"Penyewaan & Pengembalian",
       to:"/penyewaan_pengembalian"
   },{
       name:"Manajemen Stok",
       to:"/manajemen_stok"
   },{
       name:"Manajemen Denda",
       to:"/manajemen_denda"
   },{
       name:"Riwayat Transaksi",
       to:"/riwayat_transaksi"
   }]

export default function Navigation(){
    const params = usePathname()
    return(
        <>
          <div className="shadow-xl z-50 fixed top-0 left-0 shadow-blue-800/80 bg-blue-800 min-h-screen w-72 p-4">
            <Link href={"/"}><h1 className="font-bold text-center text-white text-xl">Kilbram</h1></Link>
            <div className="my-6 border-4 border-white"></div>
            <div className="flex flex-col">
            {
               route.map((item,index)=>{
                    return(
                            <button
                            key={index++}
                            className={`${params == item.to ? "border-white text-white bg-blue-400" : "bg-blue-600"} 
                            text-start 
                            p-2 my-2 rounded-md 
                            font-bold text-blue-900
                            hover:cursor-pointer
                            hover:text-white
                            transition-all
                            border-blue-600
                            border-2
                            hover:scale-y-110
                            hover:border-white
                            `} 
                            onClick={()=> window.location.href = `${item.to}`}
                            >{item.name}</button>
                    )
                })
            }
            </div>
          </div>  

          <div className="shadow-xl ml-70 p-4 fixed top-0 w-full z-30 bg-white">
                {
                    <h1 className="font-bold text-blue-800">{route.find(item=>item.to == params)?.name}</h1>
                }
          </div>
        </>
    )
}