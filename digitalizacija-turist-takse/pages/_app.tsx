import '@/styles/globals.css'
import '@/styles/checkin.css'
import '@/styles/guests.css'
import '@/styles/payment.css'
import '@/styles/success.css'
import '@/styles/admin.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import 'styles/flags.css'
import { Dosis } from '@next/font/google'
const dosis = Dosis({ subsets: ['latin'] })


import type { AppProps } from 'next/app'
import React, { createContext, useState } from 'react'

export const MyContext = createContext("Testing")

function MyProvider(props:any) {
  const [formData, setFormData] = useState({
    mainGuestName: "",
    mainGuestEmail: "", 
    numberOfGuests: 0,
    checkInDate: new Date(),
    checkOutDate: new Date(),
    guests: []
  })

  const updateFormData = (data:any) => {
    // Use the callback function form of setFormData to update the state asynchronously
    setFormData(prevState => ({ ...prevState, ...data }))
  }

  return (
    //@ts-ignore
    <MyContext.Provider value={{formData, updateFormData}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MyProvider >
      <Component className={dosis.className} {...pageProps} />
    </MyProvider>
  )
}
