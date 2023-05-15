import React from "react"
import { iContainerData, paymentData } from "@/interfaces/interfaces-fe"
import Container from "./Container"

const CheckInOverview = (data : paymentData) =>{

    const dataObject: iContainerData[] = [
        {text:"Main guest", value: data.mainGuest},
        {text:"Nights", value: data.nights},
        {text:"Guests", value: data.guests},
    ]
    return (
            <div className = "flex justify-content-center md:mt-8 md:mb-8">
                <div className="flex flex-wrap col-10 justify-content-center">
                    <Container title="Check-in overveiw" data={dataObject} email={data.mainGuestEmail}/>
                </div>
            </div>                              
    )
}

export default CheckInOverview