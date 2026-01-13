export default function PopUp({openForm,action,
    namaKendaraan,
    jenisKendaraan,
    idKendaraan,
    biayaSewa,
    stokKendaraa,
    dibuatPada,
    editAction,
    deleteAction,
}:{
    deleteAction:()=>void,
    action:()=>void,
    editAction:()=>void,
    namaKendaraan:string,
    jenisKendaraan:string,
    idKendaraan:string,
    biayaSewa:number,
    stokKendaraa:number,
    dibuatPada:string,
    openForm:boolean}){
    return(
        <>
        <div 
        onClick={action}
        className={`fixed inset-0 ${openForm ? "z-50":"z-30"} flex items-center justify-center bg-black/50 backdrop-blur-sm`}>
                <div 
                  className="bg-white p-6 rounded-xl shadow-2xl w-96 flex flex-col gap-4"
                  onClick={(e)=>e.stopPropagation()}
                >
                    <h1 className="font-bold text-xl text-blue-800 text-center">Detail Kendaraan</h1>

                    <p className="text-slate-500 text-sm font-medium">Nama Kendaraan: {namaKendaraan}</p>
                    <p className="text-slate-500 text-sm font-medium">Jenis Kendaraan: {jenisKendaraan} </p>
                    <p className="text-slate-500 text-sm font-medium">ID Kendaraan: {idKendaraan}</p>
                    <p className="text-slate-500 text-sm font-medium">Biaya Sewa Kendaraan: Rp. {biayaSewa.toLocaleString("id-ID")}</p>
                    <p className="text-slate-500 text-sm font-medium">Stok Kendaraan: {stokKendaraa}</p>
                    <p className="text-slate-500 text-sm font-medium">Dibuat pada: {dibuatPada}</p>
                    <div className="flex gap-2 justify-center">
                        <button onClick={editAction} className="px-6 py-2 rounded-lg cursor-pointer bg-yellow-600 text-white font-semibold hover:bg-yellow-700 shadow-lg shadow-blue-200 transition-all" >Edit</button>
                        <button onClick={action} className="px-6 py-2 rounded-lg cursor-pointer bg-slate-600 text-white font-semibold hover:bg-slate-700 shadow-lg shadow-blue-200 transition-all">Tutup</button>
                        <button onClick={deleteAction} className="px-6 py-2 rounded-lg cursor-pointer bg-red-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">Hapus</button>
                    </div>

                </div>
        </div>
        </>
    )
}