import { iCheckinDetails } from "@/components/GuestInfo"

export const queryDataHelper = (query: iCheckinDetails) => {
    let initialState = {
        mainGuestName: query.mainGuestName,
        mainGuestEmail: query.mainGuestEmail,
        numberOfGuests: query.numberOfGuests,
        checkInDate: new Date(query.checkInDate),
        checkOutDate: new Date( query.checkOutDate),
        guests: [],
    }

    return initialState
}