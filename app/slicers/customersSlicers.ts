import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    name:string;
    nik:string;
}

const initialState : InitialState= {
    name:"",
    nik:""
}

export const customersSlicers = createSlice({
    name:"customers",
    initialState,
    reducers:{
        setName:(state,action:PayloadAction<string>)=>{
            state.name = action.payload
        },
        setNik:(state,action:PayloadAction<string>)=>{
            state.nik = action.payload
        }
    }
})

export const { setName, setNik } = customersSlicers.actions
export const selectCustomer = (state: any)=>state.customersSlicers
export default customersSlicers.reducer