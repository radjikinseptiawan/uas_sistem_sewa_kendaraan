"use client"
import { ReactNode } from "react";

export default function HeaderVechicleTable({children}:{children:ReactNode}){
    return(
        <>
          <div className="overflow-x-auto ml-80 mt-5 p-4"> 
            <table className="table-auto w-full border-collapse border border-slate-400">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="border border-slate-300 p-2">ID Kendaraan</th>
                        <th className="border border-slate-300 p-2">Nama Kendaraan</th>
                        <th className="border border-slate-300 p-2">Jenis Kendaraan</th>
                        <th className="border border-slate-300 p-2">Biaya Sewa / Hari</th>
                        <th className="border border-slate-300 p-2">Stok</th>
                        <th className="border border-slate-300 p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {children}
                </tbody>
            </table>
        </div>
        </>
    )
}