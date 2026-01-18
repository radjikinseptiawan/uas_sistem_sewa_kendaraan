"use client"
import { useEffect, useState } from "react"
import TransakseBodyTableLoader from "../component/Table/Transaksi_Table/body";

type DataDendaDetail = {
  denda_id: string;
  peminjaman_id: string;
  total_denda: number;
  total_hari_terlambat: number;
  nominal_denda_per_hari: number;
  tanggal_kembali_aktual: string;
  pinjam_kendaraan: {
    master_customer: {
      nama_customer: string;
    };
    master_kendaraan: {
      nama_kendaraan: string;
      biaya_sewa_per_hari: number;
    };
  };
};

type DataPeminjamExisting = {
  pinjam_id: string;
  customer_id: string;
  kendaraan_id: string;
  nama_kendaraan: string;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string;
  master_customer?: {
    nama_customer: string;
  };
  master_kendaraan?: {
    biaya_sewa_per_hari: number;
  };
};

interface DataRiwayatType extends DataPeminjamExisting {
  denda_terkait: DataDendaDetail | null;
  nominal_denda: number;
}

export default function Page() {
    const [dataSet, setData] = useState<DataRiwayatType[]>([]) 
    const [loading, setLoading] = useState(true)

    const dataFetch = async () => {
        try {
            const response = await fetch("api/riwayat", { method: "GET" })
            const result = await response.json()
            const dendaList = result.data || []
            const peminjamList = result.dataExisting || []
            const mergedData = peminjamList.map((peminjam : any) => {
                const dendaDitemukan = dendaList.find(
                    (d :any) => d.peminjaman_id === peminjam.pinjam_id
                )
                return {
                    ...peminjam,
                    denda_terkait: dendaDitemukan || null,
                    nominal_denda: dendaDitemukan ? dendaDitemukan.total_denda : 0
                }
            })
            setData(mergedData)
            setLoading(false)
        } catch (e) {
            console.error("Gagal mengambil data:", e)
            setLoading(false)
        }
    }
    console.log(dataSet)

    useEffect(() => {
        dataFetch()
    }, [])

    return (
        <>
            <div className="ml-75 mr-5 mt-20">
                <table className="table-auto w-full border-collapse border border-slate-400 shadow-sm">
                    <thead>
                        <tr className="bg-blue-600 p-5 text-center text-white font-bold">
                            <td className="p-3 border border-slate-400">No</td>
                            <td className="p-3 border border-slate-400">Nama Peminjam</td>
                            <td className="p-3 border border-slate-400">Nomor KTP</td>
                            <td className="p-3 border border-slate-400">Kendaraan Dipinjam</td>
                            <td className="p-3 border border-slate-400">Lama Peminjaman</td>
                            <td className="p-3 border border-slate-400">Total Bayar</td>
                            <td className="p-3 border border-slate-400">Denda</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({length:10}).map((_,index)=>(
                            <TransakseBodyTableLoader key={index++}/>
                            ))
                        ) : (
                            dataSet.map((item, index) => {
                                const tglPinjam = new Date(item.tanggal_peminjaman)
                                const tglKembali = new Date(item.tanggal_pengembalian)
                                const selisihMs = Math.abs(tglKembali.getTime() - tglPinjam.getTime())
                                let totalHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24)) || 1
                                const biayaPerHari = item.denda_terkait?.pinjam_kendaraan?.master_kendaraan?.biaya_sewa_per_hari || item.master_kendaraan?.biaya_sewa_per_hari || 0
                                const totalSewa = biayaPerHari * totalHari

                                return (
                                    <tr key={item.pinjam_id} className="text-center text-black hover:bg-slate-50">
                                        <td className="p-3 border border-slate-300">{index + 1}</td>
                                        <td className="p-3 border border-slate-300">
                                            {item.denda_terkait?.pinjam_kendaraan?.master_customer?.nama_customer || item.master_customer?.nama_customer}
                                        </td>
                                        <td className="p-3 border border-slate-300">
                                            {item.customer_id.substring(0, 8)}... {/* Dummy KTP dari ID */}
                                        </td>
                                        <td className="p-3 border border-slate-300">{item.nama_kendaraan}</td>
                                        <td className="p-3 border border-slate-300">{totalHari} Hari</td>
                                        <td className="p-3 border border-slate-300 text-right">
                                            Rp {totalSewa.toLocaleString("id-ID")}
                                        </td>
                                        <td className={`p-3 border border-slate-300 text-right font-bold ${item.nominal_denda > 0 ? "text-red-500" : "text-green-600"}`}>
                                            Rp {item.nominal_denda.toLocaleString("id-ID")}
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}