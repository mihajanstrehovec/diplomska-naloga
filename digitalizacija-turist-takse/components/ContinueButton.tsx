import React from "react"
import { Button } from "primereact/button"

//@ts-ignore
const ContinueButton = (props) => {
    const { text, form} = props
    
    return(
        <div className="col-12">
            <div className="flex justify-content-center ">
                {props.onClick ?
                    // Prikaz modalnega okna
                    <Button icon="pi pi-check" aria-label="continue button" className="continue-btn p-button-rounded" onClick={() => props.onClick()} /> :
                    // Oddaja obrazca
                    <Button icon="pi pi-check" aria-label="continue button" className="continue-btn p-button-rounded" form={form} type='submit' />}
            </div>
            <small className="flex justify-content-center col-12 light-txt">
                {text}
            </small>
        </div>
    )
}

export default ContinueButton