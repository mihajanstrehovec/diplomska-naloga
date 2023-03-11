import type {NextPage} from 'next'
import Layout
from '@/components/Layout'
import GuestInfo from '@/components/GuestInfo'

const GuestInfoPage: NextPage = () => {

    return(
      <Layout>      
        <GuestInfo/>
      </Layout>
  )
  
}

export default GuestInfoPage