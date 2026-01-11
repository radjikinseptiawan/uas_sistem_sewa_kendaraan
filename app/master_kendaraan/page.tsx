"use client"
import HeaderVechicleTable from "../component/Table/Vechicle_Table/Header_Table";
import dataVechicle from "../../data/kendaraan.json";
import TableBody from "../component/Table/Vechicle_Table/Body_Table";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setBiayaSewa, setJenisKendaraan, setNamaKendaraan, setStok } from "../slicers/kendaraanAdd";
import PopUp from "../component/PopUp";

interface ContentDBType {
    biaya_sewa_per_hari:number;
    jenis_kendaraan:string;
    created_at:string;
    kendaraan_id:string;
    nama_kendaraan:string;
    stok_kendaraan:number
}
export default function Page() {
    const [openForm, setOpenForm] = useState(false);
    const namaKendaraan = useAppSelector((state)=>state.kendaraan.namaKendaraan)
    const jenisKendaraan = useAppSelector((state)=>state.kendaraan.jenisKendaraan)
    const biayaSewa = useAppSelector((state)=>state.kendaraan.biayaSewa)
    const stok = useAppSelector((state)=>state.kendaraan.stok)
    const dispatch = useAppDispatch()
    const listKendaraan = dataVechicle;
    const [contentDb,setContentDb] = useState<ContentDBType[]>([])
    const [openPopUp,setPopUp] = useState<boolean>(false)
    const [data,setData] = useState<ContentDBType>()
    const findData = (item:string)=>{
        const dataResults = contentDb.find((it)=>it.kendaraan_id == item)
        setData(dataResults)
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
            setContentDb(data.data)
            return data
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
                stok
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

    return (
        <div className="relative min-h-screen">

            <div className="ml-80 mt-28 rounded-md h-32 items-center justify-center transition-all w-72 p-2 flex flex-col text-blue-400 text-center shadow-xl hover:shadow-blue-400 cursor-pointer">
                <p className="text-xl font-bold">{listKendaraan.length}</p>  
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
                    {contentDb.map((item,index) => 
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
                    )})}
                </HeaderVechicleTable>
            </div>
            {
                openPopUp && <PopUp openForm={openPopUp} action={() => setPopUp(false)} namaKendaraan={data?.nama_kendaraan as string} 
                jenisKendaraan={data?.jenis_kendaraan as string} idKendaraan={data?.kendaraan_id as string} biayaSewa={data?.biaya_sewa_per_hari as number} 
                stokKendaraa={data?.stok_kendaraan as number} dibuatPada={data?.created_at as string}></PopUp>
            }
            {openForm && (
                <div 
                    className={`fixed inset-0 ${openForm ? "z-50":"z-30"} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
                    onClick={() => setOpenForm(false)}
                >
                    <div 
                        className="bg-white p-6 rounded-xl shadow-2xl w-96 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h1 className="text-xl font-bold text-slate-800 text-center">Tambah Kendaraan</h1>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="mobil" className="text-slate-500">Nama Kendaraan</label>
                            <input 
                            type="text" id="mobil" 
                            placeholder="Nama Mobil" 
                            value={namaKendaraan} 
                            onChange={(e)=>dispatch(setNamaKendaraan(e.target.value))} 
                            className="border p-2 rounded text-black" />
                           
                            <label htmlFor="biaya" className="text-slate-500" >Biaya Sewa/Hari</label>
                            <input type="number" value={biayaSewa} onChange={
                            (e)=>dispatch(setBiayaSewa(parseInt(e.target.value)))} 
                            id="biaya" 
                            placeholder="Harga Sewa" 
                            className="border p-2 rounded text-black" />
                            <label htmlFor="jenis" className="text-slate-500">Jenis Kendaraan</label>
                            <select name="" onChange={(e)=>dispatch(setJenisKendaraan(e.target.value))} value={jenisKendaraan} id="jenis"  className="border p-2 rounded text-black">
                                <option value="">Pilih Jenis Kendaraan</option>
                                <option value="truk">Truk</option>
                                <option value="mobil">Mobil</option>
                                <option value="motor">Motor</option>
                                <option value="bus">Bus</option>
                                <option value="minibus">Minibus</option>
                            </select>
                            <label htmlFor="stok" className="text-slate-500">Stok</label>
                            <input id="stok" type="number" placeholder="Stok" value={0} disabled className="border p-2 rounded text-black bg-gray-400"/>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button 
                                className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold" 
                                onClick={() => setOpenForm(false)}
                            >
                                Batalkan
                            </button>
                            <button onClick={sendDataTo} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}