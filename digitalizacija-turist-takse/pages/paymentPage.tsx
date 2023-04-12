import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import CheckInOverview from '@/components/checkInOverview'
import PaymentBox from '@/components/paymentBox'
import { useRouter } from 'next/router'
import { paymentData } from '@/interfaces/interfaces-fe'
import { calculateTotal } from '@/helpers/payment-helper'

const PaymentPage: NextPage = () => {
  
    const router = useRouter()

    const {
      mainGuestName = '',
      mainGuestEmail = '',
      numOfNights = '',
      numOfGuests = '',
      none = '',
      numOfChildren = '',
      numOfAdults = '',
    } = router.query

    
    const data : paymentData = {
      mainGuest: mainGuestName as string,
      mainGuestEmail: mainGuestEmail as string,
      nights: numOfNights as string,
      guests: numOfGuests as string,
      none: none as string,
      numOfChildren: numOfChildren as string,
      numOfAdults: numOfAdults as string,
      tax: 0
    }

    data.tax = calculateTotal(data)

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
      </Layout> 
  )

}

export default PaymentPage