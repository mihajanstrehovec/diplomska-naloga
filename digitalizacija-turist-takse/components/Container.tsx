import React from 'react'
import CheckInInfo from './CheckInInfo';

//@ts-ignore
const Container = ({title, data, email} : {
        title:string,
        data:any,
        email?:string
    }) => {

    return(
            <div className={`flex flex-wrap justify-content-center card-container pb-4`}>
                <div className='flex col-12 cardTitle md:pl-4 md:pt-3 pl-3'>
                    {title}
                </div>
                <div className='md:col-10'>

                    {data.length > 0 &&
                        //@ts-ignore
                        data.map((guest, index: number) => (
                            <CheckInInfo key={index} infoTxt={guest.text} info={guest.value} i={index} email={email} divider={true}/>
                        ))}
                </div>
            </div>
    )
}

export default Container