import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import {Formik, Form as FormikForm} from "formik"
import { checkInValidationSchema } from "@/helpers/form-helpers"
import TextField from "./form-items/TextField"
import { Button } from "primereact/button"
import { checkInInitval, iContainerData } from "@/interfaces/interfaces-fe"
import { Dialog } from "primereact/dialog";
import { MyContext } from "@/pages/_app"
import Container from "./Container"

const CheckIn = () => {
    const router = useRouter()
   
    const [checkInValuesObject, setCheckInValuesObject] = useState<iContainerData[]>([
        {text:"Main guest name", value: ""},
        {text:"Number of guests", value: ""},
        {text:"Check in date", value: ""},
        {text:"Check out date", value: ""}
    ])


    const [visible, setVisible] = useState<boolean>(false) 

    // Context where form data is saved in. This way it is accesible on all pages, and is stored if user goes back.
    const { formData, updateFormData } = useContext<any>(MyContext)

    useEffect(() => {
        
        const {
            mainGuestName,
            numberOfGuests,
            checkInDate,
            checkOutDate
        } = router.query

        if(mainGuestName){
            setCheckInValuesObject([
                {text:"Main guest name", value: mainGuestName as string},
                {text:"Number of guests", value: numberOfGuests as string},
                {text:"Check in date", value: new Date(checkInDate as string).toDateString()},
                {text:"Check out date", value:  new Date(checkOutDate as string).toDateString()}
            ])
            updateFormData({
                mainGuestName: mainGuestName as string,
                numberOfGuests: parseInt(numberOfGuests as string),
                checkInDate: new Date(checkInDate as string),
                checkOutDate: new Date(checkOutDate as string)
            })
        }
    }, [router])

    return (
        
        <div className = "flex flex-wrap align-items-center justify-content-center container-checkin">
            {/* Main container with CheckIn information */}
            <div className="flex flex-wrap card-container sm:col-12 md:col-6 xl:col-4 justify-content-center container-style pb-5">
                <Container title="Check in" data={checkInValuesObject}/>
            </div>

            {/* Button for proceeding to the guest info page. Also triggers modal window for the users email */}
            <div className="col-12">
                <div className="flex justify-content-center ">
                    <Button icon="pi pi-check" className="continue-btn p-button-rounded" onClick={() => setVisible(true)} />
                </div>
                <small  className="flex justify-content-center col-12 light-txt">
                    Proceed to guest info page
                </small>
            </div>

            {/* Modal window for the email input */}
            <Dialog header="Email" visible={visible} className="md:col-6 col-12" onHide={() => setVisible(false)}>
                <p>Please enter your email addres. Here you will recieve the reciept as well as the code for the apartment lock.</p>

                <div className="flex justify-content-center">
                    <Formik
                        initialValues={{mainGuestEmail: ""}}
                        onSubmit={(values,{ setSubmitting })=>{
                            updateFormData({
                                mainGuestEmail: values.mainGuestEmail
                            })
                            console.log(formData)
                            router.push({
                                pathname: "/guestPage",
                            })
                            setSubmitting(false)
                        }}
                        validationSchema={checkInValidationSchema}
                        >
                            <FormikForm id="emailField">
                                <TextField name="mainGuestEmail" placeholder="Email" className="mb-0 fieldStyle"/>
                            </FormikForm>
                            
                    </Formik>
                </div>
                
                <div className="flex justify-content-center">
                    <Button icon="pi pi-check" className="continue-btn p-button-rounded" form="emailField" type="submit" />
                </div>
            </Dialog>
        </div>
    )
}

export default CheckIn