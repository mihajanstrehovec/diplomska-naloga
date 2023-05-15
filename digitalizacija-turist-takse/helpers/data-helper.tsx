import { iCheckinDetails } from "../interfaces/interfaces-fe"

export const queryDataHelper = (query: iCheckinDetails) => {
    let initialState = {
        mainGuestName: query.mainGuestName || "",
        mainGuestEmail: query.mainGuestEmail || "",
        numberOfGuests: query.numberOfGuests || 0,
        checkInDate: new Date(query.checkInDate || ""),
        checkOutDate: new Date( query.checkOutDate || ""),
        guests: [],
    }

    return initialState
}

//@ts-ignore
export const storedDataParser = (data) => {
    //@ts-ignore
    data.guests.forEach(guest => {
        guest.dateOfBirth = new Date(guest.dateOfBirth) 
        guest.documentNumber = parseInt(guest.documentNumber)
    });
    data.checkInDate = new Date (data.checkInDate)
    data.checkOutDate = new Date (data.checkOutDate)
    return data
}

//@ts-ignore
export const paymentDataObject = (checkInData, adult, children) => {
    return [
        {total: adult, age: "Adult tourist tax", guests: checkInData.numOfAdults, amount: "1.6"},
        {total: children, age: "Underage / senior tourist tax", guests: checkInData.numOfChildren, amount: "0.8"},
        {total: "0", age: "Children tourist tax", guests: checkInData.numOfChildren, amount: "0"}
    ]
}