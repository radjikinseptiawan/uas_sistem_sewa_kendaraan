import { ReactNode } from "react"

export default function HeaderTable({children}:{children:ReactNode}){
    return(
            <div className="overflow-x-auto ml-80 mt-5 p-4"> 
            <table className="table-auto w-full border-collapse border border-slate-400">
                <thead className="bg-blue-800 text-white">
                    <tr>
                        <th className="border border-slate-300 p-2">ID Customner</th>
                        <th className="border border-slate-300 p-2">Nama Customer</th>
                        <th className="border border-slate-300 p-2">Nomor Kartu Identitas Customer</th>
                        <th className="border border-slate-300 p-2">Aksi</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {children}
                </tbody>
            </table>
        </div>
    )
}