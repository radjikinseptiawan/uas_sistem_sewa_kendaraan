export default function Page(){
    return(
        <>
           <div className="ml-80 mt-20">
          
            <button 
               className="ml-5 mt-10 p-2 rounded-lg cursor-pointer bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
           >
                Reset Isi
           </button>
            <button 
               className="ml-5 mt-10 p-2 rounded-lg cursor-pointer bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
           >
               Tambah Data
           </button>
        </div>
        </>
    )
}