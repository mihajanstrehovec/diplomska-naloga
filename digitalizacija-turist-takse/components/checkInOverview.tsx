import React, { useEffect, useState } from 'react'
import CheckInInfo from './CheckInInfo'
import { iContainerData, paymentData } from '@/interfaces/interfaces-fe'
import Container from './Container'

const CheckInOverview = (data : paymentData) =>{

    const [dataObject, setDataObject] = useState<iContainerData[]>([
        {text:"Main guest", value: "sadasda"},
        {text:"Nights", value: "sadasda"},
        {text:"Guests", value: "sadasda"},
    ])

    useEffect(() => {
        setDataObject(
            [
                {text:"Main guest", value: data.mainGuest},
                {text:"Nights", value: data.nights},
                {text:"Guests", value: data.guests},
            ]
        )
    }, [data])

    return (
        <>
            <div className = "flex justify-content-center md:mt-8 md:mb-8">
                <div className='flex flex-wrap col-10 justify-content-center container-style '>
                    <Container title="Check-in overveiw" data={dataObject} email={data.mainGuestEmail}/>
                </div>
            </div>
                                            
        </>
    )
}

export default CheckInOverview