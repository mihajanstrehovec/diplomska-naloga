import type {NextPage} from 'next'
import CheckIn from 'components/CheckIn'
import Layout
from '@/components/Layout'

const HomePage: NextPage = () => {

  return(
    <Layout>
        <CheckIn></CheckIn>
    </Layout>
  )

}

export default HomePage