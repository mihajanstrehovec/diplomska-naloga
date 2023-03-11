import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import {FieldArray, Formik, Field, Form as FormikForm} from 'formik'
import { checkInValidationSchema, guestValidationSchema, submitSchema, guestsValidationSchema } from '@/helpers/form-helpers'
import TextField from './TextField'
import NumberField from './NumberField'
import DateField from './DateField'
import { Button } from 'primereact/button'
// import { useLocalStorage } from 'react-use'
import RadioButtonField from './RadioButtonField'
import NationalityField from './NationalityField'
import DropdownField from './DropdownField'
import { queryDataHelper } from '@/helpers/data-helper'
import { iGuest, FormValues} from '@/interfaces/interfaces-fe'
import useDB from '@/hooks/dataBase'
import Link from 'next/link'

// http://localhost:3000/guestPage?mainGuestName=Miha+Jan+Strehovec&mainGuestEmail=miha.strehovec23%40gmail.com&numberOfGuests=1&checkInDate=Wed+Mar+15+2023+00%3A00%3A00+GMT%2B0100+%28Central+European+Standard+Time%29&checkOutDate=Sat+Mar+18+2023+00%3A00%3A00+GMT%2B0100+%28Central+European+Standard+Time%29

export let initialState: FormValues = {
    mainGuestName: 'janez',
    mainGuestEmail: 'janez@gmail.com',
    numberOfGuests: 2,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    guests: [],
}

const GuestInfo = () =>{

    const router = useRouter()
    const useDBinst = useDB()

    // const [savedFormValues, setSavedFormValues, removeSavedFormValues] = useLocalStorage('checkin-form-values', undefined)
    const gender = ["male", "female"]

    const docType = [
        { label: 'Identity Card', value: 'I' },
        { label: 'Passport', value: 'P' },
        { label: 'Drivers license', value: 'V' }
    ]
    
    initialState = queryDataHelper(router.query)
    console.log("num of Guests", initialState.numberOfGuests)
    //@ts-ignore
    let guests = Array(parseInt(initialState.numberOfGuests)).fill(undefined)

    console.log("init Guzes", initialState.guests)

    const timeDiff = Math.abs((initialState.checkOutDate || new Date()).getTime() - (initialState.checkInDate || new Date()).getTime())

    const numOfNights =  Math.ceil(timeDiff / (1000 * 3600 * 24));  

    return (
        <>
            <Formik
                initialValues={initialState}
                onSubmit={values =>{
                    console.log(values)
                    useDBinst.onFormSubmitSuccess(values)
                    router.push({
                        pathname:"/paymentPage",
                        query:{
                            mainGuestName:initialState.mainGuestName,
                            numOfGuests:initialState.numberOfGuests,
                            numOfNights:numOfNights,
                            mainGuestEmail:initialState.mainGuestEmail
                        }
                    })

                }}
                validationSchema={guestsValidationSchema}
                >
                    <FormikForm id="guestsForm">
                        {/* Field array for generating multiple guests boxes */}
                        <FieldArray name="guests">
                            {({  }) => (
                                <div>
                                    {guests.length > 0 &&
                                        guests.map((guest: iGuest, index: number) => (
                                            <div key={index}>
                                                <div className = "card flex flex-wrap align-items-center justify-content-center container">
                                                    <div className='flex flex-wrap card-container col-6 justify-content-center checkIn pb-5'>
                                                        <div className='flex col-12 cardTitle'>
                                                            Guest {index+1}
                                                        </div>
                                                        {/* Form elements */}
                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='col-5 p-0'>
                                                                <TextField name={`guests.${index}.firstName`} placeholder='Guest Name'></TextField>
                                                            </div>
                                                            <div className='col-5 p-0'>
                                                                <TextField name={`guests.${index}.lastName`} placeholder='Guest Surname'></TextField>
                                                            </div> 
                                                        </div>

                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='col-5 p-0'>
                                                                <RadioButtonField  name={`guests.${index}.gender`} label={gender}></RadioButtonField>
                                                            </div>
                                                            <div className='col-5 p-0'>
                                                                <DateField name={`guests.${index}.dateOfBirth`} placeholder='Date of birth'></DateField>
                                                            </div> 
                                                        </div>

                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='col-5 p-0'>
                                                                <NationalityField  name={`guests.${index}.nationality`} ></NationalityField>
                                                            </div>
                                                            <div className='col-5 p-0'>
                                                            </div> 
                                                        </div>

                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='col-5  p-0'>
                                                                <DropdownField name={`guests.${index}.documentType`} data={docType} placeholder="Document type"></DropdownField>
                                                            </div>
                                                            <div className='col-5 p-0'>
                                                                <NumberField name={`guests.${index}.documentNumber`} placeholder='Document number'></NumberField>
                                                            </div> 
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        ))}

                                </div>
                            )}
                        </FieldArray>
                    </FormikForm>
            </Formik>
            {router.query.numberOfGuests ? (
            <div className='sticky flex flex-wrap col-12  rigth-0' style={{position: "absolute", bottom: 0, right: 0}}>
                <div className='sticky flex col-12 right-0 top-0'>
                    <Button icon="pi pi-check" className="continue-btn p-button-rounded left-0 sticky" form="guestsForm" type='submit' />
                </div>
                <small  className="flex align-items-center justify-content-center col-1 light-txt">
                    Proceed to tourist tax payment
                </small>
            </div>) :(
                <div className = "flex flex-wrap justify-content-center align-items-center  gap-0">
                    <div className='flex col-12 justify-content-center align-items-center'>
                        Please fill out check in information first
                    </div>
                    <div className='flex col-12 justify-content-center align-items-center'>
                    <Link href="/"><Button className="payBttn">Check In</Button></Link>
                    </div>
                </div>
            )
            }                                  
        </>
    )
}

export default GuestInfo