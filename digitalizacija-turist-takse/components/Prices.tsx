import React from "react"
import { Divider } from "primereact/divider";

const Prices = ({total, age, guests, amount, nights }: {
        total?: string,
        age?: string,
        guests?: string | string[] | undefined,
        amount?: string | string[] | undefined,
        nights?:string | string[] | undefined
    }) => {

    return(
        <div className="flex flex-wrap align-items-center gap-0 p-0">
            <div className="flex flex-wrap align-items-center gap-0 col-12">
                <div className="col-6 checkinfo  text-left">
                    {age}
                </div>
                <div className="flex col-4 checkinfo justify-content-center align-items-center">
                    <small>{guests} x {amount} x {nights}</small>
                </div>
                <div className="col-2 checkinfo text-right ">
                    {total}
                </div>
                <Divider className="mb-0"/>
            </div>
        </div>
    )
}

export default Prices