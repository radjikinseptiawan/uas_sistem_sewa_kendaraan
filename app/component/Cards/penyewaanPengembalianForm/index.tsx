import { ChangeEvent, useEffect, useState } from "react"

type DataCustomerType = {
    nama_customer:string;
}

type DataKendaraanType = {
    nama_kendaraan:string;
}

export default function PenyewaanPengembalian(
    {
        namaPeminjam,
        foundPeminjam,
        tanggalPeminjaman,
        tanggalPengembalian,
        kendaraanDipinjam,
        foundVechicle,
        resetContaint,
        saveContaint,
        changeNamaPeminjam,
        changeTanggalPengembalian,
        changeTanggalPeminjam,
        changeKendaraanDipinjam
    }:{
        namaPeminjam:string,
        foundPeminjam:boolean,
        tanggalPeminjaman:string,
        tanggalPengembalian:string,
        kendaraanDipinjam:string,
        foundVechicle:boolean,
        resetContaint:()=>void,
        saveContaint:()=>void,
        changeNamaPeminjam:(e:ChangeEvent<HTMLSelectElement>)=>void,
        changeTanggalPengembalian :(e:ChangeEvent<HTMLInputElement>)=>void,
        changeTanggalPeminjam :(e:ChangeEvent<HTMLInputElement>)=>void,
        changeKendaraanDipinjam :(e:ChangeEvent<HTMLSelectElement>)=>void
    }
){
    const [dataNama,setDataNama] = useState<DataCustomerType[]>([])
    const [dataKendaraan,setDataKendaraan] = useState<DataKendaraanType[]>([])
    const checkUsers = async ()=>{
           const response = await fetch("api/customers",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await response.json()
            setDataNama(data.data)   
    }

    const checKendaraan = async ()=>{
           const response = await fetch("api/kendaraan",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data = await response.json()
            setDataKendaraan(data.data)   
    }

    useEffect(()=>{
        checkUsers()
        checKendaraan()
    },)

    return(
          <div className="ml-80 mt-20">
            <div className="text-black flex flex-col w-xl ">
                <label htmlFor="namaPeminjam" className="text-sm font-semibold text-gray-700 ml-1">Nama Peminjam</label>
                <select
                className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white shadow-sm" 
                value={namaPeminjam} 
                onChange={changeNamaPeminjam} name="namaPeminjam" id="namaPeminjam">
                    <option value=""></option>
                    {
                        dataNama.map((item,index)=>(
                            <option value={item.nama_customer} key={index++}>{item.nama_customer}</option>
                        ))
                    }
                </select>
                {
                    foundPeminjam ? <p className="text-sm text-green-600">Peminjam ditemukan!</p> : <p className="text-sm text-red-600">Peminjam tidak ditemukan!</p>
                }
                <label htmlFor="namaPeminjam" className="text-sm font-semibold text-gray-700 ml-1">Tanggal Pinjam</label>
                <input className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white shadow-sm"
                value={tanggalPeminjaman} 
                onChange={changeTanggalPeminjam} 
                type="date" name="namaPeminjam" 
                id="namaPeminjam" placeholder="Nama Peminjam"/>
                <label htmlFor="namaPeminjam" className="text-sm font-semibold text-gray-700 ml-1">Tanggal Pengembalian</label>
                <input 
                className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white shadow-sm"
                onChange={changeTanggalPengembalian} value={tanggalPengembalian} type="date" name="namaPeminjam" id="namaPeminjam" placeholder="Nama Peminjam"/>
                <label htmlFor="namaPeminjam" className="text-sm font-semibold text-gray-700 ml-1">Kendaraan Dipinjam</label>
                <select 
                className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 bg-white shadow-sm"
                value={kendaraanDipinjam} onChange={changeKendaraanDipinjam} name="kendaraanDipinjam" id="kendaraanDipinjam">
                    <option value=""></option>
                    {
                        dataKendaraan.map((item,index)=>(
                            <option value={item.nama_kendaraan} key={index++}>{item.nama_kendaraan}</option>
                        ))
                    }
                </select>
                {
                    foundVechicle ? <p className="text-sm text-green-600">Kendaraan Tersedia!</p> : <p className="text-sm text-red-600">Kendaraan tidak tersedia!</p>
                }
           <div className="flex justify-end">
            <button 
                onClick={resetContaint}
               className="ml-5 p-2 rounded-lg cursor-pointer bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
           >
                Reset Isi
           </button>
            <button 
                onClick={saveContaint}
               className="ml-5  p-2 rounded-lg cursor-pointer bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
           >
               Tambah Data
           </button>

           </div>
        
            </div>
         </div>
    )
}