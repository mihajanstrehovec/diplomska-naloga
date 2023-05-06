import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { iContainerData } from "@/interfaces/interfaces-fe"
import { MyContext } from "@/pages/_app"
import Container from "./Container"
import ModalWindow from "./ModalWindow"
import ContinueButton from "./ContinueButton"

const CheckIn = () => {
    const router = useRouter()
   
    const [checkInValuesObject, setCheckInValuesObject] = useState<iContainerData[]>([])
    const [visible, setVisible] = useState<boolean>(false) 

    // Context where form data is saved in. This way it is accesible on all pages, and is stored if user goes back.
    const { formData, updateFormData } = useContext<any>(MyContext)

    useEffect(() => {
        
        const {
            mainGuestName,
            numberOfGuests,
            checkInDate,
            checkOutDate
        } = router.query
        console.log(sessionStorage.getItem("formData"))

        if(mainGuestName){
            setCheckInValuesObject([
                {text:"Main guest name", value: mainGuestName as string},
                {text:"Number of guests", value: numberOfGuests as string},
                {text:"Check in date", value: new Date(checkInDate as string).toDateString()},
                {text:"Check out date", value:  new Date(checkOutDate as string).toDateString()}
            ])
            updateFormData({
                mainGuestName: mainGuestName as string,
                numberOfGuests: parseInt(numberOfGuests as string),
                checkInDate: new Date(checkInDate as string),
                checkOutDate: new Date(checkOutDate as string)
            })
        } 
    }, [router])

    return (
        
        <div className = "flex flex-wrap align-items-center justify-content-center container-checkin">
            <Container title="Check in" data={checkInValuesObject} size={"md:col-4"}/>
            <ContinueButton text="Proceed to guest info page" onClick={() => setVisible(true)}/>
            <ModalWindow visible={visible} setVisible={() => setVisible(false)}/>
        </div>
    )
}

export default CheckIn