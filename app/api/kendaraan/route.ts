"use server"
import { supabase } from "@/app/utils/supabase/db";
import { NextResponse } from "next/server";

export async function GET(){
    const {data,error} = await supabase.from("master_kendaraan").select("*")

    if(error){
        return NextResponse.json({
            error:error.message
        })
    }

    return NextResponse.json({
        data
    })
}


export async function POST(req: Request){
        const body = await req.json()

        const {data,error} = await supabase.from("master_kendaraan").insert({
            nama_kendaraan:body.namaKendaraan,
            jenis_kendaraan:body.jenisKendaraan,
            stok_kendaraan:body.stok,
            biaya_sewa_per_hari:body.biayaSewa
        })

        if(error){
            return NextResponse.json({
                error: error.message
            })
        }

        return NextResponse.json({
            data
        })
}