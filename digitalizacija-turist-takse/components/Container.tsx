import React from "react"
import CheckInInfo from "./CheckInInfo";
import { iContainerData, iGuest } from "@/interfaces/interfaces-fe";
import GuestForm from "./GuestForm";

const Container = ({title, data, email, index, form=false, size} : {
        title:string,
        data?:iContainerData[],
        email?:string
        index?:number,
        form?:boolean,
        size?:string
    }) => {
        

    return(
            <div className={`flex flex-wrap ${size} justify-content-center container-style pb-5 z-5`}>
                <div className="flex col-12 cardTitle md:pl-4 md:pt-3 pl-3">
                    {title}
                </div>
                    {form ?  
                        <div className="md:col-12">
                            {/* @ts-ignore */}
                            <GuestForm index={index}/>
                        </div> :
                        <div className="md:col-10">
                            {/* @ts-ignore */}
                            {data.length > 0 && data.map((guest: iContainerData, index: number) => (
                                    <CheckInInfo key={index} infoTxt={guest.text} info={guest.value} i={index} email={email} divider={true}/>
                                ))}
                        </div>
                    }
            </div>
    )
}

export default Container