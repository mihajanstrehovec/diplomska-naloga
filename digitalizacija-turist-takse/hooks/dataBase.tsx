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
  deleteDoc,
  addDoc
} from 'firebase/firestore'
import dayjs from 'dayjs'
import { Guest, Checkin} from '@/interfaces/interfaces-db'



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
    const checkinRef = doc(db, "knjiga-gostov", checkinID)
    await updateDoc(checkinRef, {
      ajpes: true
    })
  }

  const deleteCheckin = async (checkin: Checkin) => {
    const ref = doc(db, 'knjiga-gostov', checkin.id)
    await deleteDoc(ref)
  }

  // @ts-ignore
  const onFormSubmitSuccess = (data) => {
    // Adding a document into the collection
    addDoc(collection(db, 'knjiga-gostov'), {
      mainGuestName: data.mainGuestName,
      mainGuestEmail: data.mainGuestEmail,
      numberOfGuests: data.numberOfGuests,
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      guests: data.guests,
      ajpes: false,
      createdAt: new Date()
    })
      .then(() => {
      })
      .catch((error) => {
      })
  }



  useEffect(() => {
    fetchCheckins()
  }, [])

  return {
    checkins,
    deleteCheckin,
    refetch: fetchCheckins,
    updateCheckin,
    onFormSubmitSuccess
  }
}

export default useDB
