import { Inter } from '@next/font/google'
import type {NextPage} from 'next'
import Layout
 from '@/components/Layout'
import CheckInOverview from '@/components/checkInOverview'
import PaymentBox from '@/components/paymentBox'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

const PaymentPage: NextPage = () => {

    const router = useRouter()

    const data ={
      mainGuest: router.query.mainGuestName,
      mainGuestEmail: router.query.mainGuestEmail,
      nights: router.query.numOfNights,
      guests: router.query.numOfGuests,
      tax: Math.floor(parseInt(router.query.numOfGuests)*parseInt(router.query.numOfNights)*1.6)
    }

    return(
      <Layout>
        <div className='flex flex-wrap gap-0 p-0 justify-content-center align-items-center col-12 m-0 '>
          <div className='col-6 justify-content-center align-items-center p-0 m-0'>
            <CheckInOverview data={data}/>
          </div>
          <div className='col-6 justify-content-center align-items-center m-0 p-0 '>
            <PaymentBox data={data}/>
          </div>
        </div>
        
      
        

      </Layout>
    
  )
}

export default PaymentPage