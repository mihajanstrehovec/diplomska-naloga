export interface checkInInitval {
    mainGuestName: string,
    mainGuestEmail: string,
    numberOfGuests: number,
    checkInDate: Date,
    checkOutDate: Date
}

export interface iContainerData {
    text: string
    value: string
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
    mainGuest: string ,
    mainGuestEmail: string,
    nights: string,
    guests: string,
    tax: number,
    none: string,
    numOfChildren: string,
    numOfAdults: string
}



