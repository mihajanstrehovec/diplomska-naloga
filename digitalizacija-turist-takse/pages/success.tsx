import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useDB from '@/hooks/dataBase'
import { MyContext } from './_app'


const Success: NextPage = () => {

  const router = useRouter()
  const failed  = router.query["canceled"]
  const id = router.query["id"] as string
  const [checkin, setCheckin] = useState<any>()
  const { formData, updateFormData } = useContext<any>(MyContext);
  const [storedData, setStoredData] = useState<any>(undefined)

  const db = useDB()

  useEffect(() => {
    console.log("CONTEXT FORM DATA success: ", formData)

  }, [])

  useEffect(() => {
    setStoredData(sessionStorage.getItem("formData"))
    if(storedData){
      let dataJSON = JSON.parse(storedData)
      console.log("STORED DATA",dataJSON)
      //@ts-ignore
      dataJSON.guests.forEach(guest => {
          guest.dateOfBirth = new Date(guest.dateOfBirth) 
          guest.documentNumber = parseInt(guest.documentNumber)
      });
      dataJSON.checkInDate = new Date (dataJSON.checkInDate)
      dataJSON.checkOutDate = new Date (dataJSON.checkOutDate)
      db.onFormSubmitSuccess(dataJSON)
    }

    
  }, [storedData])
  
  console.log(checkin)
  return(
    <Layout>
        <div className="flex container align-items-center justify-content-center">
          {failed ? <h1 id="success">Something went wrong, please try again or contact your host.</h1> : 
            <div>
              <h1 id="success">Tax payment successful, have a wonderful vacation!</h1>
              <h2 className='tex-align-center' id="success">The code for your doors is 543100</h2>
            </div>
          }
        </div>
    </Layout>
  )

}

export default Success