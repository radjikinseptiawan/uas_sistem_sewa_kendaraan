"use server"
import { supabase } from "@/app/utils/supabase/db"
import { NextResponse } from "next/server"

export async function GET(){
    try{
        const {data, error} = await supabase.from("master_customer").select("*")

        if(error){
            return NextResponse.json({
                error
            })
        }

        return NextResponse.json({
            data:data
        })
    }catch(e){
        return NextResponse.json({
            error: e
        })
    }
}