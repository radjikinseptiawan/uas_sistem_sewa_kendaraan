export default function TableHeaderPeminjaman(){
    return(
        <thead className="table-auto w-full border-collapse border border-slate-400">
            <tr className="bg-blue-600">
                <th className="p-2">Nomor</th>
                <th>Nama Peminjam</th>
                <th>Tanggal Pinjam</th>
                <th>Tanggal Pengembalian</th>
                <th>Kendaraan Dipinjam</th>
            </tr>
        </thead>
    )
}