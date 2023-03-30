export interface checkInInitval {
    mainGuestName: string,
    mainGuestEmail: string,
    numberOfGuests: number,
    checkInDate: Date,
    checkOutDate: Date
}

export interface iGuest {
    firstName?: string
    lastName?: string
    gender?: string
    dateOfBirth?: Date
    nationality?: string
    documentType?: string
    documentNumber?: string
}
  
export interface iCheckinDetails {
    mainGuestName?: string
    mainGuestEmail?: string
    numberOfGuests?: number
    checkInDate?: Date
    checkOutDate?: Date
}
  
export interface FormValues extends iCheckinDetails {
    guests: iGuest[]
}
  
export const emptyGuest: iGuest = {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: undefined,
    nationality: '',
    documentType: '',
    documentNumber: ''
}

export interface paymentData {
    mainGuest: string | string[] | undefined,
    mainGuestEmail: string | string[] | undefined,
    nights: string | string[] | undefined,
    guests: string | string[] | undefined,
    tax: number,
    none: string | string[] | undefined,
    half: string | string[] | undefined,
    full: string | string[] | undefined
}

