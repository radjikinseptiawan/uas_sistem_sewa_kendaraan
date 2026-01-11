export default function TableBody({
  idKendaraan,
  action,
  namaKendaraan,
  jenisKendaraan,
  biayaKendaraan,
  stokKendaraan,
}: {
  action:()=>void
  idKendaraan: number;
  namaKendaraan: string;
  jenisKendaraan: string;
  biayaKendaraan: number;
  stokKendaraan: number;
}) {
  return (
    <tr className="border-b border-slate-200 hover:bg-blue-50 transition-colors text-slate-700">
      <td className="p-3 border border-slate-300 text-center">{idKendaraan}</td>
      
      <td className="p-3 border border-slate-300 text-left font-medium">{namaKendaraan}</td>
      
      <td className="p-3 border border-slate-300 text-center">{jenisKendaraan}</td>
      
      <td className="p-3 border border-slate-300 text-right">
        Rp {biayaKendaraan.toLocaleString("id-ID")}
      </td>
      
      <td className="p-3 border border-slate-300 text-center">{stokKendaraan}</td>
      
      <td className="p-3 border border-slate-300 text-center">
        <button onClick={action} className="bg-blue-200 hover:bg-blue-300 px-4 py-2 w-full max-w-[120px] rounded-md font-bold text-blue-900 transition-all hover:cursor-pointer hover:scale-105 active:scale-95">
          Aksi
        </button>
      </td>
    </tr>
  );
}