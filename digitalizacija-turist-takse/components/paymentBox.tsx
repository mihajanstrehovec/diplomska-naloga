import React from 'react'
import CheckInInfo from './CheckInInfo'
import {Button} from 'primereact/button'


const PaymentBox = (checkInData) =>{

    return (
        <>
            <div className = "card flex flex-wrap align-items-center justify-content-center p-0 container">
                <div className='flex flex-wrap card-container col-9 justify-content-center checkIn  pb-5'>
                    <div className='flex col-12 cardTitle '>
                        Payment
                    </div>
                    <div className='col-10 p-0'>
                        <CheckInInfo info={checkInData.data.tax + "€"} infoTxt="Adult tourist tax" />
                    </div>
                    <div className='col-10 p-0 mb-6'>
                        <CheckInInfo info={checkInData.data.tax + "€"} infoTxt="TOTAL" divider={false}/>
                    </div>
                    <div className='flex col-10  justify-content-center'>
                        <Button className="payBttn">
                            Pay securely
                        </Button>
                    </div>
                    
                </div>
            </div>
                                            
        </>
    )
}

export default PaymentBox