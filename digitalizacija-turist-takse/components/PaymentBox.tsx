import React from "react"
import CheckInInfo from "./CheckInInfo"
import {Button} from "primereact/button"
import { paymentData } from "@/interfaces/interfaces-fe"
import Prices from "./Prices"
import { calculateTotalAdultTax, calculateTotalChildrenTax } from "@/helpers/payment-helper"
import { paymentDataObject } from "@/helpers/data-helper"

// 4000007050000006

const PaymentBox = (checkInData : paymentData) =>{

    const adultTax = calculateTotalAdultTax(parseInt(checkInData.nights), parseInt(checkInData.numOfAdults))
    const childrenTax = calculateTotalChildrenTax(parseInt(checkInData.nights), parseInt(checkInData.numOfChildren))
    const tax = Math.round((adultTax + childrenTax)*100)/100
    const paymentInfo = paymentDataObject(checkInData, adultTax, childrenTax)
    
    return (
        <>
            <div className = "flex justify-content-center mt-3 md:mt-0">
                <div className="flex flex-wrap col-9 justify-content-center container-style md:mt-6 pb-5">
                    <div className="col-12 cardTitle">
                        Payment
                    </div>
                    {paymentInfo.length > 0 && paymentInfo.map((info, index) => (
                        <>
                            {info.guests != "0" && 
                                <div key={index} className="col-10 p-0">
                                    <Prices total={info.total + "€"} age={info.age} guests={info.guests} amount={info.amount} nights={checkInData.nights} />
                                </div>
                            }
                        </>
                        
                    ))}
                    <div className="col-10 p-0 mb-6">
                        <CheckInInfo info={tax  + "€"} infoTxt="TOTAL" divider={false}/>
                    </div>
                    <div className="flex col-10  justify-content-center">
                        <form action="/api/checkout_session" method="POST">
                            <input type="hidden" value={checkInData.mainGuest} name="customerName" />
                            <input type="hidden" value={checkInData.mainGuestEmail} name="customerEmail" />
                            <input type="hidden" value={checkInData.nights} name="numberOfNights" />
                            <input type="hidden" value={checkInData.numOfChildren} name="numberOfChildren" />
                            <input type="hidden" value={checkInData.numOfAdults} name="numberOfAdults" />
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