export default function BodyTable({customer_id,action,nama_customer,nomor_induk_kartu_identitas}:{action:()=>void,customer_id:string,nama_customer:string,nomor_induk_kartu_identitas:string}){
    return(
        <>
        <tr className="border-b border-slate-200 hover:bg-blue-50 transition-colors text-slate-700">
            <td  className="p-3 border border-slate-300 text-center">{customer_id}</td>
            <td  className="p-3 border border-slate-300 text-center">{nama_customer}</td>
            <td  className="p-3 border border-slate-300 text-center">{nomor_induk_kartu_identitas}</td>
            <td className="p-3 border border-slate-300 text-center">
                <button onClick={action} className="bg-blue-200 hover:bg-blue-300 px-4 py-2 w-full max-w-[120px] rounded-md font-bold text-blue-900 transition-all hover:cursor-pointer hover:scale-105 active:scale-95">
                      Aksi
                </button>
            </td>
        </tr>
        </>
    )   
}