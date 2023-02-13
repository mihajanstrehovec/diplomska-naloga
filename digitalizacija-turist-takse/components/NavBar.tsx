import React from 'react'
import { useRouter } from 'next/router'

const NavBar = () => {
    const router = useRouter()
    const pageNames = {"/" : "Check in","/guestPage" : "Guests"}
    return(
        <div className = "sticky flex align-items-center justify-content-center top-0 navbar">
            {pageNames[router.asPath]}
        </div>
    )
    
}

export default NavBar