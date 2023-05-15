import type {NextPage} from "next"
import Layout from "@/components/Layout"

const ErrorPage: NextPage = () => {
  let err_msg="This page doesn't exist"
  return(
    <Layout>
      <div className="flex flex-wrap justify-content-center align-items-center err-body">
        <div>
          <div className="flex  justify-content-center">
            <i className="pi pi-exclamation-triangle" style={{ fontSize: "2.5rem" , color: "white"}}></i>
          </div>
          <div className="flex justify-content-center">
            <h1 id="error-message">{err_msg}</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ErrorPage