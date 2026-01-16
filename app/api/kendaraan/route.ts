"use server"
import { supabase } from "@/app/utils/supabase/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    const body = await req.json()

    try {
        const updates = body.map((item: any) =>
            supabase
                .from("master_kendaraan")
                .update({
                    stok_kendaraan: item.stok_kendaraan
                })
                .eq("kendaraan_id", item.kendaraan_id)
        )

        const results = await Promise.all(updates)

        const error = results.find(r => r.error)
        if (error) {
            return NextResponse.json(
                { message: "Failed to update data" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Success update data" },
            { status: 200 }
        )
    } catch (err) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        )
    }
}


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

