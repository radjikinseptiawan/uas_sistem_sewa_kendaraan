import { supabase } from "@/app/utils/supabase/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const {data, error} = await supabase.from("denda").select(`*,pinjam_kendaraan(
                master_customer(nama_customer),master_kendaraan(nama_kendaraan)
            )`)

        return NextResponse.json({
            data
        })
    }catch(e){
        return NextResponse.json({
            message:"error",
            error:e
        })
    }
}

export async function POST(req:Request){
    const body = await req.json()

    const {data, error} = await supabase.from("denda").insert({
        peminjaman_id:body.pinjam_id,
        tanggal_kembali_aktual : body.tanggalTercatat,
        total_hari_terlambat: body.totalHariTerlambat,
        total_denda: body.jumlahDenda,
    })

    if(error){
        return NextResponse.json({
            error
        })
    }

    return NextResponse.json({
        data
    })
}