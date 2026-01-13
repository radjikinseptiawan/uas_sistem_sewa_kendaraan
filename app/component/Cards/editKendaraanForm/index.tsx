import { ChangeEvent } from "react"

export default function EditKendaraanForm({
    namaKendaraan,
    etChangeNamaKendaraan,
    openForm,
    etBatal,
    biayaSewa,
    etBiayaSewa,
    etSelectJenis,
    etSimpan,
    jenisKendaraan
}:{
    jenisKendaraan:string,
    biayaSewa:number,
    etSimpan:()=>void,
    etBiayaSewa:(e: ChangeEvent<HTMLInputElement>)=>void,
    etBatal:()=>void,
    etSelectJenis:(e:ChangeEvent<HTMLSelectElement>)=>void,
    openForm:boolean,
    namaKendaraan:string
    etChangeNamaKendaraan:(e : ChangeEvent<HTMLInputElement>)=>void
}){
    return(
           <div 
                    className={`fixed inset-0 ${openForm ? "z-50":"z-30"} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
                    onClick={etBatal}
                >
                    <div 
                        className="bg-white p-6 rounded-xl shadow-2xl w-96 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h1 className="text-xl font-bold text-slate-800 text-center">Tambah Kendaraan</h1>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="mobil" className="text-slate-500">Nama Kendaraan</label>
                            <input 
                            type="text" id="mobil" 
                            placeholder="Nama Mobil" 
                            value={namaKendaraan} 
                            onChange={etChangeNamaKendaraan} 
                            className="border p-2 rounded text-black" />
                           
                            <label htmlFor="biaya" className="text-slate-500" >Biaya Sewa/Hari</label>
                            <input type="number" value={biayaSewa} onChange={etBiayaSewa} 
                            id="biaya" 
                            placeholder="Harga Sewa" 
                            className="border p-2 rounded text-black" />
                            <label htmlFor="jenis" className="text-slate-500">Jenis Kendaraan</label>
                            <select name="" onChange={etSelectJenis} value={jenisKendaraan} id="jenis"  className="border p-2 rounded text-black">
                                <option value="">Pilih Jenis Kendaraan</option>
                                <option value="truk">Truk</option>
                                <option value="mobil">Mobil</option>
                                <option value="motor">Motor</option>
                                <option value="bus">Bus</option>
                                <option value="minibus">Minibus</option>
                            </select>
                            <label htmlFor="stok" className="text-slate-500">Stok</label>
                            <input id="stok" type="number" placeholder="Stok" value={0} disabled className="border p-2 rounded text-black bg-gray-400"/>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button 
                                className="px-4 py-2 text-slate-500 hover:text-slate-800 font-semibold" 
                                onClick={etBatal}
                            >
                                Batalkan
                            </button>
                            <button onClick={etSimpan} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
                                Tambahkan
                            </button>
                        </div>
                    </div>
                </div>
            
    )
}