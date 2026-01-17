"use client"
import { useEffect, useState } from "react";
import SkeletonRow from "../component/Table/Vechicle_Table/Body_Table/skeletonLoad";
import HeaderVechicleTable from "../component/Table/Vechicle_Table/Header_Table";
import TableBody from "../component/Table/Vechicle_Table/Body_Table";
import ManajemenStokBodyTable from "../component/Table/manajemen_stok_table";
interface ContentDBType {
    biaya_sewa_per_hari:number;
    jenis_kendaraan:string;
    created_at:string;
    kendaraan_id:string;
    nama_kendaraan:string;
    stok_kendaraan:number
}
export default function Page(){
    const [dataKendaraan,setDataKendaraan] = useState<ContentDBType[]>([])
    const [isDataKendaran,setIsDataKendaraan] = useState<boolean>(false)

    const tambahStok = (id:string)=>{
        setDataKendaraan((prev)=>{
            return prev.map(item => 
            {
              return  item.kendaraan_id == id ? {...item, stok_kendaraan:item.stok_kendaraan + 1} : item
            }
            )
        })
    }

    const kurangStok = (id : string)=>{
        setDataKendaraan((prev)=>{
            return prev.map((item)=>{
                return item.kendaraan_id == id ? {...item, stok_kendaraan:item.stok_kendaraan - 1} : item
            })
        })
    }


    const sendDataTo = async ()=>{
        await fetch("/api/kendaraan",{
            method:"PATCH",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(dataKendaraan)
        })

        window.location.reload()
    }

    const fetchData = async () =>{

        if(dataKendaraan.length === 0) setIsDataKendaraan(false)

        const response = await fetch("/api/kendaraan",{
            method:"GET"
        })

        const data = await response.json()
        setDataKendaraan(data.data)
        setIsDataKendaraan(true)
    }

    useEffect(()=>{
        fetchData()
    },[])

    return(
        <div className="mt-20">
            <button className="
            bg-blue-200 
            ml-90
            hover:bg-blue-300 
            px-4 py-2 w-fullrounded-md 
             font-bold text-blue-900 
             transition-all hover:cursor-pointer 
             hover:scale-105 active:scale-95"
            onClick={sendDataTo}
            >
                Simpan Perubahan
            </button>
            <div>
            <HeaderVechicleTable>
                    {
                        isDataKendaran?
                        
                        dataKendaraan.map((item,index)=>{
                            return(
                                <ManajemenStokBodyTable 
                                key={index++}
                                sum={()=>tambahStok(item.kendaraan_id)}
                                min={()=>kurangStok(item.kendaraan_id)} 
                                idKendaraan={index+1} 
                                namaKendaraan={item.nama_kendaraan} 
                                jenisKendaraan={item.jenis_kendaraan} 
                                biayaKendaraan={item.biaya_sewa_per_hari} 
                                stokKendaraan={item.stok_kendaraan}/>
                            )
                        })
                        :

                        Array.from({length:10}).map((_,index)=>{
                            return(
                                <SkeletonRow key={index++}/>
                            )
                        })
                    }
            </HeaderVechicleTable>
            </div>
        </div>
    )
}