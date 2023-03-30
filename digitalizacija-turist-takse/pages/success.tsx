import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'


const Success: NextPage = () => {

  const router = useRouter()
  const failed  = router.query["canceled"]

  return(
    <Layout>
        <div className="flex container align-items-center justify-content-center">
          {failed ? <h1 id="success">Something went wrong, please try again or contact your host.</h1> : <h1 id="success">Tax payment successful, have a wonderful vacation!</h1>}
        </div>
    </Layout>
  )

}

export default Success