import { Inter } from '@next/font/google'
import type {NextPage} from 'next'
import Layout
 from '@/components/Layout'
import { useLocalStorage } from 'react-use'
import { useEffect, useState } from 'react'
import TextField from '@/components/TextField'
import NumberField from '@/components/NumberField'
import { Formik } from 'formik'
import GuestInfo from '@/components/GuestInfo'
import CheckIn from '@/components/CheckIn'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const GuestInfoPage: NextPage = () => {
    const [savedFormValues] = useLocalStorage<any>('checkin-form-values')
    const [checkInInfo, setCheckInInfo] = useState()

    const router = useRouter()

    let numOfG = parseInt(router.query.numberOfGuests)

    console.log("TIPEC", typeof numOfG)

    let guests =  Array(numOfG).fill(undefined)

    console.log("ST GOSTOV", guests.length)

    return(
      <Layout>
      
        <GuestInfo/>

      </Layout>
    
  )
}

export default GuestInfoPage