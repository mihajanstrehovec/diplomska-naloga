import React from 'react'
import { InputText } from 'primereact/inputtext'
import { useField } from 'formik'

const TextField = ({  
    name,
    placeholder,
    type,
    tooltip,
    className="fieldStyle"}: {
        name: string,
        placeholder?: string,
        type?: string,
        tooltip?: string,
        className?: string
    }) => {
    
    const [field, meta] = useField(name)

    return(
        <div className="flex-wrap">
            <div className='col-12'>
                <InputText
                    name={field.name}
                    id={name}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                    type={type}
                    tooltip={tooltip}
                    className={className} 
                    placeholder={placeholder}
                    tooltipOptions={{ position: 'top' }}
                    value={field.value}
                />
            </div>
            {meta.touched && meta.error ? (
                <small className="p-error col-12">
                    {meta.error}
                </small>
            ) : null}
        </div>
    )
}

export default TextField