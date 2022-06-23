import { Outlet } from "@remix-run/react";
import serenuplogo from "public/assets/seren-up-logo.png"


export default function Layout () {
    return (
        <>
            <img src={serenuplogo}/>
            <Outlet/> 
        </>
    )
}