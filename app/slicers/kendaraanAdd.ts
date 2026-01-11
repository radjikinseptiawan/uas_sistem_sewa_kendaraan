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

export const tambahKendaraan = createSlice({
    name:"kendaraan",
    initialState,
    reducers:{
        setNamaKendaraan:(state,action:PayloadAction<string>)=>{
            state.namaKendaraan = action.payload
        },
        setBiayaSewa:(state,action:PayloadAction<number>)=>{
            state.biayaSewa = action.payload
        },
        setJenisKendaraan:(state,action:PayloadAction<string>)=>{
            state.jenisKendaraan = action.payload
        },
        setStok:(state,action:PayloadAction<number>)=>{
            state.stok = action.payload
        }
    }
})

export const { setNamaKendaraan,setBiayaSewa,setJenisKendaraan,setStok } = tambahKendaraan.actions
export const selectKendaraan = (state : any) => state.tambahKendaraan
export default tambahKendaraan.reducer