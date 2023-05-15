import type {NextPage} from "next"
import Layout
from "@/components/Layout"
import GuestInfo from "@/components/GuestInfo"
import Plane from "@/components/Plane"
import NavBar from "@/components/NavBar"

const GuestInfoPage: NextPage = () => {

    return(
      <Layout>  
        <NavBar activeIndex={1}/>    
        <GuestInfo/>
        <Plane iteration="2"/>
      </Layout>
  )
  
}

export default GuestInfoPage