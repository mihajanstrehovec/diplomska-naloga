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
    // if(id){
    //   const fCheckin = fetchCheckin(id)  
    //   const checkInData = fCheckin.then((res) => {
    //     const requestBody = res.data()
    //     console.log("req body", requestBody)
    //     fetch('/api/submit-ajpes', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ requestBody })
    //     })
    //       .then(async (response) => {
    //         const res = await response.json()
    //         if(response.status == 200){
    //           if (res["@failure"] == 0){
    //             console.log("success", 
    //             "Information sent successfully",
    //             `Successfully sent all ${res["@success"]} guests information to AJPES`)
               
    //           } else {
    //             console.log("error", 
    //             "Error while sending information",  
    //             `Something went wrong while sending the data to AJPES, please contact our support team. Error message: \n ${res["row"][0]["@msgTxt"]}`)
    //           }
    //         } else {
    //           console.log("error",
    //           "Error while sending information",
    //           `Something went wrong while sending the data to AJPES, please contact our support team or try again later.`)
    //         }
    //       })
    //       .catch((e) => console.log(e))
    //   })
    
    //   console.log("Data", checkin)
    // }

    // if(checkin){
    //   console.log(checkin)
    // }
    // [router.query["id"]]

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