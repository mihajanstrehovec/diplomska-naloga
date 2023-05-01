import type {NextPage} from 'next'
import CheckIn from 'components/CheckIn'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { checkInInitval } from '@/interfaces/interfaces-fe'
import { useEffect, useState } from 'react'
import Plane from '@/components/Plane'

// ?mainGuestName=Miha+Jan+Strehovec&numberOfGuests=1&checkInDate=Fri+Apr+14+2023+00%3A00%3A00+GMT%2B0200+%28Central+European+Summer+Time%29&checkOutDate=Mon+Apr+17+2023+00%3A00%3A00+GMT%2B0200+%28Central+European+Summer+Time%29
// 4000007050000006

const HomePage: NextPage = () => {
  
  

  return(
    <Layout>
        <CheckIn/>
        <Plane iteration="1"/>
    </Layout>
  )

}

export default HomePage