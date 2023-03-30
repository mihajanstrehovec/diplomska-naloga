import React from 'react'
import CheckInInfo from './CheckInInfo'
import {Button} from 'primereact/button'
import { paymentData } from '@/interfaces/interfaces-fe'
import Prices from './Prices'

// 4000007050000006
// any 3 number CV
// Date in the future


const PaymentBox = (checkInData : paymentData) =>{

    //@ts-ignore
    const adultTax = Math.round((parseInt(checkInData.full)*parseInt(checkInData.nights)*1.6)*100) /100
    //@ts-ignore
    const childrenTax = Math.round((parseInt(checkInData.half)*parseInt(checkInData.nights)*0.8)*100) / 100
    const tax = adultTax + childrenTax

    
    return (
        <>
            <div className = "card flex flex-wrap align-items-center justify-content-center p-0 container-payment md:mt-8 md:mb-8  mt-3 mb-5">
                <div className='flex flex-wrap card-container col-9 justify-content-center checkIn md:mt-8   pb-5'>
                    <div className='flex col-12 cardTitle '>
                        Payment
                    </div>
                    <div className='col-10 p-0'>
                        <Prices total={adultTax.toString() + "€"} age="Adult tourist tax" guests={checkInData.full} amount='1.6' nights={checkInData.nights} />
                    </div>
                    <div className='col-10 p-0'>
                        {childrenTax !== 0 && 
                            <Prices total={childrenTax.toString() + "€"} age="Underage / senior tourist tax" guests={checkInData.half} amount='0.8' nights={checkInData.nights}/>
                        } 
                    </div>
                    <div className='col-10 p-0'>
                        {checkInData.none !== "0" && 
                            <Prices total={"0€"} age="Children tourist tax" guests={checkInData.none} amount='0' nights={checkInData.nights}/>
                        }
                    </div>
                    <div className='col-10 p-0 mb-6'>
                        <CheckInInfo info={tax  + "€"} infoTxt="TOTAL" divider={false}/>
                    </div>
                    <div className='flex col-10  justify-content-center'>
                    <form action="/api/checkout_session" method="POST">
                        <input type="hidden" value={checkInData.mainGuest} name="customerName" />
                        <input type="hidden" value={checkInData.mainGuestEmail} name="customerEmail" />
                        <input type="hidden" value={checkInData.nights} name="numberOfNights" />
                        <input type="hidden" value={checkInData.half} name="numberOfChildren" />
                        <input type="hidden" value={checkInData.full} name="numberOfAdults" />
                        <Button
                        type="submit"
                        role="link"
                        label="Pay securely"
                        icon="pi pi-credit-card"
                        iconPos="right"
                        className="payBttn"
                        />
                    </form>
                    </div>
                </div>
            </div>
                                            
        </>
    )
}

export default PaymentBox