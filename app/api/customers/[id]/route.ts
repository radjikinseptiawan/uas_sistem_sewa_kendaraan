import { supabase } from "@/app/utils/supabase/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request,{params} : {params:{id:string}}){
    const {id} = await params;
    const uniqueKey = id

    const {data, error} = await supabase.from("master_customer").delete().eq("customer_id",uniqueKey)

    if(error){
        return NextResponse.json({
            message:"Error data not found!"
        })
    }

    return NextResponse.json({
        data
    })
}

export async function PUT(req:Request,{params}:{params:{id:string}}){
   try{
    const {id} = await params;
    const body = await req.json()
    const uniqueKey = id
    console.log(body)
    const {data:getData, error:getError} = await supabase.from("master_customer").select("*").eq("customer_id",uniqueKey).single()

    if(getError){
        return NextResponse.json({
            message:"Error to getting data",
            error:getError
        })
    }
    const {data:newData,error:newError} = await supabase.from("master_customer").update({
        nama_customer:body.customer_name,
        nomor_induk_kartu_identitas: body.nomor_induk_kartu_identitas
    }).eq("customer_id",uniqueKey).select()
    console.log(newData)
    if(newError){
        return NextResponse.json({
            message:"Error to edit data",
            error: newError
        })
    }

    return NextResponse.json({
        message:"Success to add data",
        oldData:getData,
        newData:newData
    })}catch(e){
        return NextResponse.json({
            error: e
        })
    }
}