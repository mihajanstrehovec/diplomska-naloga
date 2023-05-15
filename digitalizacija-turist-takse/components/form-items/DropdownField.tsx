import React from "react"
import { useField } from "formik"
import { Dropdown } from "primereact/dropdown"

export interface iDropdownField {
  label: string
  value: string | number
}

const DropdownField = ({ name, data, placeholder }: { name: string;  data: iDropdownField[], placeholder: string }) => {
  const [field, meta] = useField(name)
  return (
    <div className="flex align-items-center justify-content-center">
        <div className="flex align-items-center justify-content-center col-12 idField">
            <Dropdown
                id={name}
                name={name}
                value={field.value}
                onChange={field.onChange}
                options={data}
                optionLabel="label"
                placeholder={placeholder}
                className= {meta.touched && meta.error ? "p-invalid" : "fieldStyle"}
            />  
        </div>
        {meta.touched && meta.error ? <small className="p-error block">{meta.error}</small> : null}
    </div>

  )
}

export default DropdownField
