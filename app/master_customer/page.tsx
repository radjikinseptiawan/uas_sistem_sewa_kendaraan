import { Suspense } from "react";
import CustomerContent from "./CustomerContent";

export default function Page(){
    return(
        <Suspense>
            <CustomerContent/>
        </Suspense>
    )
}