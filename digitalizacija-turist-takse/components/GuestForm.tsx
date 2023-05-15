import React from "react"
import TextField from './form-items/TextField'
import NumberField from './form-items/NumberField'
import DateField from './form-items/DateField'
import RadioButtonField from './form-items/RadioButtonField'
import NationalityField from './form-items/NationalityField'
import DropdownField from './form-items/DropdownField'
import { iGuest } from '@/interfaces/interfaces-fe'

const GuestForm = ({index} : {
        index:number
    }) => {
    
        const gender = ["male", "female"]
        const docType = [
            { label: 'Identity Card', value: 'I' },
            { label: 'Passport', value: 'P' },
            { label: 'Drivers license', value: 'V' }
        ]

        return(
            <>
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
                        <DateField name={`guests.${index}.dateOfBirth`} maxDate={new Date()} placeholder='Date of birth'></DateField>
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
            </>
        )
}

export default GuestForm