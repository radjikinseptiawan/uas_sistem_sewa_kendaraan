import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RootState {
  tambahKendaraan: InitialState;
}

type InitialState = {
    namaKendaraan:string,
    biayaSewa:number,
    jenisKendaraan:string,
    stok:number
}

const initialState :InitialState = {
    namaKendaraan:"",
    biayaSewa:0,
    jenisKendaraan:'',
    stok:0
}

export const kendaraanEdit = createSlice({
    name:"edit_kendaraan",
    initialState,
    reducers:{
        setEditNamaKendaraan:(state,action:PayloadAction<string>)=>{
            state.namaKendaraan = action.payload
        },
        setEditBiayaSewa:(state,action:PayloadAction<number>)=>{
            state.biayaSewa = action.payload
        },
        setEditJenisKendaraan:(state,action:PayloadAction<string>)=>{
            state.jenisKendaraan = action.payload
        },
        setEditStok:(state,action:PayloadAction<number>)=>{
            state.stok = action.payload
        }
    }
})

export const { setEditNamaKendaraan,setEditBiayaSewa,setEditJenisKendaraan,setEditStok } = kendaraanEdit.actions
export const selectKendaraan = (state : any) => state.tambahKendaraan
export default kendaraanEdit.reducer