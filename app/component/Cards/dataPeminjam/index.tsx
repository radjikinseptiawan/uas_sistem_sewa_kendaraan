import { ReactNode } from "react";

export default function DataPeminjam({text,results}:{text:String,results:string | number | any | ReactNode}){
    return(
            <div className="flex gap-1">
                    <div className="ml-5 z-20 mt-5 rounded-md h-32 items-center justify-center transition-all w-72 p-2 flex flex-col text-blue-400 text-center shadow-xl hover:shadow-blue-400 cursor-pointer">
                       <p className="text-xl font-bold">{results}</p> 
                       <h1 className="text-xl font-bold">{text}</h1>
                   </div>
            </div>
    )
}