import type {NextPage} from 'next'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import useDB from '@/hooks/dataBase'
import Plane from '@/components/Plane'
import { MyContext } from './_app'
import { storedDataParser } from '@/helpers/data-helper'

const Success: NextPage = () => {
  const { updateCheckin } = useDB()

  const router = useRouter()
  const [storedData, setStoredData] = useState<any>(undefined)
  const [sentAjpes, setSentAjpes] = useState<Boolean>(false)
  const [doorCode, setDoorCode] = useState<any>() 

  

  const db = useDB()
  const { formData, updateFormData } = useContext<any>(MyContext);
  useEffect(() => {
    setDoorCode(Math.floor(100000 + Math.random() * 900000))
    
    console.log("SUCCESS FORM DATA", sessionStorage.getItem("formData"))
    setStoredData(sessionStorage.getItem("formData"))
    if(storedData){
      // let dataJSON = JSON.parse(storedData)
      //@ts-ignore
      let dataJSON = storedDataParser(JSON.parse(storedData))
      // dataJSON.guests.forEach(guest => {
      //     guest.dateOfBirth = new Date(guest.dateOfBirth) 
      //     guest.documentNumber = parseInt(guest.documentNumber)
      // });
      // dataJSON.checkInDate = new Date (dataJSON.checkInDate)
      // dataJSON.checkOutDate = new Date (dataJSON.checkOutDate)
      
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
              setSentAjpes(true)
            } else {
              console.log("ERROR",`${res["row"][0]["@msgTxt"]}`)
            }
          } else {
            console.log(res)
          }
        }).then(async () => {
            const id : string = await db.onFormSubmitSuccess(dataJSON) as string
            if (sentAjpes){
              await updateCheckin(id)
            }
          })
        
    }
  }, [storedData])
  

  return(
    <Layout>
        <div className="flex container align-items-center justify-content-center">
          {router.query["canceled"] ? <h1 id="success">Something went wrong, please try again or contact your host.</h1> : 
            <div>
              <h1 id="success">Tax payment successful, have a wonderful vacation!</h1>
              <h2 id="success">The code for your doors is <b>{doorCode}</b> <small id="success-small"> (you will receive this code on your email) </small></h2>
            </div>
          }
        </div>
        <Plane iteration="4"/>
    </Layout>
  )

}

export default Success