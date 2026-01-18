import { supabase } from "@/app/utils/supabase/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
   const {data, error} = await supabase.from("denda").
   select(`*,
    pinjam_kendaraan(
        master_customer(
            nama_customer
        ),
        master_kendaraan(
            biaya_sewa_per_hari,
            nama_kendaraan
       )
            )`)


    const {data:dataExisting, error:errorExisting} = await supabase.from("pinjam_kendaraan").select(`*,master_customer(nama_customer),master_kendaraan(nama_kendaraan,biaya_sewa_per_hari)`)
   
    if(error){
        return NextResponse.json({
            error
        })
    }

    if(errorExisting){
        return NextResponse.json({
            error:errorExisting
        })
    }

    return NextResponse.json({
        data,
        dataExisting
    })
    }catch(e){
        return NextResponse.json({
            error:e
        })
    }
 }