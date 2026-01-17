"use client"
import { ChangeEvent, useEffect, useState } from "react";
import HeaderDendaTable from "../component/Table/manajemen_denda/header";
import DendaFillForm from "../component/Cards/dendaFillForm";
import SkeletonRowDenda from "../component/Table/manajemen_denda/body/skeleton";
import TableBodyDenda from "../component/Table/manajemen_denda/body";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setJumlahDenda, setNamaPeminjam, setTanggalKembaliAktual, setTotalHariTerlambat } from "../slicers/dendaSlicers";

type DataSetType = {
    nominal_denda_per_hari: number,
    tanggal_kembali_aktual:string,
    pinjam_kendaraan:{
      master_customer:{
        nama_customer:string
      },
      master_kendaraan:{
        nama_kendaraan:string
      }
    }
    total_denda:number,
    total_hari_terlambat:number
}


type DataPeminjam = {
    pinjam_id:string,
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
    const [fillDendaForm, setFillDendaForm] = useState<boolean>(false)
    const [isDendaShow, setIsDendaShow] = useState<boolean>(false)
    const [dataSet,setDataSet] = useState<DataSetType[]>([])
    const [peminjam,setPeminjam] = useState<DataPeminjam[]>([])
    const namaPeminjam = useAppSelector(state=>state.denda.nama_peminjam)
    const jumlahDenda = useAppSelector(state=>state.denda.jumlah_denda)
    const totalHariTerlambat = useAppSelector(state=>state.denda.total_hari_terlambat)
    const tanggalTercatat = useAppSelector(state=>state.denda.tanggal_kembali_aktual)
    const dispatch = useAppDispatch()



    const datafetch = async ()=>{
      const response = await fetch("/api/denda",{
        method:"GET"
      })

      const data = await response.json()
      setDataSet(data.data)
      setIsDendaShow(true)
    }
    useEffect(()=>{
      datafetch()
      getPeminjam()
    },[])

    
    const getPeminjam = async()=>{
      const response = await fetch("/api/penyewaan_pengembalian",{
        method:"GET"
      })

      const data = await response.json()
      setPeminjam(data.data)
    }

     const addDenda = async()=>{
      const findNama = peminjam.find((item : any)=>item.master_customer.nama_customer === namaPeminjam)
      
      const response = await fetch("/api/denda",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({
          pinjam_id:findNama?.pinjam_id,
          jumlahDenda,
          totalHariTerlambat,
          tanggalTercatat
        })
      })

      const data = await response.json()
      window.location.reload()
    }

    return(
        <>
        <div className="ml-75 mr-5 mt-20">
           
           <div>
            <button 
            onClick={()=>setFillDendaForm(true)}
            className="rounded-md 
            hover:bg-blue-800 transition-all 
            cursor-pointer bg-blue-500 my-3 
            font-bold p-2 text-white">Buat Denda</button>
           </div>
           
            <table className="table-auto w-full border-collapse border border-slate-400">
                <HeaderDendaTable/>
                <tbody>
                {
                  isDendaShow ? 

                    dataSet.map((item,index)=>(
                                          <TableBodyDenda
                                          key={index++} 
                                          kendaraan_dipinjam={item.pinjam_kendaraan.master_kendaraan.nama_kendaraan}
                                          nomor={index+1}
                                          nama_peminjam={item.pinjam_kendaraan.master_customer.nama_customer} 
                                          tanggal_tercatat={item.tanggal_kembali_aktual} 
                                          total_hari_terlambat={item.total_hari_terlambat} 
                                          total_denda={item.total_denda.toLocaleString("id-ID" as string)}/>
                    ))
                    :
                    Array.from({length:10}).map((_,index)=>{
                        return(
                          <SkeletonRowDenda key={index++}/>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
{fillDendaForm && (
  <DendaFillForm 
            dendaChanger={(e) => dispatch(setJumlahDenda(parseInt(e.target.value)))}
            namaChanger={(e) => dispatch(setNamaPeminjam(e.target.value))}
            totalHariTerlambat={totalHariTerlambat}
            namaPeminjam={namaPeminjam}
            jumlahDenda={jumlahDenda}
            tanggalTercatat={tanggalTercatat}
            simpan={addDenda}
            close={() => setFillDendaForm(false)} 
            tanggalChanger={(e)=>{dispatch(setTanggalKembaliAktual(e.target.value))}} 
            hariTerlambatChanger={(e)=>dispatch(setTotalHariTerlambat(parseInt(e.target.value)))}/>
)}
        </>
    )
}