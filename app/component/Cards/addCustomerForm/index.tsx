import { ChangeEvent } from "react"

export default function AddCustomerForm({
    namaCustomer,
    etChangeNamaCustomer,
    openForm,
    etBatal,
    nik,
    etNomorInduk,
    etSimpan,
}:{
    nik:string,
    etSimpan:()=>void,
    etNomorInduk:(e: ChangeEvent<HTMLInputElement>)=>void,
    etBatal:()=>void,
    openForm:boolean,
    namaCustomer:string
    etChangeNamaCustomer:(e : ChangeEvent<HTMLInputElement>)=>void
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
                        <h1 className="text-xl font-bold text-slate-800 text-center">Tambah Customer</h1>
                        
                        <div className="flex flex-col gap-2">
                            <label htmlFor="mobil" className="text-slate-500">Nama Customers</label>
                            <input 
                            type="text" id="mobil" 
                            placeholder="Nama Customers" 
                            value={namaCustomer} 
                            onChange={etChangeNamaCustomer} 
                            className="border p-2 rounded text-black" />
                           
                            <label htmlFor="biaya" className="text-slate-500" >Nomor Induk Kenegaraan</label>
                            <input type="number" value={nik} onChange={etNomorInduk} 
                            id="biaya" 
                            placeholder="Nomor Induk Kenegaraan" 
                            className="border p-2 rounded text-black" />
                            
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
                </div>
    )
}