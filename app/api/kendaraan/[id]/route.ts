import { supabase } from "@/app/utils/supabase/db"
import { NextResponse } from "next/server"

export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){
    const {id}= await params
    const uniqueKey = id

    const {data, error} = await supabase.from("master_kendaraan").delete().eq("kendaraan_id",uniqueKey)

    if(error){
        return NextResponse.json({
            messaeg:"Error! Something problem",
            error
        })
    }

    return NextResponse.json({
        uniqueKey,
        data,
        mesasge:"berhasil dihapus!"
    })
}

export async function PUT(req:Request,{params}:{params:Promise<{id:string}>}){
   try{
    const {id} = await params;
    const body = await req.json()
    const uniqueKey = id

    const {data:getData,error:getError} = await supabase.from("master_kendaraan").select().eq("kendaraan_id",uniqueKey)
    
    if(getError){
        return NextResponse.json({
            message:"Data Not Found!"
        })
    }


    const {data:changeData, error:changeError} = await supabase.from("master_kendaraan").update({
        biaya_sewa_per_hari: body.editBiayaSewa,
        nama_kendaraan: body.editNamaKendaraan,
        jenis_kendaraan:body.editJenisKendaraan
    }).eq("kendaraan_id",uniqueKey).select()


    if(changeError){
        return NextResponse.json({
            message:"Failed Change the data!"
        })
    }

    return NextResponse.json({
        oldaData:getData,
        newData:changeData
    })
   }catch(e){
    return NextResponse.json({
        error:e
    })
   }
}