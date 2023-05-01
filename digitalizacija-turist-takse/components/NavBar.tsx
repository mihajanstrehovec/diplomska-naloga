
import React from "react"
import { Steps } from "primereact/steps";

interface activeIndex {
    activeIndex: number
}

const NavBar = ({activeIndex} : activeIndex) => {

    const items = [
        {label: "Checkin"}, {label: "Guests"}, {label: "Payment"}
    ];

    return (
        <div className="flex grid sticky col-12 top-0 navbar">
            <div className="col-3">
                <Steps model={items} activeIndex={activeIndex} />
            </div>
        </div>
    )
    
}

export default NavBar

// import React from "react"
// import { useRouter } from "next/router"

// const NavBar = () => {
//     const router = useRouter()
//     const pageNames = {"/" : "Checkin", "/guestPage" : "Guests", "/paymentPage" : "Payment", "/adminPage" : "Admin"}
    
//     return(
//         <div className = "grid sticky align-items-center top-0 navbar md:pl-3 pl-6">
//                 <div className="col-8">{pageNames[router.route as keyof typeof pageNames]}</div>
//         </div>
//     )
    
// }

// export default NavBar