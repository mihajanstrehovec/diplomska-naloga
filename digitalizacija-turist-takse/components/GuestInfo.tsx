import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import {FieldArray, Formik, Form as FormikForm} from 'formik'
import { guestsValidationSchema } from '@/helpers/form-helpers'
import TextField from './form-items/TextField'
import NumberField from './form-items/NumberField'
import DateField from './form-items/DateField'
import { Button } from 'primereact/button'
import RadioButtonField from './form-items/RadioButtonField'
import NationalityField from './form-items/NationalityField'
import DropdownField from './form-items/DropdownField'
import { queryDataHelper } from '@/helpers/data-helper'
import { iGuest, FormValues} from '@/interfaces/interfaces-fe'
import { MyContext } from '@/pages/_app'

export let initialState: FormValues = {
    mainGuestName: '',
    mainGuestEmail: '',
    numberOfGuests: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    guests: [],
}

const GuestInfo = () =>{

    const { formData, updateFormData } = useContext<any>(MyContext);

    const router = useRouter()

    const gender = ["male", "female"]

    const docType = [
        { label: 'Identity Card', value: 'I' },
        { label: 'Passport', value: 'P' },
        { label: 'Drivers license', value: 'V' }
    ]
    
    initialState = queryDataHelper(router.query)
    //@ts-ignore
    let guests = Array(parseInt(formData.numberOfGuests)).fill(undefined)
    
    const checkForData = () => {

        if (typeof sessionStorage !== 'undefined') {
            const storedData = sessionStorage.getItem("formData")
            if(storedData){
                
                let dataJSON = JSON.parse(storedData as string)
                console.log("STORED DATA",dataJSON)
                //@ts-ignore
                dataJSON.guests.forEach(guest => {
                    guest.dateOfBirth = new Date(guest.dateOfBirth) 
                    guest.documentNumber = parseInt(guest.documentNumber)
                });
                dataJSON.checkInDate = new Date (dataJSON.checkInDate)
                dataJSON.checkOutDate = new Date (dataJSON.checkOutDate)

                initialState=dataJSON
            } else {
                initialState = formData
            }
            console.log(initialState)
            return initialState
            } else {
            initialState = formData
            return initialState
          }  
        }
    

    return (
        <>
            <Formik
                initialValues={checkForData()}
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
                        {/* Field array for generating multiple guests boxes */}
                        <FieldArray name="guests">
                            {({  }) => (
                                <div>
                                    {guests.length > 0 &&
                                        guests.map((guest: iGuest, index: number) => (
                                            <div key={index}>
                                                <div className = "flex align-items-center justify-content-center container">
                                                    <div className='z-5 md:col-6 container-style pb-5 mb-8'>

                                                        <div className='cardTitle md:pl-4 md:pt-3 pl-3 pt-3'>
                                                            Guest {index+1} 
                                                        </div>
                                                        
                                                        {/* Form rows */}
                                                        <div className='flex flex-wrap justify-content-center col-12'>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <TextField name={`guests.${index}.firstName`} placeholder='Guest Name'></TextField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <TextField name={`guests.${index}.lastName`} placeholder='Guest Surname'></TextField>
                                                            </div> 
                                                        </div>

                                                        <div className='flex flex-wrap justify-content-center align-items-center col-12'>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <RadioButtonField  name={`guests.${index}.gender`} label={gender}></RadioButtonField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <DateField name={`guests.${index}.dateOfBirth`} placeholder='Date of birth'></DateField>
                                                            </div> 
                                                        </div>

                                                        <div className='flex flex-wrap justify-content-center col-12'>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <NationalityField  name={`guests.${index}.nationality`} ></NationalityField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
                                                            </div> 
                                                        </div>

                                                        <div className='flex flex-wrap justify-content-center col-12'>
                                                            <div className='md:col-5 col-12  p-0'>
                                                                <DropdownField name={`guests.${index}.documentType`} data={docType} placeholder="Document type"></DropdownField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
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

            <div className='z-0 col-12 md:fixed md:bottom-0 ' >
                <div className='flex col-12 justify-content-center'>
                    <Button icon="pi pi-check" className="continue-btn p-button-rounded" form="guestsForm" type='submit' />
                </div>
                <small  className="flex align-items-center justify-content-center col-12 light-txt">
                    Proceed to tourist tax payment
                </small>
            </div>                            
        </>
    )
}

export default GuestInfo