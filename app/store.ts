import {configureStore} from "@reduxjs/toolkit"
import kendaraanReducers  from "./slicers/kendaraanAdd"

export const store = configureStore({
    reducer:{
        kendaraan:kendaraanReducers
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store