import React from 'react'
import { InputText } from 'primereact/inputtext'
import { useField } from 'formik'

const TextField = ({  
    name,
    placeholder,
    type,
    tooltip,
    className}: {
        name: string,
        label?: string,
        placeholder?: string,
        type?: string,
        tooltip?: string,
        className?: string
    }) => {
    
    const [field, meta] = useField(name)

    return(
        <div className="flex flex-wrap align-items-center justify-content-center">
            <div className='flex align-items-center justify-content-center col-12'>
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
            />
            </div>
            {meta.touched && meta.error ? (
                <small id="username2-help" className="p-error flex align-items-center justify-content-center col-12">
                {meta.error}
                </small>
            ) : null}
        </div>
    )
}

export default TextField