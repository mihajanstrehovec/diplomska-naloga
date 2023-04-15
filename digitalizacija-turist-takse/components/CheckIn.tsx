import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Formik, Form as FormikForm} from 'formik'
import { checkInValidationSchema } from '@/helpers/form-helpers'
import TextField from './TextField'
import NumberField from './NumberField'
import DateField from './DateField'
import { Button } from 'primereact/button'
import { checkInInitval } from '@/interfaces/interfaces-fe'
import CheckInInfo from './CheckInInfo'
import { Dialog } from 'primereact/dialog';
import { MyContext } from '@/pages/_app'

const CheckIn = () => {
    const router = useRouter()
    const [checkInValues, setCheckInValues] = useState<checkInInitval>({
        mainGuestName: "",
        mainGuestEmail: "",
        numberOfGuests: 0,
        checkInDate: new Date(),
        checkOutDate: new Date()
    })
    const [visible, setVisible] = useState<boolean>(false) 

    const { formData, updateFormData } = useContext<any>(MyContext)

    

    // updateFormData("CHECKIN")

    // const [savedFormValues, setSavedFormValues, removeSavedFormValues] = useLocalStorage('checkin-form-values', undefined)

    useEffect(() => {
        
        const {
            mainGuestName,
            numberOfGuests,
            checkInDate,
            checkOutDate
        } = router.query

        if(mainGuestName){
            setCheckInValues({
                mainGuestName: mainGuestName as string,
                mainGuestEmail: "",
                numberOfGuests: parseInt(numberOfGuests as string),
                checkInDate: new Date(checkInDate as string),
                checkOutDate: new Date(checkOutDate as string)
            })
    
            
            updateFormData({
                mainGuestName: mainGuestName as string,
                numberOfGuests: parseInt(numberOfGuests as string),
                checkInDate: new Date(checkInDate as string),
                checkOutDate: new Date(checkOutDate as string)
            })
        }

        

    }, [router])

   
    // console.log(formData)

    const onButtonClick = () => {
        router.push({
            pathname: '/guestPage',
            query: {
                mainGuestName: checkInValues.mainGuestName,
                mainGuestEmail: checkInValues.mainGuestEmail,
                numberOfGuests: checkInValues.numberOfGuests,
                checkInDate: checkInValues.checkInDate.toString(),
                checkOutDate: checkInValues.checkOutDate.toString()
            }
        })
    }

    const initialVals = {
        mainGuestEmail: ""
    }
  

    return (
        
        <div className = "card flex flex-wrap align-items-center justify-content-center container">
            <div className='flex flex-wrap card-container sm:col-12 md:col-6 xl:col-6 justify-content-center checkIn pb-5'>
                <div className='flex col-12 cardTitle md:pl-4 md:pt-3 pl-3 pt-3'>
                    Check-in
                </div>
                <div className='md:col-6'>

                    <CheckInInfo infoTxt="Main guest" info={checkInValues.mainGuestName}  divider={true}/>
                    <CheckInInfo infoTxt="Number of guests" info={checkInValues.numberOfGuests.toString()}  divider={true}/>
                    <CheckInInfo infoTxt="Check-in date" info={checkInValues.checkInDate.toDateString()}  divider={true}/>
                    <CheckInInfo infoTxt="Check-out date" info={checkInValues.checkOutDate.toDateString()} divider={true}/>

                </div>
            </div>
            <div className='col-12'>
                <div className='flex align-items-center justify-content-center col-12'>
                    <Button icon="pi pi-check" className="continue-btn p-button-rounded" onClick={() => setVisible(true)} />
                </div>
                <small  className="flex align-items-center justify-content-center col-12 light-txt">
                    Proceed to guest info page
                </small>
            </div>
            <Dialog header="Email" visible={visible} className='md:col-6 col-12' onHide={() => setVisible(false)}>
                <div className='flex flex-wrap align-items-center justify-content-center'>
                    <p>Please enter your email addres. Here you will recieve the reciept as well as the code for the apartment lock.</p>
                    <div className='flex flex-wrap align-items-center justify-content-center'>
                        <Formik
                            initialValues={{mainGuestEmail: ''}}
                            onSubmit={(values,{ setSubmitting })=>{
                                updateFormData({
                                    mainGuestEmail: values.mainGuestEmail
                                })
                                console.log(formData)
                                router.push({
                                    pathname: '/guestPage',
                                    // query: {
                                    //     mainGuestName: checkInValues.mainGuestName,
                                    //     mainGuestEmail: values.mainGuestEmail,
                                    //     numberOfGuests: checkInValues.numberOfGuests,
                                    //     checkInDate: checkInValues.checkInDate.toString(),
                                    //     checkOutDate: checkInValues.checkOutDate.toString()
                                    // }
                                })
                                setSubmitting(false)
                            }}
                            validationSchema={checkInValidationSchema}
                            >
                                <FormikForm id='checkInForm' >
                                    <TextField name="mainGuestEmail" placeholder="Email" className="mb-0 fieldStyle"/>
                                </FormikForm>
                                
                        </Formik>
                    </div>
                    <div className='col-12'>
                        <div className='flex align-items-center justify-content-center col-12'>
                            <Button icon="pi pi-check" className="continue-btn p-button-rounded" form="checkInForm" type='submit' />
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default CheckIn