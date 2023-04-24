import React from 'react'
import { useRouter } from 'next/router'

const NavBar = () => {
    const router = useRouter()
    const pageNames = {"/" : "Checkin","/guestPage" : "Guests", "/paymentPage" : "Payment", "/adminPage" : "Admin"}
    
    return(
        <div className = "grid sticky  align-items-center  top-0 navbar md:pl-3 pl-6 ">

                <div className='col-8'>{pageNames[router.route as keyof typeof pageNames]}</div>
                
        </div>
    )
    
}

export default NavBar