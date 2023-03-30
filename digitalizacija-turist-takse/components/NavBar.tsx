import React from 'react'
import { useRouter } from 'next/router'

const NavBar = () => {
    const router = useRouter()
    const pageNames = {"/" : "Check in","/guestPage" : "Guests", "/paymentPage" : "Payment", "/adminPage" : "Admin"}
    
    return(
        <div className = "sticky flex align-items-center justify-content-center top-0 navbar md:pl-0 pl-6 ">
            {pageNames[router.route as keyof typeof pageNames]}
        </div>
    )
    
}

export default NavBar