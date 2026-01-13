"use client"
import { ChangeEvent, useEffect, useState } from "react";
import HeaderTable from "../component/Table/Customer_Table/header_table";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setName, setNik } from "../slicers/customersSlicers";
import BodyTable from "../component/Table/Customer_Table/body_table";
import SkeletonCustomerRow from "../component/Table/Customer_Table/body_table/skeletonRow";
import CircleLoading from "../component/Loading/CircleLoad";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PopUp from "../component/PopUp/customerPopUp";
import AddCustomerForm from "../component/Cards/addCustomerForm";
import EditCustomerForm from "../component/Cards/editCustomerForm";
import { setEditName, setEditNik } from "../slicers/customersSlicersEdit";

type DataCustomerType = {
        customer_id:string
        nama_customer:string
        nomor_induk_kartu_identitas:string,
        created_at:string
    }

export default function Page(){
    const customerName = useAppSelector((state)=>state.customers.name)
    const numberNik = useAppSelector((state)=>state.customers.nik)
    
    const editCustomerName = useAppSelector((state)=>state.editCustomer.nameEdit)
    const numberNikEdit = useAppSelector((state)=>state.editCustomer.nikEdit)
    
    const dispatch = useAppDispatch()
    const [customers,setCustomers]= useState<DataCustomerType[]>([])
    const [rawCustomerData,setRawCustomerData] = useState<boolean>(false)
    const[openAddForm,setOpenAddForm] = useState<boolean>(false)
    const [detailCustomer,setDetailCustomer] = useState<DataCustomerType>()
    const [detailForm,setOpenDetailForm] = useState<boolean>(false)
    const [openEditForm,setOpenEditForm] = useState<boolean>(false)
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

    const deleteAction = async (id:string)=>{
       const isTrue = confirm(`Customer dengan id ${id} akan dihapus apakah kamu yakin?`)
       
       if(isTrue){
        const response = await fetch(`/api/customers/${id}`,{
            method:"DELETE"
        })

        if(response.ok){
        const dataDelete = customers.filter(item=>item.customer_id !== id)
        setCustomers(dataDelete)
        setOpenDetailForm(false)
        return}
     }
    }


    const dataFetching = async()=>{
        const response = await fetch("/api/customers",{
            method:"GET"
        })

        const data = await response.json()
        if(!data){
            return null
        }
        setRawCustomerData(true)
        setCustomers(data.data)
    }


    const addDataValue = async ()=>{
        const response = await fetch("/api/customers",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                customerName,
                numberNik
            })
        })

        window.location.reload()
    }

    const getData = async (id:String)=>{
        const findData = customers.find((item)=>item.customer_id == id)
        if(findData){
        setOpenDetailForm(false)
        setOpenEditForm(true)
        dispatch(setEditName(findData.nama_customer))
        dispatch(setEditNik(findData.nomor_induk_kartu_identitas))
        }
    }

    const saveChange = async (id:string)=>{
        console.log({customerName,numberNik})
        const response = await fetch(`/api/customers/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                customer_name:editCustomerName,
                nomor_induk_kartu_identitas:numberNikEdit
            })
        })

        const data = await response.json()
        window.location.reload()
    }

    const changeDateFormat = (date: string)=>{
        return Intl.DateTimeFormat("id-ID",{
            month:"long",
            day:"2-digit",
            year:"numeric"
        }).format(new Date(date))
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
               onClick={() => setOpenAddForm(true)}
           >
               Tambah Customers
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
            openAddForm && (
                <AddCustomerForm nik={numberNik} 
                etSimpan={addDataValue} 
                etNomorInduk={(e)=>dispatch(setNik(e.target.value))} 
                etBatal={() => setOpenAddForm(false)} 
                openForm={openAddForm} namaCustomer={customerName} 
                etChangeNamaCustomer={(e)=>dispatch(setName(e.target.value))}/>
            )
        }

        {
            openEditForm && (
                <EditCustomerForm
                        etBatal={() => setOpenEditForm(false)}
                        etSimpan={() =>saveChange(searchUrl as string)  }
                        etChangeNamaCustomer={(e) => { dispatch(setEditName(e.target.value))} }
                        etNomorInduk={(e) => {dispatch(setEditNik(e.target.value))}}
                        nik={numberNikEdit}
                        namaCustomer={editCustomerName} openForm={openEditForm}
                />
            )
        }

        {
            detailForm && (
                <PopUp deleteAction={()=>deleteAction(searchUrl as string)} action={()=>setOpenDetailForm(false)} 
                editAction={()=>getData(searchUrl as string)} namaCustomer={detailCustomer?.nama_customer as string} id={detailCustomer?.customer_id as string} 
                nik={detailCustomer?.nomor_induk_kartu_identitas as string} dibuatPada={detailCustomer ? changeDateFormat(detailCustomer?.created_at) :""} openForm={detailForm}/>
            )
        }
        </>
    )
}