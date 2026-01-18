"use client"
import HeaderVechicleTable from "../../component/Table/Vechicle_Table/Header_Table";
import TableBody from "../../component/Table/Vechicle_Table/Body_Table";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setBiayaSewa, setJenisKendaraan, setNamaKendaraan, setStok } from "../../slicers/kendaraanAdd";
import PopUp from "../../component/PopUp/kendaraanPopUp";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddKendaraanForm from "../../component/Cards/addKendaraanForm";
import EditKendaraanForm from "../../component/Cards/editKendaraanForm";
import { setEditBiayaSewa, setEditJenisKendaraan, setEditNamaKendaraan } from "../../slicers/kendaraanEdit";
import SkeletonRow from "../../component/Table/Vechicle_Table/Body_Table/skeletonLoad";
import CircleLoading from "../../component/Loading/CircleLoad";

interface ContentDBType {
    biaya_sewa_per_hari:number;
    jenis_kendaraan:string;
    created_at:string;
    kendaraan_id:string;
    nama_kendaraan:string;
    stok_kendaraan:number
}
export default function KendaraanContent() {
    const [openForm, setOpenForm] = useState(false);
    const namaKendaraan = useAppSelector((state)=>state.kendaraan.namaKendaraan)
    const jenisKendaraan = useAppSelector((state)=>state.kendaraan.jenisKendaraan)
    const biayaSewa = useAppSelector((state)=>state.kendaraan.biayaSewa)
    const stok = useAppSelector((state)=>state.kendaraan.stok)
    const dispatch = useAppDispatch()
    const [rawDataGet,setRawDataGet] = useState(false)
    const [contentDb,setContentDb] = useState<ContentDBType[]>([])
    const [openPopUp,setPopUp] = useState<boolean>(false)
    const [data,setData] = useState<ContentDBType>()
    const [openEditForm,setOpenEditOpenForm] = useState(false)
    
    const router = useRouter()
    const pathName = usePathname()
    const searchUrl = useSearchParams().get("id")
    
    const editNamaKendaraan = useAppSelector((state)=>state.editKendaraan.namaKendaraan)
    const editBiayaSewa = useAppSelector((state)=>state.editKendaraan.biayaSewa)
    const editJenisKendaraan = useAppSelector(state=>state.editKendaraan.jenisKendaraan)

    const findData = (item: any)=>{
        const dataResults = contentDb.find((it)=>it.kendaraan_id == item)
        setData(dataResults)
        router.push(`${pathName}/?id=${item}`)
    }
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = async()=>{
        try{
            const response = await fetch("/api/kendaraan",{
                method:"GET",
            })

            const data = await response.json()
            setRawDataGet(true)
            setContentDb(data.data)
            return data
        }catch(e){
            console.log(e)
        }
    }

    const sendDataEdited = async (id:string)=>{
        try{
            const response = await fetch(`/api/kendaraan/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify({
                    editNamaKendaraan,
                    editJenisKendaraan,
                    editBiayaSewa
                })
            })

            window.location.reload()
            return response
        }catch(e){
            console.log(e)
        }
    }

    const sendDataTo = async ()=>{
        try{
        const response = await fetch("/api/kendaraan",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                namaKendaraan,
                jenisKendaraan,
                biayaSewa,
            })
        })
        const data = await response.json()
        if(!response){
            console.log(response)
        }
        dispatch(setBiayaSewa(0))
        dispatch(setJenisKendaraan(""))
        dispatch(setNamaKendaraan(""))
        dispatch(setStok(0))
        window.location.reload()
        console.log({
            message:"Berhasil mengirim data ke backend",
            data
        })}catch(e){
            console.log(e)
        }
    }

    const deleteData = async(kendaraa_id:string)=>{
        const id = kendaraa_id
        const isDelete = confirm(`Kendaraan dengan id ${id} akan dihapus, kamu yakin?`)
        
        if(!isDelete){
            return null
        }
        const response = await fetch(`api/kendaraan/${id}`,{
            method:"DELETE"
        })

        if(response.ok){
        const deleteData = contentDb.filter((item)=>item.kendaraan_id !== kendaraa_id)
        setContentDb(deleteData)
        setPopUp(false)
        router.push(pathName);
        }
    }


    const getData = async(kendaraan_id:string)=>{
        const id = kendaraan_id
        setOpenEditOpenForm(true)
        const findData = contentDb.find(item => item.kendaraan_id === id)
        if(findData){

        dispatch(setEditJenisKendaraan(findData?.jenis_kendaraan as string))
        dispatch(setEditBiayaSewa(findData?.biaya_sewa_per_hari))
        dispatch(setEditNamaKendaraan(findData?.nama_kendaraan as string))
        }
    }

    return (
        <div className="relative min-h-screen">

            <div className="ml-80 z-20 mt-28 rounded-md h-32 items-center justify-center transition-all w-72 p-2 flex flex-col text-blue-400 text-center shadow-xl hover:shadow-blue-400 cursor-pointer">
                {rawDataGet ? <p className="text-xl font-bold">{contentDb.length}</p> : <CircleLoading/>}  
                <h1 className="text-xl font-bold">Jumlah Kendaraan</h1>
            </div>


            <button 
                className="ml-80 mt-10 p-2 rounded-lg cursor-pointer bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
                onClick={() => setOpenForm(true)}
            >
                Tambah Kendaraan
            </button>

            <div>
                <HeaderVechicleTable>
                    {
                    rawDataGet ? 
                    
                    contentDb.map((item,index) => 
                    {
                        index++
                    return(
                        <TableBody 
                            action={()=>{
                                setPopUp(true)
                                findData(item.kendaraan_id)
                            }
                            }
                            key={index++}
                            idKendaraan={index++} 
                            namaKendaraan={item.nama_kendaraan} 
                            jenisKendaraan={item.jenis_kendaraan} 
                            biayaKendaraan={item.biaya_sewa_per_hari} 
                            stokKendaraan={item.stok_kendaraan}
                        />
                    )})
                
                    :
                    Array.from({length:10}).map((_,index)=>{
                        return(
                        <SkeletonRow key={index++}/>                            
                        )
                    })
                }
                </HeaderVechicleTable>
            </div>
            {
                openPopUp && <PopUp 
                editAction={()=>getData(searchUrl as string)}
                openForm={openPopUp} 
                deleteAction = {()=>{deleteData(searchUrl as string)}}
                action={() => setPopUp(false)} 
                namaKendaraan={data?.nama_kendaraan as string} 
                jenisKendaraan={data?.jenis_kendaraan as string} 
                idKendaraan={data?.kendaraan_id as string} 
                biayaSewa={data?.biaya_sewa_per_hari as number} 
                stokKendaraa={data?.stok_kendaraan as number} 
                dibuatPada={data?.created_at as string}></PopUp>
            }
            {openForm && (
             <AddKendaraanForm jenisKendaraan={jenisKendaraan} 
             biayaSewa={biayaSewa} 
             etSimpan={sendDataTo} 
             etBiayaSewa={e=>dispatch(setBiayaSewa(parseInt(e.target.value)))} 
             etBatal={()=>setOpenForm(false)} 
             etSelectJenis={(e)=>dispatch(setJenisKendaraan(e.target.value))} 
             openForm={openForm} namaKendaraan={namaKendaraan} 
             etChangeNamaKendaraan={(e)=>dispatch(setNamaKendaraan(e.target.value))}/>
             )}

             {openEditForm && (
            <EditKendaraanForm jenisKendaraan={editJenisKendaraan} 
             biayaSewa={editBiayaSewa} 
             etSimpan={()=>sendDataEdited(searchUrl as string)} 
             etBiayaSewa={e=>dispatch(setEditBiayaSewa(parseInt(e.target.value)))} 
             etBatal={()=>setOpenEditOpenForm(false)} 
             etSelectJenis={(e)=>dispatch(setEditJenisKendaraan(e.target.value))} 
             openForm={openEditForm} namaKendaraan={editNamaKendaraan} 
             etChangeNamaKendaraan={(e)=>dispatch(setEditNamaKendaraan(e.target.value))}/>
             )}
        </div>
    );
}