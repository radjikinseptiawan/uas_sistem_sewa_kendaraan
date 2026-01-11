"use client"
import { Provider } from "react-redux";
import Navigation from "./component/Navigation";
import { ReactNode } from "react";
import { store } from "./store";

export default function ClientProvider({children}:{children:ReactNode}){
    return(
        <>
        <Provider store={store}>
            <Navigation/>    
            {children}
        </Provider>
        </>
    )
}