import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
    namaPeminjam:string,
    tanggalPinjam:string,
    tanggalPengembalian:string,
    kendaraanDipinjam: string
}

const initialState : InitialState= {
    namaPeminjam:"",
    tanggalPinjam:"",
    tanggalPengembalian:"",
    kendaraanDipinjam:""
}

export const penyewaanPengembalian = createSlice({
    name:"peminjamanPengembalian",
    initialState,
    reducers:{
        setNamaPeminjam:(state,action:PayloadAction<string>)=>{
            state.namaPeminjam = action.payload
        },
        setTanggalPinjam:(state,action:PayloadAction<string>)=>{
            state.tanggalPinjam = action.payload
        },
        setTanggalPengembalian:(state,action:PayloadAction<string>)=>{
            state.tanggalPengembalian = action.payload
        },
        setKendaraanDipinjam:(state,action:PayloadAction<string>)=>{
            state.kendaraanDipinjam = action.payload
        }
    }
})

export const {setNamaPeminjam, setTanggalPinjam, setTanggalPengembalian, setKendaraanDipinjam} = penyewaanPengembalian.actions
export const usePenyewaan = (state:any) => state.penyewaanPengembalian
export default penyewaanPengembalian.reducer