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