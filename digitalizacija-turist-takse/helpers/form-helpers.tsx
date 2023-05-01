import { array, date, number, object, string } from 'yup'

export const guestValidationSchema = object().shape({
  firstName: string().ensure().required('First name is required'),
  lastName: string().ensure().required('Last name is required'),
  gender: string().ensure().required('Gender is required'),
  dateOfBirth: date().required('Date of birth is required'),
  nationality: string().typeError('Select nationality').required('Select nationality'),
  documentType: string().required('Document type is required'),
  documentNumber: string().required('Document number is required')
})
  
export const checkInValidationSchema = object().shape({
  mainGuestEmail: string().email('Enter valid email address').required('Enter main guest email'),
})
  
export const submitSchema = {
  mainGuestName: string().required('Enter main guest name'),
  mainGuestEmail: string().email('Enter valid email address').required('Enter main guest email'),
  numberOfGuests: number().typeError('Enter number of guests').required('Enter number of guests'),
  checkInDate: date().typeError('Select check in date').required('Select check in date'),
  checkOutDate: date().typeError('Select check out date').required('Select check out date'),
  guests: array().of(guestValidationSchema).min(1, 'At least 1 guest is required.').required('Guests required.')
}

export const guestsValidationSchema = object().shape({
  guests: array().of(guestValidationSchema).min(1, 'At least 1 guest is required.').required('Guests required.')
})

export const getGuestAge = {
  
}

