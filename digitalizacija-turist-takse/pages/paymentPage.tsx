import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import CheckInOverview from '@/components/checkInOverview'
import PaymentBox from '@/components/paymentBox'
import { useRouter } from 'next/router'
import { paymentData } from '@/interfaces/interfaces-fe'
import { calculateTotal, getGuestAge } from '@/helpers/payment-helper'
import { useContext, useEffect, useState } from 'react'
import { MyContext } from './_app'
import useDB from '@/hooks/dataBase'

const PaymentPage: NextPage = () => {

  const [ _data, setData ] = useState<any>()
  
    const router = useRouter()

    const {
      mainGuestName = '',
      mainGuestEmail = '',
      numOfNights = '',
      numOfGuests = '',
      none = '',
      numOfChildren = '',
      numOfAdults = '',
      id = ''
    } = router.query

    const db = useDB()

    
    

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
      // id : id as string
    }
    console.log(data)
    data.tax = calculateTotal(data)
    console.log("DATA TAX", data.tax)

    useEffect(() => {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem("formData", JSON.stringify(formData))
      } 

    }, [])
    

    return(

      <Layout>
        <div className='flex flex-wrap gap-0 p-0 justify-content-center align-items-center col-12 m-0 '>
          <div className='md:col-4 justify-content-center align-items-center p-0 m-0'>
            <CheckInOverview {...data}/>
          </div>
          <div className='md:col-4 justify-content-center align-items-center m-0 p-0 '>
            <PaymentBox {...data}/>
          </div>
        </div>
        <div className='plane bottom-0 right-0'>
          <img src={'/img/plane_frame_3.png'}></img>
        </div>
      </Layout> 
  )

}

export default PaymentPage