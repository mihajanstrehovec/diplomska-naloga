import React from 'react'
import { useRouter } from 'next/router'
import {Formik, Field, Form as FormikForm} from 'formik'
import { checkInValidationSchema } from '@/helpers/form-helpers'
import TextField from './TextField'
import NumberField from './NumberField'
import DateField from './DateField'
import { Button } from 'primereact/button'
import { useLocalStorage } from 'react-use'

const CheckIn = () =>{
    const router = useRouter()

    const [savedFormValues, setSavedFormValues, removeSavedFormValues] = useLocalStorage('checkin-form-values', undefined)
  

    return (
        <div className = "card flex flex-wrap align-items-center justify-content-center container">
            <div className='flex flex-wrap card-container col-6 justify-content-center checkIn pb-5'>
                <div className='flex col-12 cardTitle'>
                    Check-in
                </div>
                <div className='col-6'>
                    <Formik
                    initialValues={{
                        mainGuestName: "",
                        mainGuestEmail: "",
                        numberOfGuests: 0,
                        checkInDate: "",
                        checkOutDate: ""
                    }}
                    onSubmit={(values,{ setSubmitting })=>{
                        console.log(values)
                        setSavedFormValues(values)
                        router.push('/guestPage')
                        setSubmitting(false)
                    }}
                    validationSchema={checkInValidationSchema}
                    >
                        <FormikForm id='checkInForm' >
                            
                            <TextField name="mainGuestName" placeholder="Main guest name" className="mb-0"/>
                            <TextField name="mainGuestEmail" placeholder="Main guest email" className="mb-0"/>
                            <NumberField name="numberOfGuests" placeholder="Number of guests" min={1} max={5} prefix="Number of guests" className="mb-0"/>
                            <DateField name="checkInDate" placeholder="Check-in date" minDate={new Date()} className="mb-0"/>
                            <DateField name="checkOutDate" placeholder="Check-out date" minDate={new Date()} className="mb-0"/>
                            
                        </FormikForm>
                        
                    </Formik>
                </div>
            </div>
            <div className='col-12'>
                <div className='flex align-items-center justify-content-center col-12'>
                    <Button icon="pi pi-check" className="continue-btn p-button-rounded" form="checkInForm" type='submit' />
                </div>
                <small  className="flex align-items-center justify-content-center col-12 light-txt">
                    Proceed to guest info page
                </small>
            </div>
        </div>
    )
}

export default CheckIn