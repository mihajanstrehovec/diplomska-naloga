import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import {FieldArray, Formik, Form as FormikForm} from 'formik'
import { guestsValidationSchema } from '@/helpers/form-helpers'
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
import useDB  from '@/hooks/dataBase'
import Link from 'next/link'
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
    const db = useDB()

    // const [savedFormValues, setSavedFormValues, removeSavedFormValues] = useLocalStorage('checkin-form-values', undefined)
    const gender = ["male", "female"]

    const docType = [
        { label: 'Identity Card', value: 'I' },
        { label: 'Passport', value: 'P' },
        { label: 'Drivers license', value: 'V' }
    ]
    
    initialState = queryDataHelper(router.query)
    //@ts-ignore
    
    let guests = Array(parseInt(formData.numberOfGuests)).fill(undefined)

    // const timeDiff = 

    // const numOfNights =  Math.ceil(Math.abs((formData.checkOutDate || new Date()).getTime() - (formData.checkInDate || new Date()).getTime()) / (1000 * 3600 * 24));  

    const checkForData = () => {
        const storedData = sessionStorage.getItem("formData")
        if(storedData){
            
            let dataJSON = JSON.parse(storedData)
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

        return initialState
    }
    

    return (
        <>
            <Formik
                initialValues={checkForData()}
                enableReinitialize
                onSubmit={async values => {
                    
                    let none = 0
                    let half = 0
                    let full = 0
                    // db.onFormSubmitSuccess(values)
                    // console.log(id)
                    var today = new Date()
                    values.guests.map( guest=> {
                        //@ts-ignore
                        guest.dateOfBirth = new Date(guest.dateOfBirth)
                        var birth = guest.dateOfBirth || new Date()
                        var age = today.getFullYear() - birth?.getFullYear()
                        var m = today.getMonth() - birth?.getMonth()
                        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                            age--;
                        }
                        if (age < 8 || age > 65){
                            none ++
                        } else if (age < 18){
                            half++
                        } else {
                            full ++
                        } 
                    })

                    console.log("FORM VALUES ",values)
                    updateFormData({
                        guests: values.guests
                    })
                    
                    router.push({
                        pathname:"/paymentPage",
                        // query:{
                        //     mainGuestName:initialState.mainGuestName,
                        //     numOfGuests:initialState.numberOfGuests,
                        //     numOfNights:numOfNights,
                        //     mainGuestEmail:initialState.mainGuestEmail,
                        //     none: none,
                        //     numOfChildren: half,
                        //     numOfAdults: full,
                        //     // id: id

                        // }
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
                                                <div className = "card flex flex-wrap align-items-center justify-content-center container ">
                                                    <div className='z-5 flex flex-wrap card-container md:col-6 justify-content-center checkIn pb-5'>
                                                        <div className='flex col-12 cardTitle md:pl-4 md:pt-3 pl-3 pt-3'>
                                                            Guest {index+1} 
                                                        </div>
                                                        {/* Form elements */}
                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <TextField name={`guests.${index}.firstName`} placeholder='Guest Name'></TextField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <TextField name={`guests.${index}.lastName`} placeholder='Guest Surname'></TextField>
                                                            </div> 
                                                        </div>

                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <RadioButtonField  name={`guests.${index}.gender`} label={gender}></RadioButtonField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <DateField name={`guests.${index}.dateOfBirth`} placeholder='Date of birth'></DateField>
                                                            </div> 
                                                        </div>

                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
                                                            <div className='md:col-5 col-12 p-0'>
                                                                <NationalityField  name={`guests.${index}.nationality`} ></NationalityField>
                                                            </div>
                                                            <div className='md:col-5 col-12 p-0'>
                                                            </div> 
                                                        </div>

                                                        <div className='flex justify-content-center align-items-center flex-wrap col-12'>
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

            <div className='z-0 sticky flex flex-wrap col-12 md:rigth-0 md:bottom-0 ' >
                <div className=' z-0 sticky flex col-12 justify-content-center'>
                    <Button icon="z-0 pi pi-check" className="continue-btn p-button-rounded md:left-0 sticky" form="guestsForm" type='submit' />
                </div>
                <small  className="z-0 flex align-items-center justify-content-center col-12 light-txt">
                    Proceed to tourist tax payment
                </small>
            </div>                            
        </>
    )
}

export default GuestInfo