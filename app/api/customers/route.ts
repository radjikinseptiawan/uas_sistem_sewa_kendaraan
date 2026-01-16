"use server"
import { decrypted, encrypted } from "@/app/utils/crypto/crypto"
import { supabase } from "@/app/utils/supabase/db"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const {data, error} = await supabase.from("master_customer").select("*")

      const dataCostumers = data?.map((item) => {
            try {
                return {
                    ...item,
                    nomor_induk_kartu_identitas: item.nomor_induk_kartu_identitas 
                        ? decrypted(item.nomor_induk_kartu_identitas) 
                        : null
                }
            } catch (decError) {
                return { ...item }
            }
        })

        if(error){
            return NextResponse.json({
                error
            })
        }

        return NextResponse.json({
            data:dataCostumers
        })
    }catch(e){
        return NextResponse.json({
            error: e
        })
    }
}

export async function POST(req:Request){
    const body = await req.json()

    const {data, error} = await supabase.from("master_customer").insert({
        nama_customer:body.customerName,
        nomor_induk_kartu_identitas:encrypted(body.numberNik)
    })

    if(error){
        return NextResponse.json({
            message:"Failed to added data",
            error
        })
    }

    return NextResponse.json({
        message:"Success to add data",
        data
    })
}