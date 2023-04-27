import type {NextPage} from 'next'
import CheckIn from 'components/CheckIn'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { checkInInitval } from '@/interfaces/interfaces-fe'
import { useEffect, useState } from 'react'




// ?mainGuestName=Miha+Jan+Strehovec&numberOfGuests=1&checkInDate=Fri+Apr+14+2023+00%3A00%3A00+GMT%2B0200+%28Central+European+Summer+Time%29&checkOutDate=Mon+Apr+17+2023+00%3A00%3A00+GMT%2B0200+%28Central+European+Summer+Time%29


// 4000007050000006
// any 3 number CV
// Date in the future

// Legitimizacija podatkov
// Slika mejla 
// Celotna slika!! 
// PIN koda na mejl po opravi plačevanja 
// Integracija z https://www.ringolock.com/how-does-ringo-work/
// Pravni vidik!!
// UI, kakšen mejl (catchy!! kot letalski emjli za cactchin)
// Save information 
// kako zgleda kjučavnica 
// Booking 1.0, 2.0 (locker), 3.0 (no host needed)
// Opiši problem 
// Čimveč slik!!
// code integration with stripe (chat gpt )
// brisanje iz AJPESA

// Osebnih podatkov oz. dokumentov ni dovoljeno fotografirati ali fotokopirati (zlasti ne hranite
// skeniranih osebnih izkaznic ali potnih listin oz. drugih identifikacijskih dokumentov).


// TO DO 
// Naprej checkin potem plačevanje takse (podatki se submittajo na firebase po payment review)
// Security risk of URLs
// Plane illustration 



const HomePage: NextPage = () => {
  

  return(
    <Layout>
        <CheckIn></CheckIn>
        <div className='plane bottom-0 right-0'>
          <img src={'/img/plane_frame_1.png'}></img>
        </div>
    </Layout>
  )

}

export default HomePage