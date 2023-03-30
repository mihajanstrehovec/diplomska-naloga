import React from 'react'
import { useRouter } from 'next/router'
import {Formik, Form as FormikForm} from 'formik'
import { checkInValidationSchema } from '@/helpers/form-helpers'
import TextField from './TextField'
import NumberField from './NumberField'
import DateField from './DateField'
import { Button } from 'primereact/button'
import { checkInInitval } from '@/interfaces/interfaces-fe'
// import { useLocalStorage } from 'react-use'

const CheckIn = () =>{
    const router = useRouter()

    // const [savedFormValues, setSavedFormValues, removeSavedFormValues] = useLocalStorage('checkin-form-values', undefined)

    const initVal : checkInInitval =  {
        mainGuestName: "",
        mainGuestEmail: "",
        numberOfGuests: 0,
        checkInDate: new Date(),
        checkOutDate: new Date()
    }
  

    return (
        <div className = "card flex flex-wrap align-items-center justify-content-center container">
            <div className='flex flex-wrap card-container sm:col-12 md:col-6 xl:col-6 justify-content-center checkIn pb-5'>
                <div className='flex col-12 cardTitle md:pl-4 md:pt-3 pl-3 pt-3'>
                    Check-in
                </div>
                <div className='md:col-6'>
                    <Formik
                    initialValues={initVal}
                    onSubmit={(values,{ setSubmitting })=>{
                        // setSavedFormValues(values)
                        router.push({
                            pathname: '/guestPage',
                            query: {
                                mainGuestName: values.mainGuestName,
                                mainGuestEmail: values.mainGuestEmail,
                                numberOfGuests: values.numberOfGuests,
                                checkInDate: values.checkInDate.toString(),
                                checkOutDate: values.checkOutDate.toString()
                            }
                        })
                        setSubmitting(false)
                    }}
                    validationSchema={checkInValidationSchema}
                    >
                        <FormikForm id='checkInForm' >
                            
                            <TextField name="mainGuestName" placeholder="Main guest name" className="mb-0 fieldStyle"/>
                            <TextField name="mainGuestEmail" placeholder="Main guest email" className="mb-0 fieldStyle"/>
                            <NumberField name="numberOfGuests" placeholder="Number of guests" min={0} max={5} prefix="Number of guests "/>
                            <DateField name="checkInDate" placeholder="Check-in date" minDate={new Date()} />
                            <DateField name="checkOutDate" placeholder="Check-out date" minDate={new Date()} />
                            
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