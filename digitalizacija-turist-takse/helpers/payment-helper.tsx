import prices from 'helpers/prices'

export const calculateTotalAdultTax = (numOfNights: number, numOfAdults: number) => {
  return numOfNights * numOfAdults * prices.tax.adults
}

export const calculateTotalChildrenTax = (numOfNights: number, numOfAdults: number) => {
  return numOfNights * numOfAdults * prices.tax.children
}

//@ts-ignore
export const calculateTotal = (details) => {
  const { numberOfNights, numberOfAdults, numberOfChildren } = details

  let total = calculateTotalAdultTax(numberOfNights, numberOfAdults)
  if (numberOfChildren > 0) {
    total += calculateTotalChildrenTax(numberOfNights, numberOfChildren)
  }

  return total
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
}