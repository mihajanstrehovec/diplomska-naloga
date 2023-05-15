import React from "react"

const ErrorMsg = ({message}: {message: string}) => {
    return(
        <div className='flex flex-wrap align-items-center justify-content-center container-checkin '>
            <div className='flex justify-content-center align-items-center'>
                <h1 id="empty-checkin">{message}</h1>
            </div>
        </div>
    )
}

export default ErrorMsg