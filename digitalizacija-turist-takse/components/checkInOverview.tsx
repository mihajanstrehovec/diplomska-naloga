import React from 'react'
import CheckInInfo from './CheckInInfo'
import { paymentData } from '@/interfaces/interfaces-fe'
//@ts-ignore
const CheckInOverview = (data : paymentData) =>{

    return (
        <>
            <div className = "card flex flex-wrap align-items-center justify-content-center p-0 container">
                <div className='flex flex-wrap card-container col-9 justify-content-center checkIn  pb-5'>
                    <div className='flex col-12 cardTitle '>
                        Check-in overveiw
                    </div>
                    <div className='col-10 margin-0 p-0'>
                        <CheckInInfo info={data.mainGuest + " "} infoTxt="Main guest" email={data.mainGuestEmail + ""}/>
                    </div>
                    <div className='col-10 margin-0 p-0'>
                        <CheckInInfo info={data.nights + ""} infoTxt="Nights"/>
                    </div>
                    <div className='col-10 margin-0 p-0'>
                        <CheckInInfo info={data.guests + ""} infoTxt="Guests"/>
                    </div>
                </div>
            </div>
                                            
        </>
    )
}

export default CheckInOverview