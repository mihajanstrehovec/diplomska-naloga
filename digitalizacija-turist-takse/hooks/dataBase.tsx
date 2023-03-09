import { useEffect, useState } from 'react'
import { db } from '../firebase/clientApps'
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import dayjs from 'dayjs'

export interface Guest {
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  nationality: string
  documentType: string
  documentNumber: string
}

export interface Checkin {
  id: string
  mainGuestName: string
  mainGuestEmail: string
  numberOfGuests: number
  numberOfPets: number
  checkInDate: string
  checkOutDate: string
  guests: Guest[]
  ajpes: boolean
}

const mapGuests = (guests: any[]): Guest[] => {
  return guests.map((guest) => ({
    firstName: guest.firstName,
    lastName: guest.lastName,
    gender: guest.gender,
    dateOfBirth: dayjs(guest.dateOfBirth.toDate()).format('DD. MM. YYYY'),
    nationality: guest.nationality,
    documentType: guest.documentType,
    documentNumber: guest.documentNumber
  }))
}

const mapCheckins = (firestoreData: QuerySnapshot<DocumentData>): Checkin[] => {
  let checkins: Checkin[] = []

  firestoreData.forEach((checkinDoc) => {
    const checkin = checkinDoc.data()

    checkins.push({
      id: checkinDoc.id,
      mainGuestName: checkin.mainGuestName,
      mainGuestEmail: checkin.mainGuestEmail,
      numberOfGuests: checkin.numberOfGuests,
      numberOfPets: checkin.numberOfPets,
      checkInDate:  dayjs(checkin.checkInDate.toDate()).format('DD. MM. YYYY'),
      checkOutDate: dayjs(checkin.checkOutDate.toDate()).format('DD. MM. YYYY'),
      guests: mapGuests(checkin.guests),
      ajpes: checkin.ajpes
    })
  })
  return checkins
}

const useDB = () => {
  const [checkins, setCheckins] = useState<Checkin[]>([])

  const fetchCheckins = async () => {
    const q = query(collection(db, 'knjiga-gostov'), orderBy('createdAt', 'desc'))
    const data = await getDocs(q)
    setCheckins(mapCheckins(data))
  }

  const updateCheckin = async (checkinID: string) => {
    const checkinRef = doc(db, "check-in-details", checkinID)
    await updateDoc(checkinRef, {
      ajpes: true
    })
  }

  const deleteCheckin = async (checkin: Checkin) => {
    const ref = doc(db, 'check-in-details', checkin.id)
    await deleteDoc(ref)
  }

  useEffect(() => {
    fetchCheckins()
  }, [])

  return {
    checkins,
    deleteCheckin,
    refetch: fetchCheckins,
    updateCheckin
  }
}

export default useDB
