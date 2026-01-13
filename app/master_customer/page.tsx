"use client"
import { useEffect, useState } from "react";
import HeaderTable from "../component/Table/Customer_Table/header_table";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setName } from "../slicers/customersSlicers";
import BodyTable from "../component/Table/Customer_Table/body_table";
import SkeletonCustomerRow from "../component/Table/Customer_Table/body_table/skeletonRow";
import CircleLoading from "../component/Loading/CircleLoad";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PopUp from "../component/PopUp/customerPopUp";

type DataCustomerType = {
        customer_id:string
        nama_customer:string
        nomor_induk_kartu_identitas:string
    }

export default function Page(){
    const customerName = useAppSelector((state)=>state.customers.name)
    const numberNik = useAppSelector((state)=>state.customers.nik)
    const dispatch = useAppDispatch()
    const [customers,setCustomers]= useState<DataCustomerType[]>([])
    const [rawCustomerData,setRawCustomerData] = useState<boolean>(false)
    const[openForm,setOpenForm] = useState<boolean>(false)
    const [detailCustomer,setDetailCustomer] = useState<DataCustomerType>()
    const [detailForm,setOpenDetailForm] = useState<boolean>(false)
    const router = useRouter()
    const pathName = usePathname()
    const searchUrl = useSearchParams().get("id")
    
    const findCustomerDetail = (id:string)=>{
        setOpenDetailForm(true)
        const findData =customers.find((item)=>item.customer_id === id)
        if(findData){
            setDetailCustomer(findData)
            router.push(`${pathName}/?id=${id}`)
        }
    }


    const dataFetching = async()=>{
        const response = await fetch("/api/customers",{
            method:"GET"
        })
        console.log(response)

        const data = await response.json()
        if(!data){
            return null
        }
        setRawCustomerData(true)
        setCustomers(data.data)
    }

    useEffect(()=>{
        dataFetching()
    },[])

    return(
        <>
        <div className="mt-20">
       
           <div className="ml-80 z-20 mt-28 rounded-md h-32 items-center justify-center transition-all w-72 p-2 flex flex-col text-blue-400 text-center shadow-xl hover:shadow-blue-400 cursor-pointer">
               {rawCustomerData ? <p className="text-xl font-bold">{customers.length}</p> : <CircleLoading/>}  
               <h1 className="text-xl font-bold">Jumlah Riwayat Customers</h1>
           </div>
        
           <button 
               className="ml-80 mt-10 p-2 rounded-lg cursor-pointer bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
               onClick={() => setOpenForm(true)}
           >
               Tambah Kendaraan
           </button>
        
        <HeaderTable>
            {
                rawCustomerData ? 
                customers.map((item,index)=>{
                    return(
                        <BodyTable 
                        action={()=>findCustomerDetail(item.customer_id)}
                        customer_id={item.customer_id} 
                        nama_customer={item.nama_customer} 
                        nomor_induk_kartu_identitas={item.nomor_induk_kartu_identitas} 
                        key={index++}/>
                 )
              }) : 
              Array.from({length:10}).map((_,index)=>(
                <SkeletonCustomerRow key={index++}/>
              ))
            }
        </HeaderTable>
        </div>
        {
            detailForm && (
                <PopUp deleteAction={function (): void {
                        throw new Error("Function not implemented.");
                    } } action={()=>setOpenDetailForm(false)} editAction={function (): void {
                        throw new Error("Function not implemented.");
                    } } namaCustomer={detailCustomer?.nama_customer as string} id={detailCustomer?.customer_id as string} 
                    nik={detailCustomer?.nomor_induk_kartu_identitas as string} dibuatPada={""} openForm={openForm}/>
            )
        }
        </>
    )
}