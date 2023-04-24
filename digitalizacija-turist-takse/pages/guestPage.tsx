import type {NextPage} from 'next'
import Layout
from '@/components/Layout'
import GuestInfo from '@/components/GuestInfo'

const GuestInfoPage: NextPage = () => {

    return(
      <Layout>      
        <GuestInfo/>
        <div className='plane bottom-0 right-0'>
          <img src={'/img/plane_frame_2.png'}></img>
        </div>
      </Layout>
  )
  
}

export default GuestInfoPage