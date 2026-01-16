export default function TableBody({
    nomor,
    namaPeminjaman,
    tanggalPeminjaman,
    tanggalPengembalian,
    kendaraanDipinjam}:{
        nomor:number,
        namaPeminjaman:string | any,
        tanggalPeminjaman:string,
        tanggalPengembalian:string,
        kendaraanDipinjam:string
    }
) {
  return (
    <tr className="border-b border-slate-200 hover:bg-blue-50 transition-colors text-slate-700">
      <td className="p-3 border border-slate-300 text-center">{nomor}</td>
      
      <td className="p-3 border border-slate-300 text-left font-medium">{namaPeminjaman}</td>
      
      <td className="p-3 border border-slate-300 text-center">{tanggalPeminjaman}</td>
      
      <td className="p-3 border border-slate-300 text-right">
        {tanggalPengembalian}
      </td>
      
      <td className="p-3 border border-slate-300 text-center">{kendaraanDipinjam}</td>
      
    </tr>
  );
}