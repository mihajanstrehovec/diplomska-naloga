import type {NextPage} from 'next'
import Layout
from '@/components/Layout'
import GuestInfo from '@/components/GuestInfo'
import Plane from '@/components/Plane'

const GuestInfoPage: NextPage = () => {

    return(
      <Layout>      
        <GuestInfo/>
        <Plane iteration="2"/>
      </Layout>
  )
  
}

export default GuestInfoPage