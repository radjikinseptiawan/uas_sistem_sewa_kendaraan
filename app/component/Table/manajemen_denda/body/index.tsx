export default function TableBodyDenda({nama_peminjam,tanggal_tercatat,nomor,total_hari_terlambat,total_denda,kendaraan_dipinjam}:{
    nama_peminjam:string
    nomor:number
    tanggal_tercatat: string | Date;
    total_hari_terlambat:number
    total_denda:string,
    kendaraan_dipinjam:string
}){

    const changeDateFormat = (date:any|Date)=>{
        const dateObj = typeof date === "string" ? new Date(date): date

        return Intl.DateTimeFormat("id-ID",{
            day:"2-digit",
            month:"long",
            year:"numeric"
        }).format(dateObj)
    }

    return(
        <tr className="border-b border-slate-200 hover:bg-blue-50 transition-colors text-slate-700">
            <td  className="p-3 border border-slate-300 text-center">{nomor}</td>
            <td  className="p-3 border border-slate-300 text-center">{nama_peminjam}</td>
            <td  className="p-3 border border-slate-300 text-center">{kendaraan_dipinjam}</td>
            <td  className="p-3 border border-slate-300 text-center">{changeDateFormat(tanggal_tercatat)}</td>
            <td  className="p-3 border border-slate-300 text-center">{total_hari_terlambat}</td>
            <td className="p-3 border border-slate-300 text-center">Rp. {total_denda}</td>
        </tr>
         )
}