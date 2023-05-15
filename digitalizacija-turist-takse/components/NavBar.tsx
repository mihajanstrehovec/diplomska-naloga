
import React, { useContext, useEffect, useState } from "react"
import { Steps } from "primereact/steps";


interface activeIndex {
    activeIndex: number
}

const NavBar = ({activeIndex} : activeIndex) => {

    const items = [
        {   
            label: "Checkin"
        },
        {   
            label: "Guests"
        }, 
        {   
            label: "Payment"
        }
    ];

    return (
        <div className="flex grid sticky col-12 top-0 navbar">
            <div className="col-3">
                <Steps model={items} activeIndex={activeIndex}/>
            </div>
        </div>
    )
    
}

export default NavBar

