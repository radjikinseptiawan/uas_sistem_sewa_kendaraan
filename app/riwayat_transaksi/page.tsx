export default function Page(){
    return(
        <>
        <div className="ml-75 mr-5 mt-20">
            <table className="table-auto w-full border-collapse border border-slate-400">
                <thead>
                    <tr className="bg-blue-600 p-5 text-center ">
                        <td>
                            No
                        </td>
                        <td>
                            Nama Peminjam
                        </td>
                        <td>
                            Nomor KTP Peminjam
                        </td>
                        <td>Kendaraan Dipinjam</td>
                        <td>Lama Peminjaman</td>
                        <td>Total Bayar</td>
                        <td>Denda</td>
                    </tr>
                </thead>
            </table>
        </div>
        </>
    )
}