import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    nameEdit:string;
    nikEdit:string;
}

const initialState : InitialState= {
    nameEdit:"",
    nikEdit:""
}

export const customersSlicersEdit = createSlice({
    name:"customersEdit",
    initialState,
    reducers:{
        setEditName:(state,action:PayloadAction<string>)=>{
            state.nameEdit = action.payload
        },
        setEditNik:(state,action:PayloadAction<string>)=>{
            state.nikEdit = action.payload
        }
    }
})

export const { setEditName, setEditNik } = customersSlicersEdit.actions
export const selectCustomer = (state: any)=>state.customersSlicers
export default customersSlicersEdit.reducer