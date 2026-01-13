import {configureStore} from "@reduxjs/toolkit"
import kendaraanReducers  from "./slicers/kendaraanAdd"
import customerReducers from './slicers/customersSlicers'
import editKendaraanReducers from "./slicers/kendaraanEdit"
import editCustomerReducers from "./slicers/customersSlicersEdit"
export const store = configureStore({
    reducer:{
        kendaraan:kendaraanReducers,
        customers:customerReducers,
        editKendaraan:editKendaraanReducers,
        editCustomer:editCustomerReducers
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store