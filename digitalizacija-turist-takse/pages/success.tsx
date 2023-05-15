import type {NextPage} from "next"
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useDB from "@/hooks/dataBase"
import Plane from "@/components/Plane"
import { storedDataParser } from "@/helpers/data-helper"
import ErrorMsg from "@/components/ErrorMsg"

const Success: NextPage = () => {
  const { updateCheckin } = useDB()

  const router = useRouter()
  const [storedData, setStoredData] = useState<any>(undefined)
  const [doorCode, setDoorCode] = useState<any>() 
  const db = useDB()
  const [isData, setIsData] = useState<boolean>(false)

  useEffect(() => {

    setDoorCode(Math.floor(100000 + Math.random() * 900000))
    setStoredData(sessionStorage.getItem("formData"))

    if(storedData){
      let dataJSON = storedDataParser(JSON.parse(storedData))
      if(dataJSON["guests"].length) {
          setIsData(true)
      }
      fetch("/api/submit-ajpes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ dataJSON })
      })
        .then(async (response) => {
          const res = await response.json()
          if(response.status == 200){
            if (res["@failure"] == 0){
              const id : string = await db.onFormSubmitSuccess(dataJSON) as string
              console.log("AJPEEES")
              await updateCheckin(id)
            } else {
              console.log("ERROR",`${res["row"][0]["@msgTxt"]}`)
              await db.onFormSubmitSuccess(dataJSON)
            }
          } else {
            console.log(res)
          }
        })
    }
 
  }, [storedData])
  

  return(
    <>
    
    {isData ? 
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
    </Layout> : <ErrorMsg message = "Please complete the check in and tourist tax payment first."/>
    
    }
    </>
    
  )

}

export default Success