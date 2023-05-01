import React from 'react'
import { Divider } from 'primereact/divider';
import CheckInInfo from './CheckInInfo';

//@ts-ignore
const Container = ({title, checkInValues, className}) => {


    return(
            <div className={`flex flex-wrap card-container ${className}`}>
                <div className='flex col-12 cardTitle md:pl-4 md:pt-3 pl-3 pt-3'>
                    {title}
                </div>
                <div className='md:col-9'>

                    <CheckInInfo infoTxt="Main guest" info={checkInValues.mainGuestName}  divider={true}/>
                    <CheckInInfo infoTxt="Number of guests" info={checkInValues.numberOfGuests.toString()}  divider={true}/>
                    <CheckInInfo infoTxt="Check-in date" info={checkInValues.checkInDate.toDateString()}  divider={true}/>
                    <CheckInInfo infoTxt="Check-out date" info={checkInValues.checkOutDate.toDateString()} divider={true}/>

                </div>
            </div>
    )
}

export default Container