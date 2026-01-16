import { supabase } from "@/app/utils/supabase/db"
import { NextResponse } from "next/server"

export async function GET(){
    
    try{
        const {data, error} = await supabase.from("pinjam_kendaraan").select(`*,master_customer(nama_customer),master_kendaraan(nama_kendaraan)`)

    if(error){
        return NextResponse.json({
            error
        })
    }

    return NextResponse.json({
        data
    })
    }catch(e){
        return NextResponse.json({
            error:e
        })
    }
}

export async function POST(req:Request){
    const body = await req.json()
    const { data,error } = await supabase.from("pinjam_kendaraan").insert({
                tanggal_peminjaman:body?.tanggal_peminjaman,
                tanggal_pengembalian:body?.tanggal_pengembalian,
                nama_kendaraan:body?.nama_kendaraan,
                kendaraan_id:body?.kendaraan_id,
                customer_id: body?.customer_id
    })

    if(error){
        return NextResponse.json({
            error
        })
    }

    return NextResponse.json({
        body,
        data
    })
}