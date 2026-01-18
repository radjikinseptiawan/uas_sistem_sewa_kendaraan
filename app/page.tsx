"use client"
import { useEffect } from "react";
import Navigation from "./component/Navigation";

export default function Home() {
  useEffect(()=>{
    window.location.href = "/master_kendaraan"
  },[])
  return (
    <>
    </>
  );
}
