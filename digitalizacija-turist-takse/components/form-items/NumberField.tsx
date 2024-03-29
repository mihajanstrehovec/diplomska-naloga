import React from "react"
import { InputNumber } from "primereact/inputnumber"
import { useField } from "formik"

const NumberField = ({
    name,
    placeholder,
    min = -Infinity,
    max = Infinity,
    prefix
  }: {
    name: string
    label?: string
    placeholder?: string
    min?: number
    max?: number
    prefix?: string
  }) => {
    const [field, meta, helpers] = useField(name)
  
    return (
        <div className="flex flex-wrap align-items-center justify-content-center">
            <div className="flex align-items-center justify-content-center col-12">
                <InputNumber
                    onValueChange={(e) => helpers.setValue(e.value)}
                    value={field.value}
                    useGrouping={false}
                    min={min}
                    max={max}
                    className={"fieldStyle" && meta.touched &&  meta.error ? "p-invalid fieldStyle" : "fieldStyle"}
                    placeholder={placeholder}
                    prefix={prefix}
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
  
  export default NumberField
  