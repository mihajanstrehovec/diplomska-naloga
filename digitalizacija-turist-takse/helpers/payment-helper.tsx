import prices from 'helpers/prices'
import { paymentData } from '@/interfaces/interfaces-fe'

export const calculateTotalAdultTax = (numOfNights: number, numOfAdults: number) => {
  return numOfNights * numOfAdults * prices.tax.adults
}

export const calculateTotalChildrenTax = (numOfNights: number, numOfAdults: number) => {
  return numOfNights * numOfAdults * prices.tax.children
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