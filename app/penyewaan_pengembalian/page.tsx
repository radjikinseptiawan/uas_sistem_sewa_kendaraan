"use client"
import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { setNamaKendaraan } from "../slicers/kendaraanAdd"
import { setKendaraanDipinjam, setNamaPeminjam, setTanggalPengembalian, setTanggalPinjam } from "../slicers/penyewaanSlicers"
import PenyewaanPengembalian from "../component/Cards/penyewaanPengembalianForm"
import DataPeminjam from "../component/Cards/dataPeminjam"
import CircleLoading from "../component/Loading/CircleLoad"
import TableHeaderPeminjaman from "../component/Table/Table_Peminjaman/table_head"
import TableBodyPeminjaman from "../component/Table/Table_Peminjaman/tableBody"
import SkeletonRow from "../component/Table/Vechicle_Table/Body_Table/skeletonLoad"


 type DataCustomerType = {
        customer_id:string;
        nama_customer:string
        nomor_induk_kartu_identitas:string,
        created_at:string
}

interface VechicleType {
    biaya_sewa_per_hari:number;
    jenis_kendaraan:string;
    created_at:string;
    kendaraan_id:string;
    nama_kendaraan:string;
    stok_kendaraan:number
}

type DataPeminjam = {
    master_customer:{
        nama_customer:string;
    },
    master_kendaraan:{
        nama_kendaraan:string;
    }
    tanggal_peminjaman: string;
    tanggal_pengembalian: string;
    nama_kendaraan: string;
    nama_peminjam:string;
}
export default function Page(){
    const namaPeminjam = useAppSelector((state)=>state.penyewaan.namaPeminjam)
    const tanggalPeminjaman = useAppSelector((state)=>state.penyewaan.tanggalPinjam)
    const tanggalPengembalian = useAppSelector((state)=>state.penyewaan.tanggalPengembalian)
    const kendaraanDipinjam = useAppSelector((state)=>state.penyewaan.kendaraanDipinjam)
    const [isDataPeminjam,setIsDataPeminjam] = useState<boolean>(false)
    const [foundPeminjam,setFoundPeminjam] = useState<boolean>(false)
    const [foundVechicle,setFoundVechicle] = useState<boolean>(false)
    const [dataNama,setDataNama] = useState<DataCustomerType[]>([])
    const [dataVechicle,setDataVechicle] =useState<VechicleType[]>([])
    const [dataPeminjam,setDataPeminjam] = useState<DataPeminjam[]>([])
    const dispatch = useAppDispatch()

    const resetContaint = ()=>{
        dispatch(setNamaPeminjam(""))
        dispatch(setTanggalPinjam(""))
        dispatch(setTanggalPengembalian(""))
        dispatch(setKendaraanDipinjam(""))
    }

    const sendDataToDatabase = async()=>{
        const findDataNama = dataNama.find((item)=>item.nama_customer === namaPeminjam)
        const findDataKendaraan = dataVechicle.find((item)=>item.nama_kendaraan === kendaraanDipinjam)

        if(!findDataNama || !findDataKendaraan){
            alert("Data tidak tersedia di database!")
        }
        
        const response = await fetch("/api/penyewaan_pengembalian",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                tanggal_peminjaman:tanggalPeminjaman,
                tanggal_pengembalian:tanggalPengembalian,
                nama_kendaraan:kendaraanDipinjam,
                kendaraan_id:findDataKendaraan?.kendaraan_id,
                customer_id: findDataNama?.customer_id
            })
        })

        const data = await response.json()
        window.location.reload()
    }


    const checkVechicle = async(nama:string)=>{
        try{
            const response = await fetch("/api/kendaraan",{
                method:"GET"
            })

            const data= await response.json()
            setDataVechicle(data.data)
            const findVechicle = dataVechicle.find(item => item.nama_kendaraan === nama)
            if(findVechicle){
                setFoundVechicle(true)
            }
        }catch(e){
            console.log(e)
        }
    }

    const checkUsers = async(nama : string)=>{
        try{
            const response = await fetch("api/customers",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await response.json()
            setDataNama(data.data)
            const findUser = data.data.find((item : DataCustomerType)=>item.nama_customer == nama)
            if(findUser){
                setFoundPeminjam(true)
            }
        }catch(e){
            console.log(e)
        }
    }

    const fetchDataPeminjam = async()=>{
        try{
            const response = await fetch("/api/penyewaan_pengembalian",{
            method:"GET"
        })

            const data = await response.json()
            setDataPeminjam(data.data)
        }catch(e){
            console.log(e)
        }
    }

    const filterNameById = (item : DataCustomerType)=>{
        const data = dataNama.find((id)=>id.customer_id ==  item.customer_id)
        return data
    }

    useEffect(()=>{
        fetchDataPeminjam()
        setIsDataPeminjam(true)
    },[])

    useEffect(()=>{
        checkVechicle(kendaraanDipinjam)
    },[kendaraanDipinjam])
    useEffect(()=>{
        checkUsers(namaPeminjam)
    },[namaPeminjam])
    return(
        <div className="flex">
                <div>
                <PenyewaanPengembalian 
                namaPeminjam={namaPeminjam} 
                foundPeminjam={foundPeminjam} 
                tanggalPeminjaman={tanggalPeminjaman} 
                tanggalPengembalian={tanggalPengembalian} 
                kendaraanDipinjam={kendaraanDipinjam} 
                foundVechicle={foundVechicle} 
                resetContaint={resetContaint}
                saveContaint={sendDataToDatabase}
                changeNamaPeminjam={(e)=>{dispatch(setNamaPeminjam(e.target.value))}} 
                changeTanggalPengembalian={(e)=>{dispatch(setTanggalPengembalian(e.target.value))}} 
                changeTanggalPeminjam={(e)=>{dispatch(setTanggalPinjam(e.target.value))}} 
                changeKendaraanDipinjam={(e)=>{dispatch(setKendaraanDipinjam(e.target.value))}}/>


                <div className="flex ml-70">
                <DataPeminjam text={"Jumlah Kendaraan Siap Pinjam"} results={dataVechicle ? dataVechicle.length : <CircleLoading/>}/>
                <DataPeminjam text={"Jumlah Orang Terdaftar"} results={dataNama? dataNama.length : <CircleLoading/>}/>
                </div>
                <div className="flex shadow-xl p-2 ml-75 rounded-md">
                    <input type="text" 
                    className="border-b-2 
                    text-black
                    border-blue-600 w-72 mx-2 my-2"
                    placeholder="Cari Peminjam"
                    />
                    <button className="border bg-blue-600 p-2 w-32
                    font-bold my-2 rounded-md 
                    ">Cari</button>
                </div>
                </div>
            <div className="shadow-xl mx-2">
            <table className=" mt-20 mx-2 table-auto w-xl border-collapse border border-slate-400">
                <TableHeaderPeminjaman/>
                <tbody>
                    {
                        isDataPeminjam ? 
                        dataPeminjam.map((item,index)=>{
                            return(
                                <TableBodyPeminjaman key={index}
                                tanggalPeminjaman={item.tanggal_peminjaman}
                                tanggalPengembalian={item.tanggal_pengembalian}
                                namaPeminjaman={item.master_customer.nama_customer}
                                kendaraanDipinjam={item.master_kendaraan.nama_kendaraan} nomor={index+1}
                                ></TableBodyPeminjaman>
                            )
                        }) : 
                        Array.from({length:10}).map((_,i)=>{
                            return(
                                <SkeletonRow key={i++}/>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}