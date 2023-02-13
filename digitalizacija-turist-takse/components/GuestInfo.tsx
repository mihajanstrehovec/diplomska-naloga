import React from 'react'
import { useRouter } from 'next/router'
import {Formik, Field, Form as FormikForm} from 'formik'
import { checkInValidationSchema } from '@/helpers/form-helpers'
import TextField from './TextField'
import NumberField from './NumberField'
import DateField from './DateField'
import { Button } from 'primereact/button'
import { useLocalStorage } from 'react-use'
import RadioButtonField from './RadioButtonField'

const GuestInfo = () =>{
    const router = useRouter()

    const [savedFormValues, setSavedFormValues, removeSavedFormValues] = useLocalStorage('checkin-form-values', undefined)
    const gender = ["male", "female"]
  

    return (
        <>
        <div className = "card flex flex-wrap align-items-center justify-content-center container">
            <div className='flex flex-wrap card-container col-6 justify-content-center checkIn pb-5'>
                <div className='flex col-12 cardTitle'>
                    Check-in
                </div>

               
                <Formik
                initialValues={{
                    guestName: "",
                    guestSurname: "",
                    numberOfGuests: 0,
                    checkInDate: "",
                    checkOutDate: ""
                }}
                onSubmit={(values,{ setSubmitting })=>{
                    console.log(values)
                    setSubmitting(false)
                }}
                validationSchema={checkInValidationSchema}
                >
                    <FormikForm className='flex col-12'>

                    <div className='flex justify-content-center align-items-center flex-wrap col-6'>
                        <TextField name="guestName" placeholder='Guest Name'></TextField>
                        <RadioButtonField  name="gender" label={gender}></RadioButtonField>
                        <TextField  name="guestName" placeholder='Nationality'></TextField>
                        <TextField name="guestName" placeholder='Document number'></TextField>
                    </div>

                    <div className='flex justify-content-center  flex-wrap col-6'>
                        <TextField name="guestSurname" placeholder='Guest Surname'></TextField>
                        <TextField name="guestName" placeholder='Date of birth'></TextField>
                        <TextField name="guestName" placeholder='Guest Name'></TextField>
                        <TextField name="guestName" placeholder='Document type'></TextField>
                    </div>
                    </FormikForm>
                </Formik>
                  

            </div>
        </div>
        </>
    )
}

export default GuestInfo