import React, { useContext } from "react"
import { useRouter } from "next/router"
import {FieldArray, Formik, Form as FormikForm} from "formik"
import { guestValidationSchema, guestsValidationSchema, submitSchema, validationSchema } from "@/helpers/form-helpers"
import { storedDataParser } from "@/helpers/data-helper"
import { iGuest, FormValues} from "@/interfaces/interfaces-fe"
import { MyContext } from "@/pages/_app"
import ContinueButton from "./ContinueButton"
import Container from "./Container"
import ErrorMsg from "./ErrorMsg"

export let initialState: FormValues = {
    mainGuestName: "",
    mainGuestEmail: "",
    numberOfGuests: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    guests: [],
}

const GuestInfo = () =>{

    const { formData, updateFormData } = useContext<any>(MyContext);
    const router = useRouter()
    console.log(formData)

    let guests = Array(parseInt(formData.numberOfGuests)).fill(undefined)
    console.log(guests)
    
    return (
        <>
            {formData.numberOfGuests == 0 && 
                <ErrorMsg message="Please complete the first step, checking in first." />
            }

            {formData.numberOfGuests > 0 && 
                <>
                <Formik
                    initialValues={formData}
                    enableReinitialize
                    onSubmit={async values => {
                        
                        updateFormData({
                            guests: values.guests
                        })
                        router.push({
                            pathname:"/paymentPage",
                        })
                    }}
                    
                    validationSchema={guestsValidationSchema}
                    >
                        <FormikForm id="guestsForm">
                            <FieldArray name="guests">
                                {({  }) => (
                                    <div>
                                        {guests.length > 0 &&
                                            guests.map((guest: iGuest, index: number) => (
                                                <div key={index}>
                                                    <div className="flex 
                                                                    align-items-center 
                                                                    col-12 
                                                                    justify-content-center 
                                                                    container">
                                                        <Container title={`Guest ${index+1}`} 
                                                                index={index}  
                                                                form={true} 
                                                                size={"md:col-6 mb-8"}/>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </FieldArray>
                        </FormikForm>
                </Formik>
                <div className="z-0 col-12 fixed bottom-0 " >
                    <ContinueButton form={"guestsForm"} 
                                    text={"Proceed to tourist tax payment"}/>
                </div>
                </>
            }
        </>
    )
}

export default GuestInfo