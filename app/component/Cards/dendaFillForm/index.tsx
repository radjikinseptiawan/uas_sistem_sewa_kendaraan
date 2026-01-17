import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setJumlahDenda, setNamaPeminjam, setTanggalKembaliAktual, setTotalHariTerlambat } from "@/app/slicers/dendaSlicers"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

type CustomerNameType = {
    nama_customer:string
}

export default function DendaFillForm({
  close,
  simpan,
  namaPeminjam,
  jumlahDenda,
  tanggalTercatat,
  totalHariTerlambat,
  namaChanger,
  dendaChanger,
  tanggalChanger,
  hariTerlambatChanger
}:{
  simpan:()=>void,
  close:()=>void,
  namaPeminjam:string,
  jumlahDenda:number,
  tanggalTercatat:string,
  totalHariTerlambat:number
  namaChanger:(e : ChangeEvent<HTMLSelectElement>)=>void,
  dendaChanger:(e : ChangeEvent<HTMLInputElement>)=>void,
  tanggalChanger:(e : ChangeEvent<HTMLInputElement>)=>void,
  hariTerlambatChanger:(e : ChangeEvent<HTMLInputElement>)=>void
}){
    const [namaCustomer,setNamaCustomer] = useState<CustomerNameType[]>([])
    
    const customerList = async()=>{
        const resposne = await fetch("/api/customers",{
            method:"GET"
        })
        const data = await resposne.json()
        setNamaCustomer(data.data)
    }

    useEffect(()=>{
        customerList()
    },[])

    return(
            <div className="fixed inset-0 flex justify-center items-center  p-4">
        <div onClick={close} className="fixed inset-0 bg-black/50 backdrop-blur-sm  z-60 transition-opacity" />
      <div  onClick={(e)=>e.stopPropagation()}  className="w-full max-w-xl bg-white rounded-xl shadow-2xl z-70 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-800">Buat Denda Baru</h1>
          <button 
            onClick={close}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Peminjam</label>
            <select 
            value={namaPeminjam}
            onChange={namaChanger}
              className="w-full text-black p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
                <option value="">....</option>
                {namaCustomer.map((item,index)=>{
                    return(
                        <option key={index++} value={item.nama_customer}>{item.nama_customer}</option>
                    )
                })}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Nominal Denda (Rp)</label>
              <input 
                value={jumlahDenda}
                onChange={dendaChanger}
                type="number" 
                placeholder="Contoh: 5000"
                className="w-full p-2 border border-slate-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
               <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Tanggal Kembali Aktual</label>
             <input 
                value={tanggalTercatat}
                onChange={tanggalChanger}
                type="date" 
                placeholder="Contoh: 5000"
                className="w-full p-2 border border-slate-300 text-black rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Total Hari Terlambat</label>
             <input 
                value={totalHariTerlambat}
                onChange={hariTerlambatChanger}
                type="number" 
                placeholder="Contoh: 5"
                className="w-full text-black p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={close}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={simpan}
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition-all"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </div>

    )
}