import React from 'react'
import CheckInInfo from './CheckInInfo'
import { paymentData } from '@/interfaces/interfaces-fe'
//@ts-ignore
const CheckInOverview = (data : paymentData) =>{

    return (
        <>
            <div className = "flex justify-content-center md:mt-8 md:mb-8">
                <div className='flex flex-wrap col-9 justify-content-center container-style md:mt-8 pb-5'>
                    <div className='col-12 cardTitle'>
                        Check-in overveiw
                    </div>
                    <div className='col-10 p-0'>
                        <CheckInInfo info={data.mainGuest + " "} infoTxt="Main guest" email={data.mainGuestEmail + ""}/>
                    </div>
                    <div className='col-10 p-0'>
                        <CheckInInfo info={data.nights + ""} infoTxt="Nights"/>
                    </div>
                    <div className='col-10 p-0'>
                        <CheckInInfo info={data.guests + ""} infoTxt="Guests"/>
                    </div>
                </div>
            </div>
                                            
        </>
    )
}

export default CheckInOverview