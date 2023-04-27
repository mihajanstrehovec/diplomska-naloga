import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useDB from '@/hooks/dataBase'
import { MyContext } from './_app'

const Success: NextPage = () => {
  const { updateCheckin } = useDB()

  const router = useRouter()
  const failed  = router.query["canceled"]
  const id = router.query["id"] as string
  const [checkin, setCheckin] = useState<any>()
  const { formData, updateFormData } = useContext<any>(MyContext);
  const [storedData, setStoredData] = useState<any>(undefined)

  const db = useDB()

  // useEffect(() => {
  //   console.log("CONTEXT FORM DATA success: ", formData)

  // }, [])

  useEffect(() => {
    setStoredData(sessionStorage.getItem("formData"))
    if(storedData){
      let dataJSON = JSON.parse(storedData)
      //@ts-ignore
      dataJSON.guests.forEach(guest => {
          guest.dateOfBirth = new Date(guest.dateOfBirth) 
          guest.documentNumber = parseInt(guest.documentNumber)
      });
      dataJSON.checkInDate = new Date (dataJSON.checkInDate)
      dataJSON.checkOutDate = new Date (dataJSON.checkOutDate)
      
      fetch('/api/submit-ajpes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dataJSON })
      })
        .then(async (response) => {
          const res = await response.json()
          if(response.status == 200){
            if (res["@failure"] == 0){
              console.log("SUCCESS")
              // await updateCheckin(id)
            } else {
              console.log("ERROR",`${res["row"][0]["@msgTxt"]}`)
            }
          } else {
            console.log(res)
          }
        }).then(async () => {
          const id : string = await db.onFormSubmitSuccess(dataJSON) as string
          await updateCheckin(id)
        })
    }

    
  }, [storedData])
  

  return(
    <Layout>
        <div className="flex container align-items-center justify-content-center">
          {failed ? <h1 id="success">Something went wrong, please try again or contact your host.</h1> : 
            <div>
              <h1 id="success">Tax payment successful, have a wonderful vacation!</h1>
              <h2 className='tex-align-center' id="success">The code for your doors is <b>543100</b> <small id="success-small"> (you will receive this code on your email) </small></h2>
            </div>
          }
        </div>
        <div className='plane bottom-0 right-0'>
          <img src={'/img/plane_frame_4.png'}></img>
        </div>
    </Layout>
  )

}

export default Success