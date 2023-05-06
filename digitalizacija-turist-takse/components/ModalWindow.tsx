import { MyContext } from "@/pages/_app"
import {Formik, Form as FormikForm} from "formik"
import { Dialog } from "primereact/dialog"
import React, { useContext } from "react"
import TextField from "./form-items/TextField"
import { useRouter } from "next/router"
import { checkInValidationSchema } from "@/helpers/form-helpers"
import ContinueButton from "./ContinueButton"



//@ts-ignore
const ModalWindow = (props) => {

    const { formData, updateFormData } = useContext<any>(MyContext)
    const router = useRouter()


    return(
        <Dialog header="Email" visible={props.visible} className="md:col-6 col-12" onHide={() => props.setVisible()}>
            <p>Please enter your email address. Here you will recieve the reciept as well as the code for the apartment lock.</p>

            <div className="flex justify-content-center">
                <Formik
                    initialValues={{mainGuestEmail: ""}}
                    onSubmit={(values,{ })=>{
                        updateFormData({
                            mainGuestEmail: values.mainGuestEmail
                        })
                        router.push({
                            pathname: "/guestPage",
                        })
                    }}
                    validationSchema={checkInValidationSchema}
                    >
                        <FormikForm id="emailField">
                            <TextField name="mainGuestEmail" placeholder="Email" className="mb-0 fieldStyle"/>
                        </FormikForm> 
                </Formik>
            </div>
            <ContinueButton form={"emailField"} />

        </Dialog>
    )
}

export default ModalWindow