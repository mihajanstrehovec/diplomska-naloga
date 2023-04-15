import prices from 'helpers/prices'
import { paymentData } from '@/interfaces/interfaces-fe'

export const calculateTotalAdultTax = (numOfNights: number, numOfAdults: number) => {
  return numOfNights * numOfAdults * prices.tax.adults
}

export const calculateTotalChildrenTax = (numOfNights: number, numOfChildren: number) => {
  return numOfNights * numOfChildren * prices.tax.children
  
}

//@ts-ignore
export const calculateTotal = (details : paymentData) => {
  const { nights, numOfAdults, numOfChildren } = details
  
  let total = calculateTotalAdultTax(parseInt(nights), parseInt(numOfAdults))
  if (parseInt(numOfChildren) > 0) {
    total += calculateTotalChildrenTax(parseInt(nights), parseInt(numOfChildren))
  }

  return total
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
}

export const getGuestAge = (formData: any, min: any, max: any) => {
  const today = new Date()
  let amount = 0
  formData.guests.map( guest=> {
    //@ts-ignore
    guest.dateOfBirth = new Date(guest.dateOfBirth)
    var birth = guest.dateOfBirth || new Date()
    var age = today.getFullYear() - birth?.getFullYear()
    var m = today.getMonth() - birth?.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    if (min < age && age < max){
        amount++
    }
  
  })
  return amount
}

