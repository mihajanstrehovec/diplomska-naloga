import type {NextPage} from "next"
import Layout from "@/components/Layout"
//@ts-ignore
import CheckInOverview from "@/components/CheckInOverview"
import PaymentBox from "@/components/PaymentBox"
import { paymentData } from "@/interfaces/interfaces-fe"
import { calculateTotal, getGuestAge } from "@/helpers/payment-helper"
import { useContext, useEffect } from "react"
import { MyContext } from "./_app"
import Plane from "@/components/Plane"
import NavBar from "@/components/NavBar"
import ErrorMsg from "@/components/ErrorMsg"

const PaymentPage: NextPage = () => {

    
    const { formData, updateFormData } = useContext<any>(MyContext);

    const data : paymentData = {
      mainGuest: formData.mainGuestName as string,
      mainGuestEmail: formData.mainGuestEmail as string,
      nights: Math.ceil(Math.abs((formData.checkOutDate || new Date()).getTime() - (formData.checkInDate || new Date()).getTime()) / (1000 * 3600 * 24)).toString(),
      guests: formData.numberOfGuests as string,
      none: getGuestAge(formData, 0, 8).toString(),
      numOfChildren: getGuestAge(formData, 8, 18).toString(),
      numOfAdults: getGuestAge(formData, 18, 100).toString(),
      tax: 0,
    }

    data.tax = calculateTotal(data)

    useEffect(() => {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("formData", JSON.stringify(formData))
      } 

    }, [formData])

    return(
      <Layout>
        <NavBar activeIndex={2}/>
        <div className="flex flex-wrap justify-content-center align-items-center">
        {parseInt(data.guests) > 0 && 
        <>
          <div className="md:col-4">
            <CheckInOverview {...data}/>
          </div>
          <div className="md:col-4">
            <PaymentBox {...data}/>
          </div>
        </>
        }
        {parseInt(data.guests) == 0 && 
          <ErrorMsg message = "Please complete the previous steps first." />
        }
        </div>
        <Plane iteration="3"/>
      </Layout>
  )
}

export default PaymentPage