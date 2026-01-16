export default function ManajemenStokBodyTable({
  idKendaraan,
  min,
  sum,
  namaKendaraan,
  jenisKendaraan,
  biayaKendaraan,
  stokKendaraan,
}: {
  min:()=>void,
  sum:()=>void,
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
      
      <td className="p-3 border flex gap-2 border-slate-300 text-center">
        <button onClick={min} className="bg-red-200 hover:bg-red-300 px-4 py-2 w-full max-w-[120px] rounded-md font-bold text-red-900 transition-all hover:cursor-pointer hover:scale-105 active:scale-95">
          -
        </button>
        <button onClick={sum} className="bg-green-200 hover:bg-green-300 px-4 py-2 w-full max-w-[120px] rounded-md font-bold text-green-900 transition-all hover:cursor-pointer hover:scale-105 active:scale-95">
          +
        </button>
      </td>
    </tr>
  );
}