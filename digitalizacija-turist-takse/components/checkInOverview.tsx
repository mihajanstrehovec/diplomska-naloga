import React from 'react'
import CheckInInfo from './CheckInInfo'


const CheckInOverview = (checkInData) =>{
    console.log(checkInData.data)
    return (
        <>
            <div className = "card flex flex-wrap align-items-center justify-content-center p-0 container">
                <div className='flex flex-wrap card-container col-9 justify-content-center checkIn  pb-5'>
                    <div className='flex col-12 cardTitle '>
                        Check-in overveiw
                    </div>
                    <div className='col-10 margin-0 p-0'>
                        <CheckInInfo info={checkInData.data.mainGuest} infoTxt="Main guest" email=" miha.strehovec23@gmail.com"/>
                    </div>
                    <div className='col-10 margin-0 p-0'>
                        <CheckInInfo info={checkInData.data.nights} infoTxt="Nights"/>
                    </div>
                    <div className='col-10 margin-0 p-0'>
                        <CheckInInfo info={checkInData.data.guests} infoTxt="Guests"/>
                    </div>
                </div>
            </div>
                                            
        </>
    )
}

export default CheckInOverview