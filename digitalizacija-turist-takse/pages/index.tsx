import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import type {NextPage} from 'next'
import CheckIn from 'components/CheckIn'
import Layout
 from '@/components/Layout'
import NavBar from '@/components/NavBar'
const inter = Inter({ subsets: ['latin'] })

const HomePage: NextPage = () => {
  return(
    <Layout>
      
        <CheckIn></CheckIn>

    </Layout>

    
  )
}

export default HomePage