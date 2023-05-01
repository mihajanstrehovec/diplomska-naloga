import React from 'react'
import { Divider } from 'primereact/divider';

const CheckInInfo = ({info, infoTxt, email, divider=true, i}: {
        info?: string,
        infoTxt?: string,
        email?:string,
        divider?:Boolean,
        i?:number
    }) => {

    const divide = divider

    return(
        <div className="flex flex-wrap align-items-center gap-0 p-0">
            <div className='flex flex-wrap align-items-center gap-0 col-12'>
                <div className='col-6 checkinfo  text-left'>
                    {infoTxt}
                </div>
                <div className='col-6 checkinfo text-right '>
                    {info}
                </div>
                {email !== undefined && i==0 &&
                    <small className='col-12 text-right' id="email">{ email}</small>
                }
                {divide==true && <Divider className='mb-0'/>}
                
            </div>
        </div>
    )
}

export default CheckInInfo