
import React, { useContext, useEffect, useState } from "react"
import { Steps } from "primereact/steps";
import { useRouter } from "next/router";
import { MyContext } from "@/pages/_app";

interface activeIndex {
    activeIndex: number
}

const NavBar = ({activeIndex} : activeIndex) => {
    const { homePagePath, setHomePagePath } = useContext<any>(MyContext);
    const router = useRouter()

    useEffect(() => {
        if(homePagePath  == undefined) {
            setHomePagePath(router.asPath)
        }
        
    }, [router]) 

    const items = [
        {   
            label: "Checkin",
            command: (event) => {router.push(homePagePath)}
        },
        {   
            label: "Guests",
            command: (event) => {router.push("guestPage")}
        }, 
        {   
            label: "Payment",
            command: (event) => {router.push("paymentPage")}
        }
    ];

    return (
        <div className="flex grid sticky col-12 top-0 navbar">
            <div className="col-3">
                <Steps model={items} activeIndex={activeIndex} readOnly={false}/>
            </div>
        </div>
    )
    
}

export default NavBar

// import React from "react"
// import { useRouter } from "next/router"

// const NavBar = () => {
//     const router = useRouter()
//     const pageNames = {"/" : "Checkin", "/guestPage" : "Guests", "/paymentPage" : "Payment", "/adminPage" : "Admin"}
    
//     return(
//         <div className = "grid sticky align-items-center top-0 navbar md:pl-3 pl-6">
//                 <div className="col-8">{pageNames[router.route as keyof typeof pageNames]}</div>
//         </div>
//     )
    
// }

// export default NavBar