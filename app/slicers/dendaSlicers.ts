import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    nama_peminjam:string,
    jumlah_denda:number,
    total_hari_terlambat:number,
    tanggal_kembali_aktual:string
}

const initialState : InitialState= {
    nama_peminjam:"",
    jumlah_denda:0,
    total_hari_terlambat:0,
    tanggal_kembali_aktual:""
}

export const dendaSlicers = createSlice({
    name:"denda",
    initialState,
    reducers:{
        setNamaPeminjam:(state,action : PayloadAction<string>)=>{
            state.nama_peminjam = action.payload
        },
        setJumlahDenda:(state, action: PayloadAction<number>)=>{
            state.jumlah_denda = action.payload
        },
        setTotalHariTerlambat:(state,action:PayloadAction<number>)=>{
            state.total_hari_terlambat = action.payload
        },
        setTanggalKembaliAktual: (state,action: PayloadAction<string>)=>{
            state.tanggal_kembali_aktual = action.payload
        }
    }
})

export const { setNamaPeminjam, setJumlahDenda, setTotalHariTerlambat, setTanggalKembaliAktual} = dendaSlicers.actions
export default dendaSlicers.reducer