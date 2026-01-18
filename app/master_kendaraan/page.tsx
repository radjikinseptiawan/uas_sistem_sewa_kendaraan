import { Suspense } from "react";
import KendaraanContent from "./KendaraanContent";

export default function Page(){
    return(
        <Suspense>
            <KendaraanContent/>
        </Suspense>
    )
}