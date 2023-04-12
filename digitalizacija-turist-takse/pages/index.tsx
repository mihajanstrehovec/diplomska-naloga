import type {NextPage} from 'next'
import CheckIn from 'components/CheckIn'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { checkInInitval } from '@/interfaces/interfaces-fe'
import { useEffect, useState } from 'react'


// http://localhost:3000/?mainGuestName=Miha+Jan+Strehovec&numberOfGuests=2&checkInDate=Fri+Jun+09+2023+00%3A00%3A00+GMT%2B0200+%28Central+European+Summer+Time%29&checkOutDate=Sat+Jun+17+2023+00%3A00%3A00+GMT%2B0200+%28Central+European+Summer+Time%29

const HomePage: NextPage = () => {
  

  return(
    <Layout>
        <CheckIn></CheckIn>
    </Layout>
  )

}

export default HomePage